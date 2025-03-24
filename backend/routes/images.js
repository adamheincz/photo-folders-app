import express from "express";
import fs from "fs";
import { sql } from "../database.js";
import { upload } from "../storage.js";

const router = express.Router();

// uploading an image
router.post("/", upload.single('file'), async (req, res) => {
    const { title, folder_id } = req.body;
    const hostUrl = "https://" + req.get("host");
    const url = hostUrl + "/images/" + req.file.filename;

    if (title === null || folder_id === null) {
        res.status(400).json({
            success: false,
            message: "Title and folderID cannot be null."
        });
    }

    try {
        const newImage = await sql`
            INSERT INTO images (title, folder_id, url)
            VALUES (${title},${folder_id},${url})
            RETURNING *
        `;

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully.",
            data: newImage[0]
        });
    } catch (error) {
        console.log("Error POST:image");
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// deleting an image
router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const deletedImage = await sql`
        DELETE FROM images WHERE id=${id} 
        RETURNING *
        `;

        console.log(deletedImage[0])
        const filename = "backend/images/" + deletedImage[0].url.split("/").pop();
        fs.unlink(filename, (err) => {
            if (err) {
                console.log("File delete failed!");
            } else {
                console.log("File deleted!");
            }
        });

        res.status(200).json({
            success: true,
            message: "Image successfully deleted.",
            data: deletedImage[0]
        });
    } catch (error) {
        console.log("Error DELETE:image");
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default router;

