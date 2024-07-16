//version 1

// const http = require("http");
// // created an http which is stored in the constant

// const server = http.createServer((req, res) => {
//   console.log("hello");
//   console.log(req.url);
//   res.writeHead(200);
//   res.end("hi"); //to send response to client
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

//multiple endpoints can do if case for req.url but thats clutter so a package is used called Express

//npm init -y this is my file for stuf do the necessary

// version 2 using express

/* const { error } = require("console");
const express = require("express");

const server = new express(); */
import { log } from "console";
import { Request, Response } from "express";
import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import AppDataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import departmentRouter from "./routes/department.routes";
import httpException from "./exceptions/https.exceptions";
import errorMiddleware from "./middleware/error.middleware";
console.log("staryting..");
const server = express();
console.log("passed Middleware");

// server.use(loggerMiddleware);
console.log("passed Middleware2");
server.use(bodyParser.json());
console.log("passed bodyParser");

const corsOptions = {
  origin: "http://localhost:5173",
};

server.use(cors(corsOptions));
server.use("/employees", employeeRouter);
server.use("/department", departmentRouter);
server.use(loggerMiddleware);
server.use(errorMiddleware);

// server.use((err: Error, req, res, next) => {
//   console.error(err.stack);
//   if (err instanceof httpException) {
//     res.status(err.status).send({ error: err.message });
//     return;
//   }
//   res.status(500).send({ error: err.message });
// });

// server.use(()=>{

// })

(async () => {
  try {
    console.log("initializing");
    await AppDataSource.initialize();
    console.log("initilzinf done");
  } catch (e) {
    console.log("failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();

server.get("/", (Request: Request, Response: Response) => {
  //   const data : = {
  //     name: "Champ",
  //     age: 20,
  //   };
  interface Profile {
    name: string;
    age: number;
  }

  interface data {
    profile: Profile;
  }

  let data: data = {
    profile: {
      name: "Champ",
      age: 20,
    },
  };

  // you can also do this
  // let data:{profile: Profile} = {
  //   profile: {
  //     name: "Champ",
  //     age: 20,
  //   },
  // };

  //   this showed the need of type script
  console.log(Request.url);
  console.log(data.profile.name);
  Response.status(200).send(data);
});

server.get("/heyy", (req: Request, res: Response) => {
  try {
    log(req.url);
    throw new Error();
    res.status(200).send("Ma name is Jeff");
  } catch (error) {
    res.status(200).send("heyyy");
  }
});
