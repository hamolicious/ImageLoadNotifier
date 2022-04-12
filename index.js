import express from "express";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { OTPMaster } from "./models/otpmaster.js";
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
    OTPMaster.generateSecretFile();
    OTPMaster.generateQRCode();
}

OTPMaster.setSecret(readFileSync("secret.key"));

//#endregion

//#region Routing
console.log("Setting up routes...");
import EndPoint_Get_Image from "./routes/image.js";
import EndPoint_Get_NewID from "./routes/getnewid.js";
import EndPoint_Get_IDData, { getKeyDataNoIDError } from "./routes/getiddata.js";
import EndPoint_Delete_removeID from "./routes/removeid.js";
import EndPoint_Get_All from "./routes/getall.js";

app.get("/:id.png", EndPoint_Get_Image);
app.get("/get-new-id", EndPoint_Get_NewID);
app.get("/get-id-data/:id", EndPoint_Get_IDData);
app.delete("/delete-id/:id", EndPoint_Delete_removeID);
app.get("/get-all", EndPoint_Get_All);

app.get("/get-id-data", getKeyDataNoIDError);
//#endregion Routing

console.log("Starting server...");
app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Server url http://${host}:${port}/`);
});