var source = '<pre>'+'\n'+
'<code class="javascript">'+'\n'+
'<span class="keyword">var</span> hoverEffect = <span class="literal">'+hoverEffect+'</span>; <span class="comment">// set true for hover effect, set false for no hover effect</span>'+'\n'+
''+'\n'+
'<span class="keyword">var</span> searchEngine = <span class="string">\'google\'</span>; <span class="comment">// default search engine - set google for google search, bing for bing search, yahoo for yahoo search</span>'+'\n'+
''+'\n'+
'<span class="keyword">var</span> numberOfScreens = <span class="number">1</span>; <span class="comment">// set number of screens (1 or 2 or 3)</span>'+'\n'+
' '+'\n'+
'<span class="keyword">var</span> blockName = <span class="keyword">new</span> Array(); <span class="comment">// set names of blocks</span>'+'\n'+
''+'\n'+
'blockName[<span class="number">1</span>] = <span class="string">\'Most used\'</span>;'+'\n'+
'blockName[<span class="number">2</span>] = <span class="string">\'Social\'</span>;'+'\n'+
'blockName[<span class="number">3</span>] = <span class="string">\'News &amp; fun\'</span>;'+'\n'+
''+'\n'+
'<span class="keyword">var</span> bookmark = <span class="keyword">new</span> Array();'+'\n'+
'bookmark[<span class="number">0</span>] = <span class="keyword">new</span> Array();'+'\n'+
'bookmark[<span class="number">1</span>] = <span class="keyword">new</span> Array();'+'\n'+
'bookmark[<span class="number">2</span>] = <span class="keyword">new</span> Array();'+'\n'+
''+'\n'+
''+'\n'+
'<span class="comment">// set your bookmarks here: (If you do not fill \'thumb\' for thumbnail will be used title)</span>'+'\n'+
'<span class="comment">// FIRST BLOCK</span>'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">0</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'YouTube\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://youtube.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'youtube.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">1</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'Yahoo\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://yahoo.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'yahoo.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">2</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'Grooveshark\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://grooveshark.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'grooveshark.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">3</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'last.fm\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.last.fm/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'lastfm.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">4</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'twitter\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://twitter.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'twitter.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">5</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'google\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://google.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'google.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">6</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'facebook\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://facebook.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'facebook.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">7</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'BBC news\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.bbc.co.uk/news/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'bbcnews.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">8</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'CNN\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.cnn.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'cnn.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">9</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'deviantART\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://deviantart.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'deviantart.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">10</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'wikipedia\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://wikipedia.org\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'wikipedia.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">0</span>][<span class="number">11</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'iTunes\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.apple.com/itunes/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'itunes.png\'</span>'+'\n'+

'};'+'\n'+
'<span class="comment">// end of FIRST BLOCK</span>'+'\n'+
'<span class="comment">// SECOND BLOCK</span>'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">0</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'linkedin\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.linkedin.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'linkedin.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">1</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'digg\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://digg.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'digg.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">2</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'flickr\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.flickr.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'flickr.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">3</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'msn\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.msn.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'msn.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">4</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'reddit\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.reddit.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'reddit.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">5</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'skype\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.skype.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'skype.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">6</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'technorati\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://technorati.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'technorati.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">7</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'delicious\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.delicious.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'delicious.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">8</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'MySpace\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.myspace.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'myspace.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">9</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'orkut\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.orkut.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'orkut.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">10</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'tumblr\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.tumblr.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'tumblr.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">1</span>][<span class="number">11</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'StumbleUpon\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.stumbleupon.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'stumbleupon.png\'</span>'+'\n'+

'};'+'\n'+
'<span class="comment">//end of SECOND BLOCK</span>'+'\n'+
'<span class="comment">// THIRD BLOCK</span>'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">0</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'eurosport\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.eurosport.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'eurosport.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">1</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'amazon\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.amazon.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'amazon.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">2</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'eBay\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.ebay.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'ebay.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">3</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'IMDb\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.imdb.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'imdb.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">4</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'vimeo\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://vimeo.com\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'vimeo.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">5</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'lifehacker\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://lifehacker.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'lifehacker.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">6</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'engadged\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.engadget.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'engadget.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">7</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'zune\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.zune.net/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'zune.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">8</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'dropbox\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.dropbox.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'dropbox.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">9</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'National Geographic\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.nationalgeographic.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'natgeo.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">10</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'CBC news\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.cbc.ca/news/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'cbcnews.png\'</span>'+'\n'+

'};'+'\n'+
'bookmark[<span class="number">2</span>][<span class="number">11</span>] = {'+'\n'+
    '<span class="string">\'title\'</span>:<span class="string">\'weather.com\'</span>,'+'\n'+
    '<span class="string">\'url\'</span>:<span class="string">\'http://www.weather.com/\'</span>,'+'\n'+
    '<span class="string">\'thumb\'</span>:<span class="string">\'weather.png\'</span>'+'\n'+

'};'+'\n'+
'    </code>'+'\n'+
'	</pre>';