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
