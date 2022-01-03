import { InitialCommandsArgs } from "../types"

function repository(args: InitialCommandsArgs) {
  async function load_repo(this: any, msg: any) {
    let ent: any = null

    let q: any = msg.q
    let [ownername, reponame]: [string, string] = q.id.split('/')

    let res = await args.octokit.rest.repos.get({
      owner: ownername,
      repo: reponame,
    })

    if (res && 200 === res.status) {
      let data: any = res.data
      data.github_id = data.id
      data.id = q.id
      ent = this.make$(args.ZONE_BASE + 'repo').data$(data)
    }

    return ent
  }


  async function save_repo(this: any, msg: any) {
    let ent: any = msg.ent

    let [ownername, reponame]: [string, string] = ent.id.split('/')

    let data = {
      owner: ownername,
      repo: reponame,
      description: ent.description
    }

    let res = await args.octokit.rest.repos.update(data)

    if (res && 200 === res.status) {
      let data: any = res.data
      data.github_id = data.id
      data.id = ownername + '/' + reponame
      ent = this.make$(args.ZONE_BASE + 'repo').data$(data)
    }

    return ent
  }

  return {
    load_repo,
    save_repo,
  }
}

export default repository
