import { BACKEND_URL } from '@/constants/const';
import { API_Route } from '@/constants/enums';

// %======================== utils ========================% //

// %------------------------ case conversion ------------------------% //
export const toCamelCase = (str: string) => str.replace(/[-_]+([a-zA-Z0-9])/g, (_, char: string) => char.toUpperCase());

export const convertKeysToCamelCase = (() => {
  type CamelCasedKey<K extends string> = K extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${Capitalize<CamelCasedKey<Rest>>}`
    : K extends `${infer First}-${infer Rest}`
      ? `${Lowercase<First>}${Capitalize<CamelCasedKey<Rest>>}`
      : K;

  type CamelCaseObject<T> =
    T extends Array<infer Item>
      ? Array<CamelCaseObject<Item>>
      : T extends object
        ? {
            [K in keyof T as K extends string ? CamelCasedKey<K> : K]: CamelCaseObject<T[K]>;
          }
        : T;

  const convert = <T>(obj: T) => {
    const inner = (input: unknown): unknown => {
      if (Array.isArray(input)) return input.map(inner);

      if (input === null || typeof input !== 'object') return input;

      return Object.entries(input).reduce<Record<string, unknown>>((acc, [key, value]) => {
        acc[toCamelCase(key)] = inner(value);

        return acc;
      }, {});
    };

    return inner(obj) as CamelCaseObject<T>;
  };

  return convert;
})();

// %------------------------ get api data ------------------------% //
export const getApiData = async <T>({ route, slug }: { route: API_Route; slug?: string }) => {
  const path = `${BACKEND_URL}${route}${slug ? `/${slug}` : ''}`;

  const response = await fetch(path, {
    cache: 'no-store',
  });

  if (!response.ok) throw new Error(`Failed to fetch data from ${path}`);

  const json: unknown = await response.json();

  return convertKeysToCamelCase(json) as T;
};
