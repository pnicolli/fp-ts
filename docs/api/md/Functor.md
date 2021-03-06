MODULE [Functor](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)
# Functor
*type class*
```ts
interface Functor<F> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}
```
# flap
*function*
```ts
flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>) => (a: A) => HKT<F, B> 
```
Apply a value in a computational context to a value in no context. Generalizes `flip`

# getFunctorComposition
*function*
```ts
getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> 
```