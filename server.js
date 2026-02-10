const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leadsRoutes = require("./routes/leads");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadsRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/minicrm") // ✅ ONE DB ONLY
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
