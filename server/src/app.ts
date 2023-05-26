require("dotenv").config();
import express, { Request, Response } from "express";
import config from "config";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function bootstrap() {
  // Testing
  app.get("/api/healthchecker", async (_, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "success",
    });
  });

  app.get("/api/users", async (_, res: Response) => {
    try {
      const allUsers = await prisma.user.findMany();
      return res.json({
        success: true,
        data: allUsers,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const newTodo = await prisma.user.create({
        data: {
          email,
          password,
        },
      });
      return res.json({
        success: true,
        data: newTodo,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  });

  const port = config.get<number>("port");
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
