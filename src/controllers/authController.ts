import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../config";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  console.log("rgergtre");
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role: "user" },
    });
    // @ts-ignore
    delete user.password;
    // @ts-ignore
    delete user.role;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    // @ts-ignore
    delete user.password;
    // @ts-ignore
    delete user.role;
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
