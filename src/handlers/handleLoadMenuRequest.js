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
    const { results } = await env.translationsdb.prepare(
            "SELECT * FROM Songs"
        )
        //.bind("Bs Beverages")
        .run();

    return jsonResponse({ results });
}