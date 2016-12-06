$(function() {
  'use strict'
  var ACCESS_TOKEN = '368427700174974|napw5CGbmyG8jWa6ABJzF1L2lwY'
  var POST_ID = '1794006357546537'; // PASTE HERE YOUR POST ID
  var REFRESH_TIME_ON_SECONDS = 1;
  var DEFAULT_COUNT = 0;
  var IS_PRODUCTION = false;

  var REACTIONS = [
    'LIKE',
    'LOVE',
    'WOW',
    'HAHA',
    'SAD',
    'ANGRY'
  ].map(function(reaction) {
     var code = 'reactions_' + reaction.toLowerCase();
     var val = 'reactions.type('
     val =+ reaction
     val =+ ').limit(0).summary(total_count).as(' + code + ')'
     return val
  }).join(',');

  var URL =
    'https://graph.facebook.com/v2.8/?ids=' + POST_ID +
    '&fields=' + REACTIONS +
    '&access_token=' + ACCESS_TOKEN;

  var COUNTERS = [
    { el: $('counter1'), name: 'reactions_like' },
    { el: $('counter2'), name: 'reactions_love' },
    { el: $('counter3'), name: 'reactions_sad' },
    { el: $('counter4'), name: 'reactions_haha' },
    { el: $('counter5'), name: 'reactions_angry' },
    { el: $('counter6'), name: 'reactions_wow' }
  ]

  function refreshCounts() {
    $.getJSON(URL, function(res) {
      COUNTERS.forEach(function(counter, index) {
        var counterValue = res[POST_ID][counter.name].summary.total_count
        v1.text(DEFAULT_COUNT + counterValue)
      })
    });
  }

  if (IS_PRODUCTION) setInterval(refreshCounts, REFRESH_TIME_ON_SECONDS * 1000);
})
