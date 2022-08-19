const main = document.querySelector('.main');
const cityName = document.querySelector('.title');
const input = document.querySelector('.input');
const temperature = document.querySelector('.temperature');
const weatherIcon = document.querySelector('.weather-icon');
const weather = document.querySelector('.weather');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=93b9a313701f565479c4eb484fb2bc15';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Warsaw';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	input.classList.remove('input-error');
	input.value = '';
	input.setAttribute('placeholder', 'Enter city name');

	axios
		.get(URL)
		.then((res) => {
			cityName.textContent = city;
			temperature.textContent = Math.floor(res.data.main.temp) + ' °C';
			weather.textContent = res.data.weather[0].main;
			pressure.textContent = res.data.main.pressure + ' hPa';
			humidity.textContent = res.data.main.humidity + ' %';
			wind.textContent = res.data.wind.speed.toFixed(1) + ' m/s';

			const status = res.data.weather[0].id;

			if (status >= 200 && status < 300) {
				weatherIcon.setAttribute('src', 'img/icons/storm.svg');
				main.style.backgroundImage = `url('img/backgrounds/storm.jpg')`;
			} else if (status >= 300 && status < 600) {
				weatherIcon.setAttribute('src', 'img/icons/rain.svg');
				main.style.backgroundImage = `url('img/backgrounds/rain.jpg')`;
			} else if (status >= 600 && status < 700) {
				weatherIcon.setAttribute('src', 'img/icons/snow.svg');
				main.style.backgroundImage = `url('img/backgrounds/snow.jpg')`;
			} else if (status >= 700 && status < 800) {
				weatherIcon.setAttribute('src', 'img/icons/fog.svg');
				main.style.backgroundImage = `url('img/backgrounds/fog.jpg')`;
			} else if (status === 800) {
				weatherIcon.setAttribute('src', 'img/icons/sun.svg');
				main.style.backgroundImage = `url('img/backgrounds/sun.jpg')`;
			} else if (status > 800) {
				weatherIcon.setAttribute('src', 'img/icons/clouds.svg');
				main.style.backgroundImage = `url('img/backgrounds/clouds.jpg')`;
			}
		})
		.catch(() => {
			input.classList.add('input-error');
			input.value = '';
			input.setAttribute('placeholder', 'Invalid city name');
		});
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterCheck);
getWeather();
