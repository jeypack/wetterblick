export const compose =
  (...hooks) =>
  (x) =>
    hooks.reduceRight((v, f) => f(v), x);
