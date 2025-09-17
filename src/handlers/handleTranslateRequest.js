import { jsonResponse } from '../utils/jsonResponse';


async function callAIAgent(env, query) {
    const res = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
            {
                "role": "user", "content": "I want the lyrics for the song " +
                    query +
                    ". Translate the lyrics to english and respond to me with nothing but the translation."
            }
        ]
    });

    return (res);
}


/**
 * Handles song translation requests.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */
export async function handleTranslateRequest(env, request) {
    const url = new URL(request.url);
    const song = url.searchParams.get('song');

    if (!song) {
        return jsonResponse({ message: 'Missing songId parameter.' }, { status: 400 });
    }

    // Placeholder for translation logic.
    console.log(`Translating song with ID: ${song}`);

    const json_song = await callAIAgent(env, song);
    const translation = json_song.response;
/*
    const originalLyrics = "Dit is een voorbeeldtekst.";
    const translatedLyrics = "This is an example text.";
*/

    return jsonResponse({ 
        message: translation
    });
}