// Import main module.
import gulp from "gulp";
//Import paths
import {path} from "./gulp/config/path.js";
// Import gulp tasks
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";

// Add values to the global App variable.
global.app = {
  path: path,
  gulp: gulp,
}

// Create the gulp watcher.
function watcher() {
  gulp.watch(path.watch.files, copy)
}

// Gulp dev script
const dev = gulp.series(reset, copy, watcher);

// Execution of the default script.
gulp.task('default', dev);
