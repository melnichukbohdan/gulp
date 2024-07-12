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

// Import plugins.
import {plugins} from "./gulp/config/plugins.js";

// Add values to the global App variable.
global.app = {
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

const mainTask = gulp.parallel(copy, html, scss, js, images)

// Gulp dev script
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));

// Execution of the default script.
gulp.task('default', dev);
