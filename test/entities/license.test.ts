/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-license', () => {
  // NOTE: provide a valid license key
  let license = 'mit'

  test("load-license", async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    let entity = await seneca.entity('provider/github/license').load$(license)

    expect(entity.entity$).toBe('provider/github/license')
    expect(entity.id).toBeDefined()
    
    expect(entity.key).toBe(license)
    expect(entity.id).toBe(entity.key)
  })
})
