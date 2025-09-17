import { jsonResponse } from '../utils/jsonResponse';

/**
 * Handles saving a song.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */
export async function handleSaveRequest(env, request) {
    try {
        const song = await request.json();

        if (!song.title || !song.artist) {
            return jsonResponse({ message: 'Missing song title or artist in request body.' }, { status: 400 });
        }

        // Placeholder for save logic.
        console.log('Saving song:', song);

        return jsonResponse({ message: 'Song saved successfully.', song }, { status: 201 });
    } catch (error) {
        return jsonResponse({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }
}