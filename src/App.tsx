import { useState } from 'react'
import hogcloudLogo from './assets/images/hogcloud-logo1.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://learning.hogcloud.net" target="_blank">
          <img src={hogcloudLogo} className="logo" alt="HogCloud logo" />
        </a>
      </div>
      <h1>HogCloud</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Sample Web App
        </p>
      </div>
    </>
  )
}

export default App
