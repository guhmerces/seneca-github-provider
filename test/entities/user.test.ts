/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from 'crypto'

import GithubProvider from '../../src/github-provider'

const Seneca = require('seneca')
const { provider_options } = require('../provider-options')

describe('github-user', () => {
  // NOTE: provide a valid username
  let username = ''

  test('load-user', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
    
    const ent = await seneca.entity('provider/github/user').load$(username)

    expect(ent).toBeDefined()
    expect(ent.entity$).toBe('provider/github/user')
    expect(ent).toHaveProperty('id')
    expect(ent).toHaveProperty('login')
    expect(ent.login).toBe(username)
  })

  test('save-user', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    let ent = await seneca.entity('provider/github/user').load$(username)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    ent.blog = randomBytes

    await ent.save$()

    ent = await seneca.entity('provider/github/user').load$(username)

    expect(ent).toBeDefined()
    expect(ent.entity$).toBe('provider/github/user')
    expect(ent.blog).toBe(randomBytes)
  })
})
