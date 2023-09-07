const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const Author = require('../models/Author')
const Book = require('../models/Book')
const User = require('../models/User')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author })

        return Book.find({ genres: args.genre, author: author }).populate('author')
      } else if(args.author) {
        const author = await Author.findOne({ name: args.author })

        return Book.find({ author: author }).populate('author')
      } else if(args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: async () => Author.find({}).populate('books'),
    findAuthor: async (root, args) => {
      return Author.findById(args.id).populate('books')
    },
    findBook: async (root, args) => {
      return Book.findById(args.id).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    // TODO: book author relationship
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if(!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()

      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      try {
        author.books.push(book)

        await author.save()

      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = Author.findOne({ name: args.author })

      if (!author) {
        return null
      }

      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }

      return author
    },
    createUser: async (root, args) => {
      try {
        const user = await User.create({ username: args.username })

        return user
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })

      return author.books.length
    },
  }
}

module.exports = resolvers
