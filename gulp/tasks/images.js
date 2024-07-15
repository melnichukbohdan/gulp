import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
export const images = () => {
  // Return source folder with enabled source map.
  return app.gulp.src(app.path.src.images, {
      sourcemaps: true,
      encoding: false,
    })
    // Display errors in pop-up.
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      }))
    )
    // Checks images in the Build folder.
    .pipe(app.plugins.newer(app.path.build.images))
    // Create WebP images.
    .pipe(
      app.plugins.if(
        app.isBuild,
        webp()
      )
    )
    // Create/update compiled file in the Build folder.
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.images)
      )
    )
    // Get images in the src folder.
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.images)
      )
    )
    // Checks images in the Build folder.
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.images)
      )
    )
    // Compress images.
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          interlaced: true,
          optimizationLevel: 3
        })
      )
    )
    // Create/update compiled file in the Build folder.
    .pipe(app.gulp.dest(app.path.build.images))
    // Get SVG images.
    .pipe(app.gulp.src(app.path.src.svg))
    // Create/update compiled file in the Build folder.
    .pipe(app.gulp.dest(app.path.build.images))
    // Update styles in a browser in real-time.
    .pipe(app.plugins.browserSync.stream());
}
