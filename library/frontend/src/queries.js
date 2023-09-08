import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author {
        id
        name
        born
      }
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      id
      title
      author {
        id
        name
        born
      }
      published
      genres
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthor($findAuthorId: String!) {
    findAuthor(
      id: $findAuthorId
    ) {
      id
      name
      born
      bookCount
      books {
        id
        title
        published
        genres
      }
    }
  }
`

export const FIND_BOOK = gql`
  query findBook($findBookId: String!) {
    findBook(
      id: $findBookId
    ) {
      id
      title
      author {
        id
        name
        born
      }
      published
      genres
    }
  }
`

export const SET_BIRTHDAY = gql`
  mutation setBirthday($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GENRE_BOOKS = gql`
  query genreBooks($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      published
      author {
        id
        name
        born
      }
      genres
    }
  }
`

export const ME = gql`
  query Me {
    me {
      username
      id
      favoriteGenre
    }
  }
`
