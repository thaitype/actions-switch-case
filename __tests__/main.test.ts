/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')
const setOutputMock = jest.spyOn(core, 'setOutput')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the time output', async () => {
    const defaultStr = `exec ./bash.sh`
    const conditionals = `true => shouldnt be this one
    false => correctAnswer`
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'default':
          return defaultStr
        case 'conditionals-with-values':
          return conditionals
        default:
          return defaultStr
      }
    })

    await main.run()

    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'match',
      expect.stringMatching('shouldnt be this one')
    )
  })

  it('sets a failed status', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'default':
          return ''
        case 'conditionals-with-values':
          return `true => shouldnt be this one`
        default:
          return 'hello world.'
      }
    })
    await main.run()
    expect(runMock).toHaveReturned()

    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'No default string provided'
    )
  })

  it('should return the default status', async () => {
    const sendingString = 'hello default'
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'default':
          return sendingString
        case 'conditionals-with-values':
          return `false => shouldnt be this one`
        default:
          return 'hello world.'
      }
    })
    await main.run()

    const expectedResult = sendingString
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenCalledWith('match', expectedResult)
  })
})
