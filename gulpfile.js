// Import main module.
import gulp from "gulp";
//Import paths
import {path} from "./gulp/config/path.js";
// Import gulp tasks
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";

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
}

const mainTask = gulp.parallel(copy, html)

// Gulp dev script
const dev = gulp.series(reset, mainTask, watcher);

// Execution of the default script.
gulp.task('default', dev);
