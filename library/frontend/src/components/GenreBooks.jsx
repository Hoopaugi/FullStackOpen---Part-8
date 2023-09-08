import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';

import { GENRE_BOOKS } from '../queries';

const GenreBooks = ({ genre }) => {
  const result = useQuery(GENRE_BOOKS, { variables: { genre: genre } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {
          books.map((book) => (
            <tr key={book.id}>
              <td><Link to={`/books/${book.id}`}>{book.title}</Link></td>
              <td><Link to={`/authors/${book.author.id}`}>{book.author.name}</Link></td>
              <td>{book.published}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default GenreBooks
