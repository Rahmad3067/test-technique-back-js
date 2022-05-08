const request = require("supertest");
const assert = require("assert");
const express = require("express");

const app = express();


describe("adding a todo", () => {
    it("retuns code 201 if new todo is passed", async () => {
        const res = await request(app)
          .post("/api/todos/")
            .send({ title: "node test twwwww", description:"new", status: "pending" });
        console.log(res)
        expect(res.statusCode).toEqual(201);
    })
})