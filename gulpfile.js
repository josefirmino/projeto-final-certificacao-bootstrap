const gulp 				= require("gulp");
const sass 				= require("gulp-sass");
const uglify			= require("gulp-uglify");
const notify 			= require("gulp-notify");
const htmlmin 		= require("gulp-htmlmin");
const concat 			= require("gulp-concat");
const del 				= require("del");
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

gulp.task("clean:css", function() {
	del("./dist/css");
});

gulp.task("sass", ["clean:css"], () => {
	gulp.src("./src/scss/**/*.scss")
	.pipe(sass({outputStyle: "compressed"}))
	.on("error", sass.logError)
	.pipe(gulp.dest("./dist/css"))
	.pipe(browserSync.stream());
});

gulp.task("javascript", () => {
	gulp.src("./src/js/**/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("./dist/js"))
	.pipe(browserSync.stream());
});

gulp.task("move-fonts", () => {
	gulp.src("./src/components/components-font-awesome/fonts/**")
	.pipe(gulp.dest("./dist/fonts"));
});

gulp.task("concat-js", () => {
	gulp.src([
		"./src/components/jquery/dist/jquery.js",
		"./src/components/tether/dist/js/tether.js",
		"./src/components/bootstrap/dist/js/bootstrap.js"
	])
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.stream());
});

gulp.task("html", () => {
	gulp.src("./src/index.html")
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest("./dist"))
	.pipe(browserSync.stream());
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("./src/**/*.scss", ["sass"]);
		gulp.watch("./src/components/bootstrap/scss/**/*.scss", ["sass"]);
		gulp.watch("./src/index.html", ["html"]);
		gulp.watch("./src/js/**/*.js", ["javascript"]);

    gulp.watch("./dist/**/*.css").on("change", reload);
		gulp.watch("./dist/index.html").on("change", reload);
		gulp.watch("./dist/js/**/*.js").on("change", reload);

});


gulp.task("build", ["concat-js", "move-fonts"]);
gulp.task("default", ["sass", "html", "javascript", "concat-js", "build", "server"]);