import { jsonResponse } from '../utils/jsonResponse';
const  { createHash   } = require('crypto');

async function dbStoreSong(env, song) {
    const songid = createHash('sha256').update(song.song).digest('hex');
    console.log('song hash:' + songid);
    const {results} = await env.translationsdb.prepare(
        "insert into songs (songid, title, author, song, translation) values (" +
        songid, song.title, song.author, song.song, song.translation +
        ")"
    )
    .run();
    console.log('The query ran. Results are ' + results);

    return results;
}

/**
 * Handles saving a song.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */
export async function handleSaveRequest(env, request) {
    try {
        const song = await request.json();

        if (!song.title || !song.author || !song.song || !song.translation) {
            return jsonResponse({ message: 'Missing song parameters. Make sure to provide all info about the song.' }, { status: 400 });
        }

        // Placeholder for save logic.
        console.log('Saving song:', song);

        const save = await dbStoreSong(env, song);
        console.log('song is saved');

        return jsonResponse({ message: 'Song saved successfully.', save }, { status: 201 });
    } catch (error) {
        return jsonResponse({ message: 'Invalid JSON in request body.' + error }, { status: 400 });
    }
}