const express = require("express");
const cors = require("cors");

// Assuming your routes are defined in another file, e.g., './routes'
// const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Define allowed origins for CORS
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? // TODO: Replace with your actual Vercel frontend URL
      [
        "https://dashboard-bt525tfcs-tequila01007-gmailcoms-projects.vercel.app/",
      ]
    : ["http://localhost:5173", "http://localhost:3000"];

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add other middleware and routes here
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
