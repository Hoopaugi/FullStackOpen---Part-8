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
      author
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
      title
      published
      author
      genres
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorbyId($id: String!) {
    findAuthor(
      id: $id
    ) {
      id
      name
      born
      bookCount
      books {
        id
        title
        published
      }
    }
  }
`

export const FIND_BOOK = gql`
  query findBookbyId($id: String!) {
    findBook(
      id: $id
    ) {
      id
      title
      author
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