import { pathToRegexp } from "path-to-regexp";
import { type Handler } from "../../handlers";
export const LeaderboardHandlerRegexp = pathToRegexp("");

const LeaderboardHandler: Handler = (req: Request) => {
	return new Response("i");
};

export default LeaderboardHandler;
