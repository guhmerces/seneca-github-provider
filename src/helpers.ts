function set_domain_id(ent: { [key: string]: any }, newID: any) {
  return {
    ...ent,
    github_id: ent.id,
    id: newID,
  }
}

export { set_domain_id }