<?php
function curPage() {
	return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}
?>

<nav><ul class='container'>
	<li><a href='index.php'>kevin james</a></li>
	<img src='media/symbol.png' />																						<? if(curPage() == 'index.php') {		echo "<div class='arrow'></div>"; } ?>
	<li><a href='index.php'			<? if(curPage() == 'index.php') { echo "class='selected'"; } ?>		>home</a>		<? if(curPage() == 'bio.php') {			echo "<div class='arrow'></div>"; } ?>
	<li><a href='bio.php'			<? if(curPage() == 'bio.php') { echo "class='selected'"; } ?>		>bio</a>		<? if(curPage() == 'resume.php') {		echo "<div class='arrow'></div>"; } ?>
	<li><a href='resume.php'		<? if(curPage() == 'resume.php') { echo "class='selected'"; } ?>	>resume</a>		<? if(curPage() == 'school.php') {		echo "<div class='arrow'></div>"; } ?>
	<li><a href='school.php'		<? if(curPage() == 'school.php') { echo "class='selected'"; } ?>	>school</a>		<? if(curPage() == 'calendar.php') {	echo "<div class='arrow'></div>"; } ?>
	<li><a href='calendar.php'		<? if(curPage() == 'calendar.php') { echo "class='selected'"; } ?>	>calendar</a>	<? if(curPage() == 'projects.php') {	echo "<div class='arrow'></div>"; } ?>
	<li><a href='projects.php'		<? if(curPage() == 'projects.php') { echo "class='selected'"; } ?>	>projects</a>	<? if(curPage() == 'homepage.php') {	echo "<div class='arrow'></div>"; } ?>
	<li><a href='homepage.php'		<? if(curPage() == 'homepage.php') { echo "class='selected'"; } ?>	>homepage</a>
</ul></nav>