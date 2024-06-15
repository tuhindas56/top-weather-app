const errorElement = document.querySelector('.error') as HTMLParagraphElement
const loader = document.querySelector('.loader') as HTMLDivElement
const toggleUnitBtn = document.querySelector('.toggle-unit') as HTMLButtonElement
const searchBtn = document.querySelector('.search-btn') as HTMLButtonElement
const todayCard = document.querySelector('.today-card') as HTMLDivElement
const forecastCard = document.querySelector('.forecast-card') as HTMLDivElement

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
