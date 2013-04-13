	<link rel='stylesheet' href='style.css'>
	<link rel='icon' href='favicon.png' />
	<script src='media/jquery191.js'></script>
	<script src='media/mousewheel.js'></script>
	<script>
	$(function() {
		$("body").mousewheel(function(event, delta) {
			this.scrollLeft -= (delta * 35);
			event.preventDefault();
		});
	});
	</script>
</head>
<body>

<nav>
	<div class='fade'>
		<div style='opacity:1;'></div>
		<div style='opacity:0.9;'></div>
		<div style='opacity:0.8;'></div>
		<div style='opacity:0.7;'></div>
		<div style='opacity:0.6;'></div>
		<div style='opacity:0.5;'></div>
		<div style='opacity:0.4;'></div>
		<div style='opacity:0.3;'></div>
		<div style='opacity:0.2;'></div>
		<div style='opacity:0.2;'></div>
		<div style='opacity:0.1;'></div>
		<div style='opacity:0.1;'></div>
		<div style='opacity:0;'></div>
		<div style='opacity:0;'></div>
	</div>
	<ul class='social'>
		<li><a href='http://ca.linkedin.com/in/kevinkarruthers' style='background-image:url("media/linkedin.png");'>
			<img src='media/linkedina.png' />
		</a></li>
		<li><a href='https://github.com/KevinKarruthers' style='background-image:url("media/github.png");'>
			<img src='media/githuba.png' />
		</a></li>
		<li><a href='https://twitter.com/KevinKarruthers' style='background-image:url("media/twitter.png");'>
			<img src='media/twittera.png' />
		</a></li>
		<li><a href='https://www.facebook.com/kevin.j.carruthers' style='background-image:url("media/facebook.png");'>
			<img src='media/facebooka.png' />
		</a></li>
	</ul>
	<div id='navcontainer'>
		<div id='arrow'><div id='name'>
			<a href='http://thekev.in' class='mask'>Kevin</a>
		</div></div>
		<div class='sitemenu'>
			<ul>
				<li><a href='index.php'>Blog</a></li>
				<li><a href='media/resume.pdf'>R&eacute;sum&eacute;</a></li>
				<li><a href='post2.php'>Notes</a></li>
				<li><a href='homepage.php'>Homepage</a></li>
			</ul>
		</div>
	</div>
</nav>