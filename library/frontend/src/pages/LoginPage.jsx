import LoginForm from '../components/LoginForm';

const LoginPage = ({ setError, setToken }) => {
  return (
    <>
      <h2>Login</h2>
      <LoginForm setToken={setToken} setError={setError}/>
    </>
  )
}

export default LoginPage
