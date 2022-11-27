var si = require('systeminformation'),
  utils = require('../utils');

function Disk(donut) {
  this.donut = donut;

  si.fsSize(data => {
    this.updateData(data);
  });

  this.interval = setInterval(() => {
    si.fsSize(data => {
      this.updateData(data);
    });
  }, 10000);
}