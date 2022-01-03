/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// TODO: namespace provider zone; needs seneca-entity feature

import { Octokit } from '@octokit/rest'
import init_commands from './init-commands'


type GithubProviderOptions = {}


/* Repo ids are of the form 'owner/name'. The internal github id field is
 * moved to github_id.
 *
 *
 */


function GithubProvider(this: any, _options: any) {
  const seneca: any = this

  const ZONE_BASE = 'provider/github/'

  let octokit: Octokit

  const initial_args: any = {
    ZONE_BASE,
    octokit: undefined
  }

  const commands = init_commands(initial_args)

  // NOTE: sys- zone prefix is reserved.

  seneca
    .message('sys:provider,provider:github,get:info', get_info)
    .message('role:entity,cmd:load,zone:provider,base:github,name:repo',
      commands.repo.load_repo)

    .message('role:entity,cmd:save,zone:provider,base:github,name:repo',
      commands.repo.save_repo)

    .message('role:entity,cmd:load,zone:provider,base:github,name:issue', commands.issue.load_issue)
    .message('role:entity,cmd:save,zone:provider,base:github,name:issue', commands.issue.save_issue)

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'github',
      details: {
        sdk: '@octokit/rest'
      }
    }
  }

  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:github,key:api')
    if (!out.ok) {
      this.fail('api-key-missing')
    }

    let config = {
      auth: out.value
    }

    octokit = initial_args.octokit = new Octokit(config)
    Object.freeze(initial_args)
  })


  return {
    exports: {
      native: () => ({
        octokit
      })
    }
  }
}


// Default options.
const defaults: GithubProviderOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(GithubProvider, { defaults })

export default GithubProvider

if ('undefined' !== typeof (module)) {
  module.exports = GithubProvider
}
