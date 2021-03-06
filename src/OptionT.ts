import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor } from './Functor'
import { Monad } from './Monad'
import {
  Applicative,
  getApplicativeComposition,
  ApplicativeComposition,
  ApplicativeComposition11,
  ApplicativeComposition21
} from './Applicative'
import { Option, URI as OptionURI } from './Option'
import * as option from './Option'
import { Lazy } from './function'

export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): HKT<M, Option<B>>
}

export interface OptionT1<M extends HKTS> extends ApplicativeComposition11<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKTAs<M, Option<B>>, fa: HKTAs<M, Option<A>>): HKTAs<M, Option<B>>
}

export interface OptionT2<M extends HKT2S> extends ApplicativeComposition21<M, OptionURI> {
  chain<L, A, B>(f: (a: A) => HKT2As<M, L, Option<B>>, fa: HKT2As<M, L, Option<A>>): HKT2As<M, L, Option<B>>
}

export function chain<F extends HKT2S>(F: Monad<F>): OptionT2<F>['chain']
export function chain<F extends HKTS>(F: Monad<F>): OptionT1<F>['chain']
export function chain<F>(F: Monad<F>): OptionT<F>['chain']
/** @function */
export function chain<F>(F: Monad<F>): OptionT<F>['chain'] {
  return (f, fa) => F.chain(o => o.fold(() => F.of(option.none), a => f(a)), fa)
}

export function some<F extends HKT2S>(F: Applicative<F>): <L, A>(a: A) => HKT2As<F, L, Option<A>>
export function some<F extends HKTS>(F: Applicative<F>): <A>(a: A) => HKTAs<F, Option<A>>
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
/** @function */
export function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
  return a => F.of(option.some(a))
}

export function none<F extends HKT2S>(F: Applicative<F>): <L>() => HKT2As<F, L, Option<any>>
export function none<F extends HKTS>(F: Applicative<F>): () => HKTAs<F, Option<any>>
export function none<F>(F: Applicative<F>): () => HKT<F, Option<any>>
/** @function */
export function none<F>(F: Applicative<F>): () => HKT<F, Option<any>> {
  return () => F.of(option.none)
}

export function fromOption<F extends HKT2S>(F: Applicative<F>): <L, A>(fa: Option<A>) => HKT2As<F, L, Option<A>>
export function fromOption<F extends HKTS>(F: Applicative<F>): <A>(fa: Option<A>) => HKTAs<F, Option<A>>
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
/** @function */
export function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
  return oa => F.of(oa)
}

export function liftF<F extends HKT2S>(F: Functor<F>): <L, A>(fa: HKT2As<F, L, A>) => HKT2As<F, L, Option<A>>
export function liftF<F extends HKTS>(F: Functor<F>): <A>(fa: HKTAs<F, A>) => HKTAs<F, Option<A>>
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
/** @function */
export function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
  return fa => F.map(a => option.some(a), fa)
}

export function fold<F extends HKT2S>(
  F: Functor<F>
): <L, R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, R>
export function fold<F extends HKTS>(
  F: Functor<F>
): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKTAs<F, Option<A>>) => HKTAs<F, R>
export function fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
/** @function */
export function fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
  return (none, some, fa) => F.map(o => o.fold(none, some), fa)
}

export function getOrElse<F extends HKT2S>(
  F: Functor<F>
): <A>(f: Lazy<A>) => <L>(fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, A>
export function getOrElse<F extends HKTS>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKTAs<F, Option<A>>) => HKTAs<F, A>
export function getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKT<F, Option<A>>) => HKT<F, A>
/** @function */
export function getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>) => (fa: HKT<F, Option<A>>) => HKT<F, A> {
  return f => fa => F.map(o => o.getOrElse(f), fa)
}

export function getOrElseValue<F extends HKT2S>(
  F: Functor<F>
): <A>(value: A) => <L>(fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, A>
export function getOrElseValue<F extends HKTS>(F: Functor<F>): <A>(value: A) => (fa: HKTAs<F, Option<A>>) => HKTAs<F, A>
export function getOrElseValue<F>(F: Functor<F>): <A>(value: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>
/** @function */
export function getOrElseValue<F>(F: Functor<F>): <A>(value: A) => (fa: HKT<F, Option<A>>) => HKT<F, A> {
  return value => fa => F.map(o => o.getOrElseValue(value), fa)
}

export function getOptionT<M extends HKT2S>(M: Monad<M>): OptionT2<M>
export function getOptionT<M extends HKTS>(M: Monad<M>): OptionT1<M>
export function getOptionT<M>(M: Monad<M>): OptionT<M>
/** @function */
export function getOptionT<M>(M: Monad<M>): OptionT<M> {
  const applicativeComposition = getApplicativeComposition(M, option)

  return {
    ...applicativeComposition,
    chain: chain(M)
  }
}
