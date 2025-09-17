import { jsonResponse } from '../utils/jsonResponse';

async function call_ai_agent(env, params) {
	const duration      = params.get('duration');
	const escapeType    = params.get('escapeType');
	const accommodation = params.get('accommodation');

	const res = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
		messages: [
			{"role": "user", "content": "I want to go on a small vacation and I need your help in planning the trip. Please suggest a travel plan for a duration of " + duration + " to visit " + escapeType + " and I for accommodations I want suggestions for " + accommodation + " in Portugal and for a budget of 2000€"}
		]
	});

	return (res);
}

/**
 * Handles the logic for the /api/travel_plan endpoint.
 * @param {Request} request The incoming request object.
 * @returns {Response} The response to send back.
 */
export async function handleTravelPlanRequest(env, request) {
	const url = new URL(request.url);
	const { searchParams } = url;

	// Get the parameters from the query string
	const duration = searchParams.get('duration');
	const escapeType = searchParams.get('escapeType');
	const accommodation = searchParams.get('accommodation');

	// Basic validation to ensure all required parameters are present
	if (!duration || !escapeType || !accommodation) {
		return jsonResponse( { message: 'Missing required parameters. Please provide duration, escapeType, and accommodation.' }, { status: 400 });
	}

	console.log('Received travel preferences:', { duration, escapeType, accommodation });

	const json_plan = await call_ai_agent(env, searchParams);
	const plan = json_plan.response;

	return jsonResponse({
		message: "Here is your suggested itinerary for your upcoming escape. Enjoy your vacation. " + plan
	});
}