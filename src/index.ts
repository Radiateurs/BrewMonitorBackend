/* eslint-disable no-console */
import "reflect-metadata";
import IndexRouter from "./routes";
import { BrewMonitorApp } from './brewMonitor';
import os from 'os';

var option: any;

if (process.env.NODE_ENV === 'production') {
    option = require('../config/prod.config.json');
} else {
    option = require('../config/dev.config.json');
}

var myApp: BrewMonitorApp = new BrewMonitorApp(option);
myApp.setup(IndexRouter);
myApp.start().then(() => {
    console.log(`Application started on http://${os.hostname()}:${myApp.option.port}/`)
}).catch((err) => {
    console.error(err);
});