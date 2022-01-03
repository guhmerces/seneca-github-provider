import { InitialCommandsArgs } from "../types";

function gist(args: InitialCommandsArgs) {
  async function load_gist(this: any, msg: any) {
    const id = msg.q.id

    const res = await args.octokit.rest.gists.get({gist_id: id})

    const gist: any = res.data

    return this.make$(args.ZONE_BASE + 'gist').data$(gist)
  }

  async function save_gist(this: any, msg: any) {
    const ent = msg.ent

    const body = {
      gist_id: ent.id,

      description: ent.description,
      files: ent.files
    }

    const res = await args.octokit.rest.gists.update(body)

    const gist: any = res.data

    return this.make$(args.ZONE_BASE + 'gist').data$(gist)
  }

  return {
    load_gist,
    save_gist
  }
}

export default gist
