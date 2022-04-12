import express from "express";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { otpMaster } from "./models/otpmaster.js";

const app = express();
const port = 80;
const host = '0.0.0.0';
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

app.get("/:id.png", image);
app.get("/generate-key", generateKey);
app.get("/get-key-data/:id", getKeyData);

app.get("/get-key-data", getKeyDataNoIDError);
//#endregion Routing

console.log("Starting server...");
app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`);
});