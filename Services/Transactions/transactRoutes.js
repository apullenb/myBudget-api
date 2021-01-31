const express = require("express");
const path = require("path");
const Services = require("./transactService");
const authorization = require("../../utils/authorization");

const jsonParser = express.json();
const transactRouter = express.Router();

transactRouter.get("/", authorization, async (req, res) => {
  try {
    const user = await Services.getById(req.app.get("db"), req.user);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

transactRouter.post("/", jsonParser, authorization, (req, res) => {
  const { name, amount, date, category } = req.body;
  const newTransact = { name, amount, date, category };

  for (const [key, value] of Object.entries(newTransact))
    if (value === null || undefined || "")
      return res.status(400).json({
        error: `Missing Value for '${key}' `,
      });
  newTransact.user_id = req.user;
  Services.addNewTransact(req.app.get("db"), newTransact).then((entry) => {
    res
      .status(201)
      .location(path.posix.join(req.originalUrl, `/${entry.id}`))
      .json(entry);
  });
});
module.exports = transactRouter;
