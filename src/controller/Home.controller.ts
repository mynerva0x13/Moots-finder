// HomeController.ts
// This controller handles rendering the homepage and dashboard functionality.
// It also retrieves popular feed generators from the BlueSky API and ensures user credentials are valid before rendering the dashboard page.

import { agent, userAuthentication } from "../api/agent.ts";  // Import the agent and userAuthentication functions
import { decrypt } from "../api/crypto.ts";  // Import the decrypt function for decrypting data if needed
import fs from "node:fs";  // Import the filesystem module to interact with files (though not used in the current code)
import * as BaseController from "./Base.controller.ts";  // Import the BaseController for credential validation

// HomeController function that returns an object with 'main' and 'dashboard' methods
export const HomeController = () => {
    return {
        // Renders the homepage and fetches popular feed generators from the BlueSky API
        async main(req, res) {
            // Log the agent to check its state (for debugging)
            console.log(agent);

            // Fetch the top 10 popular feed generators from the BlueSky API
            const feeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
                limit: 10, // Limit the number of results to 10
            });

            // Render the 'index' view and pass the fetched feeds as data
            // Assuming you're using EJS for rendering views
            res.render('index', feeds);  // The 'feeds' will be available in the EJS template
        },

        // Renders the dashboard page after validating the user's credentials
        async dashboard(req, res) {
            // Check the user credentials using the BaseController
            const logCred = await BaseController.checkCredential(req, res);

            // Log the credentials for debugging purposes
            console.log(logCred);

            // Render the 'main' dashboard page with additional properties like the title and background
            res.render('main', {
                title: "Moots-Analytics",     // Set the page title
                link: "dashboard/dashboard.ejs",  // Link to the dashboard page
                background: "bg-black-alt ",      // Set a background class for styling
                item: null                    // Pass an empty 'item' for the EJS template (can be modified as needed)
            });
        }
    };
};
