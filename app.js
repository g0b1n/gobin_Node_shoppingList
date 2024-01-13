const express = require("express");
const shopRoutes = require("./routes/shopRoutes");

const ExpressError = require("./expressError");

const app = express();

app.use(express.json());
app.use("/shopping", shopRoutes);

// 404 Error Handler
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    next(err);
});

// General Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});

module.exports = app;
