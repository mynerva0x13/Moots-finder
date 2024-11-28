// HomeController.ts
import { agent,userAuthentication } from "../api/agent.ts";
import { decrypt } from "../api/crypto.ts";
import fs from "node:fs";
import * as BaseController from "./Base.controller.ts"
export const HomeController = () => {
    return {
        async main(req, res) {
            console.log(agent)
            const feeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
                limit: 10,
            });
            res.render('index', feeds); // Assuming you're using EJS for views
        },

        async dashboard(req, res) {
            
        const logCred = await BaseController.checkCredential(req, res);
        console.log(logCred)
        res.render('main', {
            title: "Moots-Analytics",
            link: "dashboard/dashboard.ejs",
            background: "bg-black-alt ",
            item: null
        });

        }
    };
};
