import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { GENRE_BOOKS } from '../queries'
import Genres from '../components/Genres'
import Books from "../components/Books"

const BooksPage = ({ books }) => {
  const [genre, setGenre] = useState('')

  const { loading, error, data } = useQuery(GENRE_BOOKS, { variables: { genre: genre } })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  const genreBooks = data.allBooks

  return (
    <>
      <h2>books</h2>
      {
        genre ? <Books books={genreBooks} /> : <Books books={books} />
      }
      <Genres setGenre={setGenre} />
    </>
  )
}

export default BooksPage
