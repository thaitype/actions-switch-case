import * as core from '@actions/core'

import Selection from './selected-condition'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const defaultString = core.getInput('default')
    const conditions = core.getInput('conditionals-with-values')
    const match = new Selection(conditions, defaultString)
    const outputSelection = match.parseCondition()

    core.setOutput('match', outputSelection)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
