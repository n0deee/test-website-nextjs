import React, {useState, useEffect} from "react"
import { useRouter } from "next/router"

function GameName() {
    const [gameName, setGameName] = useState("Carregando...")

    async function fetchGameName() {
        const res = await fetch(`/api/games/list/2`)
        const data = res.json()
        setGameName(data.name)
    }

    useEffect(() => {
        fetchGameName();
    }, [])

    return (
        <div>
            <h2>{gameName}</h2>
        </div>
    )

}

export default function Main(request, response) {
    return <GameName/>
}

