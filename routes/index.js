import express from "express";
import model from "../models/dbModel.js";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const url = await model.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url);
    } else {
      return res.status(404).json("No such url found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

export default router;
