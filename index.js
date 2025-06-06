const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const defineCatalogHandler = require("./handlers/catalogHandler");
const defineStreamHandler = require("./handlers/streamHandler");

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


serveHTTP(builder.getInterface(), { port: 7001 });
console.log("Stremio addon running at http://localhost:7001/manifest.json");