import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import AuthorsPage from './pages/AuthorsPage'
import AuthorPage from './pages/AuthorPage';
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import NewBookPage from './pages/NewBookPage';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AuthorPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/add" element={<NewBookPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
