const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { authors, books, users } = require('./seeds')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const main = async () => {
  // Database
  console.log('connecting to', MONGODB_URI)

  try {
    await mongoose.connect(MONGODB_URI)
  } catch (error) {
    console.log('error connection to MongoDB:', error.message)
  }
  console.log('connected to MongoDB')

  console.log('Seeding users')

  await User.collection.drop()

  await User.createCollection()

  for (const user of users) {
    await User.create({ ...user })
  }

  console.log('Seeding authors')

  await Author.collection.drop()

  await Author.createCollection()

  for (const author of authors) {
    await Author.create({ ...author })
  }

  console.log('Seeding books')

  await Book.collection.drop()

  await Book.createCollection()

  for (const book of books) {
    const author = await Author.findOne({ name: book.author })

    const createdBook = await Book.create({ ...book, author: author })

    author.books.push(createdBook)

    await author.save()
  }

  // Server

  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

main()
