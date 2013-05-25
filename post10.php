
<!doctype html>
<html lang='en'>
<head>
	<title>Kevin Carruthers</title>

<?php
include_once('nav.inc.php');
?>

<div id='content'>
	<div id='article'>
		<div class='meta'>
			<div class='cat'>web dev, tech</div>
			<div class='date'>May 20th, 2013</div>
		</div>
		<div class='box'>
			<div class='title'>
				<h1><a href='post10.php'>Fading Text in CSS</a></h1>
			</div>
			<div class='contents'>
				<p>As some of you (read: probably none of you) know, I hate JS with a passion, and will go to absurdly great lengths to implement something in CSS3 -- which is basically my one true love -- instead.</p>
				<p>All of my stupidity aside, some things which used to always be implemented in JS really <i>should</i> be done in CSS, now that CSS3 is here and in-use.</p>
				<p>One of my friends recently asked me how to fade-in text with JS, assuming you're not necessarily hovering over that text. "Aha!" I thought, in a somewhat evil voice. "It's time to convert someone new to the dork side of CSS3."</p>
				<p>So, I present the first of anywhere between one and <i>n</i> web development related tutorials on this site: <b>How To Do That Thing That <a href='http://www.clarisseschneider.ca'>Clarisse</a> Wanted To Do</b> &#8482;.</p>
				<p>So, let's start off with an example:</p>
				<div id='samplefadingcsstext'>
					<img src='media/posts/webdesign.jpg' />
					<p>Err Mah Gawd!</p>
				</div>
				<p>Cool, huh?</p>
				<p>Sample HTML:</p>
				<pre><code language='html'>&lt;div id='samplefadingcsstext'&gt;<br />	&lt;img src='media/posts/webdesign.jpg' /&gt;<br />	&lt;p&gt;Err Mah Gawd!&lt;/p&gt;<br />&lt;/div&gt;
				</code></pre>
				<p>Sample CSS:</p>
				<pre><code language='css'>#samplefadingcsstext {<br />  height: 200px;<br />  width: 600px;<br />  margin: 5px 5px 15px 5px;<br />  line-height: 133px;<br />  color: transparent;<br />  -webkit-transition: color 0.5s;<br />  -moz-transition: color 0.5s;<br />  transition: color 0.5s; }<br /><br />#samplefadingcsstext:hover {<br />  color: black; }<br /><br />#samplefadingcsstext img {<br />  float: left;<br />  margin-right: 10px; }
				</code></pre>
				<p>(CSS displayed as normal CSS, even though you will never see me use plain CSS when I have the choice to use something closer to a real language, such as <a href='http://sass-lang.com/'>SASS</a>... hmm, I wonder if they'll pay me for that ad).</p>
 			</div>
		</div>
	</div>
</div>

</body>
</html>