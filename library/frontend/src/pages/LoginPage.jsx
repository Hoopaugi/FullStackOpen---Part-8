import LoginForm from '../components/LoginForm';

const LoginPage = ({ notify, setToken }) => {
  return (
    <>
      <h2>Login</h2>
      <LoginForm setToken={setToken} notify={notify} />
    </>
  )
}

export default LoginPage
