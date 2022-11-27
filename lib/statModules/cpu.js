var si = require('systeminformation')
utils = require('../utils')

var colors = utils.colors;

function(line){
	this.line = line;
	si.currentLoad(data => {
		this.cpuData = data.cpus.map((cpu, i) => {
			return {
				title: 'CPU' + (i + 1),
				style: {
					line: colors[i % colors.length]
				},
				x: Array(61).fill().map((_, i) => 60 - i),
				y: Array(61).fill(0),

			};
		});
		this.updateData(datab);
		this.interval = setInterval(() => {
			si.currentLoad(data => {
				this.updateData(data);
			});
		}, 1000);
	});
}