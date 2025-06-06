const axios = require("axios");

let cachedStream = null;
let cacheTime = 0;

module.exports = async function getLocal3NewsStream() {
    const now = Date.now();
    if (cachedStream && now - cacheTime < 10 * 60 * 1000) {
        return cachedStream;
    }

    try {
        const playerUrl = "https://player.field59.com/v4/live/wrcb/2c404ff58f894401e00b9fdc1c442e744e7a84e3.html";
        const resp = await axios.get(playerUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.local3news.com/local-news/"
            }
        });

        const m3u8Match = resp.data.match(/https:\/\/[^"]+\.m3u8\?access_token=[^"]+/);
        if (m3u8Match) {
            const stream = [{ title: "Local 3 News (Live)", url: m3u8Match[0] }];
            cachedStream = stream;
            cacheTime = now;
            console.log("Fetched and cached stream:", stream[0].url);
            return stream;
        } else {
            console.warn("No stream found in player HTML");
            return [];
        }
    } catch (err) {
        console.error("Stream fetch error:", err.message);
        return [];
    }
};
