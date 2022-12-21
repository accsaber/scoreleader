import handlers, { Handler, Method } from "./handlers";
import ssapi from "../scoresaber-public-api-1.0.0.json" assert { type: "json" };
import ErrorResponse from "../util/error";

const escapeRegex = (string: string) =>
	string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const scoreSaberRoutes = Object.entries(ssapi.paths).map(([path]) => {
	const pathRegex = path
		.split(/\{[a-z]+?\}/gi)
		.map((i) => escapeRegex(i))
		.join(".*?");
	return [new RegExp(`^${pathRegex}$`), path] as [RegExp, string];
});

function findHandler(request: Request): Handler {
	const { pathname } = new URL(request.url);

	for (const [{ path, methods }, handler] of handlers) {
		if (!methods.includes(request.method as Method)) continue;
		if (path.test(pathname)) return handler;
	}
	return () => {
		for (const [route, name] of scoreSaberRoutes) {
			if (route.test(pathname))
				throw new ErrorResponse(501, `Route \`${name}\` not implemented`);
		}
		throw new ErrorResponse(404, "Not Found");
	};
}

export default async function handleRequest(
	request: Request,
	isProduction?: boolean,
) {
	const handler = findHandler(request);
	try {
		return await handler(request);
	} catch (err) {
		if (err instanceof ErrorResponse) {
			return new Response(
				JSON.stringify({ ...err, status: undefined }, undefined, 2),
				{
					status: err.status,
					headers: {
						"content-type": "application/json",
					},
				},
			);
		}
		console.error(`${request.method} ${request.url}`, err);
		if (isProduction) {
			return new Response("Internal Server Error", { status: 500 });
		}
		return new Response(JSON.stringify(err, undefined, 2), {
			headers: {
				"content-type": "application/json",
			},
		});
	}
}
