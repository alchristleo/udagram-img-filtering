import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

// Read our env config
dotenv.config();

// Set the network port
const port = process.env.PORT || 8082;

// Set the config api key
const apiKey = process.env.API_KEY;

// Init the Express application
const app = express();

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/filteredimage", async (req: Request, res: Response) => {
  let { image_url }: any = req.query;

  let api_key = req.header("X-API-Key");

  if(!api_key || api_key != apiKey ){
    return res.status(401).send({ auth: false, message: 'Invalid api key.' });
  }

  if (!image_url) {
    return res.status(422).send({ auth: true, message: 'image_url is required.' });
  }

  let filteredPath = await filterImageFromURL(image_url);

  res.status(200).sendFile(filteredPath, () => { deleteLocalFiles([filteredPath]); });
} );

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req: Request, res: Response) => {
  res.send("try GET /filteredimage?image_url={{}}")
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
