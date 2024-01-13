const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

// 1. ***GET /items*** - this should render a list of shopping items.
// Here is what a response looks like:
// **[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**
router.get("/", (req, res) => {
    res.json({ items });
});

// 1. ***POST /items*** - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:
// **{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**
router.post("/", (req, res, next) => {
    try {
        if (!req.body.name) throw new ExpressError("Name is required", 404);
        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.status(201).json({ item: newItem });
    } catch (e) {
        return next(e);
    }
});

// 1. ***GET /items/:name*** - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// **{“name”: “popsicle”, “price”: 1.45}**
router.get("/:name", (req, res) => {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item cannot be found", 404);
    }
    res.json({ item: foundItem });
});

// 1. ***PATCH /items/:name***, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:
// **{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**
router.patch("/:name", (req, res) => {
    const foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
        throw new ExpressError("Item cannot be found", 404);
    }
    foundItem.name = req.body.name;
    res.json({ item: foundItem });
});

// 1. ***DELETE /items/:name*** - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// **{message: “Deleted”}**
router.delete("/:name", (req, res) => {
    const foundItem = items.findIndex((item) => item.name === req.params.name);
    if (foundItem === -1) {
        throw new ExpressError("Item cannot be found", 404);
    }
    items.splice(foundItem, 1);
    res.json({ message: "Deleted" });
});

module.exports = router;
