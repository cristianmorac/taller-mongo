const { Router } = require("express");
const router = Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  const allProducts = await Product.find();
  res.status(200).json(allProducts);
});

router.get("/:id", async (req, res) => {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  });

router.post("/create", async (req, res) => {
  try {
    const { name, password } = req.body;
    await Product.create({ name, password });
    res.status(200).json({
      msg: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
