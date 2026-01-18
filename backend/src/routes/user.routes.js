import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  registerUser,
  checkMatch,
  updateCandidate,
  loginUser,
  logoutUser
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const userRouter = Router();


userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);


userRouter.route("/logout").post(verifyJWT, logoutUser);

userRouter.route("/match").post(
  verifyJWT,
  checkMatch
);

userRouter.route("/update").post(
  verifyJWT,
  updateCandidate
);

export { userRouter };