const _ = require('lodash');
const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=f557b20727184231a597c710c8be3106';
const kelvinToF = () => {
    return Math.round((kelvin - 273.15) * 18 + 32) + 'F';
};

module.exports = (latitude, longitude) => {
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
    return fetch(url).then((response) => {
        return response.json();
    }).then(json => {
        return {
            city: json.name,
            temperature: kelvinToF(json.main.temp),
            description: _.capitalize(json.weather[0].description)
        };
    });
};
