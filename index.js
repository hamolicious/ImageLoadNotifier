import express from "express";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { OTPMaster } from "./models/otpmaster.js";
import { config } from "./models/configmanager.js";
import { PluginManager } from "./models/pluginmanager.js";
import LoggingManager from "./models/loggingmanager.js";

export const app = express();
const port = config.port;
const host = config.host;
const secretKeyPath = "secret.key";

const masterLogger = LoggingManager.register('Master');
const configLogger = LoggingManager.register("Config");
const routingLogger = LoggingManager.register("Router");
masterLogger.log('Setting up server...');

//#region Config
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "assets/static")));
app.use(express.json());

configLogger.log('Loading ENV configs...');
for (let c in config) {
    configLogger.log(`\t - ${c} has been set to: ${config[c]}`);
}

//#endregion Config

//#region OTP Config
OTPMaster.logger.log("Setting up OTP...");

if (!existsSync(secretKeyPath)) {
    OTPMaster.logger.log("Looks like you're missing a secret.key file...");
    OTPMaster.generateSecretFile();
    OTPMaster.generateQRCode();
}

OTPMaster.setSecret(readFileSync("secret.key"));

//#endregion

//#region Plugins

PluginManager.logger.log("Settings up plugins...");
const plugins = PluginManager.discoverPlugins();
PluginManager.loadAllPlugins(plugins);

//#endregion Plugins

//#region Routing
routingLogger.log("Setting up routes...");
import EndPoint_Get_Image from "./routes/image.js";
import EndPoint_Get_NewID from "./routes/getnewid.js";
import EndPoint_Get_IDData, { getKeyDataNoIDError } from "./routes/getiddata.js";
import EndPoint_Delete_removeID from "./routes/removeid.js";
import EndPoint_Get_All from "./routes/getall.js";
import EndPoint_Get_QRCode from "./routes/getqrcode.js";

app.get("/:id.png", EndPoint_Get_Image);
app.get("/get-new-id", EndPoint_Get_NewID);
app.get("/get-id-data/:id", EndPoint_Get_IDData);
app.delete("/delete-id/:id", EndPoint_Delete_removeID);
app.get("/get-all", EndPoint_Get_All);
app.get("/get-qr-code", EndPoint_Get_QRCode);

app.get("/get-id-data", getKeyDataNoIDError);
//#endregion Routing

masterLogger.log("Starting server...");
export const server = app.listen(port, host, () => {
    masterLogger.log(`Server listening on port ${port}`);
    masterLogger.log(`Server url http://${host}:${port}/`);
});