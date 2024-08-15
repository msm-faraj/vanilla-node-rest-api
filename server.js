const http = require("http");
const url = require("url");
const products = require("./data/products.json");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/html");
  // res.write("<h1>This is a H1<h1>");
  // res.end();
  if (req.url === "/api/products" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Route not Found" }));
    res.end();
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
