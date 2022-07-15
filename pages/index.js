import React, { useEffect, useState } from 'react';
import Link from 'next/link'




function GameList() {
    const [allGamesList, setAllGamesList] = useState([]);

    async function fetchGameList() {
        const res = await fetch("/api/games/list/all")
        const data = await res.json()
        setAllGamesList(data);

    }

    // This run once the component is mounted
    useEffect(() => {
        fetchGameList();
    },[])

    return (
        <div>
            <ul>
                {
                    allGamesList.map((x) => {
                        return <li><Link href={`games/${x.id}`}>{`Jogo: ${x.name}`}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}



export default function HomePage() {
    return (
        <div>
            <h1>Hello World!</h1>
            <p>Esta é apenas uma página MENU de teste. Caso queira ser redirecionado para a página 2 <Link href="/pagina2">cliquei aqui</Link></p>
            <p>Você também pode clicar em qualquer uma dessas páginas dinâmicas:</p>
            <GameList />
        </div>
    )
}