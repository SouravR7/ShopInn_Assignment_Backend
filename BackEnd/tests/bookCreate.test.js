const app = require("../index.js");
const supertest = require("supertest");
const request = supertest(app);

const Book = require("../Schema");
const { setupDB } = require("./testSetup");

setupDB("endpoint-testing", true);

it("Should save  Book to database", async (done) => {
  const res = await request.post("/api/create").send({
    Author: "Marjin Haverbeke",
    Title: "Javascript",
    Isbn: "JS-554723",
    Relese_Date: "25th june 2007",
  });

  expect(res.status).toBe(200);
  expect(res.body.Author).toBe("Marjin Haverbeke");
  expect(res.body.Title).toBe("Javascript");
  expect(res.body.Isbn).toBe("JS-554723");
  expect(res.body.Relese_Date).toBe("25th june 2007");

  done();
});
//For Missing any field check
it("Try save Book onfield missing database", async (done) => {
  const res = await request.post("/api/create").send({
    Author: "Marjin Haverbeke",
    Title: "Javascript",
    Isbn: "JS-554723",
  });

  expect(res.status).toBe(400);
  expect(res.body.msg).toBe("*Please fill all the field");
  done();
});

it("Try save Book onfield missing database", async (done) => {
  const res = await request.post("/api/create").send({
    Author: "Marjin Haverbeke",
    Title: "Javascript",
    Relese_Date: "25th june 2007",
  });

  expect(res.status).toBe(400);
  expect(res.body.msg).toBe("*Please fill all the field");
  done();
});

it("Try save Book onfield missing database", async (done) => {
  const res = await request.post("/api/create").send({
    Title: "Javascript",
    Isbn: "JS-554723",
    Relese_Date: "25th june 2007",
  });

  expect(res.status).toBe(400);
  expect(res.body.msg).toBe("*Please fill all the field");
  done();
});

it("Try save Book onfield missing database", async (done) => {
  const res = await request.post("/api/create").send({
    Author: "Marjin Haverbeke",
    Isbn: "JS-554723",
    Relese_Date: "25th june 2007",
  });

  expect(res.status).toBe(400);
  expect(res.body.msg).toBe("*Please fill all the field");
  done();
});
