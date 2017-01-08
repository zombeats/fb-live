/* global $ */
$(function () {
  'use strict'
  var ACCESS_TOKEN = '1795140000768189|uqasdzez1CahupWwTL5SF1NQ2eA'
  var POST_ID = '1167016920063081'
  var REFRESH_TIME_ON_SECONDS = 1
  var DEFAULT_COUNT = 0
  var IS_PRODUCTION = true

  var REACTIONS = [
    'LIKE',
    'LOVE',
    'WOW',
    'HAHA',
    'SAD',
    'ANGRY'
  ].map(function (reaction) {
    var code = 'reactions_' + reaction.toLowerCase()
    var select = 'reactions.type('
    select += reaction
    select += ').limit(0).summary(total_count).as('
    select += code
    select += ')'
    return select
  }).join(',')

  var URL =
    'https://graph.facebook.com/v2.8/?ids=' + POST_ID +
    '&fields=' + REACTIONS +
    '&access_token=' + ACCESS_TOKEN +
    '&callback=?' // JSONP

  var COUNTERS = [
    { el: $('.counter-1'), name: 'reactions_angry', progress: $('.bar-1') },
    { el: $('.counter-2'), name: 'reactions_haha', progress: $('.bar-2') },
    { el: $('.counter-3'), name: 'reactions_like', progress: $('.bar-3') },
    { el: $('.counter-4'), name: 'reactions_love', progress: $('.bar-4') },
    { el: $('.counter-5'), name: 'reactions_sad', progress: $('.bar-5') },
    { el: $('.counter-6'), name: 'reactions_wow', progress: $('.bar-6') }
  ]


  function refreshCounts () {
    $.getJSON(URL, function (res) {
      res = res[POST_ID]
      var totalCounts = 0;
      COUNTERS.forEach(function (counter, index) {
        var counterValue = Number(res[counter.name].summary.total_count);
        if(counter.progress[0]){
        totalCounts = totalCounts + Number(counterValue);
        counter.el.text(DEFAULT_COUNT + counterValue)
        }
      })
      COUNTERS.forEach(function (counter, index) {
        var counterValue = Number(res[counter.name].summary.total_count);
        const percent = (counterValue/totalCounts)*100
        if(counter.progress[0]){
          counter.progress[0].style.width = `${percent}%`;
        }
      })
    })
  }

  if (IS_PRODUCTION) setInterval(refreshCounts, REFRESH_TIME_ON_SECONDS * 1000)
})
