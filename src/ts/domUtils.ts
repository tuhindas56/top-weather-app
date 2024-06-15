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
