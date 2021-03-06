import * as assert from 'assert'
import { getSemigroup, contramap, ordNumber, ordString } from '../src/Ord'
import { sort } from '../src/Array'

describe('Ord', () => {
  it('getSemigroup', () => {
    type T = [number, string]
    const tuples: Array<T> = [[2, 'c'], [1, 'b'], [2, 'a'], [1, 'c']]
    const S = getSemigroup<T>()
    const sortByFst = contramap((x: T) => x[0], ordNumber)
    const sortBySnd = contramap((x: T) => x[1], ordString)
    const O1 = S.concat(sortByFst)(sortBySnd)
    assert.deepEqual(sort(O1)(tuples), [[1, 'b'], [1, 'c'], [2, 'a'], [2, 'c']])
    const O2 = S.concat(sortBySnd)(sortByFst)
    assert.deepEqual(sort(O2)(tuples), [[2, 'a'], [1, 'b'], [1, 'c'], [2, 'c']])
  })
})
