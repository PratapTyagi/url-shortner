import express from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import config from "config";
import model from "../models/dbModel.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    res.status(401).json("Invalid Base Url");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await model.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new model({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        res.json(url);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid Long Url");
  }
});

export default router;
