import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from "../queries"
import Authors from "../components/Authors"

const AuthorsPage = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <>
      <h2>authors</h2>
      <Authors authors={authors} />
    </>
  )
}

export default AuthorsPage
