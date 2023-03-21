const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /item
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      res.send(item);
    } catch (error) {
      next(error);
    }
  });


router.post("/", async (req, res, next) => {
    try {
      const item = await Item.create(req.body);
      res.send(await item.findAll());
    } catch (error) {
      next(error);
    }
  });

router.delete("/:id", async (req, res, next) => {
    try {
      const item = await Item.destroy(req.params.id);
      res.send(item);
    } catch (error) {
      next(error);
    }
  });

router.update("/:id", async (req, res, next) => {
    try {
      const item = await Item.findByPk(req.params.id);
      item.update(req.body);
      res.send(item);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
