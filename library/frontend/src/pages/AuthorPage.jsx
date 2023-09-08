import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FIND_AUTHOR } from '../queries';
import BirthdayForm from '../components/BirthdayForm';

const AuthorPage = ({ token, notify }) => {
  const { id } = useParams();

  const result = useQuery(FIND_AUTHOR, { variables: { findAuthorId: id } })

  if (result.loading) {
    return <div>loading...</div>
  }

  const author = result.data.findAuthor

  return (
    <>
      <h2>{author.name}</h2>
      {
        author.born ? <p>Born {author.born}</p> : 
        token ? <BirthdayForm name={author.name} notify={notify} /> :
        <p>Login to set birthday</p>
      }
      <h3>Books</h3>
      {
        author.books.map(book => <li key={book.id}><Link to={`/books/${book.id}`}>{book.title}</Link><span> published {book.published}</span></li>)
      }
    </>
  )
}

export default AuthorPage
