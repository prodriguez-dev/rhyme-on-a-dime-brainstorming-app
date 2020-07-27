jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://www.rhymeonadime.org' + options.url;
  }
});

var form = document.getElementsByClassName('pure-form');
var rk1 = config.ROD_KEY_1;
var rk2 = config.ROD_KEY_2;
var rk3 = config.ROD_KEY_3;

function init() {
  gapi.client.setApiKey(rk1);
  gapi.client.load("youtube", "v3", function () {
    // yt api is ready
  });
}

form[0].addEventListener('submit', event => {
  event.preventDefault();
  var rhymeWord = event.target.elements.rhymeInput.value;

  fetch('https://api.datamuse.com/words?rel_rhy=' + rhymeWord + '&k=' + rk2)
    .then(response => {
      return response.json().then(matchRhymes => {
        var oneSyllableRhymes = [];
        var twoSyllableRhymes = [];
        var threeSyllableRhymes = [];
        var fourSyllableRhymes = [];
        var fiveSyllableRhymes = [];
        var sixSyllableRhymes = [];
        var sevenSyllableRhymes = [];
        var eightSyllableRhymes = [];
        var nineSyllableRhymes = [];

        for (var i = 0; i < matchRhymes.length; i++) {
          if (matchRhymes[i].numSyllables === 1) {
            oneSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 2) {
            twoSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 3) {
            threeSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 4) {
            fourSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 5) {
            fiveSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 6) {
            sixSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 7) {
            sevenSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 8) {
            eightSyllableRhymes.push(matchRhymes[i].word);
          } else if (matchRhymes[i].numSyllables === 9) {
            nineSyllableRhymes.push(matchRhymes[i].word);
          }
        }

        document.getElementsByTagName('H2')[0].innerHTML = 'Here are words that rhyme with ' + rhymeWord + ':';
        document.getElementById('syl1').getElementsByTagName('P')[0].innerHTML = oneSyllableRhymes.join(', ');
        document.getElementById('syl2').getElementsByTagName('P')[0].innerHTML = twoSyllableRhymes.join(', ');
        document.getElementById('syl3').getElementsByTagName('P')[0].innerHTML = threeSyllableRhymes.join(', ');
        document.getElementById('syl4').getElementsByTagName('P')[0].innerHTML = fourSyllableRhymes.join(', ');
        document.getElementById('syl5').getElementsByTagName('P')[0].innerHTML = fiveSyllableRhymes.join(', ');
        document.getElementById('syl6').getElementsByTagName('P')[0].innerHTML = sixSyllableRhymes.join(', ');
        document.getElementById('syl7').getElementsByTagName('P')[0].innerHTML = sevenSyllableRhymes.join(', ');
        document.getElementById('syl8').getElementsByTagName('P')[0].innerHTML = eightSyllableRhymes.join(', ');
        document.getElementById('syl9').getElementsByTagName('P')[0].innerHTML = nineSyllableRhymes.join(', ');

        if (oneSyllableRhymes.length === 0) {
          document.getElementById('syl1').style.display = "none";
        }
        if (twoSyllableRhymes.length === 0) {
          document.getElementById('syl2').style.display = "none";
        }
        if (threeSyllableRhymes.length === 0) {
          document.getElementById('syl3').style.display = "none";
        }
        if (fourSyllableRhymes.length === 0) {
          document.getElementById('syl4').style.display = "none";
        }
        if (fiveSyllableRhymes.length === 0) {
          document.getElementById('syl5').style.display = "none";
        }
        if (sixSyllableRhymes.length === 0) {
          document.getElementById('syl6').style.display = "none";
        }
        if (sevenSyllableRhymes.length === 0) {
          document.getElementById('syl7').style.display = "none";
        }
        if (eightSyllableRhymes.length === 0) {
          document.getElementById('syl8').style.display = "none";
        }
        if (nineSyllableRhymes.length === 0) {
          document.getElementById('syl9').style.display = "none";
        }

        document.getElementsByTagName('H2')[1].innerHTML = 'Here are the top 4 videos with your word ' + rhymeWord + ':';

        //prepare the youtube request
        var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: encodeURIComponent(rhymeWord).replace(/%20/g, "+"),
          maxResults: 4,
          order: "viewCount",
          publishedAfter: "2019-01-01T00:00:00Z"
        });
        //execute the request
        request.execute(function (response) {

          var vid1Title = response.items["0"].snippet.title;
          var vid2Title = response.items["1"].snippet.title;
          var vid3Title = response.items["2"].snippet.title;
          var vid4Title = response.items["3"].snippet.title;
          var vid1Id = response.items["0"].id.videoId;
          var vid2Id = response.items["1"].id.videoId;
          var vid3Id = response.items["2"].id.videoId;
          var vid4Id = response.items["3"].id.videoId;
          var vid1Src = "//www.youtube.com/embed/" + vid1Id + "/";
          var vid2Src = "//www.youtube.com/embed/" + vid2Id + "/";
          var vid3Src = "//www.youtube.com/embed/" + vid3Id + "/";
          var vid4Src = "//www.youtube.com/embed/" + vid4Id + "/";

          document.getElementById('vid1').getElementsByTagName('P')[0].innerHTML = vid1Title;
          document.getElementById("ivid1").src = vid1Src;
          document.getElementById('vid2').getElementsByTagName('P')[0].innerHTML = vid2Title;
          document.getElementById("ivid2").src = vid2Src;
          document.getElementById('vid3').getElementsByTagName('P')[0].innerHTML = vid3Title;
          document.getElementById("ivid3").src = vid3Src;
          document.getElementById('vid4').getElementsByTagName('P')[0].innerHTML = vid4Title;
          document.getElementById("ivid4").src = vid4Src;
        });

        document.getElementsByTagName('H2')[2].innerHTML = 'Here are the top 6 pictures with your word ' + rhymeWord + ':';

        var rhymePhoto =
          'https://pixabay.com/api/?key=' + rk3 + '&q=' + rhymeWord;
        fetch(rhymePhoto).then((response) => {
          return response.json().then((photoOutput) => {

            var img1Src = document.createElement('img');
            img1Src.setAttribute('src', photoOutput.hits['0'].webformatURL);
            img1Src.setAttribute('class', 'pure-img-responsive');

            var img1 = document.getElementById('image1');
            img1.innerHTML = '';
            img1.append(img1Src);

            var img2Src = document.createElement('img');
            img2Src.setAttribute('src', photoOutput.hits['1'].webformatURL);
            img2Src.setAttribute('class', 'pure-img-responsive');

            var img2 = document.getElementById('image2');
            img2.innerHTML = '';
            img2.append(img2Src);

            var img3Src = document.createElement('img');
            img3Src.setAttribute('src', photoOutput.hits['2'].webformatURL);
            img3Src.setAttribute('class', 'pure-img-responsive');

            var img3 = document.getElementById('image3');
            img3.innerHTML = '';
            img3.append(img3Src);

            var img4Src = document.createElement('img');
            img4Src.setAttribute('src', photoOutput.hits['3'].webformatURL);
            img4Src.setAttribute('class', 'pure-img-responsive');

            var img4 = document.getElementById('image4');
            img4.innerHTML = '';
            img4.append(img4Src);

            var img5Src = document.createElement('img');
            img5Src.setAttribute('src', photoOutput.hits['4'].webformatURL);
            img5Src.setAttribute('class', 'pure-img-responsive');

            var img5 = document.getElementById('image5');
            img5.innerHTML = '';
            img5.append(img5Src);

            var img6Src = document.createElement('img');
            img6Src.setAttribute('src', photoOutput.hits['5'].webformatURL);
            img6Src.setAttribute('class', 'pure-img-responsive');

            var img6 = document.getElementById('image6');
            img6.innerHTML = '';
            img6.append(img6Src);
          });
        });
      });
    });
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Chrome, Safari and Opera
  document.documentElement.scrollTop = 0; // For IE and Firefox
}
