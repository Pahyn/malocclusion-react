import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadForm from './UploadForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UploadForm></UploadForm>
    </>
  )
}

export default App
