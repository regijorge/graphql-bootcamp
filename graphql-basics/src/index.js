import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'

// Demo data
const users = [{
    id: 1,
    name: 'Regi',
    email: 'regi@domain.com',
    age: 27
}, {
    id: 2,
    name: 'Jorge',
    email: 'jorge@domain.com',
}]

const posts = [    {
    id: 1,
    title: 'Udemy cource',
    body: 'Learn something cool',
    author: 2,
    published: true
}, {
    id: 2,
    title: 'Graphql 101',
    body: 'Learn how GraphQL works, this is beautifull!',
    author: 2
}]

const comments = [{
    id: 'c1',
    text: 'Awesome GraphQL course!',
    author: 1
}, {
    id: 'c2',
    text: 'My comment is here',
    author: 1
}, {
    id: 'c3',
    text: 'Something nice is happening right now!',
    author: 2
}]

// Type definitins (schema)
const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        greeting(name: String): String!
        grades: [Int!]!
        me: User
        post: Post
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((acumulator, currentValue) => {
                return acumulator + currentValue
            })
        },
        greeting(parent, args, ctx, info) {
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email)

            if (emailTaken) {
                throw new Error('email already taken!')
            }

            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            const postExists = posts.some((post) => post.id === args.post && post.published)

            if (!userExists || !postExists) {
                throw new Error('User or post not found')
            }

            const comment = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            comments.push(comment)

            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, gtx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, gtx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is up and running on http://localhost:4000')
})