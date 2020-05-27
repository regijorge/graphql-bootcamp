import { GraphQLServer } from 'graphql-yoga'

// Type definitins (schema)
const typeDefs = `
    type Query {
        me: User
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '123',
                name: 'Jorge',
                email: 'test@gmail.com',
                age: 27
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