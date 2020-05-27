import { GraphQLServer } from 'graphql-yoga'

// Type definitins (schema)
const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        greeting(name: String): String!
        grades: [Int!]!
        me: User
        post: Post
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