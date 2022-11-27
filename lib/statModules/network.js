//network monitor
var si = require("systeminformation"),
  utils = require("../utils");

var colors = utils.colors;

function Network(sparkline) {
  this.sparkline = sparkline;
  this.netData = [Array(61).fill(0), Array(61).fill(0)];

  si.networkInterfaceDefault((iface) => {
    var that = this;
    var updater = function () {
      si.networkStats(iface, (data) => {
        that.updateDate(data[0]);
      });
    };
    update();
    this.interval = setInterval(updater, 1000);
  });
}
