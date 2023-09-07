import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBookForm = ({ notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS } 
    ],
    onError: async (error) => {
      const message = error.graphQLErrors[0].extensions.error.message
      console.error('error occured:', message)
      notify(message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title, author, published: Number(published), genres
      },
      onSuccess: (data) => {
        console.log(data)
        notify('Added')
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <input
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <input
          placeholder='Published'
          type="number"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
      </div>
      <div>
        <input
          placeholder='Genre'
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <button onClick={addGenre} type="button">
          add genre
        </button>
      </div>
      <div>genres: {genres.join(' ')}</div>
      <button type="submit">create book</button>
    </form>
  )
}

export default NewBookForm