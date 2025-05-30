import { Hono } from 'hono';

const app = new Hono();

app.get('/api/ping', (c) => {
	console.log('Backend /api/ping hit');
	return c.json({ message: 'pong from the backend!' });
});

// A catch-all for any other /api routes to show they are not found on backend
app.all('/api/*', (c) => {
	return c.json({ error: 'API route not found on backend' }, 404);
});

export default {
	async fetch(request, env, ctx) {
		// Send request to Hono
		const honoResponse = await app.fetch(request, env, ctx);
		const url = new URL(request.url);
		// If this was an /api/ request and Hono handled it return it
		if (url.pathname.startsWith('/api/')) {
			if (honoResponse.status !== 404 || (await honoResponse.text()) !== 'Not Found') {
				return honoResponse;
			}
		}
		// Otherwise serve static assets from the built frontend
		return env.ASSETS.fetch(request);
	},
};
