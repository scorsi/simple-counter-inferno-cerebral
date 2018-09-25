const {FuseBox, Sparky, BabelPlugin} = require("fuse-box");

let fuse = undefined;

const fuseOptions = {
  homeDir: "./src/",
  output: "dist/$name.js",
  sourceMaps: {inline: false, vendor: false},
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin({
      config: {
        presets: ["es2015"],
        plugins: [["inferno"], ["cerebral"]],
      },
    }),
  ]
};
const fuseClientOptions = {
  ...fuseOptions
};
const fuseServerOptions = {
  ...fuseOptions
};

Sparky.task("clean", () => {
  Sparky.src("dist")
    .clean("dist")
    .exec();
});

Sparky.task("config", () => {
  fuse = FuseBox.init(fuseOptions);
  fuse.dev();
});

Sparky.task("client", () => {
  fuse.opts = fuseClientOptions;
  fuse.bundle("client/bundle")
    .target("browser@esnext")
    .watch("src/client/**")
    .hmr()
    .instructions("> client/index.js");
});

Sparky.task("server", () => {
  fuse.opts = fuseServerOptions;
  fuse
    .bundle("server/bundle")
    .watch("**")
    .target("server@esnext")
    .instructions("> [server/index.js]")
    .completed(proc => {
      proc.require({
        close: ({FuseBox}) => FuseBox.import(FuseBox.mainFile).shutdown()
      });
    });
});

Sparky.task("dev", ["clean", "config", "client", "server"], () => {
  fuse.run();
});
