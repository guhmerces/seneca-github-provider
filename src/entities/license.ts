import { InitialCommandsArgs } from '../types'

function license(args: InitialCommandsArgs) {
  async function load_license(this: any, msg: any) {
    const { id } = msg.q

    const res = await args.octokit.rest.licenses.get({ license: id })

    const github_ent: any = res.data

    const license = {
      ...github_ent,
      id
    }

    return this.make$(args.ZONE_BASE + 'license').data$(license)
  }

  return {
    load_license,
  }
}

export default license
