/* eslint-disable @typescript-eslint/naming-convention */
import { format } from 'date-fns'
import { renderError } from './domUtils'

// Import assets
import clearDay from '../assets/svg/line/clear-day.svg'
import clearNight from '../assets/svg/line/clear-night.svg'
import cloudy from '../assets/svg/line/cloudy.svg'
import cloudyDay from '../assets/svg/line/partly-cloudy-day.svg'
import cloudyNight from '../assets/svg/line/partly-cloudy-night.svg'
import drizzle from '../assets/svg/line/drizzle.svg'
import fogDay from '../assets/svg/line/fog-day.svg'
import fogNight from '../assets/svg/line/fog-night.svg'
import overcastDay from '../assets/svg/line/overcast-day.svg'
import overcastNight from '../assets/svg/line/overcast-night.svg'
import mist from '../assets/svg/line/mist.svg'
import notAvailable from '../assets/svg/line/not-available.svg'
import partlyCloudyDayRain from '../assets/svg/line/partly-cloudy-day-rain.svg'
import partlyCloudyNightRain from '../assets/svg/line/partly-cloudy-night-rain.svg'
import rain from '../assets/svg/line/rain.svg'
import sleet from '../assets/svg/line/sleet.svg'
import snow from '../assets/svg/line/snow.svg'
import thunderstormsDayRain from '../assets/svg/line/thunderstorms-day-rain.svg'
import thunderstormsNightRain from '../assets/svg/line/thunderstorms-night-rain.svg'
import thunderstormsDaySnow from '../assets/svg/line/thunderstorms-day-snow.svg'
import thunderstormsNightSnow from '../assets/svg/line/thunderstorms-night-snow.svg'

const API_KEY = 'e36def996b1a45bdb03142152241106'

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

export function getIconPath(code: number, time: string) {
  let pathDay = ''
  let pathNight = ''
  switch (code) {
    case 1000:
      pathDay = clearDay
      pathNight = clearNight
      break
    case 1003:
      pathDay = cloudyDay
      pathNight = cloudyNight
      break
    case 1006:
      pathDay = cloudy
      pathNight = cloudy
      break
    case 1009:
      pathDay = overcastDay
      pathNight = overcastNight
      break
    case 1030:
      pathDay = mist
      pathNight = mist
      break
    case 1063:
      pathDay = partlyCloudyDayRain
      pathNight = partlyCloudyNightRain
      break
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
    case 1246:
      pathDay = rain
      pathNight = rain
      break
    case 1069:
    case 1204:
    case 1207:
    case 1237:
    case 1249:
    case 1252:
    case 1261:
    case 1264:
      pathDay = sleet
      pathNight = sleet
      break
    case 1087:
    case 1273:
    case 1276:
      pathDay = thunderstormsDayRain
      pathNight = thunderstormsNightRain
      break
    case 1066:
    case 1114:
    case 1117:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1255:
    case 1258:
      pathDay = snow
      pathNight = snow
      break
    case 1135:
    case 1147:
      pathDay = fogDay
      pathNight = fogNight
      break
    case 1072:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
      pathDay = drizzle
      pathNight = drizzle
      break
    case 1279:
    case 1282:
      pathDay = thunderstormsDaySnow
      pathNight = thunderstormsNightSnow
      break
    default:
      pathDay = notAvailable
      pathNight = notAvailable
      break
  }
  return +time < 18 && +time > 4 ? pathDay : pathNight
}
