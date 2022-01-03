import { split_repo_id } from '../helpers'
import { InitialCommandsArgs } from '../types'

function release(args: InitialCommandsArgs) {
  async function load_release(this: any, msg: any) {
    const { repo_id, release_id } = msg.q

    const { owner, repo } = split_repo_id(repo_id)

    const res = await args.octokit.rest.repos.getRelease({
      owner,
      repo,
      release_id,
    })

    const github_ent: any = res.data

    const release = {
      ...github_ent,
      repo_id,
      release_id,
    }
console.log(release)
    return this.make$(args.ZONE_BASE + 'release').data$(release)
  }

  async function save_release(this: any, msg: any) {
    const ent = msg.ent
    const { repo_id, release_id } = ent

    const { owner, repo } = split_repo_id(repo_id)

    const body = {
      owner,
      repo,
      release_id,

      tag_name: ent.tag_name,
      target_commitish: ent.target_commitish,
      name: ent.name,
      body: ent.body,
      draft: ent.draft,
      prerelease: ent.prerelease,
      discussion_category_name: ent.discussion_category_name,
    }

    const res = await args.octokit.rest.checks.update(body)

    const release = {
      ...res.data,
      repo_id,
      release_id,
    }

    return this.make$(args.ZONE_BASE + 'release').data$(release)
  }

  return {
    load_release,
    save_release,
  }
}

export default release
