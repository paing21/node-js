const http = require("http");
const fs = require("fs");
const port = 2000;

let customers = [{ name: "mo mo", email: "momo@gmail.com", age: 20 }];

const server = http.createServer((req, res) => {
  const method = req.method;
  const route = req.url;
  const isRouteUrl = route === "/";
  if (isRouteUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (route === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (route === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (route === "/customers") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(customers));
      res.end();
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newCustomer = JSON.parse(body);
        customers.push(newCustomer);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(customers));
        return res.end();
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newUser = JSON.parse(body);
        let filusers = customers.filter((customer) => {
          return customer.email !== newUser.email;
        });
        customers = filusers;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(customers));
        res.end();
      });
    }
    // else if (method === "PUT") {
    //   let newData = "";
    //   req.on("data", (chunk) => {
    //     newData += chunk;
    //   });

    //   req.on("end", () => {
    //     const changeObj = JSON.parse(newData);
    //     const checkEmail = changeObj.email;
    //     const findedUser = customers.find((item) => item.email === checkEmail);
    //     if (findedUser) {
    //       findedUser.name = changeObj.name;
    //       findedUser.age = changeObj.age;
    //     }
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify(customers));
    //     res.end();
    //   });
    // }
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(JSON.stringify({ messge: "finished" }));
    res.end();
  }
});

server.listen(port, () => {
  console.log("I love ma ma");
});
