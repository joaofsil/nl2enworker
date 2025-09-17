// Helper function to create a JSON response.
export const jsonResponse = (data, options = {}) => {
	const headers = { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", ...options.headers };
	return new Response(JSON.stringify(data), { ...options, headers });
};