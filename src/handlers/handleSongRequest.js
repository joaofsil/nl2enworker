import { jsonResponse } from '../utils/jsonResponse';


async function dbSearchSong(env, songid) {
    const res = await env.DB.prepare("select * from songs where songid=?")
    .bind(songid)
    .run();

    return (res);
}
    

/**
 * Handles song search requests.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */


export async function handleSongRequest(env, request) {
    const url = new URL(request.url);
    const songid = url.searchParams.get('song');

    if (!songid) {
        return jsonResponse({ message: 'Missing song query parameter "song".' }, { status: 400 });
    }

    // Placeholder for search logic.
    console.log(`Searching for song: ${songid}`);

    const song = await dbSearchSong(env, songid);

    /*
    const searchResults = [
        { id: '123', title: `${query} - Example Song`, artist: 'Example Artist' }
    ];
    */

    return jsonResponse({ 
        message: `Search results for "${songid}".`,
        results: song
    });
}