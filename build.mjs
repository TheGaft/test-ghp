import { Parcel } from "@parcel/core";
import config from "./parcel.config.mjs";

let bundler = new Parcel({
  ...config,
  targets: {
    default: {
      distDir: config.defaultTargetOptions.distDir,
      publicUrl: "/test-ghp/",
      optimize: true,
    },
  },
  mode: "production",
  env: {
    NODE_ENV: 'production'
  }
});

try {
  let { bundleGraph, buildTime } = await bundler.run();
  let bundles = bundleGraph.getBundles();
  console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
  console.log(err.diagnostics);
}
