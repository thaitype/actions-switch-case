import * as core from '@actions/core'

import conditionalSelection from './selected-condition'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const defaultString = core.getInput('default')
    if (!defaultString) {
      throw new Error('No default string provided')
    }
    const conditions = core.getInput('conditionals-with-values')

    const outputSelection = conditionalSelection(conditions) || defaultString

    core.setOutput('match', outputSelection)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
