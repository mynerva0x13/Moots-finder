// HomeRoute.ts
import { HomeController } from "../controller/Home.controller.ts";
import { AuthController } from "../controller/Auth.controller.ts";
import { BskyController } from "../controller/Bsky.controller.ts";
export class HomeRoute {
    private app : any
    private cdn : any
    constructor({app}) {
        this.app = app
        this.cdn = [
        {
            type: "script",
            url: "https://cdn.tailwindcss.com"
        }
    ]
    }

    index() {
        this.app.get('/', (req, res) => AuthController().main(req, res)); // Directly call main
        this.app.post('/login', (req, res) => AuthController().login(req, res)); // Directly call main

        this.app.get('/dashboard', (req, res) => HomeController().dashboard(req, res)); 
        this.app.get('/fetchFollower', (req, res) => BskyController().fetchFollowers(req, res)); 
        this.app.get('/getTotalFollower', (req, res) => BskyController().getTotalFollower(req, res)); 
    }

}
