/**
 * Unit tests for src/selected-condition.ts
 */
import conditionalSelection from '../src/selected-condition'
import { expect } from '@jest/globals'

describe('selected-condition.ts', () => {
  it('should return correctAnswer', async () => {
    const con1: string = `false => shouldnt be this one
    true => correctAnswer`
    const result = conditionalSelection(con1)
    expect(result).toBe('correctAnswer')

    // await expect(wait(input)).rejects.toThrow('milliseconds not a number')
  })

  it('should return correctAnswer', async () => {
    const con2: string = `false => shouldnt be this one
    asdasdasd
    asdasdasdasdasdasd
    asdasdasdasdasd
    true => correctAnswer`
    const result = conditionalSelection(con2)
    expect(result).toBe('correctAnswer')
  })

  it('should return null', async () => {
    const con3: string = `false => shouldnt be this one
    false => correctAnswer`
    const result = conditionalSelection(con3)
    expect(result).toBe(null)
  })

  it('should return multiple lines', async () => {
    const con4: string = `false => shouldnt be this one
    true => correctAnswerasdasd
    asdasdasd
    ddd asdasd
    asss`

    const expectedResult: string = `correctAnswerasdasd
    asdasdasd
    ddd asdasd
    asss`

    const result = conditionalSelection(con4)
    expect(result).toBe(expectedResult)
  })

  it('should return multiple lines (first true statement)', async () => {
    const con5: string = `false => shouldnt be this one
    true => "correctAnswerasdasd
    asdasdasd
    ddd asdasd
    asss"
    true => "correctAnswerasdasd`

    const expectedResult: string = `"correctAnswerasdasd
    asdasdasd
    ddd asdasd
    asss"`
    const result = conditionalSelection(con5)
    expect(result).toBe(expectedResult)
  })
})
