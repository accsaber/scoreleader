import handleRequest from "./server/server";

const server = Bun.serve({
	fetch(request) {
		return handleRequest(request);
	},
});

console.log(`server listening on http://${server.hostname}:${server.port}`);
