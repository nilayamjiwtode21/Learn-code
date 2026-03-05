const express = require('express');

const problemRouter = express.Router;

//create,update,delete, this will require admin access
problemRouter.post("/create",problemCreate);
problemRouter.patch("/:id",paroblemUpdate);
problemRouter.delete("/:id",problemDelete);

//this can be done by normal user
problemRouter.get("/:id",problemFetch);
problemRouter.get("/",getAllProblem);
problemRouter.get("/user",solvedProblem);