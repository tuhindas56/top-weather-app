const errorElement = document.querySelector('.error') as HTMLParagraphElement

export function renderError(error: Error) {
  errorElement.textContent = `Error: ${error.message}`
  setTimeout(() => {
    errorElement.textContent = ''
  }, 5000)
}
