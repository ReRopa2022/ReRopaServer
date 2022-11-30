const request = require("supertest");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
jest.useFakeTimers();
const app = require("../server");
const User = require("../models/userModel");

//Deleting the document (sign up) before tests.
// beforeEach(async () => {
//   await User.deleteOne({
//     firstName: "TestOne",
//     lastName: "TestingOne",
//     email: "test1@test1.com",
//   });
// });

// Sign up user test
test("Should signup a new user", async () => {
  const response = await request("https://reropaserver.azurewebsites.net")
    .post("/api/users/")
    .send({
      firstName: "TestOne",
      lastName: "TestingOne",
      email: "test1@test1.com",
      password: "test1234",
      passwordConfirm: "test1234",
    })
    .expect(201);
});

//Sign up failed test - user already exists.
test("Should signup a new user fail - user already exist", async () => {
  const response = await request("https://reropaserver.azurewebsites.net")
    .post("/api/users/")
    .send({
      firstName: "Test",
      lastName: "Testing",
      email: "test@test.com",
      password: "test1234",
      passwordConfirm: "test1234",
    })
    .expect(400);
});

// Sign in user test
test("Should sign in a user", async () => {
  const response = await request("https://reropaserver.azurewebsites.net")
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(200);
});

// Sign in user fail - missing email or password
test("Should sign in - fail (missing email or password)", async () => {
  const response = await request("https://reropaserver.azurewebsites.net")
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      // password: "1234567890",
    })
    .expect(400);
});

//Sign in user fail - email or password are false
test("Should sign in - fail (One of credentials is wrong)", async () => {
  const response = await request("https://reropaserver.azurewebsites.net")
    .post("/api/users/login")
    .send({
      email: "test@test.com",
      password: "1234567890",
    })
    .expect(401);
});
