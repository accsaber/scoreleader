import handleRequest from "./server/server";

Bun.serve({
	fetch(request) {
		return handleRequest(request);
	},
});
