import express from "express";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { otpMaster } from "./models/otpmaster.js";
import { config } from "./models/configmanager.js";

const app = express();
const port = config.port;
const host = config.host;
const secretKeyPath = "secret.key";

//#region Config
console.log('Setting up server...');
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "assets/static")));
app.use(express.json());
//#endregion Config

//#region OTP Config
console.log("Setting up OTP...");

if (!existsSync(secretKeyPath)) {
    console.log("Looks like you're missing a secret.key file...");
    otpMaster.generateSecretFile();
    otpMaster.generateQRCode();
}

otpMaster.setSecret(readFileSync("secret.key"));

//#endregion

//#region Routing
console.log("Setting up routes...");
import image from "./routes/image.js";
import generateKey from "./routes/generatekey.js";
import getKeyData, { getKeyDataNoIDError } from "./routes/getkeydata.js";
import removeEntry from "./routes/removekey.js";

app.get("/:id.png", image);
app.get("/generate-key", generateKey);
app.get("/get-key-data/:id", getKeyData);
app.get("/delete-key/:id", removeEntry);

app.get("/get-key-data", getKeyDataNoIDError);
//#endregion Routing

console.log("Starting server...");
app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Server url http://${host}:${port}/`);
});