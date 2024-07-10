import replace from "gulp-replace"; // The replace plugin.
import plumber from "gulp-plumber"; // The errors handler plugin.
import notify from "gulp-notify"; // The notification plugin.
import browserSync from "browser-sync" // The Browser Sync plugin.
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
}
