import { InitialCommandsArgs } from "../types"

function pull(args: InitialCommandsArgs) {
  async function load_pull(this: any, msg: any) {
    const repo_id = msg.q.repo_id
    const pull_number = msg.q.pull_number

    const [ownername, reponame]: [string, string] = repo_id.split('/')

    const res = await args.octokit.rest.pulls.get({
      owner: ownername,
      repo: reponame,
      pull_number,
    })

    const pull: any = res.data

    pull.repo_id = repo_id
    pull.pull_number = pull_number

    return this.make$(args.ZONE_BASE + 'pull').data$(pull)
  }

  async function save_pull(this: any, msg: any) {
    const ent: any = msg.ent
    const repo_id = ent.repo_id
    const pull_number = ent.pull_number

    const [owner, repo]: [string, string] = repo_id.split('/')

    const data = {
      owner,
      repo,
      pull_number,

      title: ent.title,
      body: ent.body,
      state: ent.state,
      base: ent.base.main,
      maintainer_can_modify: ent.maintainer_can_modify
    }

    const res = await args.octokit.rest.pulls.update(data)

    const pull: any = res.data

    pull.repo_id = repo_id
    pull.pull_number = pull_number

    return this.make$(args.ZONE_BASE + 'pull').data$(pull)
  }

  return {
    load_pull,
    save_pull,
  }
}

export default pull
