import { GraphQLServer, PubSub, Options } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import { info } from './resolvers/Query'
import { signin, signup } from './resolvers/Mutation'
import { formatError } from 'apollo-errors'

const prisma = new PrismaClient()
const pubsub = new PubSub()

const options: Options = {
  formatError,
}

const resolvers = {
  Query: { info },
  Mutation: { signin, signup },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return { ...request, prisma, pubsub }
  },
})

server.start(options, () => console.log(`Server is running in http://localhost:4000`))
