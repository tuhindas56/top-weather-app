import '../style.css'
import { format } from 'date-fns'
import { fetchWeatherData, getIconPath } from './data'
import {
  clearHourDataFromDOM,
  renderCurrentData,
  renderForecastData,
  renderError,
  renderHourData,
  toggleLoader,
} from './domUtils'

const search = document.querySelector('.search-input') as HTMLInputElement
const searchBtn = document.querySelector('.search-btn') as HTMLButtonElement
const toggleUnitBtn = document.querySelector('.toggle-unit') as HTMLButtonElement
let weatherUnit = 'C'

async function renderWeatherInfoInDOM(location?: string) {
  toggleLoader()
  const weatherData = await fetchWeatherData(location || 'Tokyo')
  if (weatherData) {
    const {
      city,
      code,
      country,
      feelsLikeC,
      feelsLikeF,
      hourlyData,
      humidity,
      formattedDate,
      rainProbability,
      tempC,
      tempF,
      timeInHours,
      text: condition,
      forecastDay1Code,
      forecastDay1Date,
      forecastDay1MaxC,
      forecastDay1MaxF,
      forecastDay1MinC,
      forecastDay1MinF,
      forecastDay1RainProbability,
      forecastDay2Code,
      forecastDay2Date,
      forecastDay2MaxC,
      forecastDay2MaxF,
      forecastDay2MinC,
      forecastDay2MinF,
      forecastDay2RainProbability,
    } = weatherData!
    const temp = weatherUnit === 'C' ? tempC : tempF
    const feelsLike = weatherUnit === 'C' ? feelsLikeC : feelsLikeF
    const iconPath = getIconPath(code, timeInHours)
    renderCurrentData(
      weatherUnit,
      temp,
      feelsLike,
      condition,
      formattedDate,
      { city, country },
      Math.floor(humidity),
      Math.floor(rainProbability),
      iconPath,
    )
    clearHourDataFromDOM()
    hourlyData.forEach((forecast) => {
      const hour = format(forecast.time, 'HH')
      const forecastTemp =
        weatherUnit === 'C' ? Math.floor(forecast.temp_c) : Math.floor(forecast.temp_f)
      renderHourData(forecastTemp, hour, getIconPath(forecast.condition.code, hour))
    })
    const forecastDay1Min = weatherUnit === 'C' ? forecastDay1MinC : forecastDay1MinF
    const forecastDay1Max = weatherUnit === 'C' ? forecastDay1MaxC : forecastDay1MaxF
    const forecastDay2Min = weatherUnit === 'C' ? forecastDay2MinC : forecastDay2MinF
    const forecastDay2Max = weatherUnit === 'C' ? forecastDay2MaxC : forecastDay2MaxF
    renderForecastData(
      1,
      forecastDay1Date,
      forecastDay1RainProbability,
      forecastDay1Min,
      forecastDay1Max,
      getIconPath(forecastDay1Code, '5'),
    )
    renderForecastData(
      2,
      forecastDay2Date,
      forecastDay2RainProbability,
      forecastDay2Min,
      forecastDay2Max,
      getIconPath(forecastDay2Code, '5'),
    )
    toggleLoader()
  } else {
    toggleLoader()
    renderError(new Error('Failed to fetch weather data'))
  }
}

async function handleSearchQuery(event?: MouseEvent) {
  if (event) {
    event.preventDefault()
    await renderWeatherInfoInDOM(search.value)
    search.value = ''
  }
}

searchBtn.addEventListener('click', handleSearchQuery)
search.addEventListener('input', () => {
  searchBtn.disabled = false
})
toggleUnitBtn.addEventListener('click', () => {
  weatherUnit = weatherUnit === 'C' ? 'F' : 'C'
  toggleUnitBtn.textContent = toggleUnitBtn.textContent === 'Celsius' ? 'Fahrenheit' : 'Celsius'
  const location = document.querySelector('.location') as HTMLSpanElement
  const splitLocation = location.textContent!.split(',')
  renderWeatherInfoInDOM(splitLocation.join(' '))
})

renderWeatherInfoInDOM()
