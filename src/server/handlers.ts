import playerProfileHandler, {
	playerProfileRegex,
} from "./handlers/GET/playerProfile";
import playersHandler, { playersRegexp } from "./handlers/GET/players";

export type Handler = (
	request: Request,
	params?: RegExpExecArray,
) => Response | Promise<Response>;

export type Method =
	| "GET"
	| "HEAD"
	| "POST"
	| "PUT"
	| "DELETE"
	| "CONNECT"
	| "OPTIONS"
	| "TRACE"
	| "PATCH";

const handlers = new Map<{ path: RegExp; methods?: Method[] }, Handler>();

export default handlers;

handlers.set({ path: playersRegexp, methods: ["GET"] }, playersHandler);
handlers.set(
	{ path: playerProfileRegex, methods: ["GET"] },
	playerProfileHandler,
);
