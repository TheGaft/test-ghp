/* eslint-disable import/no-extraneous-dependencies, no-console */
import { Parcel } from '@parcel/core';
import config from './parcel.config.mjs';

const PORT = 8801;

const bundler = new Parcel({
  ...config,
  mode: 'development',
  env: {
    NODE_ENV: 'development',
  },
  serveOptions: {
    port: PORT,
  },
  hmrOptions: {
    port: PORT,
  },
});

(async function iife() {
  await bundler.watch((err, event) => {
    if (err) {
    // fatal error
      throw err;
    }

    if (event.type === 'buildSuccess') {
      const bundles = event.bundleGraph.getBundles();
      console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
    } else if (event.type === 'buildFailure') {
      console.log(event.diagnostics);
    }
  });
}());
