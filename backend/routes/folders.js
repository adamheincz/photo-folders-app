import express from "express";
import { sql } from "../database.js";

const router = express.Router();

// get a singular folder
router.get("/:id", async (req, res) => {

});

// create a new folder
router.post("/", async (req, res) => {

});

// update a folder
router.put("/:id", async (req, res) => {

});

export default router; 