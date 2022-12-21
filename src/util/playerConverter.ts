import { components as BeatLeader } from "../types/beatleader";
import { components as ScoreSaber } from "../types/scoresaber";

export default function playerConverter(
	player: BeatLeader["schemas"]["Player"],
): Partial<ScoreSaber["schemas"]["Player"]> {
	return {
		id: player.id,
		name: player.name,
		profilePicture: player.avatar,
		// @ts-expect-error outdated scoresaber swagger
		bio: "",
		country: player.country,
		pp: player.pp,
		rank: player.rank,
		countryRank: player.countryRank,
		role: null,
		badges: null,
		permissions: 0,
		banned: false,
		inactive: false,
		scoreStats: {
			totalScore: player.scoreStats.totalScore,
			totalRankedScore: player.scoreStats.totalRankedScore,
			averageRankedAccuracy: player.scoreStats.averageRankedAccuracy * 100,
			totalPlayCount: player.scoreStats.totalPlayCount,
			rankedPlayCount: player.scoreStats.rankedPlayCount,
			replaysWatched: player.scoreStats.watchedReplays,
		},
	};
}
