import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { SET_BIRTHDAY, ALL_AUTHORS } from '../queries'

const BirthdayForm = ({ name, notify }) => {
  const [born, setBorn] = useState('')

  const [ setBirthday ] = useMutation(SET_BIRTHDAY, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ],
    onError: async (error) => {
      const message = error.graphQLErrors[0].extensions.error.message
      console.error('error occured:', message)
      notify(message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    setBirthday({
      variables: {
        name,
        born: Number(born)
      },
      onSuccess: (data) => {
        console.log(data)
        notify('Added birthday')
      }
    })

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
