import { pathToRegexp } from "path-to-regexp";
import { type Handler } from "../../handlers";
import jsonResponse from "../../../util/jsonr";
import json from "../../../util/jsonf";
import { components as BeatLeader } from "../../../types/beatleader";
import { components as ScoreSaber } from "../../../types/scoresaber";
import playerConverter from "../../../util/playerConverter";

export const playersRegexp = pathToRegexp("/api/players");

const playersHandler: Handler = async (req: Request) => {
	const { pathname, searchParams } = new URL(req.url);
	const playerData = await json<
		BeatLeader["schemas"]["PlayerResponseWithStatsResponseWithMetadata"]
	>(`${pathname.replace(/^\/api/, "")}?${searchParams}`);

	const r = {
		players: playerData.data.map((i) => playerConverter(i)),
		metadata: playerData.metadata,
	};
	return jsonResponse(r);
};

export default playersHandler;
