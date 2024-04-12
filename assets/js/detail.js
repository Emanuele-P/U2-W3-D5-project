const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWFkNzdmMzA0NjAwMWFlNTlmNmIiLCJpYXQiOjE3MTI5MDkwMTUsImV4cCI6MTcxNDExODYxNX0.LP9zpeUjfidl9ROWGcDWLnMCmcIDLELQpRr6CCnYc8g'

const row = document.getElementById('card-row')

window.addEventListener('DOMContentLoaded', () => {
  if (!id) {
    console.error('No product ID found in URL.')
    row.innerHTML = '<p>Product ID is missing in the URL.</p>'
    return
  }

  fetch(URL + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch product details')
      }
    })
    .then((product) => {
      displayProductDetails(product)
    })
    .catch((error) => {
      console.error('Error:', error)
      row.innerHTML = '<p>Failed to load the product details.</p>'
    })
})

const displayProductDetails = function (product) {
  row.innerHTML = `
        <div class="card mb-4 py-5 shadow-sm d-flex flex-row">
            <div class="col-md-6">
                <img src="${product.imageUrl}" class="img-fluid">
            </div>
            <div class="card-body col-md-6">
                <h5 class="card-title">${product.brand}</h5>
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Model: ${product.description}</p>
                <h4 class="card-price fw-bold text-danger">${product.price} €</h4><br>
                <small class="text-muted font-monospace d-block">id:${product._id}</small>
                <a href="./backoffice.html?id=${product._id}" class="btn btn-sm btn-outline-secondary mt-3">Edit</a>
            </div>
            
        </div>
    `
}
