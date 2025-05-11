type NonEmptyArray<T> = [T, ...T[]];

type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
