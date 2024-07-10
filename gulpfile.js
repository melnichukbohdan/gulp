// Import main module.
import gulp from "gulp";
//Import paths
import {path} from "./gulp/config/path.js";
// Import gulp tasks
import {copy} from "./gulp/tasks/copy.js";

// Add values to the global App variable.
global.app = {
  path: path,
  gulp: gulp,
}

// Execution of the default script.
gulp.task('default', copy);
