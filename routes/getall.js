import { requestTracker } from "../models/requesttracker.js";

export default function EndPoint_Get_All(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(requestTracker.getAllData());
}