const channels = require("../data/channels.json");

module.exports = function defineCatalogHandler(builder) {
    builder.defineCatalogHandler(({ type, id }) => {
        if (type === "tv" && id === "goose.catalog") {
            return Promise.resolve({
                metas: channels.map(c => ({
                    id: c.id,
                    type: "tv",
                    name: c.name,
                    poster: c.poster,
                    description: c.description
                }))
            });
        }
        return Promise.resolve({ metas: [] });
    });
};