type InputBuffer = ArrayLike<number>;

interface RandomOptions {
  random?: InputBuffer | undefined;
}
interface RngOptions {
  rng?: (() => InputBuffer) | undefined;
}

export type V4Options = RandomOptions | RngOptions;

export type v4String = (options?: V4Options) => string;
