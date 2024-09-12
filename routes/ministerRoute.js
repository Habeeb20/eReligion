import express from "express"
import { register, login, getMinisterProfile } from "../controllers/ministerController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/minister/:ministerId', getMinisterProfile);


export default router
