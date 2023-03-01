const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");


const init = async () => {
  try {
    await db.seed();
    await db.sync();
  } catch (ex) {
    // start listening (and create a 'server' object representing our server)
    // app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    console.log(ex);
  }
};
init();
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
