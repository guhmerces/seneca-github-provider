/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-branch', () => {
  // NOTE: provide a valid ownername/reponame
  let repo_id = 'senecajs/seneca'
  let branch = 'master'

  test("load-branch", async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const attrs = {
      repo_id,
      name: branch
    }

    let entity = await seneca.entity('provider/github/branch').load$(attrs)

    expect(entity.entity$).toBe('provider/github/branch')
    expect(entity.name).toBe(attrs.name)

    // created attributes expectations
    expect(entity.repo_id).toBe(entity.repo_id)
  })
})
