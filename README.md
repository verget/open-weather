# Weather Test Application

Simple single page web application that shows weather information for selected city by using an open weather data source provider (http://www.openweathermap.org).

## Features

- Hourly (for every 3 hours) forecast information for the current date when opened
- Detect your geoposition and show weather for your city by default
- Date selector for showing specific date’s hourly forecast
- Option to select imperial or metric units
- Accept url routes to show a specific date’s / units / city hourly forecast, for example `http://localhost:4200/main;city=Moscow;units=imperial;date=19-03-19`
- Show temperature in C° or F°,wind speed in km/h or miles/h, condition (rainy, sunny, cloudy, storm etc.) for each hour
- Work on both mobile and desktop browsers
- Specified configuration for `DEV` and `PROD` environment
- Simple state-management made with rxjs

## Technology

- Angular6+
- RxJs
- Scss CSS pre-processor
- Npm

## How to Use

1. Install dependency by `npm install`
2. Start an application by `npm start` 

## Dependencies

- Angular Date Time Picker [ng-pick-datetime](https://www.npmjs.com/package/ng-pick-datetime)
- [Moment.js](https://github.com/moment/moment)
- [OpenWeatherMap](https://openweathermap.org)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

The Application has very few tests, just for examples


## Security

P.S. environment files saved in repository for your easy access to application, please do not consider this is vulnerability =)
