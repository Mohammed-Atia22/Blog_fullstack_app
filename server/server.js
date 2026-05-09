require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const app = express();
const PORT = process.env.PORT || 5000;
const {verifyToken} = require("./middlewares/auth.middleware");



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "/public")));


app.use("/api/auth", authRoutes);
app.use("/api/data", postRoutes);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/login.html"));
// });

app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});
