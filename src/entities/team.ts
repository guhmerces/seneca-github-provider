import { set_domain_id } from "../helpers"
import { InitialCommandsArgs } from "../types"

function team(args: InitialCommandsArgs) {
  async function load_team(this: any, msg: any) {
    const id = msg.q.id

    const [org, team_slug]: [string, string] = id.split('/')

    const res = await args.octokit.rest.teams.getByName({
      org,
      team_slug,
    })

    let team: any = res.data
    team = set_domain_id(team, id)

    return this.make$(args.ZONE_BASE + 'team').data$(team)
  }

  async function save_team(this: any, msg: any) {
    const ent: any = msg.ent
    const id = ent.id

    const [org, team_slug]: [string, string] = id.split('/')

    const body = {
      org,
      team_slug,

      name: ent.name,
      description: ent.description,
      privacy: ent.privacy,
      permission: ent.permission,
      parent_team_id: ent.parent && ent.parent.id,
    }

    const res = await args.octokit.rest.teams.updateInOrg(body)

    let team: any = res.data
    team = set_domain_id(res.data, id)

    return this.make$(args.ZONE_BASE + 'team').data$(team)
  }

  return {
    load_team,
    save_team,
  }
}

export default team
