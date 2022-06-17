const fs = require('fs')
module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log("Bot ready");

    fs.readdir("./interactions/", (err, files) => {
      const interactionsHandler = require("./../handler/interactionHandler");
      interactionsHandler(err, files, client);
    });
  },
};