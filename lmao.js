Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

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
var now = new Date();
var dates = [],
		minDates = [];
dates[0] = new Date("2017-09-25");
dates[1] = new Date("2017-10-02");
dates[2] = new Date("2017-11-09");
dates[3] = new Date("2017-11-23");
dates[4] = new Date("2017-11-24");
dates[5] = new Date("2018-12-18");
dates[6] = new Date("2018-12-19");
var coo = [];
for(var i=0;i<dates.length;i++){
	if(dates[i] > now) {coo[i] = dates[i]}
  else{coo[i] = undefined}
}
for(var j = 0;j<dates.length;j++){
	if(coo[j]){minDates[j] = coo[j].getTime();}
  else{minDates[j] = undefined}
}
for(var k = 0;k<minDates.length;k++){
	if(minDates[k]){minDates[k] = minDates[k] - now.getTime()}
  else{minDates[k] = undefined}
}

var minDates1 = minDates.slice(0);
console.log(dates)
console.log(coo)
console.log(minDates)

minDates1.clean()
console.log(minDates1)
//console.log(minDates1.min())
console.log(minDates.indexOf(minDates1.min()))
console.log(dates[minDates.indexOf(minDates1.min())])
