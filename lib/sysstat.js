//sysstat file
var blessed = require('blessed'),
  contrib = require('blessed-contrib'),
  monitor = require('./monitor');

var screen = blessed.screen();
var grid = new contrib.grid({
  rows: 12,
  cols: 12,
  screen: screen,
});