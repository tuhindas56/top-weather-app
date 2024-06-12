import '../style.css'

const paragraph = document.createElement('p') as HTMLParagraphElement
paragraph.innerText = 'Project setup success!'
paragraph.className = 'text-4xl m-auto'
document.body.className = 'h-screen flex'
document.body.appendChild(paragraph)
