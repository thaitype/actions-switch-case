/**
 * Unit tests for src/selected-condition.ts
 */
import Selection from '../src/selected-condition'
import { expect } from '@jest/globals'

describe('selected-condition.ts', () => {
  it('should return correctAnswer', async () => {
    const templateConditions = `false => shouldnt be this one
    true => correctAnswer`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe('correctAnswer')
  })

  it('should return correct execution', async () => {
    const templateConditions = `false => shouldnt be this one
    run hello
    echo "string"
    true => node index.js`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe('node index.js')
  })

  it('should return default', async () => {
    const templateConditions = `false => shouldnt be this one
    false => correctAnswer`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe(defaultString)
  })

  it('should return multiple lines', async () => {
    const templateConditions = `false => shouldnt be this one
    true => npm install
    rm -rf node_modules
    node index.js
`

    const expectedResult = `npm install
    rm -rf node_modules
    node index.js`

    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe(expectedResult)
  })

  it('should return multiple lines (first true statement)', async () => {
    const templateConditions = `false => shouldnt be this one
    true => "print "hello world"
    cd ..
    ls -la
    exit"
    true => "correctAnswerasdasd`

    const expectedResult = `"print "hello world"
    cd ..
    ls -la
    exit"`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe(expectedResult)
  })
  it('should return multiple lines (first true statement without tab or newline)', async () => {
    const templateConditions = `false => shouldnt be this one
    true => exec echo "hello world"
    cd -ls
    exit
    echo "hello world"
    true => "falseAnswer"
    
    
    
    `

    const expectedResult = `exec echo "hello world"
    cd -ls
    exit
    echo "hello world"`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe(expectedResult)
  })

  it('should return multiple lines (first true statement without newline)', async () => {
    const templateConditions = `false => shouldnt be this one
    true => exec echo "hello world"
    cd -ls
    exit
    echo "hello world"
    true => "falseAnswer"                   `

    const expectedResult = `exec echo "hello world"
    cd -ls
    exit
    echo "hello world"`
    const defaultString = `default`
    const matcher = new Selection(templateConditions, defaultString)
    const result = matcher.parseCondition()
    expect(result).toBe(expectedResult)
  })
})
