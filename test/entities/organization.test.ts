/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from 'crypto'

import GithubProvider from '../../src/github-provider'

const Seneca = require('seneca')
const { provider_options } = require('../provider-options')

describe('github-org', () => {
  // NOTE: For state changing tests: provide a organization name which the authenticated user has sufficient privileges on it
  const orgname = ''

  test('load-org', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
    
    const ent = await seneca.entity('provider/github/org').load$(orgname)

    expect(ent).toBeDefined()

    expect(ent.entity$).toBe('provider/github/org')

    expect(ent).toHaveProperty('login')
    expect(ent.login).toBe(orgname)
  
    expect(ent).toHaveProperty('id')
    expect(ent.id).toBe(orgname)

    expect(ent).toHaveProperty('github_id')
  })

  test('save-org', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    let ent = await seneca.entity('provider/github/org').load$(orgname)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    ent.description = randomBytes

    await ent.save$()

    ent = await seneca.entity('provider/github/org').load$(orgname)

    expect(ent).toBeDefined()
    expect(ent.entity$).toBe('provider/github/org')
    expect(ent.description).toBe(randomBytes)
  })
})
