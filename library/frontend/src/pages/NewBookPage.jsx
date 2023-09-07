import NewBookForm from '../components/NewBookForm'

const NewBookPage = ({ notify }) => {
  return (
    <>
      <h2>add new book</h2>
      <NewBookForm notify={notify} />
    </>
  )
}

export default NewBookPage
