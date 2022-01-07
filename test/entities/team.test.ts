/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from "crypto"

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-team', () => {

  // If team's {name} (same as slug) attribute is updated, the variable team_slug should be updated also
  // otherwise, a 404NotFound will be returned next time tests are run
  const organization = ''
  const team_slug = ''

  test('load-team', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const id = organization + '/' + team_slug

    let ent = await seneca.entity('provider/github/team').load$(id)

    expect(ent.entity$).toBe('provider/github/team')
    expect(ent.github_id).toBeDefined()
    expect(ent.description).toBeDefined()
    expect(ent.id).toBe(id)
  })

  test('save-team', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const id = organization + '/' + team_slug

    let ent = await seneca.entity('provider/github/team').load$(id)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    ent.description = randomBytes

    await ent.save$()
    ent = await seneca.entity('provider/github/team').load$(id)

    expect(ent.entity$).toBe('provider/github/team')
    expect(ent.description).toBe(randomBytes)
    expect(ent.id).toBe(id)
    expect(ent.name).toBe(team_slug)
  })
})
