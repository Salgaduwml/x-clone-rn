import express from "express";
import cors from "cors";

const app = express();

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
