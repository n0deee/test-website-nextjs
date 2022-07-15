import React, {useState, useEffect} from "react"
import { useRouter } from "next/router"

const router = useRouter()


function GameInfo() {
    const [gameName, setGameName] = useState("Carregando...")
    const [gameDescription, setGameDescription] = useState("Carregando...")

    async function fetchGameName() {
        const res = await fetch(`/api/games/list/${router.query.id}`)
        const data = await res.json()
        setGameName(data.name)
        setGameDescription(data.description)
    }

    useEffect(() => {
        fetchGameName();
    }, [])

    return (
        <div>
            <h1>Título: {gameName}</h1>
            <h2>Descrição: {gameDescription}</h2>
        </div>
    )
}

export default function Main(request, response) {
    return <GameInfo/>
}

