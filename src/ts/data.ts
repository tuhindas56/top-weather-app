/* eslint-disable @typescript-eslint/naming-convention */
import { format } from 'date-fns'
import { renderError } from './domUtils'

const API_KEY = 'e36def996b1a45bdb03142152241106'

async function getCityFromIP() {
  try {
    const response = await fetch('http://ip-api.com/json', { mode: 'cors' })
    const data = await response.json()
    if (response.ok) {
      const { city } = data
      return city
    }
    throw new Error(data.error.message)
  } catch (error: any) {
    return error
  }
}

export async function getLocation(location?: string) {
  if (!location) {
    const response = await getCityFromIP()
    return response
  }
  return location
}

export async function fetchWeatherData(location: string) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    )
    const data = await response.json()
    if (response.ok) {
      const {
        current: {
          last_updated,
          condition: { code, text },
          feelslike_c,
          feelslike_f,
          humidity,
          temp_c,
          temp_f,
        },
        forecast: { forecastday },
        location: { country, name: city },
      } = data

      // Current forecast data
      const tempC = Math.floor(temp_c)
      const tempF = Math.floor(temp_f)
      const feelsLikeC = Math.floor(feelslike_c)
      const feelsLikeF = Math.floor(feelslike_f)
      const formattedDate = format(last_updated, 'EEEE, dd MMMM')
      const timeInHours = format(last_updated, 'hh')
      const { daily_chance_of_rain: rainProbability } = forecastday[0].day
      const hourData = forecastday[0].hour
      const currentHour = +format(new Date(), 'HH')
      const hourlyData = []
      for (let i = +currentHour + 1; i < 24; i += 1) {
        hourlyData.push(hourData[i])
      }

      // Future forecast data
      const [, forecastDay1, forecastDay2] = forecastday
      const forecastDay1Date = format(new Date(forecastDay1.date), 'EEEE, dd MMMM')
      const forecastDay2Date = format(new Date(forecastDay2.date), 'EEEE, dd MMMM')
      const {
        day: { daily_chance_of_rain: forecastDay1RainProbability },
      } = forecastDay1
      const {
        day: { daily_chance_of_rain: forecastDay2RainProbability },
      } = forecastDay2
      const {
        day: {
          condition: { code: forecastDay1Code },
        },
      } = forecastDay1
      const {
        day: {
          condition: { code: forecastDay2Code },
        },
      } = forecastDay2

      let {
        day: {
          maxtemp_c: forecastDay1MaxC,
          maxtemp_f: forecastDay1MaxF,
          mintemp_c: forecastDay1MinC,
          mintemp_f: forecastDay1MinF,
        },
      } = forecastDay1
      forecastDay1MaxC = Math.floor(forecastDay1MaxC)
      forecastDay1MaxF = Math.floor(forecastDay1MaxF)
      forecastDay1MinC = Math.floor(forecastDay1MinC)
      forecastDay1MinF = Math.floor(forecastDay1MinF)
      let {
        day: {
          maxtemp_c: forecastDay2MaxC,
          maxtemp_f: forecastDay2MaxF,
          mintemp_c: forecastDay2MinC,
          mintemp_f: forecastDay2MinF,
        },
      } = forecastDay2
      forecastDay2MaxC = Math.floor(forecastDay2MaxC)
      forecastDay2MaxF = Math.floor(forecastDay2MaxF)
      forecastDay2MinC = Math.floor(forecastDay2MinC)
      forecastDay2MinF = Math.floor(forecastDay2MinF)

      return {
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
        text,
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
      }
    }
    throw new Error(data.error.message)
  } catch (error: any) {
    renderError(error)
    return null
  }
}
