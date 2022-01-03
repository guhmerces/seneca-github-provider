/* Copyright © 2021 Seneca Project Contributors, MIT License. */

import GithubProvider from "../../src/github-provider"

const Seneca = require("seneca")
const { provider_options } = require('../provider-options')

describe('github-code-of-conduct', () => {

  const code_of_conduct_key = 'contributor_covenant' 

  test("load-code-of-conduct", async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use('provider', provider_options)
      .use(GithubProvider)
      
    const attrs = {
      key: code_of_conduct_key
    }

    let entity = await seneca.entity('provider/github/code_of_conduct').load$(attrs)

    expect(entity.entity$).toBe('provider/github/code_of_conduct')
    expect(entity.key).toBeDefined()
    expect(entity.key).toBe(attrs.key)
    expect(entity.name).toBeDefined()
  })
})
