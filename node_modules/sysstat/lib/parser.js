var _ = require('underscore');

function parse(sarOutput, cb){
  var stats = sarOutput.split('\n');

  var blocks = [];
  if(stats.length == 2) return;

  var category, keys, id, toSend = [];
  _(stats).forEach(function(stat){
    if(stat === '') {
      keys = null;
      category = null;
      return;
    }
    if(!keys) {
      keys = stat.split(' ');
      keys.splice(0,1);
      keys = _.compact(keys);
      if(/[A-Z]/.test(keys[0])) category = keys.splice(0,1)[0];
      return;
    }else{
      var values = stat.split(' ');
      values = _.compact(values);
      var time = values.splice(0,1)[0];
      var subCategory;
      if(category) subCategory = values.splice(0,1)[0];
      keys.forEach(function(key, i){
        var o = {};
        o['time'] = time;
        if(category) key = category + '_' + subCategory + '_' + key;
        o[key] = values[i];
        toSend.push(o);
      });
    }
  });

  var groupedByTime = _(toSend).groupBy(function(o){
    return o.time;
  });

  groupedByTime = _(groupedByTime).map(function(group, date){
      return _.extend.apply(_, group);
  });

  var ret = _.chain(groupedByTime).values().flatten().value();
  cb(null, ret);
}

module.exports = debouceAndAppend(parse, 10);

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
//
// the first argument (a string) is appended each time debouceAndAppend is called.
function debouceAndAppend(func, wait) {
  var timeout, firstArg = '';
  return function() {
    var context = this, args = arguments;
    firstArg = firstArg + arguments[0].toString();
    var later = function() {
      timeout = null;
      args[0] = firstArg;
      func.apply(context, args);
      firstArg = '';
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
