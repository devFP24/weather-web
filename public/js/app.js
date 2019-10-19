const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (event) => {
  const location = search.value

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((response) => response.json())
  .then(data => {
    if(data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  })

  event.preventDefault()
})