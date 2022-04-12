import express from "express";
import path from "path";

// TODO(hamolicious) convert the rest of the app into an API

const app = express();
const port = 80;
const host = '0.0.0.0';

//#region Config
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "assets/static")));
//#endregion Config

//#region Routing
import image from "./routes/image.js";
import generateKey from "./routes/generatekey.js";
import getKeyData, { getKeyDataNoIDError } from "./routes/getkeydata.js";

app.get("/:id.png", image);
app.get("/generate-key", generateKey);
app.get("/get-key-data/:id", getKeyData);

app.get("/get-key-data", getKeyDataNoIDError);
//#endregion Routing

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`);
});