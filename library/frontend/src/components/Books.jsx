import { Link } from 'react-router-dom';

const Books = ({ books }) => {
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
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Books
