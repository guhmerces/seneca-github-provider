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

const check_docs = {
  save_check_run: {
    desc: 'Update GitHub Check Run data from an entity.',
  },

  load_check_run: {
    desc: 'Load GitHub Check Run data into an entity.',
  },
}

const docs = {
  get_info: {
    desc: 'Get information about the provider.',
  },
  ...repo_docs,
  ...issue_docs,
  ...check_docs
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
