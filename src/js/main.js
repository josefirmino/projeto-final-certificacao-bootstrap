;(function($){

	'use strict';

	function showOffcanvas() {
		$("html").addClass("open-sidebar");
	}

	function hideOffcanvas() {
		$("html").removeClass("open-sidebar");
	}


	$("html, body").on("click", function(e) {
		if(e.target === document.documentElement){
			hideOffcanvas();
		}
	});

	$(".js-open-offcanvas").on("click", function() {
		showOffcanvas();
	});
	

})(jQuery);