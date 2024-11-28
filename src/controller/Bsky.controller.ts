import { agent } from "../api/agent.ts";
import * as BaseController from "./Base.controller.ts";

const ACTOR_NAME = "mynerva0x13.bsky.social";

export const BskyController = () => {
    const getError = (error: any, res: any) => {
        console.error("Error fetching followers:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch followers.",
        });
    };

    const fetchFollowersData = async (actor: string) => {
        return agent.app.bsky.graph.getFollowers({ actor });
    };

    return {
        async getTotalFollower(req: any, res: any) {
            try {
                await BaseController.checkCredential(req, res);

                const response = await fetchFollowersData(ACTOR_NAME);

                res.json({ success: true, data: response.data.followers.length });
            } catch (error) {
                getError(error, res);
            }
        },

        async fetchFollowers(req: any, res: any) {
            try {
                await BaseController.checkCredential(req, res);

                const response = await fetchFollowersData(ACTOR_NAME);

                res.json({ success: true, data: response.data });
            } catch (error) {
                getError(error, res);
            }
        },
    };
};
