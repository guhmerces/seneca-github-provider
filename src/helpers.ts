function set_domain_id(ent: { [key: string]: any }, newID: any) {
  return {
    ...ent,
    github_id: ent.id,
    id: newID,
  }
}

function split_repo_id(repo: string) {
  return repo.split("/")
}

export {
  set_domain_id,
  split_repo_id
}