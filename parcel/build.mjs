/* eslint-disable import/no-extraneous-dependencies, no-console */
import { Parcel } from '@parcel/core';
import config from './parcel.config.mjs';

const bundler = new Parcel({
  ...config,
  targets: {
    default: {
      distDir: config.defaultTargetOptions.distDir,
      publicUrl: '/test-ghp/',
      optimize: true,
    },
  },
  mode: 'production',
  env: {
    NODE_ENV: 'production',
  },
});

(async function iife() {
  try {
    const { bundleGraph, buildTime } = await bundler.run();
    const bundles = bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err.diagnostics);
  }
}());
