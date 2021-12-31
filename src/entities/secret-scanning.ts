import { InitialCommandsArgs } from "../types"

function secret_scanning(args: InitialCommandsArgs) {
  async function load_secret_scanning_alert(this: any, msg: any) {
    const repo_id = msg.q.repo_id
    const alert_number = msg.q.alert_number

    const [owner, repo]: [string, string] = repo_id.split('/')

    const res = await args.octokit.rest.secretScanning.getAlert({
      owner,
      repo,
      alert_number,
    })

    const secret_scanning: any = res.data

    secret_scanning.repo_id = repo_id
    secret_scanning.alert_number = alert_number

    return this.make$(args.ZONE_BASE + 'secret_scanning').data$(secret_scanning)
  }

  async function save_secret_scanning_alert(this: any, msg: any) {
    const ent: any = msg.ent
    const repo_id = ent.repo_id
    const alert_number = ent.alert_number

    const [owner, repo]: [string, string] = repo_id.split('/')

    const data = {
      owner,
      repo,
      alert_number,

      state: ent.state,
      resolution: ent.resolution, // required if state is provided
    }

    const res = await args.octokit.rest.secretScanning.updateAlert(data)

    const secret_scanning: any = res.data

    secret_scanning.repo_id = repo_id
    secret_scanning.alert_number = alert_number

    return this.make$(args.ZONE_BASE + 'secret_scanning').data$(secret_scanning)
  }

  function test(arg: any) {

  }

  return {
    load_secret_scanning_alert,
    save_secret_scanning_alert,
  };
}

export default secret_scanning
