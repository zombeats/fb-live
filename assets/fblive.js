/* global $ */
$(function () {
  'use strict'
  var ACCESS_TOKEN = '1795140000768189|uqasdzez1CahupWwTL5SF1NQ2eA'
  var POST_ID = '1152668961497877'
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
    { el: $('.counter-1'), name: 'reactions_angry' },
    { el: $('.counter-2'), name: 'reactions_haha' },
    { el: $('.counter-3'), name: 'reactions_like' },
    { el: $('.counter-4'), name: 'reactions_love' },
    { el: $('.counter-5'), name: 'reactions_sad' },
    { el: $('.counter-6'), name: 'reactions_wow' }
  ]

  function refreshCounts () {
    $.getJSON(URL, function (res) {
      res = res[POST_ID]
      COUNTERS.forEach(function (counter, index) {
        var counterValue = res[counter.name].summary.total_count
        counter.el.text(DEFAULT_COUNT + counterValue)
      })
    })
  }

  if (IS_PRODUCTION) setInterval(refreshCounts, REFRESH_TIME_ON_SECONDS * 500)
})
