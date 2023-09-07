import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';

import { FIND_BOOK } from '../queries';

const BookPage = () => {
  const { id } = useParams();

  const result = useQuery(FIND_BOOK, { variables: { findBookId: id } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const book = result.data.findBook

  return (
    <>
      <h2>{book.title}</h2>
      <p>Authored by <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link> in {book.published}</p>
      <h3>Genres</h3>
      <ul>
        {
          book.genres.map(genre => <li key={genre}>{genre}</li>)
        }
      </ul>
    </>
  )
}

export default BookPage
