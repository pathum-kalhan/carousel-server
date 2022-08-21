import express, { Router } from "express";
import multer from "multer";
import Image from "../models/images.model"
const router = Router();

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  // @ts-ignore
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "./uploads");
  },
  // @ts-ignore
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, file.originalname);
  },
});
// const upload = multer({ storage: storage })

const upload = multer({ storage: storage });
router.post(
  "/upload-images",
  upload.single("image"),
  async (req: express.Request, res: express.Response) => {
    try {
      if (req.file) {
        const { path, originalname } = req.file;
        const {title,subTitle} = req.body;
        const data = new Image({
          path: path,
          fileName: originalname,
          title,
          subTitle
        });

        await data.save();
        return res.sendStatus(200);
      }else{
        return res.sendStatus(400)
      }

    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

export default router;
