function set_domain_id(ent: { [key: string]: any }, newID: any) {
  return {
    ...ent,
    github_id: ent.id,
    id: newID,
  }
}

function split_repo_id(repo_id: string) {
  const [ownername, reponame] = repo_id.split('/')
  return {
    owner: ownername,
    repo: reponame
  }
}

export {
  set_domain_id,
  split_repo_id
}