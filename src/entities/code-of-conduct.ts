import { InitialCommandsArgs } from "../types"

function code_of_conduct(args: InitialCommandsArgs) {
    async function load_code_of_conduct(this:any, msg:any) {
      const { id } = msg.q
  
      const res = await args.octokit.rest.codesOfConduct.getConductCode({key: id})
  
      const github_ent: any = res.data

      const code_of_conduct = {
        ...github_ent,
        id
      }
  
      return this.make$(args.ZONE_BASE + 'code_of_conduct').data$(code_of_conduct)
    }
  
    return {
      load_code_of_conduct,
    };
  }
  
  export default code_of_conduct;
  