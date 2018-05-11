// Fetch JSON DATA
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
function HomeView(){
	$('#movie-home').empty();
	$('.testimonial').empty();
	$('.testimonial').append('<div class="testimonial-overlay">\
            <div class="container">\
                <div class="row foot-test">\
                    <div class="col-md-2">\
                        <img src="images/developer_gaurav.jpg" alt="Gaurav">\
                    </div>\
                    <div class="col-md-10">\
                        <h2>Gaurav Jindal</h2>\
                        <h4><span>Website Developer, </span>TMDb</h4>\
                        <p>"The belief that complex systems require armies of designers and programmers is wrong. A system that is not understood in its entirety, or at least to a significant degree of detail by a single individual, should probably not be built."</p>\
                    </div>\
                </div>\
            </div>\
        </div>');
	$('#movie-home').css({
		'background-color': 'rgba(0,0,0,1)'
	});
	$('#movie-head').css({
		'padding-top': 0
	});
	$('#movie-home').append('<div class="row">\
            <div class="col-md-12">\
                <div id="carousel-movie" class="carousel slide">\
                    <div class="carousel-inner">\
                    </div>\
                    <ol class="carousel-indicators"></ol>\
                </div>\
            </div>\
        </div>');
	var data1 = (Get('https://api.themoviedb.org/3/movie/top_rated?api_key=3872304bae3e7e53adbdba5dca474162&language=en-US&page=undefined'));
	var data2 = (Get('https://api.themoviedb.org/3/movie/upcoming?api_key=3872304bae3e7e53adbdba5dca474162&language=en-US&page=undefined'));
	var data3 = (Get('https://api.themoviedb.org/3/movie/popular?api_key=3872304bae3e7e53adbdba5dca474162&language=en-US&page=undefined'));
	var data4 = (Get('https://api.themoviedb.org/3/movie/now_playing?api_key=3872304bae3e7e53adbdba5dca474162&language=en-US&page=undefined'));
	var parentObject=JSON.parse(data4);

	var i;
	for(i=0;i<10;i++)
		{
			var id=parentObject.results[i].id;
			var childObject=JSON.parse(Get('https://api.themoviedb.org/3/movie/'+id+'?api_key=3872304bae3e7e53adbdba5dca474162'));
			var len=childObject.genres.length;
			var j;
			var gen="";
			for(j=0;j<len;j++)
			{
				if(j!=len-1)
					gen+=childObject.genres[j].name+", ";
				else
					gen+=childObject.genres[j].name+".";
			}
			$('.carousel-indicators').append('<li data-target="#carousel-movie" data-slide-to="'+i+'"></li>');
			$('.carousel-inner').append('<div class="item" id="poster-image2"><img src="https://image.tmdb.org/t/p/w780/'+parentObject.results[i].backdrop_path+'" alt='+parentObject.results[i].title+'>\
				<h3>'+parentObject.results[i].title+'</h3><div id="rating-p2"><h4>'+parentObject.results[i].vote_average+'<i class="fa fa-star"></i></h4></div><p id="genre-p2">'+gen+'</p><p id="tag-p2">'+childObject.tagline+'</p></div>');
		}
  	$('.carousel-indicators li').first().addClass('active');
  	$('.carousel-inner div').first().addClass('active');
  	
  	$('.carousel').carousel({
  	interval: 500 * 5
	});
	setInterval(function(){
	var hght=$(window).height()-$('.navbar').height();
	$('#poster-image2 img').css({
		'height':Math.round(2*hght/3),
		'opacity':0.3
	});
	},10);
	$('#movie-categ').append('<div id="home-title">\
            	<div>\
                        <h4>Suggestions</h4>\
               	</div>\
            	</div>');
	var i;
	for(i=0;i<3;i++){
		var str="";
		var dtt;
		if(i==0)
			{
				dtt=data1;
			}
		if(i==1)
			{
				dtt=data2;
			}
		if(i==2)
			{
				dtt=data3;
			}
		var tempObject=JSON.parse(dtt);
		var j;
		for(j=0;j<19;j++){
			if(i==0&&j==1)
				continue;
			str+='<div class="item"><img src="https://image.tmdb.org/t/p/w780/'+tempObject.results[j].poster_path+'" alt='+tempObject.results[j].title+'></div>';
		}
		$('#movie-categ').append('<div class="row">\
			<div class="col-md-12"><div class="bxslider">\
			'+str+'\
			</div></div></div>');
		$('.bxslider').bxSlider({
        slideWidth: 200,
        auto: true,
        infiniteLoop: true,
        minSlides: 1, 
        maxSlides: 6,
        slideMargin:30
    });
	}


}
var pg=1;
function ListView(link,cont_id)
{

	var data = (Get(link+1));
	var parentObject=JSON.parse(data);
	var pg_total=parentObject.total_pages;
	var str="";
	var i,j;
	$('#movie-head').css({
		'padding-top': 100
	});

	data = (Get(link+pg));
		parentObject=JSON.parse(data);
	for(i=0;i<18;i+=2)
		{
		var block = '<div class="row"><div class="col-md-10 col-md-offset-1"><div class="row">';
		for(j=0;j<2;j++)
		{
			if(i+j<18)
			{
				var tempdata = (Get('https://api.themoviedb.org/3/movie/'+parentObject.results[i+j].id+'?api_key=3872304bae3e7e53adbdba5dca474162'));
				var tempObject=JSON.parse(tempdata);
	    		block+='<div class="col-md-6"><div class="row" id="single-block"><div class="col-md-5" style="padding: 0px">\
	    					<div>\
	    						<img id="poster-img" src="https://image.tmdb.org/t/p/w780/'+parentObject.results[i+j].poster_path+'" alt='+parentObject.results[i+j].title+'>\
	    					</div>\
	    				</div>\
	    				<div class="col-md-5">\
	    					<div id="movie-title">'+parentObject.results[i+j].title+'</div>\
	    				</div>\
	    				<div class="col-md-2" id="movie-rating"><p>'+parentObject.results[i+j].vote_average+'</p><i class="fa fa-star"></i></div>\
	    				</div></div>';
			}
		}
		block+='</div></div></div>';
		$(cont_id).append(block);
	}
        
	
}
$(document).ready(function(){
	'use strict';
	$('.navbar-nav li a').click(function(){
		'use strict';
		var idee=$(this).attr("id");
		$('.navbar-nav li a').parent().removeClass("active");
		$(this).parent().addClass("active");
		$('#movie-over').empty();
		$('#movie-head').empty();
		$('#movie-categ').empty();
		if (idee!="Home")
		{		
			$('#movie-home').empty();
    		$('.testimonial').empty();
			var data = 'https://api.themoviedb.org/3/movie/'+idee+'?api_key=3872304bae3e7e53adbdba5dca474162&language=en-US&page=';
			
			var str="";
			if(idee=="top_rated")
				str="Top Rated";
			if(idee=="upcoming")
				str="Upcoming";
			if(idee=="popular")
				str="Popular";
			if(idee=="now_playing")
				str="Now Playing";
			var blck='<div id="category-title">\
            	<div>\
                        <h4>'+str+'</h4>\
               	</div>\
            	</div>';
        	$('#movie-head').append(blck);
        	pg=1;
        	$('#movie-over').append("<div class='contaner' id='movie-cont'></div>");
        	$('#movie-over').append("<button id='show-more'>Show More<i class='fa fa-angle-down'></i></button>");
		
        	ListView(data,"#movie-cont");
        	$('#show-more').click(function(){
		pg++;
		ListView(data,"#movie-cont");
	if(pg==pg_total)
		document.getElementById("#show-more").disabled = true; 
		});
		}
		else
		{
			HomeView();
		}
	});
});
$(document).ready(function(){
	'use strict';
	$(window).scroll(function(){
		'use strict';
		if($(window).scrollTop()<80)
		{
			$('.navbar-toggle,#navbar-logo').css({
				'height':'50px'
			});
			$('.navbar-nav > li > a').css({
				'padding-top':'25px',
				'padding-bottom':'25px'
			});
			$('.navbar').css({
				'background-color': 'rgba(255,255,255,1)'
			});
			$('.move-up').css({
				'display': 'none'
			});
		}
		else
		{
			$('.move-up').css({
				'display': 'block'
			});
			$('.navbar-toggle,#navbar-logo').css({
				'height':'30px'
			});
			$('.navbar-nav > li > a').css({
				'padding-top':'15px',
				'padding-bottom':'15px'
			});
			$('.navbar').css({
				'background-color': 'rgba(255,255,255,0.5)'
			});
		}
	});
});
$(document).ready(function(){
	$('#move-top').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
		}
	}
});
});
$(document).ready(function(){
	HomeView();
	});
