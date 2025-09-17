import { jsonResponse } from '../utils/jsonResponse';


async function callAIAgent(env, query) {
    const res = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
            {
                "role": "user", "content": "I want the lyrics for the song " + 
                query + 
                ". Find the lyrics and respond to me with nothing but the lyrics."
            }
        ]
    });

    return (res);
}
    

/**
 * Handles song search requests.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */


export async function handleSearchRequest(env, request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (!query) {
        return jsonResponse({ message: 'Missing search query parameter "q".' }, { status: 400 });
    }

    // Placeholder for search logic.
    console.log(`Searching for song: ${query}`);

    const json_song = await callAIAgent(env, query);
    const searchResults = json_song.response;

    /*
    const searchResults = [
        { id: '123', title: `${query} - Example Song`, artist: 'Example Artist' }
    ];
    */

    return jsonResponse({ 
        message: `Search results for "${query}".`,
        results: searchResults
    });
}