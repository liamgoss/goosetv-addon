const express = require("express");
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const defineCatalogHandler = require("./handlers/catalogHandler");
const defineStreamHandler = require("./handlers/streamHandler");

const app = express();

// Serve static files (e.g. poster png's)
app.use("/posters", express.static("public/posters"));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
const manifest = {
    id: "goosetv",
    version: "1.0.0",
    name: "Goose TV",
    description: "Live Goose-Approved IPTV Streams",
    resources: ["catalog", "stream"],
    types: ["tv"],
    idPrefixes: ["goose:"],
    catalogs: [
        {
            type: "tv",
            id: "goose.catalog",
            name: "GooseTV Channels"
        }
    ]
};

const builder = new addonBuilder(manifest);

defineCatalogHandler(builder);
defineStreamHandler(builder);


// --- Set up poster server using Express on a second port ---
const posterApp = express();
posterApp.use("/posters", express.static("public/posters"));

posterApp.listen(7002, () => {
    console.log("Poster server running at http://localhost:7002/posters/");
});

// --- Serve the Stremio addon interface as usual ---
serveHTTP(builder.getInterface(), { port: 7001 });
console.log("Stremio addon running at http://localhost:7001/manifest.json");