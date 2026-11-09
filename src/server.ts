import express from 'express';

const app = express();

app.get('/test', (_req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Serveur démarré on port: ' + port);
});