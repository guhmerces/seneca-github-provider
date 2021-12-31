import { InitialCommandsArgs } from "../types";

function project(args: InitialCommandsArgs) {
  async function load_project(this:any, msg: any) {
    const project_id = msg.q.id

    const res = await args.octokit.rest.projects.get({
      project_id,
    })

    const project = res.data

    return this.make$(args.ZONE_BASE + 'project').data$(project)
  }

  async function save_project(this:any, msg: any) {
    const ent: any = msg.ent
    const project_id = ent.id

    const body = {
      project_id,

      name: ent.name,
      body: ent.body,
      state: ent.state,
      organization_permission: ent.organization_permission,
      private: ent.private,
    }

    const res = await args.octokit.rest.projects.update(body)

    const project: any = res.data

    return this.make$(args.ZONE_BASE + 'project').data$(project)
  }

  return {
    load_project,
    save_project,
  }
}

export default project
