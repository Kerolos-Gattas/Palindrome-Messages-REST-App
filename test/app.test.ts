import app from "../src/app";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("app tests", () => {
    it("Simple API endpoint should containt server running message", async () => {
        return chai
            .request(app)
            .get("/")
            .then(res => {
                chai.expect(res.text).to.contain("Server running at http://localhost:");
            });
    });
});