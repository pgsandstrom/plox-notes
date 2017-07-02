import React from 'react';
import restify from 'restify';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import fs from 'fs';

import App from './../../client/src/app';

const routes = ['/', '/:noteId'];

const css = fs.readFileSync('./public/static/styles.css', 'utf8');

export default (server) => {
  server.get(
    /\/static\/?.*/,
    restify.serveStatic({
      // TODO currently we use the messy path public/static since webpack overwrites __dirname or something
      // directory: __dirname,
      directory: 'public',
    }),
  );
  server.get(
    /.*(png|manifest.json)/,
    restify.serveStatic({
      // TODO currently we use the messy path public/static since webpack overwrites __dirname or something
      // directory: __dirname,
      directory: 'public',
    }),
  );
  server.get('/:noteid', (req, res, next) => {
    try {
      const match = routes.reduce(
        (acc, route) => matchPath(req.url, route, { exact: true }) || acc,
        null,
      );
      if (!match) {
        res.send(404, '404 noob');
        return;
      }
      const reactHtml = ReactDOMServer.renderToString(
        <StaticRouter context={{}} location={req.url}>
          <App />
        </StaticRouter>,
      );
      // console.log(`url: ${req.url}`);
      // console.log(`react html: ${reactHtml}`);
      const html = renderHtml(reactHtml);
      // res.setHeader('content-type', 'text/html; charset=UTF-8');
      res.setHeader('content-type', 'text/html');
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html',
      });
      res.write(html);
      res.end();
      next();
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      res.send(e.stack);
    }
  });
};

const renderHtml = reactHtml => `
      <!DOCTYPE html>
      <html lang="sv">
      <head>
      <meta name="viewport" content="width=device-width, user-scalable=no">
      <meta charset="utf-8"/>
      <title>Bös</title>
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/manifest.json">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
      <meta name="theme-color" content="#ffffff">
      <style type="text/css">${css}</style>
      </head>
      <body>
      <div id="content">${reactHtml}</div>
      <script src="/static/client.bundle.js"></script>
      </body>
      </html>`;
