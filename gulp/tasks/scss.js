// Task for convert SCSS files to CSS
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Minification CSS files.
import webpCss from "gulp-webpcss"; // Display WEBP images.
import autoPrefixer from "gulp-autoprefixer"; // Add prefix for styles (for Cross browser)
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Groups media queries.



const sass = gulpSass(dartSass);
export const scss = () => {
  // Return source folder with enabled source map.
  return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev })
    // Display errors in pop-up.
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Replace from alias to path to image.
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    // Determinate style of the compiled file.
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    // Groups media queries in compiled files.
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      )
    )
    // .pipe(groupCssMediaQueries())
    // Add class for images.
    // IMPORTANT! Required additional JS logic to determine the browser compatibility with WEBP.
    // IMPORTANT! Works only with webp-converter@2.2.3.
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpCss({
          // Additional classed for browsers compatible/incompatible with WEBP.
          webpClass: '.webp',
          noWebpClass: '.no-webp'
        })
      )
    )
    // .pipe(webpCss({
    //   // Additional classed for browsers compatible/incompatible with WEBP.
    //   webpClass: '.webp',
    //   noWebpClass: '.no-webp'
    // }))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserList: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    // Add prefix to styles.
    // .pipe(autoPrefixer({
    //   grid: true,
    //   overrideBrowserList: ['last 3 versions'],
    //   cascade: true,
    // }))
    // Create/update compiled file in the Build folder.
    // IMPORTANT! Uncomment if you need to get an uncompressed CSS file.
    .pipe(app.gulp.dest(app.path.build.css))

    // Compress the CSS file.
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss()
      )
    )
    // .pipe(cleanCss())
    // Replace the suffix of the compiled  CSS file.
    .pipe(rename({
      extname: ".min.css"
    }))
    // Create/update compiled file in the Build folder.
    .pipe(app.gulp.dest(app.path.build.css))
    // Update styles in a browser in real-time.
    .pipe(app.plugins.browserSync.stream());
}
