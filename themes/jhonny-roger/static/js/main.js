$(document).ready(function(){
	var iScrollPos = 0;
	var header = $('.header');
	var htmlHeight = $("#sd-main-post").height();
	var searchResultList = $(".search__list");
	var searchResultItems = $(".search__item")
	var inputSearch = $(".search__input");

	$('body').on('click', function(){
		searchResultList.html("")
	})

	$(window).scroll(function () {
		if(searchResultItems.length == 0){
			header.css("position", "fixed")
		}else{
			header.css("position", "relative")
		}

		if(header.css("position") === "fixed"){
			var iCurScrollPos = $(this).scrollTop();

			if (iCurScrollPos > 100) {
				if(!header.hasClass("inverted")){
					header.addClass("inverted")
				}
			} else {
				if(header.hasClass("inverted")){
					header.removeClass("inverted")
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
	
	$.getJSON('/index.json', function(postsMap){
		$.getJSON('/search-index.json', function(indexMap){
			var idx = lunr.Index.load(indexMap);

			inputSearch.on('keyup keydown', function(){
				var response = idx.search(inputSearch.val().toLowerCase())
				searchResultList.html("")

				if(!header.hasClass("inverted")){
					header.addClass("inverted")
				}
				
				response.forEach(function(item, index){
					var post = postsMap[item.ref]
					searchResultList.append("<li class='search__item'><a class='search__link' href='" + post.ref + "'>" + post.title + "</a></li>")
				})
			})
		})
	})
})


