var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var originRouter = require("./routes/origin");
const { uploadsPath } = require("./config/configParam")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//访问图片
app.get("/tokenOrigin/getPhoto", async function (req, res) {
    try {
        // res.sendFile(`\/mnt\/photo-project\/` + req.query.photo)
        console.log(`${uploadsPath}\/` + req.query.photo);

        res.sendFile(`${uploadsPath}\/` + req.query.photo)
    } catch (error) {
        return res.json({
            code: 1,
            msg: "图片读取异常"
        })
    }
})
app.use("/", indexRouter);
app.use("/tokenOrigin", originRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
