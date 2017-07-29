$(document).ready(function(){
	var iScrollPos = 0;
	var header = $('.header');
	var htmlHeight = $("#sd-main-post").height();

	$('body').on('click', function(){
		$("#search-results ul").html("")
	})

	$(window).scroll(function () {
		if($("#search-results ul li").length == 0){
			header.css("position", "fixed")
		}else{
			header.css("position", "relative")
		}

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

			if(iCurScrollPos > iScrollPos && iCurScrollPos > htmlHeight - 200){
				header.slideUp(200)
			}else{
				header.slideDown(200)
			}

			iScrollPos = iCurScrollPos;
		}
	});
	
	$.getJSON('/index.json', function(data2){
		$.getJSON('/search-index.json', function(data){
			var idx = lunr.Index.load(data);

			console.log(idx)

			$(".search__input").on('keyup keydown', function(){
				var response = idx.search($(".search__input").val().toLowerCase())
				$(".search__results ul").html("")

				if(!header.hasClass("inverted")){
					header.addClass("inverted")
				}
				
				response.forEach(function(item, index){
					var post = data2[item.ref]
					$(".search__results ul").append("<li><a href='" + post.ref + "'>" + post.title + "</a></li>")
				})
			})
		})
	})
})


