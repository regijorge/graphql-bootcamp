const Comment = {
  author(parent, args, gtx, info) {
    return db.users.find((user) => {
      return user.id === parent.author
    })
  }
}

export { Comment as default }