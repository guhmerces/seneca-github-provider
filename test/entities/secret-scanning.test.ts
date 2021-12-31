/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import GithubProvider from '../../src/github-provider'

const Seneca = require('seneca')
const { provider_options } = require('../provider-options')

describe('github-secret-scanning', () => {
  // NOTE: provide a valid ownername/reponame
  let repo_id = ''

  test('load-secret-scanning-alert', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      alert_number: 1,
    }

    let entity = await seneca.entity('provider/github/secret_scanning').load$(attrs)

    expect(entity.entity$).toBe('provider/github/secret_scanning')
    expect(entity.repo_id).toBe(attrs.repo_id)
  })

  test('save-secret-scanning-alert', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      alert_number: 1
    }

    let entity = await seneca.entity('provider/github/secret_scanning').load$(attrs)

    // TODO - FINISH SAVE SECRET SCANNING TEST

    entity = await seneca.entity('provider/github/secret_scanning').load$(attrs)

    expect(entity.entity$).toBe('provider/github/secret_scanning')
    expect(entity.repo_id).toBe(attrs.repo_id)
  })
})
