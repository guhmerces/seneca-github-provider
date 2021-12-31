import { InitialCommandsArgs } from "../types"

function user(args: InitialCommandsArgs) {
  async function load_user(this:any, msg: any) {
    const username = msg.q.id

    const res = await args.octokit.rest.users.getByUsername({
      username,
    })

    const user = res.data

    return this.make$(args.ZONE_BASE + 'user').data$(user)
  }

  async function save_user(this:any, msg: any) {
    const ent: any = msg.ent

    const body = {
      name: ent.name,
      email: ent.email,
      blog: ent.blog,
      twitter_username: ent.twitter_username,
      company: ent.company,
      location: ent.location,
      hireable: ent.hireable,
      bio: ent.bio,
    }

    const res = await args.octokit.rest.users.updateAuthenticated(body)

    const user = res.data

    return this.make$(args.ZONE_BASE + 'user').data$(user)
  }

  return {
    load_user,
    save_user,
  }
}

export default user
