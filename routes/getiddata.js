import {} from "../models/requesttracker.js";

export default function EndPoint_Get_IDData(req, res) {
    res.setHeader("Content-Type", "application/json");

    if (.doesExist(req.params.id)) {
        const data = .getData(req.params.id);
        res.status(200).json({ data: data });
        res.end();
        return;
    } else {
        res.status(204);
        res.end();
        return;
    }
};

export function getKeyDataNoIDError(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ message: "No ID specified" });
};