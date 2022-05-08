const { sequelize } = require("./models");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5001;

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`🚀 server launched at port ${process.env.PORT || 5001}. 🚀`);
});
