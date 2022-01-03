/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-release', () => {
  // NOTE: provide a valid ownername/reponame
  let repo_id = ''

  test('load-release', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const attrs = {
      repo_id,
      release_id: 1
    }

    let entity = await seneca.entity('provider/github/release').load$(attrs)

    expect(entity.entity$).toBe('provider/github/release')
    expect(entity.id).toBeDefined()

    // expectations for created attributes
    expect(entity.release_id).toBe(attrs.release_id)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

  test('save-release', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      release_id: 1
    }

    let entity = await seneca.entity('provider/github/release').load$(attrs)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    entity.name = randomBytes

    await entity.save$()

    entity = await seneca.entity('provider/github/release').load$(attrs)

    expect(entity.entity$).toBe('provider/github/release')
    expect(entity.name).toBe(randomBytes)

    // expectations for created attributes
    expect(entity.id).toBeDefined()
    expect(entity.release_id).toBe(attrs.release_id)
    expect(entity.repo_id).toBe(entity.repo_id)
  })
})
