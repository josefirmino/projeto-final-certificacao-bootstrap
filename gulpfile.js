const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
const notify 	= require("gulp-notify");
const htmlmin = require("gulp-htmlmin");
const del 		= require("del");

gulp.task("clean:css", function() {
	del("./dist/css");
});

gulp.task("sass", ["clean:css"], () => {
	gulp.src("./src/scss/**/*.scss")
	.pipe(sass({outputStyle: "compressed"}))
	.on("error", sass.logError)
	.pipe(gulp.dest("./dist/css"));
});

gulp.task("html", () => {
	gulp.src("./src/index.html")
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
	gulp.watch("./src/**/*.scss", ["sass"]);
	gulp.watch("./src/components/bootstrap/scss/**/*.scss", ["sass"]);
	gulp.watch("./src/index.html", ["html"]);
});

gulp.task("default", ["sass", "html", "watch"]);