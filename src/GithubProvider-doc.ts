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

const branch_docs = {
  save_branch: {
    desc: 'Update GitHub Branch data from an entity.',
  },

  load_branch: {
    desc: 'Load GitHub Branch data into an entity.',
  },
}

const docs = {
  get_info: {
    desc: 'Get information about the provider.',
  },
  ...repo_docs,
  ...issue_docs,
  ...branch_docs,
}

export default docs

if ('undefined' !== typeof (module)) {
  module.exports = docs
}
