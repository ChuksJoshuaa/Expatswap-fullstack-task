import express from "express";

import {
    getAllUsers,
    getAllFilteredUsers,
    createUser,
    updateUser,
    getSingleUser,
    deleteUser
} from "../controllers/User.js";


const router = express();

//Get requests
router.get("/", getAllUsers);
router.get("/filtered", getAllFilteredUsers);
router.get("/:id", getSingleUser);


//Post requests
router.post("/create", createUser);

//Patch requests
router.patch("/edit/:id", updateUser);


//Delete requests
router.delete("/delete/:id", deleteUser);


export default router;