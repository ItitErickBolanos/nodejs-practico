const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const token = await Controller.login(req.body.username, req.body.password);
        response.success(req, res, token, 200);
    } catch (err) {
        console.log(err);
        next();
    }
});

module.exports = router;