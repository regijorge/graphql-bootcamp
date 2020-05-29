const Query = {
  add(parent, args, { db }, info) {
    if (args.numbers.length === 0) {
      return 0
    }

    return args.numbers.reduce((acumulator, currentValue) => {
      return acumulator + currentValue
    })
  },
  greeting(parent, args, { db }, info) {
    if (args.name) {
      return `Hello ${args.name}!`
    } else {
      return 'Hello!'
    }
  },
  grades() {
    return [99, 80, 93]
  },
  me() {
    return {
      id: '123',
      name: 'Jorge',
      email: 'test@gmail.com',
      age: 27
    }
  },
  post() {
    return {
      id: '321',
      title: 'My Blog Post',
      body: 'My blog post content',
      published: true
    }
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
      const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

      return isTitleMatch || isBodyMatch
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments
  }
}

export { Query as default }