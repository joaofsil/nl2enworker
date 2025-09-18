/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { handleSearchRequest }     from './handlers/handleSearchRequest';
import { handleTranslateRequest }  from './handlers/handleTranslateRequest';
import { handleSaveRequest }       from './handlers/handleSaveRequest';
import { handleLoadMenuRequest }   from './handlers/handleLoadMenuRequest';
import { handleTravelPlanRequest } from './handlers/handleTravelPlanRequest';
import { jsonResponse }            from './utils/jsonResponse';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// Basic routing
		if (url.pathname === '/api/search' && request.method === 'GET') {
			return handleSearchRequest(env, request);
		}
		if (url.pathname === '/api/translate' && request.method === 'POST') {
			return handleTranslateRequest(env, request);
		}
		if (url.pathname === '/api/save' && request.method === 'POST') {
			return handleSaveRequest(env, request);
		}
		if (url.pathname === '/api/loadmenu' && request.method === 'GET') {
			return handleLoadMenuRequest(env, request);
		}
		if (url.pathname === '/api/travel_plan' && request.method === 'GET') {
			return handleTravelPlanRequest(env, request);
		}

		if (url.pathname === '/') {
			return jsonResponse({message: 'API Server is running. Try making a request to /api/search, /api/translate, /api/save, /api/loadmenu, or /api/travel_plan'});
		}

		return jsonResponse({message: 'Not Found'}, { status: 404 });
	},
};
