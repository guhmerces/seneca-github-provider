import { split_repo_id } from '../helpers'
import { InitialCommandsArgs, Msg } from '../types'

function check(args: InitialCommandsArgs) {
  async function load_check_run(this: any, msg: any) {    
    const { repo_id, check_run_id } = msg.q

    const { owner, repo } = split_repo_id(repo_id)

    const res = await args.octokit.rest.checks.get({
      owner,
      repo,
      check_run_id,
    })

    const github_ent: any = res.data

    const check_run = {
      ...github_ent,
      repo_id,
      check_run_id
    }

    return this.make$(args.ZONE_BASE + 'check_run').data$(check_run)
  }

  async function save_check_run(this: any, msg: any) {
    const ent = msg.ent
    const { repo_id, check_run_id } = ent

    const { owner, repo } = split_repo_id(repo_id)

    const body = {
      owner,
      repo,
      check_run_id,

      name: ent.name,
      head_sha: ent.head_sha,
      details_url: ent.details_url,
      external_id: ent.external_id,
      status: ent.status,
      started_at: ent.started_at,
      conclusion: ent.conclusion,
      completed_a: ent.completed_at,
      output: ent.output
    }

    const res = await args.octokit.rest.checks.update(body)

    const check_run = {
      ...res.data,
      repo_id,
      check_run_id
    }

    return this.make$(args.ZONE_BASE + 'check_run').data$(check_run)
  }

  return {
    load_check_run,
    save_check_run,
  }
}

export default check
