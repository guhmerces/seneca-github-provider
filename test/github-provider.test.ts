/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'

import GithubProvider from '../src/github-provider'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const GithubProviderMessages = require('./github-provider.messages').default

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/local-config.js')) {
  Object.assign(CONFIG, require(__dirname + '/local-config.js'))
}

describe('github-provider', () => {

  let provider_options = {
    provider: {
      github: {
        keys: {
          api: {
            value: CONFIG.key
          }
        }
      }
    }
  }

  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('provider', {
        provider: {
          github: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(GithubProvider)
    await seneca.ready()
  })


  test('messages', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('provider', {
        provider: {
          github: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(GithubProvider)
    await (SenecaMsgTest(seneca, GithubProviderMessages)())
  })


  test('native', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('provider', {
        provider: {
          github: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(GithubProvider)
    await seneca.ready()

    let native = seneca.export('GithubProvider/native')
    expect(native().octokit).toBeDefined()
  })


  test('entity-load', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', {
        provider: {
          github: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      })
      .use(GithubProvider)

    let repo = await seneca.entity('provider/github/repo')
      .load$('senecajs/seneca')
    expect(repo).toBeDefined()
    expect(repo.id).toEqual('senecajs/seneca')
    expect(repo.name).toEqual('seneca')
    expect(repo.full_name).toEqual('senecajs/seneca')
  })


  test('entity-save', async () => {
    if (CONFIG.key) {
      const provider_options = {
        provider: {
          github: {
            keys: {
              api: {
                value: CONFIG.key
              }
            }
          }
        }
      }

      const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use('entity')
        .use('provider', provider_options)
        .use(GithubProvider)

      let repo = await seneca.entity('provider/github/repo')
        .load$('senecajs/github-api-test')
      expect(repo).toBeDefined()

      repo.description = repo.description + 'M'

      repo = await repo.save$()
      expect(repo.description.endsWith('M')).toBeTruthy()
    }
  })

  test('load-issue', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const args = {
      repo_id: 'senecajs/seneca-eventbrite-provider',
      issue_number: 1
    }

    let entity = await seneca.entity('provider/github/issue').load$(args)

    expect(entity.entity$).toBe('provider/github/issue')
    expect(entity.repo_id).toBeDefined()
    expect(entity.repo_id).toBe(args.repo_id)
  })
})

