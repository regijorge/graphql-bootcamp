import { GraphQLServer } from 'graphql-yoga'

// Type definitins (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Jorge Souza'
        },
        age() {
            return 27
        },
        employed() {
            return true
        },
        gpa() {
            return null
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