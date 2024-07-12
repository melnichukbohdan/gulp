// Task for handle JS files.
import webpack from "webpack-stream";

export const js = () => {
  // Return source folder with enabled source map.
  return app.gulp.src(app.path.src.js, {sourcemaps: true})
    // Display errors in pop-up.
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Compiled file.
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.min.js',
      }
    }))
    // Create/update compiled file in the Build folder.
    .pipe(app.gulp.dest(app.path.build.js))
    // Update styles in a browser in real-time.
    .pipe(app.plugins.browserSync.stream());
}
