const getLocal3NewsStream = require("./scrapers/local3");

(async () => {
    const streams = await getLocal3NewsStream();
    console.log("Returned streams:", streams);
})();
