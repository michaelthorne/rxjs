import { from, of } from 'rxjs'

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
    })
})
