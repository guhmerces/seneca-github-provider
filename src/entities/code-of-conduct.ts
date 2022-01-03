import { InitialCommandsArgs } from "../types"

function code_of_conduct(args: InitialCommandsArgs) {
    async function load_code_of_conduct(this:any, msg:any) {
      const { key } = msg.q
  
      const res = await args.octokit.rest.codesOfConduct.getConductCode({key})
  
      const github_ent: any = res.data
  
      return this.make$(args.ZONE_BASE + 'code_of_conduct').data$(github_ent)
    }
  
    return {
      load_code_of_conduct,
    };
  }
  
  export default code_of_conduct;
  