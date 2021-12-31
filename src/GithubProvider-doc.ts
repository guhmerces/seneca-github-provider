/* Copyright © 2021 Seneca Project Contributors, MIT License. */

const repo_docs = {
  load_repo: {
    desc: 'Load GitHub repository data into an entity.',
  },

  save_repo: {
    desc: 'Update GitHub repository data from an entity.',
  },
}

const issue_docs = {
  save_issue: {
    desc: 'Update GitHub Issue data from an entity.',
  },

  load_issue: {
    desc: 'Load GitHub Issue data into an entity.',
  },
}

const user_docs = {
  load_user: {
    desc: 'Load GitHub User data into an entity.',
  },
  save_user: {
    desc: 'Update GitHub User data from an entity.',
  },
}

const docs = {
  get_info: {
    desc: 'Get information about the provider.',
  },
  ...repo_docs,
  ...issue_docs,
  ...user_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
