
export {};
const express = require("express");
const mongoose=require("mongoose");
var cfg = require("../../../config.json")[process.env.NODE_ENV];

var bodyParser = require('body-parser')
let emailGuesserAPI=require("../../routes/api/emailguesser");
const request=require("supertest");
const app = express();

app.use(bodyParser.json());
app.use("/api", emailGuesserAPI);

describe("/api/email", () => {
      beforeAll(async() => {
        const atlasDb =`mongodb+srv://${cfg.username}:${cfg.password}@${cfg.clusterendpoint}/${cfg.database}?retryWrites=true&w=majority`
        await mongoose.connect(atlasDb, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongo Connected...');
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });
        it("should generate email", async () => {
            let payload={
                full_name:"hanan kibria",
                domain:"babbel.com"
            }
            const res = await request(app)
                        .post("/api/email")
                        .send(payload)
                        .set("Accept", "application/json");
            expect(res.status).toBe(200);
            expect(res.body.result.email).toBe("hkibria@babbel.com");
        })
})

