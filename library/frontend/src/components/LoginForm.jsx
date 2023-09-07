import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { LOGIN } from '../queries'

const LoginForm = ({ notify, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [ login, result ] = useMutation(LOGIN, {
    onError: async (error) => {
      console.error('error occured:', error.graphQLErrors)

      notify(error.graphQLErrors[0].message)

      setPassword('')
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value

      setToken(token)

      localStorage.setItem('currentUserToken', token)

      notify('Logged in')

      navigate('/')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input
            placeholder='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm