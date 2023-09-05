import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';

import { FIND_BOOK } from '../queries';

const BookPage = () => {
  const { id } = useParams();

  const result = useQuery(FIND_BOOK, { variables: { id } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const book = result.data.findBook

  return (
    <>
      <h2>{book.title}</h2>
      <p>Authored by {book.author} in {book.published}</p>
      <ul>
        {
          book.genres.map(genre => <li key={genre}>{genre}</li>)
        }
      </ul>
    </>
  )
}

export default BookPage
