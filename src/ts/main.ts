import '../style.css'
import { fetchWeatherData, getIconPath, getLocation } from './data'
import {
  clearHourDataFromDOM,
  renderCurrentData,
  renderForecastData,
  renderError,
  renderHourData,
  toggleLoader,
} from './domUtils'

async function locationHandler(location?: string) {
  const response = await getLocation(location)
  if (response instanceof Error) {
    renderError(response)
    return 'Tokyo'
  }
  return response
}
