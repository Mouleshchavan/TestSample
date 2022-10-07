const connect = require("./configs/db");
const app = require("./index");
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connect();
  console.log("listening on port", port);
});