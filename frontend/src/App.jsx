import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [gateways, setGateways] = useState([]);

    useEffect(() =>{
        async function fetchData() {
            const data = await fetch('http://localhost:3000/gateways')
            const result = await data.json();
            setGateways(result)
        }

        fetchData()
    }, [])

  return (
    <>
        <ul>
            {
                gateways.map((el, i) => <li key={i}>{el.name}</li>)
            }
        </ul>
    </>
  )
}

export default App
