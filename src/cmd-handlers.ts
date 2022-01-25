import { IncludeFromEnum, Entity, FieldModify } from "./types"

function make_actions(reqFn: CallableFunction, body_args: Array<string> = [], modify?: FieldModify[]) {
  async function load(this:any, msg: any) {
    const args = {...msg.q}
    let body: Record<string,any> = {}

    const old_args = {...args}

    body = basic_body(args)

    const res = await reqFn(body)
    
    let entity: Entity = this.make$(msg.ent.entity$).data$(res.data)

    if (modify && modify.include) {      
      const includes_arr: any = []

      modify.include.forEach((include_data) => {
        let from  = include_data.from === IncludeFromEnum.HttpResponseData ? res.data : old_args
        includes_arr.push(
          include(entity, include_data, from)
        )
      })

      entity = modify_object(entity, includes_arr)
    }

    if (modify && modify.rename) {
      modify.rename.forEach((rename_data) => {
        entity[rename_data.rename] = entity[rename_data.field]
        delete entity[rename_data.field]
      })
    }

    return entity
  }

  async function save(this:any, msg: any) {
    const entity = {...msg.ent}
    const args = {...msg.q}
    let body: Record<string,any> = {}

    body = basic_body({repo_id: entity.repo_id})

    body_args.forEach(attr => {
      body[attr] = entity[attr] 
    })

    const res = await reqFn(body)

    let new_entity: Entity = this.make$(msg.ent.entity$).data$(res.data)

    if (modify && modify.rename) {
      modify.rename.forEach((rename_data) => {
        new_entity[rename_data.rename] = new_entity[rename_data.field]
        delete new_entity[rename_data.field]
      })
    }

    return new_entity
  }

  function basic_body(source: Record<string, any>) {
    let body = {}

    if(source.repo_id) {
      body = owner_repo(source.repo_id)
      delete source.repo_id
    }

    return {...body, ...source}
  }

  function owner_repo(repo_id: string): Record<string, string> {
    const [owner, repo] = repo_id.split('/')
    return {
      owner,
      repo,
    }
  }

  function modify_object(object: Record<string, any>, field: string, replace_for: string, from: Record<string, any> ) {
    object[field] = from[replace_for] // TODO : attrs existence validation
    return object
  }

  return {
    load,
    save
  }
}

export { make_actions }