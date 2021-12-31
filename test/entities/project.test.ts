/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import crypto from 'crypto'

import GithubProvider from '../../src/github-provider'

const Seneca = require('seneca')
const { provider_options } = require('../provider-options')

describe('github-project', () => {

  // NOTE:
  // For read : provide an id of a public project or private if the authenticated user has sufficient privileges on it
  // For state changing : provide a id of a project to which the authenticated user has sufficient privileges to change it
  // returns 404NotFound if the project was disabled
  // returns 401Unauthorized if the requester does not has sufficient privileges
  const project_id = 13963661

  test('load-project', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
    
    const ent = await seneca.entity('provider/github/project').load$(project_id)

    expect(ent).toBeDefined()
    expect(ent.entity$).toBe('provider/github/project')
    expect(ent).toHaveProperty('id')
    expect(ent.id).toBe(project_id)
  })

  test('save-project', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)

    let ent = await seneca.entity('provider/github/project').load$(project_id)

    const randomBytes = crypto.randomBytes(10).toString('hex')

    ent.body = randomBytes
    ent.name = randomBytes

    await ent.save$()

    ent = await seneca.entity('provider/github/project').load$(project_id)

    expect(ent).toBeDefined()
    expect(ent.entity$).toBe('provider/github/project')
    expect(ent.body).toBe(randomBytes)
    expect(ent.name).toBe(randomBytes)
  })
})
