Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

var latestFunction = function(dates, eps) {
  var minDates = [];
  var coo = [];
  var now = new Date();

  for (var i = 0; i < dates.length; i++) {
    if (dates[i] > now) {
      coo[i] = dates[i];
    } else {
      coo[i] = undefined;
    }
  }
  for (var j = 0; j < dates.length; j++) {
    if (coo[j]) {
      minDates[j] = coo[j].getTime();
    } else {
      minDates[j] = undefined;
    }
  }
  for (var k = 0; k < minDates.length; k++) {
    if (minDates[k]) {
      minDates[k] = minDates[k] - now.getTime();
    } else {
      minDates[k] = undefined;
    }
  }
  var minDates1 = minDates.slice(0).clean();
  return eps[minDates.indexOf(minDates1.min())];
};

var arrayMinFunction = Array.prototype.min;
var arrayCleanFunction = Array.prototype.clean;

module.exports = {
  arrayMinFunction,
  arrayCleanFunction,
  latestFunction
};
