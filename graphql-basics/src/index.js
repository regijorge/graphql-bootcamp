import { GraphQLServer } from 'graphql-yoga'

// Demo data
const users = [
    {
        id: 1,
        name: 'Regi',
        email: 'regi@domain.com',
        age: 27
    },
    {
        id: 2,
        name: 'Jorge',
        email: 'jorge@domain.com',
    }
]

const posts = [
    {
        id: 1,
        title: 'Udemy cource',
        body: 'Learn something cool'
    },
    {
        id: 2,
        title: 'Graphql 101',
        body: 'Learn how GraphQL works, this is beautifull!'
    }
]

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
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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