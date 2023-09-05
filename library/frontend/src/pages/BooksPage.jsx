import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
import Books from "../components/Books"

const BooksPage = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <>
      <h2>books</h2>
      <Books books={books} />
    </>
  )
}

export default BooksPage
