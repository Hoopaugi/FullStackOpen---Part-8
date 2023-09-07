const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')

require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { authors, books } = require('./seeds')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const main = async () => {
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

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)

          const currentUser = await User.findById(decodedToken.id)

          return { currentUser }
        }
      }, 
    })

    console.log(`Server ready at ${url}`)
  } catch (error) {
    console.log('error starting apollo server:', error.message)
  }
  
}

main()
