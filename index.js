#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('./package.json');
const initOption = require('./lib/core/option');
const initCommand = require('./lib/core/command')


// 初始化指令
initOption();
initCommand();

program.parse(process.argv);

const options = program.opts();
