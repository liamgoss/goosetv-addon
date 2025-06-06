const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

const manifest = {
    id: "goosetv",
    version: "1.0.0",
    name: "Goose TV",
    description: "Live IPTV Streams including Local 3 News",
    resources: ["stream"],
    types: ["tv"],
    idPrefixes: ["goose:"],
    catalogs: [
        {
            type: "tv",
            id: "goose.catalog"
        }
    ]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(({ type, id }) => {
    if (id === "goose:local3news") {
        return axios.get("https://player.field59.com/v4/live/wrcb/2c404ff58f894401e00b9fdc1c442e744e7a84e3.html", {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.local3news.com/local-news/"
            }
        }).then(resp => {
            const match = resp.data.match(/https:\/\/[^"]+\.m3u8\?access_token=[^"]+/);
            if (match) {
                return { streams: [{ title: "Local 3 News (Live)", url: match[0] }] };
            }
            return { streams: [] };
        }).catch(err => {
            console.error("Fetch error:", err.message);
            return { streams: [] };
        });
    }

    return { streams: [] };
});


builder.defineCatalogHandler(({ type, id }) => {
    if (type === "tv" && id === "goose.catalog") {
        return Promise.resolve({
            metas: [
                {
                    id: "goose:local3news",
                    type: "tv",
                    name: "Local 3 News (Live)",
                    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/600px-SMPTE_Color_Bars.svg.png",
                    description: "Watch Chattanooga Local 3 News live, 24/7."
                },
                {
                    id: "goose:testchannel",
                    type: "tv",
                    name: "Goose Test Channel",
                    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/600px-SMPTE_Color_Bars.svg.png",
                    description: "This is just a placeholder channel."
                }
            ]
        });
    }

    return Promise.resolve({ metas: [] });
});

serveHTTP(builder.getInterface(), { port: 7001 }); 
