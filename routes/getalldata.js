import { requestTracker } from "../models/requesttracker.js";

export default function getAllData(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(requestTracker.getAllData());
}