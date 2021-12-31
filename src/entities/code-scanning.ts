import { InitialCommandsArgs } from '../types'

function code_scanning(args: InitialCommandsArgs) {
  async function load_code_scanning_alert(this: any, msg: any) {
    const repo_id = msg.q.repo_id
    const alert_number = msg.q.alert_number

    const [ownername, reponame]: [string, string] = repo_id.split('/')

    const res = await args.octokit.rest.codeScanning.getAlert({
      owner: ownername,
      repo: reponame,
      alert_number,
    })

    const code_scanning: any = res.data

    code_scanning.repo_id = repo_id
    code_scanning.alert_number = alert_number

    return this.make$(args.ZONE_BASE + 'code_scanning').data$(code_scanning)
  }

  async function save_code_scanning_alert(this: any, msg: any) {
    const ent: any = msg.ent
    const repo_id = ent.repo_id
    const alert_number = ent.alert_number

    const [owner, repo]: [string, string] = repo_id.split('/')

    const data = {
      owner,
      repo,
      alert_number,

      state: ent.state,
      dismissed_reason: ent.dismissed_reason, // required if state is provided
    }

    const res = await args.octokit.rest.codeScanning.updateAlert(data)

    const code_scanning: any = res.data

    code_scanning.repo_id = repo_id
    code_scanning.alert_number = alert_number

    return this.make$(args.ZONE_BASE + 'code_scanning').data$(code_scanning)
  }

  return {
    load_code_scanning_alert,
    save_code_scanning_alert,
  }
}

export default code_scanning
