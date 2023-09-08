import { useQuery } from '@apollo/client'

import { GENRES } from '../queries'

const Genres = ({ setGenre }) => {
  const { loading, error, data } = useQuery(GENRES)

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  const genres = data.genres

  return (
    <>
      {
        genres.map(genre => <button key={genre} onClick={() => setGenre(genre)} >{genre}</button>)
      }
      <button onClick={() => setGenre('')} >All</button>
    </>
  )
}

export default Genres
