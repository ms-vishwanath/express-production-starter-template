import { Request, Response, Router } from "express";
import userRouter from "./user.router";

const router = Router();

router.use("/user", userRouter);
router.use("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
});

export default router;
