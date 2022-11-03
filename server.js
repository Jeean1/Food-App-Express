const dotenv = require("dotenv");
const { app } = require("./app");
const { initModel } = require("./models/initModels");
const { db } = require("./utils/dataBase.utils");

dotenv.config({ path: "./config.env" });

const startSever = async () => {
  try {
    // validation authentications of our database
    await db.authenticate();

    //Init Associations

    initModel();

    // sincronize database
    await db.sync();

    // set server to listen
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log("Express App Running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startSever();

// create a our database in postgres
// create tables / models
