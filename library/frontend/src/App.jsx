import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApolloClient, useSubscription, useQuery } from '@apollo/client';

import Notification from './components/Notification';
import NavigationBar from './components/NavigationBar';
import AuthorsPage from './pages/AuthorsPage'
import AuthorPage from './pages/AuthorPage';
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import NewBookPage from './pages/NewBookPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  const { loading, error, data } = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded

      notify(`New book "${book.title}" added`)

      updateCache(client.cache, { query: ALL_BOOKS }, book)
    }
  })

  const logout = () => {
    setToken(null)

    localStorage.clear()

    client.resetStore()

    notify('Logged out')
  }

  const notify = (message) => {
    console.log('notify:', message)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Something went wrong</div>
    )
  }

  const books = data.allBooks

  return (
    <BrowserRouter>
      <NavigationBar token={token} logout={logout} />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/me" element={<UserPage token={token} />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:id" element={<AuthorPage token={token} notify={notify} />} />
        <Route path="/books" element={<BooksPage books={books} />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} notify={notify} />} />
        <Route path="/add" element={<NewBookPage notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
