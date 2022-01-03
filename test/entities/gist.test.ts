/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-gist', () => {
  // Note: provide a gist_id
  // For state changin tests : the authenticated user should be the Gist owner
  const gist_id = ''

  test("load-gist", async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const id = gist_id

    let entity = await seneca.entity('provider/github/gist').load$(id)

    expect(entity.entity$).toBe('provider/github/gist')
    expect(entity.id).toBeDefined()
    expect(entity.id).toBe(id)
  })

  test('save-gist', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const id = gist_id

    let entity = await seneca.entity('provider/github/gist').load$(id)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    entity.description = randomBytes

    await entity.save$()

    entity = await seneca.entity('provider/github/gist').load$(id)

    expect(entity.entity$).toBe('provider/github/gist')
    expect(entity.description).toBe(randomBytes)
  })

})
