import { from, Observable, of } from 'rxjs'

describe('Exercise: Creating Observables', () => {
    describe(of, () => {
        it('should create an observable out of a single value', () => {
            const result = []
            const observable$ = of(1)
            observable$.subscribe((value) => result.push(value))

            expect(result).toEqual([1])
        })

        it('should take a series of objects as arguments and create an observable', () => {
            const result = []
            const observable$ = of(
                { type: 'INCREMENT', payload: 1 },
                { type: 'RESET' },
                { type: 'INCREMENT', payload: 2 },
                { type: 'DECREMENT', payload: 1 }
            )
            observable$.subscribe((value) => result.push(value))

            expect(result).toEqual([
                { type: 'INCREMENT', payload: 1 },
                { type: 'RESET' },
                { type: 'INCREMENT', payload: 2 },
                { type: 'DECREMENT', payload: 1 },
            ])
        })

        it('should take an array of objects as arguments and create an observable', () => {
            const result = []
            const observable$ = from([
                { type: 'INCREMENT', payload: 1 },
                { type: 'RESET' },
                { type: 'INCREMENT', payload: 2 },
                { type: 'DECREMENT', payload: 1 },
            ])
            observable$.subscribe((value) => result.push(value))

            expect(result).toEqual([
                { type: 'INCREMENT', payload: 1 },
                { type: 'RESET' },
                { type: 'INCREMENT', payload: 2 },
                { type: 'DECREMENT', payload: 1 },
            ])
        })

        it('should create an observable from a generator', () => {
            function* values() {
                yield 1
                yield 2
                yield 3
                return 4
            }

            const result = []
            const observable$ = from(values())
            observable$.subscribe((value) => result.push(value))

            expect(result).toEqual([1, 2, 3])
        })

        it('should create an observable from a promise', (done) => {
            const promise = Promise.resolve(1)
            const result = []
            const observable$ = from(promise)
            observable$.subscribe({
                next: (value) => result.push(value),
                complete: () => {
                    expect(result).toEqual([1])
                    done()
                },
            })
        })

        it('should create an observable from a promise that rejects', (done) => {
            const promise = Promise.reject({
                error: 'Something terrible happened',
            })
            const observable$ = from(promise)
            observable$.subscribe({
                error: (error) => {
                    expect(error).toEqual({
                        error: 'Something terrible happened',
                    })
                    done()
                },
            })
        })

        it('should deal with a bespoke observable (BONUS)', () => {
            const result = []
            const observable$ = new Observable((subscriber) => {
                subscriber.next('John')
                subscriber.next('Paul')
                subscriber.next('George')
                subscriber.next('Ringo')
                subscriber.complete()
            })
            observable$.subscribe((value) => result.push(value))

            expect(result).toEqual(['John', 'Paul', 'George', 'Ringo'])
        })
    })
})
