$(document).ready(function(){
	var num = numberOfScreens;

	for(var i=1;i<=num;i++){
		$('#name'+i).html(blockName[i]);
	}

	
	if(hoverEffect){
		for(i=1;i<=num;i++){
			$('<style>#wrapper'+i+' div:hover{border: 1px #fff solid;box-shadow: 0px 0px 5px #fff;margin-left:4px;margin-top:4px;}</style>').appendTo('head');
		};
	};
	
	if(searchEngine=='google'){
		search='http://www.google.com/search';
	}
	else if(searchEngine=='bing'){
		search='http://www.bing.com/search';
	}
	else if(searchEngine=='yahoo'){
		search='http://search.yahoo.com/bin/search';
	}
	else{
		search='http://www.google.com/search';
		searchEngine='google';
	};

	$('form').attr('action',search);
	$('input:text').css('background','#fff url(lib/'+searchEngine+'-back.png) center right no-repeat');
	
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var left1 = Math.floor((windowWidth - 975)/2);
	var left2 = left1 - 1045;
	var left3 = left1 - 2090;
	var wrapperTop = Math.floor((windowHeight - 480)/2)-80;
	
	$('#place').css({'left':left1,'top':wrapperTop});
	var wrapperPos = 1;
	$('#wrapper1 input:text').focus();
	var animDone = true;
	
	function anim1to2(){
		$('#wrapper1 input:text').focusout();
		animDone = false;
		$('#place').animate({
			left: left2,
		},1000,'circEaseOut',function() {
			$('#wrapper2 input:text').focus();
			animDone = true;
			wrapperPos = 2;
		});
		$('#button1to2').hide();			
		$('#button2to1').show();
		if(num>2){
			$('#button2to3').show();
			$('#button3to2').hide();
		};
	};
	
	function anim2to1(){
		$('#wrapper2 input:text').focusout();
		animDone = false;
		$('#place').animate({
			left: left1
		},1000,'circEaseOut',function() {
			$('#wrapper1 input:text').focus();
			animDone = true;
			wrapperPos = 1;
		});
		$('#button1to2').show();			
		$('#button2to1').hide();
		if(num>2){
			$('#button2to3').hide();
			$('#button3to2').hide();
		};		
	};
	
	function anim2to3(){
		$('#wrapper2 input:text').focusout();
		animDone = false;
		$('#place').animate({
			left: left3
		},1000,'circEaseOut',function() {
			$('#wrapper3 input:text').focus();
			animDone = true;
			wrapperPos = 3;
		});
		$('#button1to2').hide();
		$('#button3to2').show();
		$('#button2to1').hide();
		$('#button2to3').hide();	
	};
	
	function anim3to2(){
		$('#wrapper3 input:text').focusout();
		animDone = false;
		$('#place').animate({
			left: left2
		},1000,'circEaseOut',function() {
			$('#wrapper2 input:text').focus();
			animDone = true;
			wrapperPos = 2;
		});
		$('#button1to2').hide();
		$('#button3to2').hide();
		$('#button2to1').show();
		$('#button2to3').show();			
	};
	
	if(num>1){
		$('#button1to2').click(function(){
			anim1to2();
		});
		
		$('#button2to1').click(function(){
			anim2to1();
		});
		
		if(num>2){
			$('#button2to3').click(function(){
				anim2to3();
			});
			
			$('#button3to2').click(function(){
				anim3to2();
			});
		};
	};

	$(document).bind('keydown',function(event){ 
		if(event.keyCode == '39' || event.keyCode == '37'){
			event.preventDefault();
		}
		if(event.which=='39' && animDone){
			
			if(wrapperPos==1 && num>1){
				anim1to2();
			};
			if(wrapperPos==2 && num>2){
				anim2to3();
			};
		};
		if(event.which=='37' && animDone){
			
			if(wrapperPos==3){
				anim3to2();
			};
			if(wrapperPos==2){
				anim2to1();
			};			
		};
	}); 

	$(document).mousewheel(function(event, delta) {
		if (delta > 0 && animDone){
			if(wrapperPos==3){
				anim3to2();
			};
			if(wrapperPos==2){
				anim2to1();
			};
		}
		else if (delta < 0 && animDone){
			if(wrapperPos==1 && num>1){
				anim1to2();
			};
			if(wrapperPos==2 && num>2){
				anim2to3();
			};
		};		
		event.preventDefault();		
	});

	var j=0;
	for (j=0; j <= (num-1); j++) {		
		for(i=0;i<=11;i++){								
			var title = bookmark[j][i]['title'];
			var url = bookmark[j][i]['url'];
			var thumb = bookmark[j][i]['thumb'];
			if(thumb==''){
				$('#thumb'+(j+1)+'-'+(i+1)).html('<img id="net" src="lib/net-back.png" /><a href="'+url+'"><div class="title">'+title+'</div></a>');
			}
			else{
				$('#thumb'+(j+1)+'-'+(i+1)).html('<a href="'+url+'"><img src="thumbs/'+thumb+'" /></a>');
			}
		};
	};
	
	$('#search-engine1').click(function() {
		$('#engines1').fadeToggle('fast','circEaseOut');
		$('#wrapper1 input:text').css('background','#fff');
	});
	
	$('#google1').click(function() {
		$('#wrapper1 form').attr('action','http://www.google.com/search');
		$('#engines1').fadeToggle('fast','circEaseOut');
		$('#wrapper1 input:text').css('background','#fff url(lib/google-back.png) center right no-repeat');
		$('#wrapper1 input:hidden').detach();
		$('#wrapper1 input:first').attr('name','q');
		$('#wrapper1 input:text').focus();
	});
	
	$('#bing1').click(function() {
		$('#wrapper1 form').attr('action','http://www.bing.com/search');
		$('#engines1').fadeToggle('fast','circEaseOut');
		$('#wrapper1 input:text').css('background','#fff url(lib/bing-back.png) center right no-repeat');
		$('#wrapper1 input:hidden').detach();
		$('#wrapper1 input:first').attr('name','q');
		$('#wrapper1 input:text').focus();
	});
	
	$('#yahoo1').click(function() {
		$('#wrapper1 form').attr('action','http://search.yahoo.com/bin/search');
		$('#engines1').fadeToggle('fast','circEaseOut');
		$('#wrapper1 input:text').css('background','#fff url(lib/yahoo-back.png) center right no-repeat');
		$('#wrapper1 input:hidden').detach();
		$('#wrapper1 input:first').attr('name','q');
		$('#wrapper1 input:text').focus();
	});
	
	$('#wikipedia1').click(function() {
		$('#wrapper1 form').attr('action','http://www.wikipedia.org/search-redirect.php');
		$('#wrapper1 input:first').attr('name','search');
		$('<input type="hidden" name="language" value="en" />').appendTo('#wrapper1 form');
		$('#engines1').fadeToggle('fast','circEaseOut');
		$('#wrapper1 input:text').css('background','#fff url(lib/wikipedia-back.png) center right no-repeat');
		$('#wrapper1 input:text').focus();
	});
	
	if(num>1){
		$('#search-engine2').click(function() {
			$('#engines2').fadeToggle('fast','circEaseOut');
			$('#wrapper2 input:text').css('background','#fff');
		});
		
		$('#google2').click(function() {
			$('#wrapper2 form').attr('action','http://www.google.com/search');
			$('#engines2').fadeToggle('fast','circEaseOut');
			$('#wrapper2 input:text').css('background','#fff url(lib/google-back.png) center right no-repeat');
			$('#wrapper2 input:hidden').detach();
			$('#wrapper2 input:first').attr('name','q');
			$('#wrapper2 input:text').focus();
		});
		
		$('#bing2').click(function() {
			$('#wrapper2 form').attr('action','http://www.bing.com/search');
			$('#engines2').fadeToggle('fast','circEaseOut');
			$('#wrapper2 input:text').css('background','#fff url(lib/bing-back.png) center right no-repeat');
			$('#wrapper2 input:hidden').detach();
			$('#wrapper2 input:first').attr('name','q');
			$('#wrapper2 input:text').focus();
		});
		
		$('#yahoo2').click(function() {
			$('#wrapper2 form').attr('action','http://search.yahoo.com/bin/search');
			$('#engines2').fadeToggle('fast','circEaseOut');
			$('#wrapper2 input:text').css('background','#fff url(lib/yahoo-back.png) center right no-repeat');
			$('#wrapper2 input:hidden').detach();
			$('#wrapper2 input:first').attr('name','q');
			$('#wrapper2 input:text').focus();
		});
		
		$('#wikipedia2').click(function() {
			$('#wrapper2 form').attr('action','http://www.wikipedia.org/search-redirect.php');
			$('#wrapper2 input:first').attr('name','search');
			$('<input type="hidden" name="language" value="en" />').appendTo('#wrapper2 form');
			$('#engines2').fadeToggle('fast','circEaseOut');
			$('#wrapper2 input:text').css('background','#fff url(lib/wikipedia-back.png) center right no-repeat');
			$('#wrapper2 input:text').focus();
		});
	};
	
	if(num>2){
		$('#search-engine3').click(function() {
			$('#engines3').fadeToggle('fast','circEaseOut');
			$('#wrapper3 input:text').css('background','#fff');
		});
		
		$('#google3').click(function() {
			$('#wrapper3 form').attr('action','http://www.google.com/search');
			$('#engines3').fadeToggle('fast','circEaseOut');
			$('#wrapper3 input:text').css('background','#fff url(lib/google-back.png) center right no-repeat');
			$('#wrapper3 input:hidden').detach();
			$('#wrapper3 input:first').attr('name','q');
			$('#wrapper3 input:text').focus();
		});
		
		$('#bing3').click(function() {
			$('#wrapper3 form').attr('action','http://www.bing.com/search');
			$('#engines3').fadeToggle('fast','circEaseOut');
			$('#wrapper3 input:text').css('background','#fff url(lib/bing-back.png) center right no-repeat');
			$('#wrapper3 input:hidden').detach();
			$('#wrapper3 input:first').attr('name','q');
			$('#wrapper3 input:text').focus();
		});
		
		$('#yahoo3').click(function() {
			$('#wrapper3 form').attr('action','http://search.yahoo.com/bin/search');
			$('#engines3').fadeToggle('fast','circEaseOut');
			$('#wrapper3 input:text').css('background','#fff url(lib/yahoo-back.png) center right no-repeat');
			$('#wrapper3 input:hidden').detach();
			$('#wrapper3 input:first').attr('name','q');
			$('#wrapper3 input:text').focus();
		});
		
		$('#wikipedia3').click(function() {
			$('#wrapper3 form').attr('action','http://www.wikipedia.org/search-redirect.php');
			$('input:first').attr('name','search');
			$('<input type="hidden" name="language" value="en" />').appendTo('#wrapper3 form');
			$('#engines3').fadeToggle('fast','circEaseOut');
			$('#wrapper3 input:text').css('background','#fff url(lib/wikipedia-back.png) center right no-repeat');
			$('#wrapper3 input:text').focus();
		});
	};

	if(num<3){
		$('#name3').detach();
		$('#wrapper3').detach();
		$('#button2to3').detach();
		$('#button3to2').detach();
	};

	if(num<2){
		$('#name2').detach();
		$('#wrapper2').detach();
		$('#button1to2').detach();
		$('#button2to1').detach();
	};

});

