/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-check', () => {
  // NOTE: provide a valid ownername/reponame
  let repo_id = 'guhmerces/hiringTest'

  test('load-check-run', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const attrs = {
      repo_id,
      check_run_id: 1
    }

    let entity = await seneca.entity('provider/github/check_run').load$(attrs)

    expect(entity.entity$).toBe('provider/github/check_run')
    expect(entity.id).toBeDefined()

    // expectations for created attributes
    expect(entity.check_run_id).toBe(attrs.check_run_id)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

  test('save-check-run', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      check_run_id: 1
    }

    let entity = await seneca.entity('provider/github/check_run').load$(attrs)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    entity.name = randomBytes

    await entity.save$()

    entity = await seneca.entity('provider/github/check_run').load$(attrs)

    expect(entity.entity$).toBe('provider/github/check_run')
    expect(entity.name).toBe(randomBytes)

    // expectations for created attributes
    expect(entity.id).toBeDefined()
    expect(entity.check_run_id).toBe(attrs.check_run_id)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

})
