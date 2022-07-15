import { useRoute } from 'next/router'
import { gamelist } from '../../../../data/games_list'

var reqCount = 0;

// Handle the requests
export default function handler(req, res) {
    console.log(`RequestCount: ${++reqCount}`)
    
    // Handle GET requests
    if (req.method === 'GET') {
        const gameid = req.query.id

        // Return the list of all games IF query is ALL
        if (gameid == "all") {
            res.status(200).json(gamelist)
        }

        // Return the game with the specific ID
        else {

            try {
                // Try to select the game
                const game = gamelist.find((x) => { return x.id == gameid });
                // Throw an error if the game is null
                if (game == null) throw "Game not found"

                // Respond with the game
                res.status(200).json(game)
            }
            // Return 404 if the game is not found
            catch {

                res.status(400).end();
            }
        }
    }
}