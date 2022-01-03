/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from 'crypto'

import GithubProvider from '../../src/github-provider'

const Seneca = require('seneca')
const { provider_options } = require('../provider-options')

describe('github-commit', () => {
  const repo_id = 'guhmerces/hiringTest'
  const commit_sha = '371e16e62fd72613d6d16902616f5fbe2b7a27a3'
  const comment_id = 62817844

  test('load-commit', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      sha: commit_sha,
    }

    let entity = await seneca.entity('provider/github/commit').load$(attrs)

    expect(entity.entity$).toBe('provider/github/commit')

    // created attributes expectations
    expect(entity.sha).toBe(attrs.sha)
    expect(entity.repo_id).toBe(entity.repo_id)
  })

  test('load-commit-comment', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      id: comment_id,
    }

    let entity = await seneca
      .entity('provider/github/commit_comment')
      .load$(attrs)

    expect(entity.entity$).toBe('provider/github/commit_comment')
    expect(entity.id).toBeDefined()

    // created attributes expectations
    expect(entity.repo_id).toBe(entity.repo_id)
  })

  test('save-commit-comment', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    const attrs = {
      repo_id,
      id: comment_id,
    }

    let entity = await seneca.entity('provider/github/commit_comment').load$(attrs)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    entity.body = randomBytes

    await entity.save$()

    entity = await seneca.entity('provider/github/commit_comment').load$(attrs)

    expect(entity.entity$).toBe('provider/github/commit_comment')
    expect(entity.body).toBe(randomBytes)

    // created attributes expectations
    expect(entity.id).toBeDefined()
    expect(entity.repo_id).toBe(entity.repo_id)
  })
})
