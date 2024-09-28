import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-center text-cyan-500 bg-gray-300 p-4">
        Hello Vite <img src={viteLogo} alt="Vite Logo" className="h-4 inline" /> + <img src={reactLogo} alt="React Logo" className="h-4 inline" />
      </div>
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </div>
    </>
  );
}

export default App
