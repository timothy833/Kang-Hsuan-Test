/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import axios from "axios";
import cors from "cors";


const app = express();

const allowedOrigins = [
    "https://timothy1994-ee7db.web.app",
    "https://timothy1994-ee7db.firebaseapp.com",
    "http://localhost:5173",
  ];
  
app.use(
    cors({
        origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
        },
        methods: ["GET"],
    })
);

app.get("/news", async (req, res) => {
    try {
        const result = await axios.get("https://opendata.ey.gov.tw/api/ExecutiveYuan/NewsEy", {params: req.query});
            // console.log("行政院 API 回傳:", result.data);
        res.json(result.data);
    } catch (error) {
        res.status(500).json({
            error: "行政院 API 請求失敗",
            details: error.message,
        });
    }
});

// 匯出為 Firebase Cloud Function
// exports.api = onRequest(app);
export const api = onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
