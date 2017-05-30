import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from '../config';
import { pg } from '../db/connector';

import byPassAuth from './middleware/byPassAuth';
import graphql from './middleware/graphql';

import renderer from './middleware/renderer';

const app = express();

// serve the app
const PORT = process.env.PORT || config.port;

/* eslint-disable no-console */
const connectionError = (error, message) => {
  console.log('---------- error ----------');
  console.log(`[ ${message} ]`);
  console.log('---------- ----- ----------');
  console.log(error);
  console.log('---------- error ----------');
  process.exit(1);
};

try {
  (async () => {
    const pPool = await pg.connect()
      .catch(err => connectionError.apply(null,
        [err, 'postgres connection error !']));

    app.use(compression());
    app.use(bodyParser.json());

    app.use('/', express.static(path.join(__dirname, '../build/')));
    app.use('/', express.static(path.join(__dirname, '../public/')));

    app.use(compression());
    app.use(bodyParser.json());

    app.use('/graphql', byPassAuth(pPool));
    app.use('/graphql', graphql({
      pPool,
    }));

  // app.get('/:app/*', renderer);
    app.get('*', renderer);
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`app is listening on port ${PORT}`);
      }
    });
  })();
} catch (err) {
  console.log('error here');
}
/* eslint-disable no-console */

