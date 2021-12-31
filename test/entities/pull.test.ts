/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-pull', () => {
  // FOR STATE CHANGING TESTS :
  // The authenticated user must be the author of the pull request related to the pull_number below
  const repo_id = ''
  const pull_number = 1

  test("load-pull", async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const attrs = {
      repo_id,
      pull_number
    }

    let entity = await seneca.entity('provider/github/pull').load$(attrs)

    expect(entity.entity$).toBe('provider/github/pull')
    expect(entity.id).toBeDefined()

    // created attributes expectations
    expect(entity.pull_number).toBe(entity.pull_number)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

  test('save-pull', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      pull_number
    }

    let entity = await seneca.entity('provider/github/pull').load$(attrs)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    entity.title = randomBytes
    entity.body = randomBytes

    await entity.save$()

    entity = await seneca.entity('provider/github/pull').load$(attrs)

    expect(entity.entity$).toBe('provider/github/pull')
    expect(entity.title).toBe(randomBytes)
    expect(entity.body).toBe(randomBytes)

    // created attributes expectations
    expect(entity.pull_number).toBe(entity.pull_number)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

})
