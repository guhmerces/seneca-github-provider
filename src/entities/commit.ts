import { split_repo_id } from '../helpers'
import { InitialCommandsArgs } from '../types'

function commit(args: InitialCommandsArgs) {
  async function load_commit(this: any, msg: any) {
    const { repo_id, sha } = msg.q

    const { owner, repo } = split_repo_id(repo_id)

    const res = await args.octokit.rest.git.getCommit({
      owner,
      repo,
      commit_sha: sha,
    })

    const github_ent: any = res.data

    const commit = {
      ...github_ent,
      repo_id,
    }

    return this.make$(args.ZONE_BASE + 'commit').data$(commit)
  }

  async function load_commit_comment(this: any, msg: any) {
    const { repo_id, id } = msg.q

    const { owner, repo } = split_repo_id(repo_id)

    const res = await args.octokit.rest.repos.getCommitComment({
      owner,
      repo,
      comment_id: id,
    })

    const github_ent: any = res.data

    const commit = {
      ...github_ent,
      repo_id,
    }

    return this.make$(args.ZONE_BASE + 'commit_comment').data$(commit)
  }

  async function save_commit_comment(this: any, msg: any) {
    const ent = msg.ent
    const { repo_id, id } = ent

    const { owner, repo } = split_repo_id(repo_id)

    const body = {
      owner,
      repo,
      comment_id: id,

      body: ent.body,
    }

    const res = await args.octokit.rest.repos.updateCommitComment(body)

    const commit_comment = {
      ...res.data,
      repo_id,
    }

    return this.make$(args.ZONE_BASE + 'commit_comment').data$(commit_comment)
  }

  return {
    load_commit,
    load_commit_comment,
    save_commit_comment
  }
}

export default commit
