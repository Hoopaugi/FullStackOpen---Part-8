import { Link } from 'react-router-dom';

const NavigationBar = () => {
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
        <li>
          <Link to="/add">Add Book</Link>
        </li>
      </ul>
    </>
  )
}

export default NavigationBar
