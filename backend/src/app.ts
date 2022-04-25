export {};
var env = require("dotenv").config();
const mongoose = require('mongoose');
const debug = require('debug')('app:EmailGuesser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
var cfg = require("../config.json")[process.env.NODE_ENV];
const path = require('path');
async function createMongoConnection() {
    const atlasDb =`mongodb+srv://${cfg.username}:${cfg.password}@${cfg.clusterendpoint}/${cfg.database}?retryWrites=true&w=majority`
    await mongoose.connect(atlasDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo Connected...');
    return;
  }

  (async () => {
    app.use(
      //cors()
      cors({
        origin: cfg.frontend_BaseURL,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      }),
    );


    try {
      await createMongoConnection();
      app.use(bodyParser.json({ limit: '1500mb', extended: true }));
      app.use(bodyParser.urlencoded({ limit: '1500mb', extended: true }));
      const port=5000;
      let emailGuesserAPI = require("./routes/api/emailguesser");
      let formatEmailAPI=require("./routes/api/formatEmail");
      
      app.use("/api", emailGuesserAPI);
      app.use("/api",formatEmailAPI)
      
      const server = app.listen(port, (req:any) => {
        debug('Listening on port: ' + port);
      });
      
      module.exports=server;
    } catch (ex) {
      console.log('ex: ', ex);
    }
})();
