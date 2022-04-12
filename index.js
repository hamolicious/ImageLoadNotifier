import express from "express";
import path from "path";
const app = express();
const port = 80;

let resultTracker = {};

function generateKey() {
    return btoa(
        String.fromCharCode(
            ...new Uint8Array(
                Array(30)
                .fill()
                .map(() => Math.round(Math.random() * 30))
            )
        )
    );
}

function assignNewSubscriber(key) {
    resultTracker[key] = {
        createdOn: new Date().getTime()
    };
}

function objToString(obj) {
    let str = '';
    for (let key in obj) {
        str += `${key}: ${obj[key]} | `
    }
    return str;
}

app.get("/:id.png", (req, res) => {
    resultTracker[req.params.id] = {
        accessed: new Date().getTime(),
        headers: req.headers,
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    };
    res.sendFile(path.join(process.cwd(), "assets/pixel.png"));
});

app.get("/generatekey", (req, res) => {
    const userKey = generateKey();
    const imageURL = path.join(req.headers.host, userKey + '.png');

    assignNewSubscriber(userKey);

    const templateFn = (key, url) =>
        `Your key is: ${key}<br />Your image code is: &lt;img src="${url}"&gt;`;
    res.send(templateFn(userKey, imageURL));
});

app.get("/getkeydata/:id?", (req, res) => {
    if (!req.params.id)
        res.send(`No`); // lol?

    const data = resultTracker[req.params.id];
    if (!data.accessed)
        res.send(`No Data :(`);

    res.send(
        objToString(data) +
        "<br /><br /><br /><br /><br /><br />" +
        objToString(data.headers)
    );
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});