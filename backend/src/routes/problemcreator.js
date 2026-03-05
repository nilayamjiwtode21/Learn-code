const express = require('express');

const problemRouter = express.Router;
const adminMiddleware = require('../middleware/adminMiddleware')

//create,update,delete, this will require admin access
problemRouter.post("/create", adminMiddleware ,createProblem);
problemRouter.patch("/:id",updateProblem);
problemRouter.delete("/:id",deleteProblem);

//this can be done by normal user
problemRouter.get("/:id",getProblemById);
problemRouter.get("/",getAllProblem);
problemRouter.get("/user",solvedAllProblemByUser);