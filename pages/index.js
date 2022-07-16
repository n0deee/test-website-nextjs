import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';


async function fetchGameList() {
    return (await axios.get("http://localhost:3000/api/games/list/all")).data
}

function GamesList(props) {
    const [allGamesList, setAllGamesList] = useState([]);

    return (
        <div>
            <ul>
                {
                    props.gamelist.map((x) => {
                        if (x.hidden) return
                        return <li><Link href={`games/${x.id}`}>{`Jogo: ${x.name}`}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}



export default function HomePage(props) {
    return (
        <div>
            <h1>Hello World!</h1>
            <p>Esta é apenas uma página MENU de teste. Caso queira ser redirecionado para a página 2 <Link href="/page2">cliquei aqui</Link></p>
            <p>Você também pode clicar em qualquer uma dessas páginas dinâmicas:</p>
            <GamesList gamelist={props.gamelist} />
        </div>
    )
}

export async function getStaticProps() {
    // Fetch API data with axios
    const gamelist = await fetchGameList()

    return {
        props: {
            gamelist    
        },
        revalidate: 60
    }
}