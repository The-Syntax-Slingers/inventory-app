const express = require("express");
const router = express.Router();
const { Item } = require("../models");
const { check, validationResult } = require("express-validator");

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


router.post("/",
  [check("name").not().isEmpty().trim()],
  [check("image").not().isEmpty().trim()],
  [check("description").not().isEmpty().trim()],
  [check("price").isNumeric()], //.min(0.00)
  [check("category").not().isEmpty().trim()],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
        return
      }
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

router.update("/:id",
  [check("name").not().isEmpty().trim()],
  [check("image").not().isEmpty().trim()],
  [check("description").not().isEmpty().trim()],
  [check("price").isNumeric()], //.min(0.00)
  [check("category").not().isEmpty().trim()],
  async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
        return
      }
      const item = await Item.findByPk(req.params.id);
      item.update(req.body);
      res.send(item);
    } catch (error) {
      next(error);
    }
  });


module.exports = router;
