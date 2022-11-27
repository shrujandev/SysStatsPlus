var si = require('systeminformation'),
  utils = require('../utils');

function Mem(line, memDonut, swapDonut) {
  this.line = line;
  this.memDonut = memDonut;
  this.swapDonut = swapDonut;

  si.mem(data => {
    this.memData = [
      {
        title: 'Memory',
        style: {
          line: colors[0],
        },
        x: Array(61)
          .fill()
          .map((_, i) => 60 - i),
        y: Array(61).fill(0),
      },
      {
        title: 'Swap',
        style: {
          line: colors[1],
        },
        x: Array(61)
          .fill()
          .map((_, i) => 60 - i),
        y: Array(61).fill(0),
      },
    ];
    this.updateData(data);
    this.interval = setInterval(() => {
      si.mem(data => {
        this.updateData(data);
      });
    }, 1000);
  });
}
