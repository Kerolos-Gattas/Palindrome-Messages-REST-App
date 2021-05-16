import app from "../src/app";
import * as chai from "chai";
import { expect } from 'chai';
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("app tests", () => {
    it("Simple API endpoint should containt server running message", async () => {
        return chai
            .request(app)
            .get("/")
            .then(res => {
                expect(res.text).to.contain("Server running at http://localhost:");
            });
    });
});