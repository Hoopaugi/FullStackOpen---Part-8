import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import Notification from './components/Notification';
import NavigationBar from './components/NavigationBar';
import AuthorsPage from './pages/AuthorsPage'
import AuthorPage from './pages/AuthorPage';
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import NewBookPage from './pages/NewBookPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const client = useApolloClient()
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)

    localStorage.clear()

    client.resetStore()

    notify('Logged out')
  }

  const notify = (message) => {
    console.log('notify:', message)
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  return (
    <BrowserRouter>
      <NavigationBar token={token} logout={logout} />
      <Notification message={error} />
      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AuthorPage token={token} notify={notify} />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} notify={notify} />} />
        <Route path="/add" element={<NewBookPage notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
