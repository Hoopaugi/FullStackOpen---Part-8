import { useQuery } from '@apollo/client'

import { ME } from '../queries';
import GenreBooks from '../components/GenreBooks';

const UserPage = ({ token }) => {
  const result = useQuery(ME)

  if (result.loading) {
    return <div>loading...</div>
  }

  const user = result.data.me

  return (
    <>
      <h2>{user.username}</h2>
      <h3>Recommendations</h3>
      <p>Recommendations based on your favorite genre <b>{user.favoriteGenre}</b></p>
      <GenreBooks genre={user.favoriteGenre} />
    </>
  )
}

export default UserPage
