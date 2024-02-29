"use strict";

const express = require("express");
const fs = require("fs");
const config = require("dotenv").config();
const https = require("https");

const app = express();

app.get("/", handleResponse);

app.post("/", handleResponse);

function handleResponse(req, res) {
    res.status(200).send("test");
}

// SSL Certificates
const privateKey = fs.readFileSync("/etc/letsencrypt/live/wizxrdx.duckdns.org/privkey.pem", "utf8");
const certificate = fs.readFileSync('/etc/letsencrypt/live/wizxrdx.duckdns.org/fullchain.pem', "utf8");

const credentials = { key: privateKey, cert: certificate };

// Listen for requests
app.set("port", config.parsed.PORT || 5000);
const server = https.createServer(credentials, app);

var listener = server.listen(app.get("port"), function () {
    console.log(prefix + "Server started on port %s", listener.address().port);
});