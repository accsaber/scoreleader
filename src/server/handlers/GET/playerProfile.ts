import { pathToRegexp } from "path-to-regexp";
import { Handler } from "../../handlers";
import jsonResponse from "../../../util/jsonr";
import playerConverter from "../../../util/playerConverter";
import { components as BeatLeader } from "../../../types/beatleader";
import json from "../../../util/jsonf";
import ErrorResponse from "../../../util/error";

export const playerProfileRegex =
	/^\/api\/player\/(?<playerId>[0-9]+?)\/(?<scale>full|basic)$/;

const playerProfileHandler: Handler = async (req: Request) => {
	const { pathname } = new URL(req.url);

	const [, playerId, profileType] = playerProfileRegex.exec(pathname);

	const playerData = await json<BeatLeader["schemas"]["PlayerResponseFull"]>(
		`https://api.beatleader.xyz/player/${playerId}`,
	).catch((error) => {
		throw new ErrorResponse(error.status ?? 500, error.statusText ?? "Error");
	});

	const player = playerConverter(playerData);

	if (profileType === "basic") {
		player.scoreStats = null;
		player.badges = null;
	}

	return jsonResponse(player);
};

export default playerProfileHandler;
