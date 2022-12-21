import { pathToRegexp } from "path-to-regexp";
import { type Handler } from "../../handlers";
import jsonResponse from "../../../util/jsonr";

export const playersRegexp = pathToRegexp("/api/players");

const playersHandler: Handler = (req: Request) => {
	const players = [];

	return jsonResponse({
		players,
	});
};

export default playersHandler;
