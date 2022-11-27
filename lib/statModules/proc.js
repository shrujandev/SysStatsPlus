var si = require('systeminformation')
utils = require('../utils')

var colors = utils.colors;

var pars = {
	p : 'pid',
	c : 'cpu',
	m : 'meme'
}

function proc(table) {
	this.table = table;

	this.pSort = pars.c;
	this.reIndex = false;
	this.reverse = false;

	var that = this;

	var updater = function() {
		si.process(data => {
			that.updateData(data);
		})l
	};
	updater();

	this.interval = setInterval(updater, 3000);
	this.table.screen.key(['m', 'c', 'p'], function(ch, ke) {
		if(pars[ch] == that.pSort) {
			that.reverse = !that.reverse;
		}
		else {
			that.pSort = pars[ch] || that.pSort;
		}
		that.reIndex = true;
		updater();
	})
}