import { Link } from 'react-router-dom';

const NavigationBar = ({ token, logout }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        {
          token === null ?
          <li>
            <Link to="/login">Login</Link>
          </li> :
          <>
            <li>
              <Link to="/add">Add Book</Link>
            </li>
            <li>
              <Link to="/me">Recommended</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        }
      </ul>
    </>
  )
}

export default NavigationBar
