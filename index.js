const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const morgan = require("morgan");
const parser = require("body-parser").urlencoded({ extended: false });

app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(morgan("dev"));
app.use(parser);
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/chat", (req, res) => {
    if (req.query.user) {
        return res.render(path.join(__dirname, "views/chat.html"), {
            user: req.query.user,
        });
    }
    return res.redirect("/");
});

io.on("connection", (socket) => {
    socket.on("myMessage", (msg) => {
        socket.broadcast.emit("message", msg);
    });
    socket.on("saludo", (msg) => {
        io.emit("message", msg);
    });
    socket.on("despedida", (msg) => {
        io.emit("message", msg);
    });
});

http.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});
