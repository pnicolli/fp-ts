MODULE [State](https://github.com/gcanti/fp-ts/blob/master/src/State.ts)
# State
*data*
```ts
constructor(readonly run: (s: S) => [A, S]) {}
```
## Methods

### ap
```ts
<B>(fab: State<S, (a: A) => B>): State<S, B> 
```
### chain
```ts
<B>(f: (a: A) => State<S, B>): State<S, B> 
```
### eval
```ts
(s: S): A 
```
### exec
```ts
(s: S): S 
```
### map
```ts
<B>(f: (a: A) => B): State<S, B> 
```
# state
*instance*
```ts
Monad<URI>
```
# ap
*function*
```ts
<S, A, B>(fab: State<S, (a: A) => B>, fa: State<S, A>): State<S, B>
```

# chain
*function*
```ts
<S, A, B>(f: (a: A) => State<S, B>, fa: State<S, A>): State<S, B>
```

# get
*function*
```ts
<S>(): State<S, S>
```

# gets
*function*
```ts
<S, A>(f: (s: S) => A): State<S, A>
```

# map
*function*
```ts
<S, A, B>(f: (a: A) => B, fa: State<S, A>): State<S, B>
```

# modify
*function*
```ts
<S>(f: (s: S) => S): State<S, undefined>
```

# of
*function*
```ts
<S, A>(a: A): State<S, A>
```

# put
*function*
```ts
<S>(s: S): State<S, undefined>
```