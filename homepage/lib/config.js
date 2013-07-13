/* 
(c) 2011 Lubomir Krupa, CC BY-ND 3.0
*/

jQuery.fn.selText = function() {
    var obj = this[0];
    if ($.browser.msie) {
        var range = obj.offsetParent.createTextRange();
        range.moveToElementText(obj);
        range.select();
    } else if ($.browser.mozilla || $.browser.opera) {
        var selection = obj.ownerDocument.defaultView.getSelection();
        var range = obj.ownerDocument.createRange();
        range.selectNodeContents(obj);
        selection.removeAllRanges();
        selection.addRange(range);
    } else if ($.browser.safari) {
        var selection = obj.ownerDocument.defaultView.getSelection();
        selection.setBaseAndExtent(obj, 0, obj, 1);
    }
    return this;
}


$(document).ready(function(){
		
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
	
	for (var aa = 1; aa < 4; aa++){
		if(blockName[aa]==''){
			blockName[aa]='Name of block'+aa;
		}
	}
	
	$('#name1 span').html(blockName[1]);
	$('#name2 span').html(blockName[2]);
	$('#name3 span').html(blockName[3]);
	
/*	var bookmark = new Array();
	bookmark[0] = new Array();
	bookmark[1] = new Array();
	bookmark[2] = new Array();
	
	for (var a=0; a < 3; a++) {
		for (var b=0; b < 12; b++) {
			bookmark[a][b] = {
				'title':'',
				'url':'',
				'thumb':''
			};
		};
	};*/

	var dialogContentTop = Math.floor(($(window).height()-200)/2);
	$('div.dialogContent').css('top',dialogContentTop);
	$('#generate').css('left',(windowWidth-$('#generate').width())/2);
	$('#numberOfScreens').focus();
		
	$('#configDialog-screens button').click(function(event){
		event.preventDefault();
		var num = $('#numberOfScreens').val();
		var searchEngine = $('#searchEngine').val();
		var hoverEffect = $('input:radio[name=hover]:checked').val();
		$('#configDialog-screens').hide();

	$('#name1').hover(
		function(){
			$('#name1 img').fadeIn(400,'circEaseOut');
		},
		function(){
			$('#name1 img').fadeOut(400,'circEaseOut');
		}
	);
		
	$('#name2').hover(
		function(){
			$('#name2 img').fadeIn(400,'circEaseOut');
		},
		function(){
			$('#name2 img').fadeOut(400,'circEaseOut');
		}
	);
		
	$('#name3').hover(
		function(){
			$('#name3 img').fadeIn(400,'circEaseOut');
		},
		function(){
			$('#name3 img').fadeOut(400,'circEaseOut');
		}
	);
	
	for(var j=0;j<num;j++){
		for(k=0;k<12;k++){
			var top = ($('#thumb'+(j+1)+'-'+(k+1)).height()-50)/2;
			var left = ($('#thumb'+(j+1)+'-'+(k+1)).width()-50)/2;
			$('#thumb'+(j+1)+'-'+(k+1)).html('<img src="lib/config.png" style="top:'+top+'px; left:'+left+'px;"/><div class="thumbTitle"></div><div class="thumbUrl"></div><div class="thumbImage"></div>');
			$('#thumb'+(j+1)+'-'+(k+1)+' .thumbTitle').html(bookmark[j][k]['title']);
			$('#thumb'+(j+1)+'-'+(k+1)+' .thumbUrl').html(bookmark[j][k]['url']);
			$('#thumb'+(j+1)+'-'+(k+1)+' .thumbUrl').attr('title',bookmark[j][k]['url']);
			$('#thumb'+(j+1)+'-'+(k+1)+' .thumbImage').html(bookmark[j][k]['thumb']);
			$('#thumb'+(j+1)+'-'+(k+1)+' img').hide();
		};
		$('#wrapper'+(j+1)+' div').hover(
			function(){
				$(this).find('img').fadeIn(400,'circEaseOut');
			},
			function(){
				$(this).find('img').fadeOut(400,'circEaseOut');
			}
		);
	};
	
	
	$('#name1 img').click(function(){
		$('#configDialog-name1').fadeIn(400,'circEaseOut');
		$('#configDialog-name1 input').val(blockName[1]);
		$('#configDialog-name1 input').focus();
	});
	$('#name2 img').click(function(){
		$('#configDialog-name2').fadeIn(400,'circEaseOut');
		$('#configDialog-name2 input').val(blockName[2]);
		$('#configDialog-name2 input').focus();
	});
	$('#name3 img').click(function(){
		$('#configDialog-name3').fadeIn(400,'circEaseOut');
		$('#configDialog-name3 input').val(blockName[3]);
		$('#configDialog-name3 input').focus();
	});
	
	
	$('#thumb1-1 img').click(function(){
		$('#configDialog-1-1').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-1 input[name="title"]').val(bookmark[0][0]['title']);
		$('#configDialog-1-1 input[name="url"]').val(bookmark[0][0]['url']);
		$('#configDialog-1-1 input[name="image"]').val(bookmark[0][0]['thumb']);
		$('#configDialog-1-1 input[name="title"]').focus();
	});
	$('#thumb1-2 img').click(function(){
		$('#configDialog-1-2').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-2 input[name="title"]').val(bookmark[0][1]['title']);
		$('#configDialog-1-2 input[name="url"]').val(bookmark[0][1]['url']);
		$('#configDialog-1-2 input[name="image"]').val(bookmark[0][1]['thumb']);
		$('#configDialog-1-2 input[name="title"]').focus();
	});
	$('#thumb1-3 img').click(function(){
		$('#configDialog-1-3').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-3 input[name="title"]').val(bookmark[0][2]['title']);
		$('#configDialog-1-3 input[name="url"]').val(bookmark[0][2]['url']);
		$('#configDialog-1-3 input[name="image"]').val(bookmark[0][2]['thumb']);
		$('#configDialog-1-3 input[name="title"]').focus();
	});
	$('#thumb1-4 img').click(function(){
		$('#configDialog-1-4').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-4 input[name="title"]').val(bookmark[0][3]['title']);
		$('#configDialog-1-4 input[name="url"]').val(bookmark[0][3]['url']);
		$('#configDialog-1-4 input[name="image"]').val(bookmark[0][3]['thumb']);
		$('#configDialog-1-4 input[name="title"]').focus();
	});
	$('#thumb1-5 img').click(function(){
		$('#configDialog-1-5').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-5 input[name="title"]').val(bookmark[0][4]['title']);
		$('#configDialog-1-5 input[name="url"]').val(bookmark[0][4]['url']);
		$('#configDialog-1-5 input[name="image"]').val(bookmark[0][4]['thumb']);
		$('#configDialog-1-5 input[name="title"]').focus();
	});
	$('#thumb1-6 img').click(function(){
		$('#configDialog-1-6').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-6 input[name="title"]').val(bookmark[0][5]['title']);
		$('#configDialog-1-6 input[name="url"]').val(bookmark[0][5]['url']);
		$('#configDialog-1-6 input[name="image"]').val(bookmark[0][5]['thumb']);
		$('#configDialog-1-6 input[name="title"]').focus();
	});
	$('#thumb1-7 img').click(function(){
		$('#configDialog-1-7').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-7 input[name="title"]').val(bookmark[0][6]['title']);
		$('#configDialog-1-7 input[name="url"]').val(bookmark[0][6]['url']);
		$('#configDialog-1-7 input[name="image"]').val(bookmark[0][6]['thumb']);
		$('#configDialog-1-7 input[name="title"]').focus();
	});
	$('#thumb1-8 img').click(function(){
		$('#configDialog-1-8').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-8 input[name="title"]').val(bookmark[0][7]['title']);
		$('#configDialog-1-8 input[name="url"]').val(bookmark[0][7]['url']);
		$('#configDialog-1-8 input[name="image"]').val(bookmark[0][7]['thumb']);
		$('#configDialog-1-8 input[name="title"]').focus();
	});
	$('#thumb1-9 img').click(function(){
		$('#configDialog-1-9').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-9 input[name="title"]').val(bookmark[0][8]['title']);
		$('#configDialog-1-9 input[name="url"]').val(bookmark[0][8]['url']);
		$('#configDialog-1-9 input[name="image"]').val(bookmark[0][8]['thumb']);
		$('#configDialog-1-9 input[name="title"]').focus();
	});
	$('#thumb1-10 img').click(function(){
		$('#configDialog-1-10').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-10 input[name="title"]').val(bookmark[0][9]['title']);
		$('#configDialog-1-10 input[name="url"]').val(bookmark[0][9]['url']);
		$('#configDialog-1-10 input[name="image"]').val(bookmark[0][9]['thumb']);
		$('#configDialog-1-10 input[name="title"]').focus();
	});
	$('#thumb1-11 img').click(function(){
		$('#configDialog-1-11').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-11 input[name="title"]').val(bookmark[0][10]['title']);
		$('#configDialog-1-11 input[name="url"]').val(bookmark[0][10]['url']);
		$('#configDialog-1-11 input[name="image"]').val(bookmark[0][10]['thumb']);
		$('#configDialog-1-11 input[name="title"]').focus();
	});
	$('#thumb1-12 img').click(function(){
		$('#configDialog-1-12').fadeIn(400,'circEaseOut');		
		$('#configDialog-1-12 input[name="title"]').val(bookmark[0][11]['title']);
		$('#configDialog-1-12 input[name="url"]').val(bookmark[0][11]['url']);
		$('#configDialog-1-12 input[name="image"]').val(bookmark[0][11]['thumb']);
		$('#configDialog-1-12 input[name="title"]').focus();
	});
	
	$('#thumb2-1 img').click(function(){
		$('#configDialog-2-1').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-1 input[name="title"]').val(bookmark[1][0]['title']);
		$('#configDialog-2-1 input[name="url"]').val(bookmark[1][0]['url']);
		$('#configDialog-2-1 input[name="image"]').val(bookmark[1][0]['thumb']);
		$('#configDialog-2-1 input[name="title"]').focus();
	});
	$('#thumb2-2 img').click(function(){
		$('#configDialog-2-2').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-2 input[name="title"]').val(bookmark[1][1]['title']);
		$('#configDialog-2-2 input[name="url"]').val(bookmark[1][1]['url']);
		$('#configDialog-2-2 input[name="image"]').val(bookmark[1][1]['thumb']);
		$('#configDialog-2-2 input[name="title"]').focus();
	});
	$('#thumb2-3 img').click(function(){
		$('#configDialog-2-3').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-3 input[name="title"]').val(bookmark[1][2]['title']);
		$('#configDialog-2-3 input[name="url"]').val(bookmark[1][2]['url']);
		$('#configDialog-2-3 input[name="image"]').val(bookmark[1][2]['thumb']);
		$('#configDialog-2-3 input[name="title"]').focus();
	});
	$('#thumb2-4 img').click(function(){
		$('#configDialog-2-4').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-4 input[name="title"]').val(bookmark[1][3]['title']);
		$('#configDialog-2-4 input[name="url"]').val(bookmark[1][3]['url']);
		$('#configDialog-2-4 input[name="image"]').val(bookmark[1][3]['thumb']);
		$('#configDialog-2-4 input[name="title"]').focus();
	});
	$('#thumb2-5 img').click(function(){
		$('#configDialog-2-5').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-5 input[name="title"]').val(bookmark[1][4]['title']);
		$('#configDialog-2-5 input[name="url"]').val(bookmark[1][4]['url']);
		$('#configDialog-2-5 input[name="image"]').val(bookmark[1][4]['thumb']);
		$('#configDialog-2-5 input[name="title"]').focus();
	});
	$('#thumb2-6 img').click(function(){
		$('#configDialog-2-6').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-6 input[name="title"]').val(bookmark[1][5]['title']);
		$('#configDialog-2-6 input[name="url"]').val(bookmark[1][5]['url']);
		$('#configDialog-2-6 input[name="image"]').val(bookmark[1][5]['thumb']);
		$('#configDialog-2-6 input[name="title"]').focus();
	});
	$('#thumb2-7 img').click(function(){
		$('#configDialog-2-7').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-7 input[name="title"]').val(bookmark[1][6]['title']);
		$('#configDialog-2-7 input[name="url"]').val(bookmark[1][6]['url']);
		$('#configDialog-2-7 input[name="image"]').val(bookmark[1][6]['thumb']);
		$('#configDialog-2-7 input[name="title"]').focus();
	});
	$('#thumb2-8 img').click(function(){
		$('#configDialog-2-8').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-8 input[name="title"]').val(bookmark[1][7]['title']);
		$('#configDialog-2-8 input[name="url"]').val(bookmark[1][7]['url']);
		$('#configDialog-2-8 input[name="image"]').val(bookmark[1][7]['thumb']);
		$('#configDialog-2-8 input[name="title"]').focus();
	});
	$('#thumb2-9 img').click(function(){
		$('#configDialog-2-9').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-9 input[name="title"]').val(bookmark[1][8]['title']);
		$('#configDialog-2-9 input[name="url"]').val(bookmark[1][8]['url']);
		$('#configDialog-2-9 input[name="image"]').val(bookmark[1][8]['thumb']);
		$('#configDialog-2-9 input[name="title"]').focus();
	});
	$('#thumb2-10 img').click(function(){
		$('#configDialog-2-10').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-10 input[name="title"]').val(bookmark[1][9]['title']);
		$('#configDialog-2-10 input[name="url"]').val(bookmark[1][9]['url']);
		$('#configDialog-2-10 input[name="image"]').val(bookmark[1][9]['thumb']);
		$('#configDialog-2-10 input[name="title"]').focus();
	});
	$('#thumb2-11 img').click(function(){
		$('#configDialog-2-11').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-11 input[name="title"]').val(bookmark[1][10]['title']);
		$('#configDialog-2-11 input[name="url"]').val(bookmark[1][10]['url']);
		$('#configDialog-2-11 input[name="image"]').val(bookmark[1][10]['thumb']);
		$('#configDialog-2-11 input[name="title"]').focus();
	});
	$('#thumb2-12 img').click(function(){
		$('#configDialog-2-12').fadeIn(400,'circEaseOut');		
		$('#configDialog-2-12 input[name="title"]').val(bookmark[1][11]['title']);
		$('#configDialog-2-12 input[name="url"]').val(bookmark[1][11]['url']);
		$('#configDialog-2-12 input[name="image"]').val(bookmark[1][11]['thumb']);
		$('#configDialog-2-12 input[name="title"]').focus();
	});
	
	$('#thumb3-1 img').click(function(){
		$('#configDialog-3-1').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-1 input[name="title"]').val(bookmark[2][0]['title']);
		$('#configDialog-3-1 input[name="url"]').val(bookmark[2][0]['url']);
		$('#configDialog-3-1 input[name="image"]').val(bookmark[2][0]['thumb']);
		$('#configDialog-3-1 input[name="title"]').focus();
	});
	$('#thumb3-2 img').click(function(){
		$('#configDialog-3-2').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-2 input[name="title"]').val(bookmark[2][1]['title']);
		$('#configDialog-3-2 input[name="url"]').val(bookmark[2][1]['url']);
		$('#configDialog-3-2 input[name="image"]').val(bookmark[2][1]['thumb']);
		$('#configDialog-3-2 input[name="title"]').focus();
	});
	$('#thumb3-3 img').click(function(){
		$('#configDialog-3-3').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-3 input[name="title"]').val(bookmark[2][2]['title']);
		$('#configDialog-3-3 input[name="url"]').val(bookmark[2][2]['url']);
		$('#configDialog-3-3 input[name="image"]').val(bookmark[2][2]['thumb']);
		$('#configDialog-3-3 input[name="title"]').focus();
	});
	$('#thumb3-4 img').click(function(){
		$('#configDialog-3-4').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-4 input[name="title"]').val(bookmark[2][3]['title']);
		$('#configDialog-3-4 input[name="url"]').val(bookmark[2][3]['url']);
		$('#configDialog-3-4 input[name="image"]').val(bookmark[2][3]['thumb']);
		$('#configDialog-3-4 input[name="title"]').focus();
	});
	$('#thumb3-5 img').click(function(){
		$('#configDialog-3-5').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-5 input[name="title"]').val(bookmark[2][4]['title']);
		$('#configDialog-3-5 input[name="url"]').val(bookmark[2][4]['url']);
		$('#configDialog-3-5 input[name="image"]').val(bookmark[2][4]['thumb']);
		$('#configDialog-3-5 input[name="title"]').focus();
	});
	$('#thumb3-6 img').click(function(){
		$('#configDialog-3-6').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-6 input[name="title"]').val(bookmark[2][5]['title']);
		$('#configDialog-3-6 input[name="url"]').val(bookmark[2][5]['url']);
		$('#configDialog-3-6 input[name="image"]').val(bookmark[2][5]['thumb']);
		$('#configDialog-3-6 input[name="title"]').focus();
	});
	$('#thumb3-7 img').click(function(){
		$('#configDialog-3-7').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-7 input[name="title"]').val(bookmark[2][6]['title']);
		$('#configDialog-3-7 input[name="url"]').val(bookmark[2][6]['url']);
		$('#configDialog-3-7 input[name="image"]').val(bookmark[2][6]['thumb']);
		$('#configDialog-3-7 input[name="title"]').focus();
	});
	$('#thumb3-8 img').click(function(){
		$('#configDialog-3-8').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-8 input[name="title"]').val(bookmark[2][7]['title']);
		$('#configDialog-3-8 input[name="url"]').val(bookmark[2][7]['url']);
		$('#configDialog-3-8 input[name="image"]').val(bookmark[2][7]['thumb']);
		$('#configDialog-3-8 input[name="title"]').focus();
	});
	$('#thumb3-9 img').click(function(){
		$('#configDialog-3-9').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-9 input[name="title"]').val(bookmark[2][8]['title']);
		$('#configDialog-3-9 input[name="url"]').val(bookmark[2][8]['url']);
		$('#configDialog-3-9 input[name="image"]').val(bookmark[2][8]['thumb']);
		$('#configDialog-3-9 input[name="title"]').focus();
	});
	$('#thumb3-10 img').click(function(){
		$('#configDialog-3-10').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-10 input[name="title"]').val(bookmark[2][9]['title']);
		$('#configDialog-3-10 input[name="url"]').val(bookmark[2][9]['url']);
		$('#configDialog-3-10 input[name="image"]').val(bookmark[2][9]['thumb']);
		$('#configDialog-3-10 input[name="title"]').focus();
	});
	$('#thumb3-11 img').click(function(){
		$('#configDialog-3-11').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-11 input[name="title"]').val(bookmark[2][10]['title']);
		$('#configDialog-3-11 input[name="url"]').val(bookmark[2][10]['url']);
		$('#configDialog-3-11 input[name="image"]').val(bookmark[2][10]['thumb']);
		$('#configDialog-3-11 input[name="title"]').focus();
	});
	$('#thumb3-12 img').click(function(){
		$('#configDialog-3-12').fadeIn(400,'circEaseOut');		
		$('#configDialog-3-12 input[name="title"]').val(bookmark[2][11]['title']);
		$('#configDialog-3-12 input[name="url"]').val(bookmark[2][11]['url']);
		$('#configDialog-3-12 input[name="image"]').val(bookmark[2][11]['thumb']);
		$('#configDialog-3-12 input[name="title"]').focus();
	});
	
	
	$('.configDialog span').click(function(){
		$('.configDialog').fadeOut(400,'circEaseOut');
	})
	
	// BLOCKS NAMES DIALOGS
	$('#configDialog-name1 button').click(function(event){
		event.preventDefault();
		blockName[1] = $('#configDialog-name1 input').val();
		$('#configDialog-name1').fadeOut(400,'circEaseOut');
		$('#name1 span').html(blockName[1]);
	});
	
	$('#configDialog-name2 button').click(function(event){
		event.preventDefault();
		blockName[2] = $('#configDialog-name2 input').val();
		$('#configDialog-name2').fadeOut(400,'circEaseOut');
		$('#name2 span').html(blockName[2]);
	});
	
	$('#configDialog-name3 button').click(function(event){
		event.preventDefault();
		blockName[3] = $('#configDialog-name3 input').val();
		$('#configDialog-name3').fadeOut(400,'circEaseOut');
		$('#name3 span').html(blockName[3]);
	});

	
	
	// FIRST SCREEN DIALOGS
	$('#configDialog-1-1 button').click(function(event){
		event.preventDefault();
		bookmark[0][0] = {
			'title':$('#configDialog-1-1 input[name="title"]').val(),
			'url':$('#configDialog-1-1 input[name="url"]').val(),
			'thumb':$('#configDialog-1-1 input[name="image"]').val()
		}
		$('#configDialog-1-1').fadeOut(400,'circEaseOut');
		$('#thumb1-1 .thumbTitle').html(bookmark[0][0]['title']);
		$('#thumb1-1 .thumbUrl').html(bookmark[0][0]['url']);
		$('#thumb1-1 .thumbUrl').attr('title',bookmark[0][0]['url']);
		$('#thumb1-1 .thumbImage').html(bookmark[0][0]['thumb']);
	});

	$('#configDialog-1-2 button').click(function(event){
		event.preventDefault();
		bookmark[0][1] = {
			'title':$('#configDialog-1-2 input[name="title"]').val(),
			'url':$('#configDialog-1-2 input[name="url"]').val(),
			'thumb':$('#configDialog-1-2 input[name="image"]').val()
		}
		$('#configDialog-1-2').fadeOut(400,'circEaseOut');
		$('#thumb1-2 .thumbTitle').html(bookmark[0][1]['title']);
		$('#thumb1-2 .thumbUrl').html(bookmark[0][1]['url']);
		$('#thumb1-2 .thumbUrl').attr('title',bookmark[0][1]['url']);
		$('#thumb1-2 .thumbImage').html(bookmark[0][1]['thumb']);
	});
	
	$('#configDialog-1-3 button').click(function(event){
		event.preventDefault();
		bookmark[0][2] = {
			'title':$('#configDialog-1-3 input[name="title"]').val(),
			'url':$('#configDialog-1-3 input[name="url"]').val(),
			'thumb':$('#configDialog-1-3 input[name="image"]').val()
		}
		$('#configDialog-1-3').fadeOut(400,'circEaseOut');
		$('#thumb1-3 .thumbTitle').html(bookmark[0][2]['title']);
		$('#thumb1-3 .thumbUrl').html(bookmark[0][2]['url']);
		$('#thumb1-3 .thumbUrl').attr('title',bookmark[0][2]['url']);
		$('#thumb1-3 .thumbImage').html(bookmark[0][2]['thumb']);
	});
	
	$('#configDialog-1-4 button').click(function(event){
		event.preventDefault();
		bookmark[0][3] = {
			'title':$('#configDialog-1-4 input[name="title"]').val(),
			'url':$('#configDialog-1-4 input[name="url"]').val(),
			'thumb':$('#configDialog-1-4 input[name="image"]').val()
		}
		$('#configDialog-1-4').fadeOut(400,'circEaseOut');
		$('#thumb1-4 .thumbTitle').html(bookmark[0][3]['title']);
		$('#thumb1-4 .thumbUrl').html(bookmark[0][3]['url']);
		$('#thumb1-4 .thumbUrl').attr('title',bookmark[0][3]['url']);
		$('#thumb1-4 .thumbImage').html(bookmark[0][3]['thumb']);
	});
	
	$('#configDialog-1-5 button').click(function(event){
		event.preventDefault();
		bookmark[0][4] = {
			'title':$('#configDialog-1-5 input[name="title"]').val(),
			'url':$('#configDialog-1-5 input[name="url"]').val(),
			'thumb':$('#configDialog-1-5 input[name="image"]').val()
		}
		$('#configDialog-1-5').fadeOut(400,'circEaseOut');
		$('#thumb1-5 .thumbTitle').html(bookmark[0][4]['title']);
		$('#thumb1-5 .thumbUrl').html(bookmark[0][4]['url']);
		$('#thumb1-5 .thumbUrl').attr('title',bookmark[0][4]['url']);
		$('#thumb1-5 .thumbImage').html(bookmark[0][4]['thumb']);
	});
	
	$('#configDialog-1-6 button').click(function(event){
		event.preventDefault();
		bookmark[0][5] = {
			'title':$('#configDialog-1-6 input[name="title"]').val(),
			'url':$('#configDialog-1-6 input[name="url"]').val(),
			'thumb':$('#configDialog-1-6 input[name="image"]').val()
		}
		$('#configDialog-1-6').fadeOut(400,'circEaseOut');
		$('#thumb1-6 .thumbTitle').html(bookmark[0][5]['title']);
		$('#thumb1-6 .thumbUrl').html(bookmark[0][5]['url']);
		$('#thumb1-6 .thumbUrl').attr('title',bookmark[0][5]['url']);
		$('#thumb1-6 .thumbImage').html(bookmark[0][5]['thumb']);
	});
	
	$('#configDialog-1-7 button').click(function(event){
		event.preventDefault();
		bookmark[0][6] = {
			'title':$('#configDialog-1-7 input[name="title"]').val(),
			'url':$('#configDialog-1-7 input[name="url"]').val(),
			'thumb':$('#configDialog-1-7 input[name="image"]').val()
		}
		$('#configDialog-1-7').fadeOut(400,'circEaseOut');
		$('#thumb1-7 .thumbTitle').html(bookmark[0][6]['title']);
		$('#thumb1-7 .thumbUrl').html(bookmark[0][6]['url']);
		$('#thumb1-7 .thumbUrl').attr('title',bookmark[0][6]['url']);
		$('#thumb1-7 .thumbImage').html(bookmark[0][6]['thumb']);
	});
	
	$('#configDialog-1-8 button').click(function(event){
		event.preventDefault();
		bookmark[0][7] = {
			'title':$('#configDialog-1-8 input[name="title"]').val(),
			'url':$('#configDialog-1-8 input[name="url"]').val(),
			'thumb':$('#configDialog-1-8 input[name="image"]').val()
		}
		$('#configDialog-1-8').fadeOut(400,'circEaseOut');
		$('#thumb1-8 .thumbTitle').html(bookmark[0][7]['title']);
		$('#thumb1-8 .thumbUrl').html(bookmark[0][7]['url']);
		$('#thumb1-8 .thumbUrl').attr('title',bookmark[0][7]['url']);
		$('#thumb1-8 .thumbImage').html(bookmark[0][7]['thumb']);
	});
	
	$('#configDialog-1-9 button').click(function(event){
		event.preventDefault();
		bookmark[0][8] = {
			'title':$('#configDialog-1-9 input[name="title"]').val(),
			'url':$('#configDialog-1-9 input[name="url"]').val(),
			'thumb':$('#configDialog-1-9 input[name="image"]').val()
		}
		$('#configDialog-1-9').fadeOut(400,'circEaseOut');
		$('#thumb1-9 .thumbTitle').html(bookmark[0][8]['title']);
		$('#thumb1-9 .thumbUrl').html(bookmark[0][8]['url']);
		$('#thumb1-9 .thumbUrl').attr('title',bookmark[0][8]['url']);
		$('#thumb1-9 .thumbImage').html(bookmark[0][8]['thumb']);
	});
	
	$('#configDialog-1-10 button').click(function(event){
		event.preventDefault();
		bookmark[0][9] = {
			'title':$('#configDialog-1-10 input[name="title"]').val(),
			'url':$('#configDialog-1-10 input[name="url"]').val(),
			'thumb':$('#configDialog-1-10 input[name="image"]').val()
		}
		$('#configDialog-1-10').fadeOut(400,'circEaseOut');
		$('#thumb1-10 .thumbTitle').html(bookmark[0][9]['title']);
		$('#thumb1-10 .thumbUrl').html(bookmark[0][9]['url']);
		$('#thumb1-10 .thumbUrl').attr('title',bookmark[0][9]['url']);
		$('#thumb1-10 .thumbImage').html(bookmark[0][9]['thumb']);
	});
	
	$('#configDialog-1-11 button').click(function(event){
		event.preventDefault();
		bookmark[0][10] = {
			'title':$('#configDialog-1-11 input[name="title"]').val(),
			'url':$('#configDialog-1-11 input[name="url"]').val(),
			'thumb':$('#configDialog-1-11 input[name="image"]').val()
		}
		$('#configDialog-1-11').fadeOut(400,'circEaseOut');
		$('#thumb1-11 .thumbTitle').html(bookmark[0][10]['title']);
		$('#thumb1-11 .thumbUrl').html(bookmark[0][10]['url']);
		$('#thumb1-11 .thumbUrl').attr('title',bookmark[0][10]['url']);
		$('#thumb1-11 .thumbImage').html(bookmark[0][10]['thumb']);
	});
	
	$('#configDialog-1-12 button').click(function(event){
		event.preventDefault();
		bookmark[0][11] = {
			'title':$('#configDialog-1-12 input[name="title"]').val(),
			'url':$('#configDialog-1-12 input[name="url"]').val(),
			'thumb':$('#configDialog-1-12 input[name="image"]').val()
		}
		$('#configDialog-1-12').fadeOut(400,'circEaseOut');
		$('#thumb1-12 .thumbTitle').html(bookmark[0][11]['title']);
		$('#thumb1-12 .thumbUrl').html(bookmark[0][11]['url']);
		$('#thumb1-12 .thumbUrl').attr('title',bookmark[0][11]['url']);
		$('#thumb1-12 .thumbImage').html(bookmark[0][11]['thumb']);
	});
	
	
	// SECOND SCREEN DIALOGS
	$('#configDialog-2-1 button').click(function(event){
		event.preventDefault();
		bookmark[1][0] = {
			'title':$('#configDialog-2-1 input[name="title"]').val(),
			'url':$('#configDialog-2-1 input[name="url"]').val(),
			'thumb':$('#configDialog-2-1 input[name="image"]').val()
		}
		$('#configDialog-2-1').fadeOut(400,'circEaseOut');
		$('#thumb2-1 .thumbTitle').html(bookmark[1][0]['title']);
		$('#thumb2-1 .thumbUrl').html(bookmark[1][0]['url']);
		$('#thumb2-1 .thumbUrl').attr('title',bookmark[1][0]['url']);
		$('#thumb2-1 .thumbImage').html(bookmark[1][0]['thumb']);
	});
	
	$('#configDialog-2-2 button').click(function(event){
		event.preventDefault();
		bookmark[1][1] = {
			'title':$('#configDialog-2-2 input[name="title"]').val(),
			'url':$('#configDialog-2-2 input[name="url"]').val(),
			'thumb':$('#configDialog-2-2 input[name="image"]').val()
		}
		$('#configDialog-2-2').fadeOut(400,'circEaseOut');
		$('#thumb2-2 .thumbTitle').html(bookmark[1][1]['title']);
		$('#thumb2-2 .thumbUrl').html(bookmark[1][1]['url']);
		$('#thumb2-2 .thumbUrl').attr('title',bookmark[1][1]['url']);
		$('#thumb2-2 .thumbImage').html(bookmark[1][1]['thumb']);
	});
	
	$('#configDialog-2-3 button').click(function(event){
		event.preventDefault();
		bookmark[1][2] = {
			'title':$('#configDialog-2-3 input[name="title"]').val(),
			'url':$('#configDialog-2-3 input[name="url"]').val(),
			'thumb':$('#configDialog-2-3 input[name="image"]').val()
		}
		$('#configDialog-2-3').fadeOut(400,'circEaseOut');
		$('#thumb2-3 .thumbTitle').html(bookmark[1][2]['title']);
		$('#thumb2-3 .thumbUrl').html(bookmark[1][2]['url']);
		$('#thumb2-3 .thumbUrl').attr('title',bookmark[1][2]['url']);
		$('#thumb2-3 .thumbImage').html(bookmark[1][2]['thumb']);
	});
	
	$('#configDialog-2-4 button').click(function(event){
		event.preventDefault();
		bookmark[1][3] = {
			'title':$('#configDialog-2-4 input[name="title"]').val(),
			'url':$('#configDialog-2-4 input[name="url"]').val(),
			'thumb':$('#configDialog-2-4 input[name="image"]').val()
		}
		$('#configDialog-2-4').fadeOut(400,'circEaseOut');
		$('#thumb2-4 .thumbTitle').html(bookmark[1][3]['title']);
		$('#thumb2-4 .thumbUrl').html(bookmark[1][3]['url']);
		$('#thumb2-4 .thumbUrl').attr('title',bookmark[1][3]['url']);
		$('#thumb2-4 .thumbImage').html(bookmark[1][3]['thumb']);
	});
	
	$('#configDialog-2-5 button').click(function(event){
		event.preventDefault();
		bookmark[1][4] = {
			'title':$('#configDialog-2-5 input[name="title"]').val(),
			'url':$('#configDialog-2-5 input[name="url"]').val(),
			'thumb':$('#configDialog-2-5 input[name="image"]').val()
		}
		$('#configDialog-2-5').fadeOut(400,'circEaseOut');
		$('#thumb2-5 .thumbTitle').html(bookmark[1][4]['title']);
		$('#thumb2-5 .thumbUrl').html(bookmark[1][4]['url']);
		$('#thumb2-5 .thumbUrl').attr('title',bookmark[1][4]['url']);
		$('#thumb2-5 .thumbImage').html(bookmark[1][4]['thumb']);
	});
	
	$('#configDialog-2-6 button').click(function(event){
		event.preventDefault();
		bookmark[1][5] = {
			'title':$('#configDialog-2-6 input[name="title"]').val(),
			'url':$('#configDialog-2-6 input[name="url"]').val(),
			'thumb':$('#configDialog-2-6 input[name="image"]').val()
		}
		$('#configDialog-2-6').fadeOut(400,'circEaseOut');
		$('#thumb2-6 .thumbTitle').html(bookmark[1][5]['title']);
		$('#thumb2-6 .thumbUrl').html(bookmark[1][5]['url']);
		$('#thumb2-6 .thumbUrl').attr('title',bookmark[1][5]['url']);
		$('#thumb2-6 .thumbImage').html(bookmark[1][5]['thumb']);
	});
	
	$('#configDialog-2-7 button').click(function(event){
		event.preventDefault();
		bookmark[1][6] = {
			'title':$('#configDialog-2-7 input[name="title"]').val(),
			'url':$('#configDialog-2-7 input[name="url"]').val(),
			'thumb':$('#configDialog-2-7 input[name="image"]').val()
		}
		$('#configDialog-2-7').fadeOut(400,'circEaseOut');
		$('#thumb2-7 .thumbTitle').html(bookmark[1][6]['title']);
		$('#thumb2-7 .thumbUrl').html(bookmark[1][6]['url']);
		$('#thumb2-7 .thumbUrl').attr('title',bookmark[1][6]['url']);
		$('#thumb2-7 .thumbImage').html(bookmark[1][6]['thumb']);
	});
	
	$('#configDialog-2-8 button').click(function(event){
		event.preventDefault();
		bookmark[1][7] = {
			'title':$('#configDialog-2-8 input[name="title"]').val(),
			'url':$('#configDialog-2-8 input[name="url"]').val(),
			'thumb':$('#configDialog-2-8 input[name="image"]').val()
		}
		$('#configDialog-2-8').fadeOut(400,'circEaseOut');
		$('#thumb2-8 .thumbTitle').html(bookmark[1][7]['title']);
		$('#thumb2-8 .thumbUrl').html(bookmark[1][7]['url']);
		$('#thumb2-8 .thumbUrl').attr('title',bookmark[1][7]['url']);
		$('#thumb2-8 .thumbImage').html(bookmark[1][7]['thumb']);
	});
	
	$('#configDialog-2-9 button').click(function(event){
		event.preventDefault();
		bookmark[1][8] = {
			'title':$('#configDialog-2-9 input[name="title"]').val(),
			'url':$('#configDialog-2-9 input[name="url"]').val(),
			'thumb':$('#configDialog-2-9 input[name="image"]').val()
		}
		$('#configDialog-2-9').fadeOut(400,'circEaseOut');
		$('#thumb2-9 .thumbTitle').html(bookmark[1][8]['title']);
		$('#thumb2-9 .thumbUrl').html(bookmark[1][8]['url']);
		$('#thumb2-9 .thumbUrl').attr('title',bookmark[1][8]['url']);
		$('#thumb2-9 .thumbImage').html(bookmark[1][8]['thumb']);
	});
	
	$('#configDialog-2-10 button').click(function(event){
		event.preventDefault();
		bookmark[1][9] = {
			'title':$('#configDialog-2-10 input[name="title"]').val(),
			'url':$('#configDialog-2-10 input[name="url"]').val(),
			'thumb':$('#configDialog-2-10 input[name="image"]').val()
		}
		$('#configDialog-2-10').fadeOut(400,'circEaseOut');
		$('#thumb2-10 .thumbTitle').html(bookmark[1][9]['title']);
		$('#thumb2-10 .thumbUrl').html(bookmark[1][9]['url']);
		$('#thumb2-10 .thumbUrl').attr('title',bookmark[1][9]['url']);
		$('#thumb2-10 .thumbImage').html(bookmark[1][9]['thumb']);
	});
	
	$('#configDialog-2-11 button').click(function(event){
		event.preventDefault();
		bookmark[1][10] = {
			'title':$('#configDialog-2-11 input[name="title"]').val(),
			'url':$('#configDialog-2-11 input[name="url"]').val(),
			'thumb':$('#configDialog-2-11 input[name="image"]').val()
		}
		$('#configDialog-2-11').fadeOut(400,'circEaseOut');
		$('#thumb2-11 .thumbTitle').html(bookmark[1][10]['title']);
		$('#thumb2-11 .thumbUrl').html(bookmark[1][10]['url']);
		$('#thumb2-11 .thumbUrl').attr('title',bookmark[1][10]['url']);
		$('#thumb2-11 .thumbImage').html(bookmark[1][10]['thumb']);
	});
	
	$('#configDialog-2-12 button').click(function(event){
		event.preventDefault();
		bookmark[1][11] = {
			'title':$('#configDialog-2-12 input[name="title"]').val(),
			'url':$('#configDialog-2-12 input[name="url"]').val(),
			'thumb':$('#configDialog-2-12 input[name="image"]').val()
		}
		$('#configDialog-2-12').fadeOut(400,'circEaseOut');
		$('#thumb2-12 .thumbTitle').html(bookmark[1][11]['title']);
		$('#thumb2-12 .thumbUrl').html(bookmark[1][11]['url']);
		$('#thumb2-12 .thumbUrl').attr('title',bookmark[1][11]['url']);
		$('#thumb2-12 .thumbImage').html(bookmark[1][11]['thumb']);
	});
	
	
	// THIRD SCREEN DIALOGS
	$('#configDialog-3-1 button').click(function(event){
		event.preventDefault();
		bookmark[2][0] = {
			'title':$('#configDialog-3-1 input[name="title"]').val(),
			'url':$('#configDialog-3-1 input[name="url"]').val(),
			'thumb':$('#configDialog-3-1 input[name="image"]').val()
		}
		$('#configDialog-3-1').fadeOut(400,'circEaseOut');
		$('#thumb3-1 .thumbTitle').html(bookmark[2][0]['title']);
		$('#thumb3-1 .thumbUrl').html(bookmark[2][0]['url']);
		$('#thumb3-1 .thumbUrl').attr('title',bookmark[2][0]['url']);
		$('#thumb3-1 .thumbImage').html(bookmark[2][0]['thumb']);
	});
	
	$('#configDialog-3-2 button').click(function(event){
		event.preventDefault();
		bookmark[2][1] = {
			'title':$('#configDialog-3-2 input[name="title"]').val(),
			'url':$('#configDialog-3-2 input[name="url"]').val(),
			'thumb':$('#configDialog-3-2 input[name="image"]').val()
		}
		$('#configDialog-3-2').fadeOut(400,'circEaseOut');
		$('#thumb3-2 .thumbTitle').html(bookmark[2][1]['title']);
		$('#thumb3-2 .thumbUrl').html(bookmark[2][1]['url']);
		$('#thumb3-2 .thumbUrl').attr('title',bookmark[2][1]['url']);
		$('#thumb3-2 .thumbImage').html(bookmark[2][1]['thumb']);
	});
	
	$('#configDialog-3-3 button').click(function(event){
		event.preventDefault();
		bookmark[2][2] = {
			'title':$('#configDialog-3-3 input[name="title"]').val(),
			'url':$('#configDialog-3-3 input[name="url"]').val(),
			'thumb':$('#configDialog-3-3 input[name="image"]').val()
		}
		$('#configDialog-3-3').fadeOut(400,'circEaseOut');
		$('#thumb3-3 .thumbTitle').html(bookmark[2][2]['title']);
		$('#thumb3-3 .thumbUrl').html(bookmark[2][2]['url']);
		$('#thumb3-3 .thumbUrl').attr('title',bookmark[2][2]['url']);
		$('#thumb3-3 .thumbImage').html(bookmark[2][2]['thumb']);
	});
	
	$('#configDialog-3-4 button').click(function(event){
		event.preventDefault();
		bookmark[2][3] = {
			'title':$('#configDialog-3-4 input[name="title"]').val(),
			'url':$('#configDialog-3-4 input[name="url"]').val(),
			'thumb':$('#configDialog-3-4 input[name="image"]').val()
		}
		$('#configDialog-3-4').fadeOut(400,'circEaseOut');
		$('#thumb3-4 .thumbTitle').html(bookmark[2][3]['title']);
		$('#thumb3-4 .thumbUrl').html(bookmark[2][3]['url']);
		$('#thumb3-4 .thumbUrl').attr('title',bookmark[2][3]['url']);
		$('#thumb3-4 .thumbImage').html(bookmark[2][3]['thumb']);
	});
	
	$('#configDialog-3-5 button').click(function(event){
		event.preventDefault();
		bookmark[2][4] = {
			'title':$('#configDialog-3-5 input[name="title"]').val(),
			'url':$('#configDialog-3-5 input[name="url"]').val(),
			'thumb':$('#configDialog-3-5 input[name="image"]').val()
		}
		$('#configDialog-3-5').fadeOut(400,'circEaseOut');
		$('#thumb3-5 .thumbTitle').html(bookmark[2][4]['title']);
		$('#thumb3-5 .thumbUrl').html(bookmark[2][4]['url']);
		$('#thumb3-5 .thumbUrl').attr('title',bookmark[2][4]['url']);
		$('#thumb3-5 .thumbImage').html(bookmark[2][4]['thumb']);
	});
	
	$('#configDialog-3-6 button').click(function(event){
		event.preventDefault();
		bookmark[2][5] = {
			'title':$('#configDialog-3-6 input[name="title"]').val(),
			'url':$('#configDialog-3-6 input[name="url"]').val(),
			'thumb':$('#configDialog-3-6 input[name="image"]').val()
		}
		$('#configDialog-3-6').fadeOut(400,'circEaseOut');
		$('#thumb3-6 .thumbTitle').html(bookmark[2][5]['title']);
		$('#thumb3-6 .thumbUrl').html(bookmark[2][5]['url']);
		$('#thumb3-6 .thumbUrl').attr('title',bookmark[2][5]['url']);
		$('#thumb3-6 .thumbImage').html(bookmark[2][5]['thumb']);
	});
	
	$('#configDialog-3-7 button').click(function(event){
		event.preventDefault();
		bookmark[2][6] = {
			'title':$('#configDialog-3-7 input[name="title"]').val(),
			'url':$('#configDialog-3-7 input[name="url"]').val(),
			'thumb':$('#configDialog-3-7 input[name="image"]').val()
		}
		$('#configDialog-3-7').fadeOut(400,'circEaseOut');
		$('#thumb3-7 .thumbTitle').html(bookmark[2][6]['title']);
		$('#thumb3-7 .thumbUrl').html(bookmark[2][6]['url']);
		$('#thumb3-7 .thumbUrl').attr('title',bookmark[2][6]['url']);
		$('#thumb3-7 .thumbImage').html(bookmark[2][6]['thumb']);
	});
	
	$('#configDialog-3-8 button').click(function(event){
		event.preventDefault();
		bookmark[2][7] = {
			'title':$('#configDialog-3-8 input[name="title"]').val(),
			'url':$('#configDialog-3-8 input[name="url"]').val(),
			'thumb':$('#configDialog-3-8 input[name="image"]').val()
		}
		$('#configDialog-3-8').fadeOut(400,'circEaseOut');
		$('#thumb3-8 .thumbTitle').html(bookmark[2][7]['title']);
		$('#thumb3-8 .thumbUrl').html(bookmark[2][7]['url']);
		$('#thumb3-8 .thumbUrl').attr('title',bookmark[2][7]['url']);
		$('#thumb3-8 .thumbImage').html(bookmark[2][7]['thumb']);
	});
	
	$('#configDialog-3-9 button').click(function(event){
		event.preventDefault();
		bookmark[2][8] = {
			'title':$('#configDialog-3-9 input[name="title"]').val(),
			'url':$('#configDialog-3-9 input[name="url"]').val(),
			'thumb':$('#configDialog-3-9 input[name="image"]').val()
		}
		$('#configDialog-3-9').fadeOut(400,'circEaseOut');
		$('#thumb3-9 .thumbTitle').html(bookmark[2][8]['title']);
		$('#thumb3-9 .thumbUrl').html(bookmark[2][8]['url']);
		$('#thumb3-9 .thumbUrl').attr('title',bookmark[2][8]['url']);
		$('#thumb3-9 .thumbImage').html(bookmark[2][8]['thumb']);
	});
	
	$('#configDialog-3-10 button').click(function(event){
		event.preventDefault();
		bookmark[2][9] = {
			'title':$('#configDialog-3-10 input[name="title"]').val(),
			'url':$('#configDialog-3-10 input[name="url"]').val(),
			'thumb':$('#configDialog-3-10 input[name="image"]').val()
		}
		$('#configDialog-3-10').fadeOut(400,'circEaseOut');
		$('#thumb3-10 .thumbTitle').html(bookmark[2][9]['title']);
		$('#thumb3-10 .thumbUrl').html(bookmark[2][9]['url']);
		$('#thumb3-10 .thumbUrl').attr('title',bookmark[2][9]['url']);
		$('#thumb3-10 .thumbImage').html(bookmark[2][9]['thumb']);
	});
	
	$('#configDialog-3-11 button').click(function(event){
		event.preventDefault();
		bookmark[2][10] = {
			'title':$('#configDialog-3-11 input[name="title"]').val(),
			'url':$('#configDialog-3-11 input[name="url"]').val(),
			'thumb':$('#configDialog-3-11 input[name="image"]').val()
		}
		$('#configDialog-3-11').fadeOut(400,'circEaseOut');
		$('#thumb3-11 .thumbTitle').html(bookmark[2][10]['title']);
		$('#thumb3-11 .thumbUrl').html(bookmark[2][10]['url']);
		$('#thumb3-11 .thumbUrl').attr('title',bookmark[2][10]['url']);
		$('#thumb3-11 .thumbImage').html(bookmark[2][10]['thumb']);
	});
	
	$('#configDialog-3-12 button').click(function(event){
		event.preventDefault();
		bookmark[2][11] = {
			'title':$('#configDialog-3-12 input[name="title"]').val(),
			'url':$('#configDialog-3-12 input[name="url"]').val(),
			'thumb':$('#configDialog-3-12 input[name="image"]').val()
		}
		$('#configDialog-3-12').fadeOut(400,'circEaseOut');
		$('#thumb3-12 .thumbTitle').html(bookmark[2][11]['title']);
		$('#thumb3-12 .thumbUrl').html(bookmark[2][11]['url']);
		$('#thumb3-12 .thumbUrl').attr('title',bookmark[2][11]['url']);
		$('#thumb3-12 .thumbImage').html(bookmark[2][11]['thumb']);
	});
	

	$('#generate').click(function(){
		$('body').css('overflow','auto');
		var source = '<style type="text/css">p{margin:20px 10px;}</style>'+'\n'+
					'<p>Replace text in \'source.js\' with this text:</p>'+'\n'+
					
					'<div id="selectAll" title="works in Firefox and Opera">select all</div>'+'\n'+
					'<script type="text/javascript">$(\'#selectAll\').click(function(){'+'\n'+
					'$(\'code\').selText();'+'\n'+	
					'});</script>'+'\n';
		
		source = source + '<pre>'+'\n'+
					'<code class="javascript">'+'\n'+
					'<span class="keyword">var</span> hoverEffect = <span class="literal">'+hoverEffect+'</span>; <span class="comment">// set true for hover effect, set false for no hover effect</span>'+'\n'+
					''+'\n'+
					'<span class="keyword">var</span> searchEngine = <span class="string">\''+searchEngine+'\'</span>; <span class="comment">// default search engine - set google for google search, bing for bing search, yahoo for yahoo search</span>'+'\n'+
					''+'\n'+
					'<span class="keyword">var</span> numberOfScreens = <span class="number">'+num+'</span>; <span class="comment">// set number of screens (1 or 2 or 3)</span>'+'\n'+
					' '+'\n'+
					'<span class="keyword">var</span> blockName = <span class="keyword">new</span> Array(); <span class="comment">// set names of blocks</span>'+'\n'+
					''+'\n'+
					'blockName[<span class="number">1</span>] = <span class="string">\''+blockName[1]+'\'</span>;'+'\n'+
					'blockName[<span class="number">2</span>] = <span class="string">\''+blockName[2]+'\'</span>;'+'\n'+
					'blockName[<span class="number">3</span>] = <span class="string">\''+blockName[3]+'\'</span>;'+'\n'+
					''+'\n'+
					'<span class="keyword">var</span> bookmark = <span class="keyword">new</span> Array();'+'\n'+
					'bookmark[<span class="number">0</span>] = <span class="keyword">new</span> Array();'+'\n'+
					'bookmark[<span class="number">1</span>] = <span class="keyword">new</span> Array();'+'\n'+
					'bookmark[<span class="number">2</span>] = <span class="keyword">new</span> Array();'+'\n'+
					''+'\n'+
					''+'\n'+
					'<span class="comment">// set your bookmarks here: (If you do not fill \'thumb\' for thumbnail will be used title)</span>'+'\n';
					
		for (var m=0; m < num; m++) {
			source = source + '<span class="comment">// '+(m+1)+'. BLOCK</span>'+'\n';
			
			for (var n=0; n < 12; n++) {
				source = source + 'bookmark[<span class="number">'+m+'</span>][<span class="number">'+n+'</span>] = {'+'\n'+
						    '<span class="string">\'title\'</span>:<span class="string">\''+bookmark[m][n]['title']+'\'</span>,'+'\n'+
						    '<span class="string">\'url\'</span>:<span class="string">\''+bookmark[m][n]['url']+'\'</span>,'+'\n'+
						    '<span class="string">\'thumb\'</span>:<span class="string">\''+bookmark[m][n]['thumb']+'\'</span>'+'\n'+
						'};'+'\n';
			};
			source = source + '<span class="comment">// end of '+(m+1)+'. BLOCK</span>'+'\n';
		};			
					
		source = source +'    </code>'+'\n'+
				'	</pre>';
		
		$('#place').hide();
		$('#generate').hide();		
		$('#settings').html(source).show();
		$('#back').show();
		
		
	});
	
	$('#back').click(function(){
		$('#place').show();
		$('#generate').show();		
		$('#settings').hide();
		$('#back').hide();
		$('body').css('overflow','hidden');
	});
	
	function anim1to2(){
		
		animDone = false;
		$('#place').animate({
			left: left2,
		},1000,'circEaseOut',function() {
			
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
		
		animDone = false;
		$('#place').animate({
			left: left1
		},1000,'circEaseOut',function() {
			
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
		
		animDone = false;
		$('#place').animate({
			left: left3
		},1000,'circEaseOut',function() {
			
			animDone = true;
			wrapperPos = 3;
		});
		$('#button1to2').hide();
		$('#button3to2').show();
		$('#button2to1').hide();
		$('#button2to3').hide();	
	};
	
	function anim3to2(){
		
		animDone = false;
		$('#place').animate({
			left: left2
		},1000,'circEaseOut',function() {
			
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
		//event.preventDefault();		
	});

/*	
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
	};*/
	


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

	});//end select change
});

