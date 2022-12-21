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
