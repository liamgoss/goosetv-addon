const getLocal3NewsStream = require("../scrapers/local3");


module.exports = function defineStreamHandler(builder) {
    builder.defineStreamHandler(async ({ type, id }) => {
        if (id === "goose:local3news") {
            const streams = await getLocal3NewsStream();
            return { streams };
        }

        return { streams: [] };
    });
};