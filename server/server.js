const express = require("express");
const authRoutes = require("./routes/authRoutes");
const resumesRoutes = require("./routes/resumesRoutes");
const connectWithDB = require("./config/mongodbConfig");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

// Connect with database
connectWithDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({ credentials: true, origin: "https://jobfitanalyzer.netlify.app/" })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// alow access to the client
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://jobfitanalyzer.netlify.app/"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Allow sending cookies
  next();
});

// Authentication routes
app.use("/api/v1", authRoutes);

// Resume routes
app.use("/api/v1/resumes", resumesRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
