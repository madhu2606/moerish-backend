const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/usersController");

router.get("/", async function (req, res, next) {
    try {
        let result = await userController.getUser(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/add-user", async (req, res, next) => {
    try {
        let result = await userController.addNewUser(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/update-user", async (req, res, next) => {
    try {
        let result = await userController.updateUser(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;