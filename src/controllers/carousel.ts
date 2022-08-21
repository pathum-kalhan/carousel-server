import express, { Router } from "express";
import * as Yup from "yup";
import data from "../utils/images-list";
const router = Router();

const SlidesValidationSchema = Yup.object().shape({
  slides: Yup.number()
    .transform((value) => Math.trunc(value))
    .min(1, "Minimum number for the slides parameter is 1.")
    .max(10, "Maximum number for the slides parameter is 10."),
});

router.get("/carousel", async (req: express.Request, res: express.Response) => {
  try {
    const query = await SlidesValidationSchema.validate(req.query);

    const { slides } = query;

    const content = data.slice(0, slides);

    res.status(200).json(content);
  } catch (error) {
    // @ts-ignore
    if (error.errors && error.errors.length) {
      // @ts-ignore
      return res.status(500).json(error.errors[0]);
    }
    return res.sendStatus(500);
  }
});

export default router;
