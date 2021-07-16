const express = require("express");
const router = express.Router({ mergeParams: true });
const ItemsController = require("../controllers/itemsController");

router.post("/add-item", async (req, res, next) => {
    try {
        let result = await ItemsController.addNewItem(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/update-item", async (req, res, next) => {
    try {
        let result = await ItemsController.updateItem(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/delete-item", async (req, res, next) => {
    try {
        let result = await ItemsController.deleteitem(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


router.post("/add-item-review", async (req, res, next) => {
    try {
        let result = await ItemsController.addNewItemReview(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/update-item-review", async (req, res, next) => {
    try {
        let result = await ItemsController.updateItemReview(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/delete-item-review", async (req, res, next) => {
    try {
        let result = await ItemsController.deleteitemReview(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/add-category", async (req, res, next) => {
    try {
        let result = await ItemsController.addNewCategory(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
router.post("/update-category", async (req, res, next) => {
    try {
        let result = await ItemsController.updateCategory(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
router.post("/delete-category", async (req, res, next) => {
    try {
        let result = await ItemsController.deleteCategory(req);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});





module.exports =router;