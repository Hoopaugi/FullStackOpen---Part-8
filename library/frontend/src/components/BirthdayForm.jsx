import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { SET_BIRTHDAY, ALL_AUTHORS } from '../queries'

const BirthdayForm = ({ name }) => {
  const [born, setBorn] = useState('')

  const [ setBirthday ] = useMutation(SET_BIRTHDAY, { refetchQueries: [ { query: ALL_AUTHORS } ] })

  const submit = async (event) => {
    event.preventDefault()

    setBirthday({ variables: { name, born: Number(born) } })

    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input
          placeholder='Born'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type="submit">Set birthday</button>
    </form>
  )
}

export default BirthdayForm
