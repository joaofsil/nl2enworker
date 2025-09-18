import { jsonResponse } from '../utils/jsonResponse';


async function callAIAgent(env, query) {
    const res = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
            {
                "role": "user", "content": "I want to translate the following text in dutch to english. " +
                "Translate the text to english and respond to me with nothing but the translation. The text is:" +
                    query
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
    const song = await request.json();

    if (!song.title || !song.author || !song.song) {
        return jsonResponse({ message: 'Missing song parameters. Make sure to provide all info about the song.' }, { status: 400 });
    }

    // Placeholder for translation logic.
    console.log(`Translating song with ID: ${song.title}`);

    const json_song = await callAIAgent(env, song.song);
    const translation = json_song.response;
/*
    const originalLyrics = "Dit is een voorbeeldtekst.";
    const translatedLyrics = "This is an example text.";
*/

    return jsonResponse({ 
        message: "The translation of the song is complete.",
        translation: translation
    });
}