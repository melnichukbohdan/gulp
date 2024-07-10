// Task for open localhost in browser.
export const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`
    },
    notify:false,
    port: 3000,
  })
}
