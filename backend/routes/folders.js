import express from "express";
import { sql } from "../database.js";

const router = express.Router();

// get main folders
router.get("/main", async (req, res) => {
    try {
        const mainFolders = await sql`
            SELECT * FROM folders
            WHERE parent_id IS NULL
            ORDER BY created_at DESC
        `;

        console.log("Fetched folders: ", mainFolders);
        res.status(200).json({ success: true, data: mainFolders });
    } catch (error) {
        console.log("Error GET:main folders");
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
});

// get a singular folder
router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const folder = await sql`
        SELECT * FROM folders WHERE id=${id}
        `;

        // getting subfolders from database
        const subfolders = await sql`
        SELECT * FROM folders WHERE parent_id=${id}
        `;

        if (subfolders.length) folder[0].subfolders = subfolders;
        

        // getting images from database
        const images = await sql`
        SELECT * FROM images WHERE folder_id=${id}
        `;

        if (images.length) folder[0].images = images;

        console.log(folder)
        res.status(200).json({ success: true, data: folder[0] })
    } catch (error) {
        console.log("Error GET:folder");
        res.status(500).json({ success: false, message: "Internal Server Error" }) 
    }
});

// create a new folder
router.post("/", async (req, res) => {
    const {title, parent_id} = req.body;

    if(!title) {
        return  res.status(400).json({ success: false, message: "Title is required" })
    }

    try {
        const newFolder = await sql`
            INSERT INTO folders (title, parent_id)
            VALUES (${title},${parent_id})
            RETURNING *
        `;

        console.log("New folder added: ", newFolder);
        res.status(201).json({ success: true, data: newFolder[0] })
    } catch (error) {
        console.log("Error POST:folder");
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
});

// update a folder
router.put("/:id", async (req, res) => {

});

router.delete("/:id", async (req, res) => {

});

export default router; 