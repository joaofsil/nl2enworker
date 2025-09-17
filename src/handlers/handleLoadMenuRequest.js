import { jsonResponse } from '../utils/jsonResponse';

/**
 * Handles loading saved songs for a menu.
 * @param {object} env - The environment object.
 * @param {Request} request - The incoming request object.
 * @returns {Response} The response to send back.
 */
export async function handleLoadMenuRequest(env, request) {
    // Placeholder for loading saved songs.
    console.log('Loading saved songs for menu.');
    const savedSongs = [
        { id: 1, title: 'Saved Song 1', artist: 'Artist 1' },
        { id: 2, title: 'Saved Song 2', artist: 'Artist 2' },
    ];
    return jsonResponse({ savedSongs });
}