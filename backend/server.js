import express from "express";
import dotenv from "dotenv"
import helmet from "helmet";
import cors from "cors";
import folders from "./routes/folders.js";
import images from "./routes/images.js"
import { sql } from "./database.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/folders", folders);
app.use("/api/images", images);

async function initDataBase() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS folders (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                parent_id INT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS images (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                folder_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log("Database initialized successfully.")
    } catch (error) {
        console.log("Error initializing database. ", error);
    }
}

initDataBase().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
})