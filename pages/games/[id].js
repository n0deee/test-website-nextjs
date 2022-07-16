import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from 'axios'

async function fetchGameDetails(gameid) {
    return (await axios.get(`http://localhost:3000/api/games/list/${gameid}`)).data
}

function GameInfo(props) {
    return (
        <div>
            <h1>Título: {props.gamedetails.name}</h1>
            <h2>Descrição: {props.gamedetails.description}</h2>
            <img src="" />
        </div>
    )
}

export default function Main(props) {
    return <GameInfo gamedetails={props.gamedetails} />
}

export async function getStaticProps(context) {
    const id = context.params.id
    const gamedetails = await fetchGameDetails(id);

    return {
        props: {
            id,
            gamedetails
        },
        revalidate: 60 * 2 // 2 minues
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            // empty for testing
        ],
        fallback: 'blocking' // false or 'blocking'
    };
}