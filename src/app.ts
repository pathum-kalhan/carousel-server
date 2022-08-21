import express from "express";
// import Yup, { object } from "yup";
import * as Yup from "yup";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const data = [
  // {
  //   image:
  //     "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   title: "Beautiful View of Moraine Lake",
  //   subTitle: "Canada",
  // },
  {
    image:
      "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Mountain Covered Snow Under Star",
    subTitle: "Sweden",
  },
  {
    image:
      "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Beautiful View of Moraine Lake",
    subTitle: "Finland",
  },
  {
    image:
      "https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Green Grass during Sunset",
    subTitle: "Kaluthara",
  },
  {
    image:
      "https://images.pexels.com/photos/609554/pexels-photo-609554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Green Field and Trees",
    subTitle: "Italy",
  },
  {
    image:
      "https://images.pexels.com/photos/130851/pexels-photo-130851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Red and Purple Flowers Outdoor",
    subTitle: "Germany",
  },
  {
    image:
      "https://images.pexels.com/photos/621720/pexels-photo-621720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Green and Red Leafed Trees",
    subTitle: "Germany",
  },
  {
    image:
      "https://images.pexels.com/photos/388304/pexels-photo-388304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Black Asphalt Road",
    subTitle: "Norway",
  },
];

const port = 3600;

const SlidesValidationSchema = Yup.object().shape({
  slides: Yup.number()
    .transform((value) => Math.trunc(value))
    .min(1, "Minimum number for the slides parameter is 1.")
    .max(10, "Maximum number for the slides parameter is 10."),
});

app.get(
  "/api/carousel",
  async (req: express.Request, res: express.Response) => {
    try {
      const query = await SlidesValidationSchema.validate(req.query);

      const { slides } = query;

      const content = data.slice(0, slides);

      res.status(200).json(content);
    } catch (error) {
      // @ts-ignore
      if(error.errors && error.errors.length){
        // @ts-ignore
       return res.status(500).json(error.errors[0])
      }
      return res.sendStatus(500);
    }
  }
);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${port}`);
});
