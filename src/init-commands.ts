import { InitialCommandsArgs } from './types'
import issue from './entities/issue'
import check from './entities/check'

/**
 * Passes initial arguments to the closure of each group of commands
 * @param initial_args object
 * @returns {Object} object containing all commands of a entity
 */
function init_commands(initial_args: InitialCommandsArgs) {
  return {
    issue: issue(initial_args),
    check: check(initial_args),
  }
}

export default init_commands
