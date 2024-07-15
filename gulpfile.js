// Import main module.
import gulp from "gulp";
//Import paths
import {path} from "./gulp/config/path.js";
// Import gulp tasks
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/tasks/ fonts.js";

// Import plugins.
import {plugins} from "./gulp/config/plugins.js";

// Add values to the global App variable.
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Create the gulp watcher.
function watcher() {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
}

// Sequential processing of fonts.
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// The main tasks.
const mainTask = gulp.parallel(fonts, copy, html, scss, js, images)

// Gulp scripts
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask)

// Export scripts
export { dev }
export { build }

// Execution of the default script.
gulp.task('default', dev);
