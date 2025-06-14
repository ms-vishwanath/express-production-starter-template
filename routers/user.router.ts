import { Router } from "express";
import userControllers from "@/controllers/user-controllers";
import { validateBody } from "@/middlewares/validators/validator.middleware";
import { createUserValidation } from "@/middlewares/validators/user.validation";

const router = Router();

router.post(
  "/",
  validateBody(createUserValidation),
  userControllers.createUserController
);

router.put("/", userControllers.updateUserController);
router.delete("/", userControllers.deleteUserController);

export default router;
