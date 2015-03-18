/**
  The MIT License (MIT)

  Copyright (c) 2014 Jeppe Rune Mortensen

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
  the Software, and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
  FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
  IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/
// ==UserScript==
// @id          GooglePirateExtendedv4
// @name        GooglePirateExtendedv4
// @namespace	https://openuserjs.org/scripts/teocci/GooglePirateExtendedv4
// @description	Use Google to find free music, tv shows, movies, anime, torrents, comics, books and other files stored publicly online.
// @version		4.0.1
// @author      Jorge Frisancho <teocci@hanmail.net>
// @include		http://*.google.*/*
// @include		https://*.google.*/*
// @include		http://*.google.*/webhp*
// @include		https://*.google.*/webhp*
// @include		http://*.google.*/search*
// @include		https://*.google.*/search*
// @include		https://encrypted.google.*/search* 
// @include		https://encrypted.google.*/ 
// @include		*google.*/firefox*
// @exclude		*images.google*
// @exclude		*video.google*
// @grant		none
// @updateURL   https://openuserjs.org/scripts/teocci/GooglePirateExtendedv4.user.js
// @downloadURL     https://openuserjs.org/scripts/teocci/GooglePirateExtendedv4.user.js
// @run-at          document-start
// @priority        9001
// @contributionURL https://github.com/teocci/GooglePirateExtended/wiki/Donate
// @license         MIT
// ==/UserScript==

function addNewRadio(nametext, dorkvalue){
	var search = document.getElementsByName('f')[0];
	var newText = document.createTextNode(nametext);
	var newRadio = document.createElement('input');
	var breakup = document.createElement('br');
	newRadio.setAttribute('type', 'radio');
	newRadio.setAttribute('name', 'q');
	newRadio.setAttribute('value', dorkvalue);
	if (nametext==='Web'){
		newRadio.setAttribute('checked', 'checked');
    }
	search.appendChild(breakup);
	search.appendChild(newRadio);
	search.appendChild(newText);
}

function newselect(nametext, dork){
	var newoption = document.createElement('option');
	newoption.setAttribute('value', dork);
	newoption.innerHTML=nametext;
	s.appendChild(newoption);
}

if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
	document.getElementsByName('q')[0].focus();
	addNewRadio('Web', ' ');
	addNewRadio('Wordreference', 'site:wordreference.com');
	addNewRadio('Youtube', 'site:youtube.com');
	addNewRadio('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
	addNewRadio('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -cdkey -asp -torrent -html -web-shelf -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
	addNewRadio('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
	addNewRadio('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp');
	addNewRadio('Torrents', '+torrent -trailer -blogspot -proxy');
	addNewRadio('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
	addNewRadio('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
}else{
	var s = document.createElement('select');
	s.setAttribute('name', 'q');
	s.setAttribute('onchange', 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value');
	document.getElementById('prs').appendChild(s);
	newselect('Web', '');
	newselect('Youtube', 'site:youtube.com');
	newselect('Music', 'intitle:"music" (mp3|aac|flac|wav) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3');
	newselect('Movies/TV', '(avi|mpg|wmv|mpeg|divx) "Parent Directory" -"Trailer" -torrent -serial -cdkey -web-shelf -asp -html -zoozle -jsp -htm -listen77 -idmovies -shexy -eucontest -0x7');
	newselect('Anime', 'intitle:"anime" (avi|mpg|wmv|mpeg|mkv|ogm) +ddl -animefield.is-there.net -torrent -torrents');
	newselect('FTP Folder', '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp');
	newselect('Torrents', '+torrent -trailer -blogspot -proxy"');
	newselect('EBooks/Comics', '(chm|pdf|cbr|nfo) -torrents -torrent -md5 -md5sums -idpdf');
	newselect('RAR/Zip Archives', '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"');
	if(window.location.href.search('idmusic')>0){s.options[1].defaultSelected='true';}
	if(window.location.href.search('idmovies')>0){s.options[2].defaultSelected='true';}
	if(window.location.href.search('idftp')>0){s.options[3].defaultSelected='true';}
	if(window.location.href.search('torrent')>0){s.options[4].defaultSelected='true';}
	if(window.location.href.search('idpdf')>0){s.options[5].defaultSelected='true';}
	var i = 1;
	while (i<s.options.length){
		if(s.options[i].defaultSelected===true){
		document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext().value = window.location.href.split("&q=")[1].split("&")[0];}
		i++;
	}
	var p = 0;
	var qs = document.evaluate( '//input[contains(@title, "Search")]' , document, null, 0, null ).iterateNext();
	var newqs = '';
	while(p<qs.value.split('+').length){
		if(p==qs.value.split('+').length-1){
			newqs = newqs+qs.value.split('+')[p];
		}else{
			newqs = newqs+qs.value.split('+')[p]+' ';
		}
		p++;
	}
	qs.value = newqs;
	var ni = document.createElement('input');
	ni.setAttribute('type', 'hidden');
	ni.setAttribute('name', 'q');
	ni.setAttribute('value', s.value);
	document.forms[0].appendChild(ni);
}inurl:youtube;
