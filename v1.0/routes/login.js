const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/usersController");

router.post("/", async (req, res, next) => {
    try {
        let result = await userController.loginUser(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/registration", async (req, res, next) => {
    try {
        let result = await userController.addNewUser(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/forget-password", async (req, res, next) => {
    try {
        let result = await userController.updatePassword(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;