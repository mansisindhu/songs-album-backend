const app = require("./index");

const connect = require("./src/configs/db");

app.listen(1234, async () => {
    await connect()
    console.log("connected at 1234");
})