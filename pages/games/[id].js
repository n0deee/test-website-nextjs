import React, {useState, useEffect} from "react"
import { useRouter } from "next/router"



function GameInfo() {
    const [gameName, setGameName] = useState("Carregando...")
    const [gameDescription, setGameDescription] = useState("Carregando...")
    const router = useRouter()

    async function fetchGameName() {
        const res = await fetch(`/api/games/list/${router.query.id}`)
        const data = await res.json()
        setGameName(data.name)
        setGameDescription(data.description)
    }

    useEffect(() => {
        // Return if Query Id is undefined
        if (!router.query.id) return

        // Fetch the current game data
        fetchGameName();
    }, [router.query.id])

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

