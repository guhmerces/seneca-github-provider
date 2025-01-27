/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'

import GithubProvider from '../src/github-provider'
import { ents_tests } from "./ents-tests"
import { set_mock_worker } from './set-mock-worker'
import mocks from '../src/mocks'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const GithubProviderMessages = require('./github-provider.messages').default

const CONFIG: any = {}

if (Fs.existsSync(__dirname + '/local-config.js')) {
  Object.assign(CONFIG, require(__dirname + '/local-config.js'))
}

// Configure mock service worker
const worker = set_mock_worker(mocks)

beforeAll(() => worker.listen())
afterAll(() => worker.close())

// Separate entities details by their command type
const loads = {}
const saves = {}

Object.keys(ents_tests).forEach(ent_name => {
  const actions = ents_tests[ent_name]
  
  Object.keys(actions).forEach(action_name => {
    if(action_name === 'load') {
      loads[ent_name] = actions
    }
    if(action_name === 'save') {
      saves[ent_name] = actions
    }
  })
})

// Set common structure between tests
let provider_options = {
  provider: {
    github: {
      keys: {
        api: {
          value: CONFIG.key,
        },
      },
    },
  },
}

describe('github-provider', () => {

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
                value: CONFIG.key,
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
})

describe("github-entities-load", () => {
  Object.keys(loads).forEach(ent_name => {
    let test_data = loads[ent_name]

    test(`load-${ent_name}` , async () => {
      const seneca = Seneca({ legacy: false })
        .test()
        .use("promisify")
        .use("entity")
        .use("provider", provider_options)
        .use(GithubProvider)

      const load_test_data = test_data.load

      let res_data = await seneca.entity("provider/github/" + ent_name).load$(load_test_data.args)

      expect(res_data.entity$).toBe("provider/github/" + ent_name)
      
      const expectations = load_test_data.expectations

      if(expectations) {
        assert(expectations, res_data)
      } else {
        expect(res_data.id).toBeDefined()
      }
    })
  })
})

describe("github-entities-save", () => {
  Object.keys(saves).forEach(ent_name => {
    let test_data = saves[ent_name]

    test(`save-${ent_name}` , async () => {
      const seneca = Seneca({ legacy: false })
        .test()
        .use("promisify")
        .use("entity")
        .use("provider", provider_options)
        .use(GithubProvider)

      const load_test_data = loads[ent_name].load
      const save_test_data = test_data.save

      let entity = await seneca.entity("provider/github/" + ent_name).load$(load_test_data.args)

      expect(entity.entity$).toBe("provider/github/" + ent_name)

      // Apply changes and save
      const changes = save_test_data.changes
      Object.keys(changes).forEach(change => {
        entity[change] = changes[change]
      })
      entity = await entity.save$(save_test_data.args)

      // Assertions
      const expectations = save_test_data.expectations
      expectations
        ? assert(expectations, entity)
        : expect(entity.id).toBeDefined() // check for a ID when no expectations were set
    })
  })
})

function assert(expectations: any, against: any) {
  Object.keys(expectations).forEach(field_to_assert => {
    Object.keys(expectations[field_to_assert]).forEach(assertion => {
      switch (assertion) {
        case 'sameAs':                
          expect(against[field_to_assert]).toBe(expectations[field_to_assert]['sameAs'])
          break

        default:
          break
      }
    })
  })
}
