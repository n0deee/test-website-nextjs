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
            {
                props.gamelist.map((x) => {
                    if (x.hidden) return
                    return <a href={`games/${x.id}`}><p className={props.className}>{`Jogo: ${x.name}`}</p></a>
                    //<Link href={`games/${x.id}`}>
                })
            }
            <style jsx> {`
                   p {
                     background-color: lightblue;
                     color: white;
                     width: 20%;
                     border: 3px solid lightblue;
                     border-radius: 12px;
                     padding: 10px;
                     text-align: center;
                     margin: 10px auto;
                     text-decoration: underline;
                     cursor: pointer;
                   }
                `}
            </style>
        </div>
    )
}



export default function HomePage(props) {
    return (
        <div className="container">
            <h1 className="title textcenter">Hello World!</h1>
            <p className="textcenter">Esta é apenas uma página MENU de teste. Caso queira ser redirecionado para a página 2 <Link href="/page2">cliquei aqui</Link></p>
            <p className="textcenter">Você também pode clicar em qualquer uma dessas páginas dinâmicas:</p>
            <p><br/></p>
            <GamesList className="textcenter" gamelist={props.gamelist} />
            <style jsx global> {`
            body {
                background-color: white;
            }

            .title {
                background-color: #3ea87a;
                color: white;
                margin: auto;
                width: 80%;
                border: 3px solid #3ea87a;
                border-radius: 12px;
                padding: 10px;
            }

            .textcenter {
                text-align: center
            }

            `}</style>
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