require("dotenv").config();
const mongoose = require("mongoose");

exports.connectToDB = async () => {
  const password = encodeURIComponent("lavanya@63");
  const DBCONNECTIONSTRING = `mongodb+srv://pruthvi:${password}@pruthvi.wbrusyz.mongodb.net/ContactManager?retryWrites=true&w=majority`;
  try {
    const connect = await mongoose.connect(DBCONNECTIONSTRING);
    console.log(
      `connection to database is successfull ${connect.connection.name}`
    );
  } catch (err) {
    console.log(`err ${err}`);
    process.exit(1);
  }
};
