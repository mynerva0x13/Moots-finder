// HomeController.ts
import { agent, userAuthentication} from "../api/agent.ts";
import { encrypt,decrypt } from "../api/crypto.ts";
export const AuthController = () => ({
    async main(req, res) {
        res.render('main', {
            title: "Moots-Analytics",
            link: "login/login.ejs",
            background: ""
        });
    },
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        try {
            const logCred = await userAuthentication({ identifier: username, password });
            res.cookie('secureData', encrypt(JSON.stringify(logCred)), {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            res.cookie('credetial', encrypt(JSON.stringify({ identifier: username, password })), {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });
            res.status(200).json({ message: "Login successful.",logCred});
        } catch (error) {
            if (error.message === "Invalid identifier or password") {
                return res.status(401).json({ error: "Invalid username or password." });
            }
            console.error("Error during login:", error);
            res.status(500).json({ error: "An internal server error occurred. Please try again later." });
        }
    },
});
