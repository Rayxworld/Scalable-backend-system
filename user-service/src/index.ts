import "reflect-metadata";
import express from "express";
import cors from "cors";
import { initializeDatabase } from "./data-source";
import { UserController } from "./controllers/UserController";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.post("/users", UserController.create);
app.get("/users", UserController.getAll);
app.get("/users/:id", UserController.getById);

// Error Handling
app.use(errorHandler);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
  });
});
