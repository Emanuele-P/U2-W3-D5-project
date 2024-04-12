const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const URL = id
  ? 'https://striveschool-api.herokuapp.com/api/product/' + id
  : 'https://striveschool-api.herokuapp.com/api/product/'
console.log(id)
const method = id ? 'PUT' : 'POST'
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWFkNzdmMzA0NjAwMWFlNTlmNmIiLCJpYXQiOjE3MTI5MDkwMTUsImV4cCI6MTcxNDExODYxNX0.LP9zpeUjfidl9ROWGcDWLnMCmcIDLELQpRr6CCnYc8g'

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)

  const btnSubmit = document.querySelector('.btn-submit')
  const deleteBtn = document.querySelector('.del-btn')
  const resetBtn = document.querySelector('.reset-btn')
  const subtitle = document.getElementById('subtitle')

  resetBtn.addEventListener('click', handleReset)

  if (id) {
    subtitle.innerText = '- Edit product card'
    // Edit-submit button
    btnSubmit.classList.remove('btn-success')
    btnSubmit.classList.add('btn-info')
    btnSubmit.innerText = 'EDIT'
    // Delete button
    deleteBtn.addEventListener('click', handleDelete)
    deleteBtn.classList.remove('d-none')

    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Fetch error')
        }
      })
      //handle inputs
      .then((cardToModify) => {
        const { name, description, brand, imageUrl, price } = cardToModify
        document.getElementById('name').value = name
        document.getElementById('description').value = description
        document.getElementById('brand').value = brand
        document.getElementById('imageUrl').value = imageUrl
        document.getElementById('price').value = price
      })
      .catch((error) => console.log(error))
  } else {
    subtitle.innerText = '- Create product card'
  }
})

const handleSubmit = (event) => {
  event.preventDefault()

  const newProductCard = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    brand: document.getElementById('brand').value,
    imageUrl: document.getElementById('imageUrl').value,
    price: document.getElementById('price').value,
  }
  console.log('Payload sent:', JSON.stringify(newProductCard))

  //fetch call - dynamic
  fetch(URL, {
    method,
    body: JSON.stringify(newProductCard),
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Fetch error')
      }
    })
    .then((createdCard) => {
      if (id) {
        alert(
          'The product with id: ' +
            createdCard._id +
            ' ' +
            'edited successfully!'
        )
      } else {
        alert(
          'The product with id: ' +
            createdCard._id +
            ' ' +
            'created successfully!'
        )

        form.reset()
      }
    })
    .catch((error) => {
      console.log('Error', error)
    })
}

const handleDelete = () => {
  const confirmed = confirm('Do you want to delete this product card?')

  if (confirmed) {
    fetch(URL, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Fetch error')
        }
      })
      .then((deletedObj) => {
        alert('Product: ' + deletedObj.name + ' ' + 'deleted successfully!')
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}

const handleReset = function (event) {
  event.preventDefault()
  if (confirm('Are you sure you want to reset the form?')) {
    document.querySelector('form').reset()
  }
}
