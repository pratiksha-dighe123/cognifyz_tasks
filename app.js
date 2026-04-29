const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// view engine
app.set("view engine", "ejs");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// temporary storage
let users = [];

// home route
app.get("/", (req, res) => {
    res.render("index");
});

// form submit
app.post("/submit", (req, res) => {

    const { name, email, password, age } = req.body;

    // server-side validation
    if (!name || !email || !password || !age) {
        return res.send("All fields are required!");
    }

    if (!email.includes("@")) {
        return res.send("Invalid email format!");
    }

    if (password.length < 6) {
        return res.send("Password must be at least 6 characters!");
    }

    if (age < 18) {
        return res.send("Age must be 18+!");
    }

    // store data
    users.push({ name, email, password, age });

    console.log("Stored Users:", users);

    res.render("result", { name, email });
});

// optional: view users
app.get("/users", (req, res) => {
    res.json(users);
});

// server start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});