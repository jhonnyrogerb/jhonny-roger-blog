$(document).ready(function(){
	var iScrollPos = 0;
	var header = $('#sd-header');
	var htmlHeight = $("html").height();

	$(window).scroll(function () {
		if(header.css("position") === "fixed"){

			var iCurScrollPos = $(this).scrollTop();

			if (iCurScrollPos > 100) {
				if(!header.hasClass("inverted")){
					header.addClass("inverted")
					$('#sd-logo').addClass("inverted")
					$('#sd-nav-menu').addClass("inverted")
				}
			} else {
				if(header.hasClass("inverted")){
					header.removeClass("inverted")
					$('#sd-logo').removeClass("inverted")
					$('#sd-nav-menu').removeClass("inverted")
				}
			}


			if(iCurScrollPos > iScrollPos && iCurScrollPos > htmlHeight - 100){
				header.slideUp(200)
			}else{
				header.slideDown(200)
			}

			iScrollPos = iCurScrollPos;
		}
	});
});
