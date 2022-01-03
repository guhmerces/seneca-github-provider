import { InitialCommandsArgs } from './types'
import issue from './entities/issue'
import code_of_conduct from './entities/code-of-conduct'

/**
 * Passes initial arguments to the closure of each group of commands
 * @param initial_args object
 * @returns {Object} object containing all commands of a entity
 */
function init_commands(initial_args: InitialCommandsArgs) {
  return {
    issue: issue(initial_args),
    code_of_conduct: code_of_conduct(initial_args),
  }
}

export default init_commands
