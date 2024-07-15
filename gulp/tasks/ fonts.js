import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// The fonts task #1. Convert fonts from OTF to TFF.
export const otfToTtf = () => {
  // Search fonts files .otf.
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    // Display errors in pop-up.
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "Fonts",
        message: "Error: <%= error.message %>"
      }))
    )
    // Convert the font from OTF to TTF format.
    .pipe(fonter({
      formats: ['ttf']
    }))
    // IMPORTANT! ADD the TTD fonts in the SOURCE folder.
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))

}

// The fonts task #2. Convert fonts from TFF to WOFF and WOFF2.
export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    // Display errors in pop-up.
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "Fonts",
        message: "Error: <%= error.message %>"
      }))
    )
    // // Convert the font from OTF to TTF format.
    // .pipe(fonter({
    //   subset: [66,67,68, 69, 70, 71],
    //   formats: ['woff']
    // }))
    // // IMPORTANT! ADD the TTD fonts in the BUILD folder.
    // .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Search fonts files .ttf.
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Convert the font from TTF to WOFF2 format.
    .pipe(ttf2woff2())
    // IMPORTANT! WOFF2 the TTD fonts in the BUILD folder.
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

// The fonts task #3. Add fonts to SCSS file.
export const fontsStyle = () => {
  // SCSS file for connection fonts to style sheets.
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Check  if fonts files exist.
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {

    if (fontsFiles) {
      // Check if fonts.scss exist.
      if (!fs.existsSync(fontsFile)) {
        //  If it is absent, creates it.
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          // Writes fonts connection to the styles file.
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('.')[0]
              ? fontFileName.split('.')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extraLight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            // fs.appendFile(fontsFile,
            //   `font-face {
            //     font-familily: ${fontName};
            //     font-display: swap;
            //     src: url("../fonts/${fontName}.woff2) format("woff2), url("../fonts/${fontName}.woff2) format("woff);
            //     font-weight: ${fontWeight};
            //     font-style: normal;
            //   }`, cb);
            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);

          }
        }
      } else {
        // If file exist in the developer console.
        console.log("The scss/fonts.scss already exist. To add the new file, one needs to delete the previous one.")
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
}
