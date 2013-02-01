<!doctype html>
<html lang='en'>
<head>
	<title>Projects | Kevin Carruthers' Homepage</title>
	<link rel='stylesheet' href='style.css'>
	<link rel='icon' href='favicon.png' />
</head>
<body>

<?php
include_once('nav.inc.php');
?>

<content>
	<h2>Android Apps</h2>
	<p><a href='https://github.com/CromiumApps/uwhub'>UWHub</a> is a central access point for all uWaterloo API resources. Currently in development, the final goal is to have an app which centralizes course stuff, exam things, faculty details, food schedules, and much, much more!

	<h2>Favlets</h2>
	<p>These "bookmarklets/favlets" do something <i>to</i> a page instead of navigating you away from it.</p>
	<span class='foldingmenu'>
		<span class='foldingmenuitem150'>
 			<h4><a href='javascript:document.location=document.referrer;' title='Back to Referrer'>
 				Back to Referrer</a></h4>
			<ul><pre><code class='language-js'>document.location = document.referrer;</code></pre></ul>
		</span>
		<span class='foldingmenuitem150'>
			<h4><a href='javascript:for(plebvar1=0;plebvar1<document.forms.length;++plebvar1)for(plebvar2=0;plebvar2<document.forms[plebvar1].elements.length;++plebvar2)if(document.forms[plebvar1].elements[plebvar2].type.toLowerCase()=="password")alert("Password: "+document.forms[plebvar1].elements[plebvar2].value);' title='Password Field Viewer'>
				Password Field Viewer</a></h4>
			<ul><pre><code class='language-js'>for(plebvar1 = 0; plebvar1 < document.forms.length; ++plebvar1)<br />  for(plebvar2 = 0; plebvar2 < document.forms[plebvar1].elements.length; ++plebvar2)<br />    if(document.forms[plebvar1].elements[plebvar2].type.toLowerCase() == "password")<br />      alert("Password: " + document.forms[plebvar1].elements[plebvar2].value);</code></pre></ul>
		</span>
		<span class='foldingmenuitem150'>
			<h4><a href='javascript:for(plebvar1=0;plebvar1<document.forms.length;++plebvar1)for(plebvar2=0;plebvar2<document.forms[plebvar1].elements.length;++plebvar2){document.forms[plebvar1].elements[plebvar2].removeAttribute("readonly");document.forms[plebvar1].elements[plebvar2].removeAttribute("disabled");}' title='Button Enabler'>
				Button Enabler</a></h4>
			<ul><pre><code class='language-js'>for(plebvar1 = 0; plebvar1 < document.forms.length; ++plebvar1)<br />  for(plebvar2 = 0; plebvar2 < document.forms[plebvar1].elements.length; ++plebvar2) {<br />    document.forms[plebvar1].elements[plebvar2].removeAttribute("readonly");<br />    document.forms[plebvar1].elements[plebvar2].removeAttribute("disabled");<br />  }</code></pre></ul>
		</span>
	</span>

	<h2>Websites</h2>
	<center>
		<a href='http://www.pleb.x10.mx'>	<img src='http://free.pagepeeker.com/v2/thumbs.php?size=x&url=pleb.x10.mx' class='pagepeeker'></a>
		<a href='http://www.se2017.com'>	<img src='media/se2017.png' style='border:1px black solid;'></a>
	</center>

	<h2>More</h2>
	<p>I'm always interested in interesting projects - if you're working on one, contact me (preferably by <a href='mailto:kevin.j.carruthers@gmail.com'>email</a>, but any other method listed on this site would work)!
</content>

</body>
</html>