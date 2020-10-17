const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", function(req,res) {
    db.Event.findAll(function(data) {
        const eventObject = {
            Event: data
        }
        console.log(eventObject);
        res.render("index", eventObject);
    });
});

router.get("/:event", function(req,res) {
    db.Event.findOne({
        where: {
            Event: req.params.event
        }
    }, function(data) {
        console.log(data);
        res.json(data);
    });
});

router.post("/api/events", function(req,res) {
    db.Event.create([
        "name", "description", "creatorEmail", "creatorPassword", "userPassword"
    ], [
        req.body.name, req.body.description, req.body.creatorEmail, req.body.creatorPassword, req.body.userPassword
    ], function(result) {
        res.json({ id: result.insertID });
    });
});

router.put("/api/events/:id", function(req, res) {
    db.Event.update({
        where: {
            id: req.params.id
        }
    },{
        name: req.body.name,
        description: req.body.description,
    }, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});