// const express = require("express");
import express from "express";
import connection from "./configs/db.js";

const app = express();
connection();
app.listen(4000, () => {
  console.log("Aloha");
});
