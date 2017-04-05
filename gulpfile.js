const gulp 			= require("gulp");
const sass 			= require("gulp-sass");
const htmlmin 	= require("gulp-htmlmin");
const uglify 		= require("gulp-uglify");
const concat 		= require("gulp-concat");
const notify 		= require("gulp-notify");
const del 			= require("del");


/* Task compila scss para css */
gulp.task("sass", () => {
	 gulp.src("./src/scss/*.scss")
	 .pipe(sass({outPutStyle: "compressed"}))
	 .pipe(gulp.dest("./dist/css"))
};

/* Task minificar o javascript */
gulp.task("js", () => {
	gulp.src("./src/js/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("./dist/js"))
};

/* Task minifica o html */
gulp.task("html", () => {
	gulp.src("./src/index.html")
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest("./dist/js"))
};

/* Task move fonts src para dist */
gulp.task("move-fonts", () => {
	gulp.src("./src/component/components-font-awesome/fonts/**")
	.pipe(gulp.dest("./dist/fonts"))
};

/* Task concatena arquivos padrões */
gulp.task("concat-js", () => {
	gulp.src([
		'./src/component/jquery/src/jquery.js',
		'./src/component/tether/dist/js/tether.js',
		'./src/component/bootstrap/dist/js/bootstrap.js'
	])
	.pipe(concat("app.js"))
	.pipe(gulp.dest("./dist/js"))
};