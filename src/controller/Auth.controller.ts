// AuthController.ts
// This controller handles authentication-related operations, including user login functionality.
// It uses the 'userAuthentication' function to authenticate users, and stores encrypted login credentials
// in cookies to maintain session data securely.

import { agent, userAuthentication } from "../api/agent.ts";  // Import agent and userAuthentication functions
import { encrypt, decrypt } from "../api/crypto.ts";  // Import encryption and decryption functions

// AuthController function that returns an object with 'main' and 'login' methods
export const AuthController = () => ({
    // Renders the main page for the application
    // Sets title, link to login page, and background image
    async main(req, res) {
        res.render('main', {
            title: "Moots-Analytics",   // Set the title for the page
            link: "login/login.ejs",   // Link to the login page
            background: ""             // Optional background setting (currently empty)
        });
    },

    // Handles the user login process
    async login(req, res) {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        try {
            // Call userAuthentication to validate login credentials using username and password
            const logCred = await userAuthentication({ identifier: username, password });

            // Encrypt login credentials and store them in cookies for secure session handling
            res.cookie('secureData', encrypt(JSON.stringify(logCred)), {
                httpOnly: true, // Prevent JavaScript access to the cookie
                secure: true,   // Ensure the cookie is sent over HTTPS
                sameSite: 'strict' // Restrict cookie to same-site requests for security
            });

            // Encrypt and store the raw credentials in a separate cookie (for future use)
            res.cookie('credetial', encrypt(JSON.stringify({ identifier: username, password })), {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });

            // Return a successful login response with a message and login credentials
            res.status(200).json({ message: "Login successful.", logCred });
        } catch (error) {
            // Handle errors during login process

            // If the login fails due to invalid credentials, send a 401 error
            if (error.message === "Invalid identifier or password") {
                return res.status(401).json({ error: "Invalid username or password." });
            }

            // Log and respond with a generic internal server error if other issues arise
            console.error("Error during login:", error);
            res.status(500).json({ error: "An internal server error occurred. Please try again later." });
        }
    },
});
