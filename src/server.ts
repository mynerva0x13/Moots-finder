import * as path from 'node:path';
import express from 'express';
import { HomeRoute } from './routes/Home.ts';
import cookieParser from "npm:cookie-parser"
// Get the current directory path in ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const port = 3000;
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.json());
// Set the views directory, assuming it's under 'src/views'
app.set('views', path.join(__dirname, 'view'));

// Serve static files (optional, for assets like CSS, JS, images)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cookieParser());

new HomeRoute({app}).index()
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
