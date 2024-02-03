import { useState } from 'react'
import Board from './Components/Board'
import FirstPage from './Components/FirstPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FirstPage/>
    </>
  )
}

export default App
