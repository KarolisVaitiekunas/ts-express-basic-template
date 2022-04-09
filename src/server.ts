import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const app = express();

//Allow all requests from all domains & localhost
app.all('/*', function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', { params: { albumId } });

  res.json(data);
});

app.get('/photos/:id', async (req, res) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);

  res.json(data);
});

app.listen(3001);
