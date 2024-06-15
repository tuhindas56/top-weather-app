const errorElement = document.querySelector('.error') as HTMLParagraphElement
const loader = document.querySelector('.loader') as HTMLDivElement
const toggleUnitBtn = document.querySelector('.toggle-unit') as HTMLButtonElement
const searchBtn = document.querySelector('.search-btn') as HTMLButtonElement
const todayCard = document.querySelector('.today-card') as HTMLDivElement
const forecastCard = document.querySelector('.forecast-card') as HTMLDivElement
const tempElement = document.querySelector('.temp') as HTMLParagraphElement
const feelsLikeElement = document.querySelector('.feels-like') as HTMLParagraphElement
const conditionElement = document.querySelector('.condition') as HTMLParagraphElement
const dateElement = document.querySelector('.date') as HTMLParagraphElement
const locationElement = document.querySelector('.location') as HTMLSpanElement
const humidityElement = document.querySelector('.humidity') as HTMLParagraphElement
const rainProbabilityElement = document.querySelector('.rain-probability') as HTMLSpanElement
const currentIcon = document.querySelector('.current-icon') as HTMLImageElement
const hourlyInfo = document.querySelector('.hourly-info') as HTMLUListElement

export function renderError(error: Error) {
  errorElement.textContent = `Error: ${error.message}`
  setTimeout(() => {
    errorElement.textContent = ''
  }, 5000)
}

export function toggleLoader() {
  toggleUnitBtn.disabled = !toggleUnitBtn.disabled
  searchBtn.disabled = !searchBtn.disabled
  todayCard.classList.toggle('pulse')
  forecastCard.classList.toggle('pulse')
  loader.classList.toggle('none')
}

export function renderCurrentData(
  unit: string,
  temp: number,
  feelsLike: number,
  condition: string,
  date: string,
  location: { city: string; country: string },
  humidity: number,
  rainProbability: number,
  iconPath: string,
) {
  currentIcon.src = iconPath
  tempElement.innerHTML = `${temp}<sup>°${unit}</sup>`
  feelsLikeElement.innerText = `Feels like: ${feelsLike}°`
  conditionElement.innerText = condition
  dateElement.innerText = date
  locationElement.innerText = `${location.city}, ${location.country}`
  humidityElement.innerText = `Humidity: ${humidity}%`
  rainProbabilityElement.innerText = `Rain probability: ${rainProbability}%`
}

export function renderHourData(temp: number, time: string, iconPath: string) {
  const liElement = document.createElement('li') as HTMLLIElement
  const hourTempElement = document.createElement('p') as HTMLParagraphElement
  const imgElement = new Image()
  const timeElement = document.createElement('p') as HTMLParagraphElement
  const amPmElement = document.createElement('p') as HTMLParagraphElement
  const amPm = +time < 12 ? 'AM' : 'PM'

  imgElement.src = iconPath
  hourTempElement.innerText = `${temp}°`
  timeElement.innerText = `${time}:00`
  amPmElement.innerText = amPm

  liElement.className = 'hour-card flex flex-col align-center justify-between'
  hourTempElement.className = 'bold'
  timeElement.className = 'bold'

  liElement.appendChild(hourTempElement)
  liElement.appendChild(imgElement)
  liElement.appendChild(timeElement)
  liElement.appendChild(amPmElement)
  hourlyInfo.appendChild(liElement)
}

export function clearHourDataFromDOM() {
  hourlyInfo.innerHTML = ''
}

export function renderForecastData(
  forecastNumber: number,
  date: string,
  rainProbability: string,
  low: string,
  high: string,
  iconPath: string,
) {
  const forecastDate = document.querySelector(
    `.forecast[data-id="${forecastNumber}"] .forecast-date`,
  ) as HTMLSpanElement
  const forecaseRainProbability = document.querySelector(
    `.forecast[data-id="${forecastNumber}"] .forecast-rain-probability`,
  ) as HTMLSpanElement
  const forecaseLowHighTemp = document.querySelector(
    `.forecast[data-id="${forecastNumber}"] .forecast-low-high-temp`,
  ) as HTMLSpanElement
  const forecastConditionIcon = document.querySelector(
    `.forecast[data-id="${forecastNumber}"] .condition-icon`,
  ) as HTMLImageElement

  forecastDate.textContent = date
  forecaseRainProbability.textContent = `${rainProbability}%`
  forecaseLowHighTemp.textContent = `${low}° / ${high}°`
  forecastConditionIcon.src = iconPath
}
