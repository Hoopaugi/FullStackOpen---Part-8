import { Link } from 'react-router-dom';

const Authors = ({ authors }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {
          authors.map((author) => (
            <tr key={author.id}>
              <td><Link to={`/authors/${author.id}`}>{author.name}</Link></td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Authors
