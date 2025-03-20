import express from "express";

import {getData } from "../controllers/data.js"
import { contactUs } from "../controllers/contactUs.js";
import {getPNRData} from "../controllers/pnrData.js";

const router = express.Router();

router.post("/data", getData);

router.post("/contact-us", contactUs);

router.post("/getPNRData", getPNRData);

export default router;
