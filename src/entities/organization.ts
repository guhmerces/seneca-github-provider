import { set_domain_id } from "../helpers"
import { InitialCommandsArgs } from "../types"

function organization(args: InitialCommandsArgs) {
  async function load_org(this: any, msg: any) {
    const orgname = msg.q.id

    const res = await args.octokit.rest.orgs.get({
      org: orgname,
    })

    let org: any = res.data
    org = set_domain_id(org, orgname)    

    return this.make$(args.ZONE_BASE + 'org').data$(org)
  }

  async function save_org(this: any, msg: any) {
    const ent: any = msg.ent
    const orgname = ent.id

    const body = {
      org: orgname,

      name: ent.login,
      billing_email: ent.billing_email,
      company: ent.company,
      email: ent.email,
      twitter_username: ent.twitter_username,
      location: ent.location,
      description: ent.description,
      has_organization_projects: ent.has_organization_projects,
      has_repository_projects: ent.has_repository_projects,
      default_repository_permission: ent.default_repository_permission,
      members_can_create_repositories: ent.members_can_create_repositories,
      members_can_create_internal_repositories: ent.members_can_create_internal_repositories,
      members_can_create_private_repositories: ent.members_can_create_private_repositories,
      members_can_create_public_repositories: ent.members_can_create_public_repositories,
      members_allowed_repository_creation_type: ent.members_allowed_repository_creation_type, // this parameter will be replaced in favor of more granular permissions.
      members_can_create_pages: ent.members_can_create_pages,
      members_can_create_public_pages: ent.members_can_create_public_pages,
      members_can_create_private_pages: ent.members_can_create_private_pages,
      blog: ent.blog
    }

    const res = await args.octokit.rest.orgs.update(body)

    let org: any = res.data
    org = set_domain_id(org, orgname)    

    return this.make$(args.ZONE_BASE + 'org').data$(org)
  }

  return {
    load_org,
    save_org,
  }
}

export default organization
