$(document).ready(function() {
	search = 'http://www.google.com/search';
	searchEngine = 'google';

	$('form').attr('action',search);

	for(i = 0; i <= 11; i++) {								
		var title = bookmark[0][i]['title'];
		var url = bookmark[0][i]['url'];
		var thumb = bookmark[0][i]['thumb'];
		$('#thumb1-'+(i+1)).html('<a href="'+url+'"><img src="homepage/thumbs/'+thumb+'" /></a>');
	};
});