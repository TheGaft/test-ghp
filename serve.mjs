import { Parcel } from "@parcel/core";
import config from "./parcel.config.mjs";

const PORT = 8088;

let bundler = new Parcel({
  ...config,
  mode: "development",
  env: {
    NODE_ENV: "development",
  },
  serveOptions: {
    port: PORT,
  },
  hmrOptions: {
    port: PORT,
  },
});

await bundler.watch((err, event) => {
  console.log(event);
  if (err) {
    // fatal error
    throw err;
  }

  if (event.type === "buildSuccess") {
    let bundles = event.bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
  } else if (event.type === "buildFailure") {
    console.log(event.diagnostics);
  }
});
