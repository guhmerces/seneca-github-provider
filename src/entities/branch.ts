import { split_repo_id } from '../helpers'
import { InitialCommandsArgs } from '../types'

function branch(args: InitialCommandsArgs) {
  async function load_branch(this: any, msg: any) {
    const { repo_id, name } = msg.q

    const { owner, repo } = split_repo_id(repo_id)

    const res = await args.octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: name
    })

    const github_ent: any = res.data

    const commit = {
      ...github_ent,
      repo_id,
    }

    return this.make$(args.ZONE_BASE + 'branch').data$(commit)
  }

  return {
      load_branch,
  }
}

export default branch
