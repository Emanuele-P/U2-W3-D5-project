window.addEventListener('DOMContentLoaded', () => {
  //handle api
  const URL = 'https://striveschool-api.herokuapp.com/api/product/'
  const API_KEY =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWFkNzdmMzA0NjAwMWFlNTlmNmIiLCJpYXQiOjE3MTI5MzExNjAsImV4cCI6MTcxNDE0MDc2MH0.GsIIgdW_e9EeSBNg9B-2iqCdOQHDOvTYiemtaBi51Tw'
  const row = document.getElementById('card-row')
  const modalImage = document.getElementById('modalImage')
  const imageModal = new bootstrap.Modal(document.getElementById('imageModal'))

  //get
  const loadCards = function () {
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Failed to fetch')
        }
      })
      .then((newProductCard) => {
        row.innerHTML = '' // Clear webpage

        newProductCard.forEach((product) => {
          const col = document.createElement('div')
          col.classList.add('col-md-6', 'col-lg-4', 'd-flex')

          const card = document.createElement('div')
          card.classList.add(
            'card',
            'mb-4',
            'shadow-sm',
            'w-100',
            'd-flex',
            'flex-column'
          )
          //generate cards
          card.innerHTML = `
          <a href="#" class="card-img-container d-block" style="height: 200px; overflow: hidden;">
            <img src="${product.imageUrl}" class="card-img-top p-3" style="object-fit: cover;">
          </a>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.brand} ${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-price text-danger fw-bold">${product.price} €</p>
            <div class="mt-auto">
                <a href="./detail.html?id=${product._id}" class="btn btn-sm btn-outline-secondary">View Product</a>
            </div>
          </div>`

          col.appendChild(card)
          row.appendChild(col)
          //handle modal
          const imgElement = card.querySelector('.card-img-top')
          imgElement.addEventListener('click', (e) => {
            e.preventDefault()
            modalImage.src = imgElement.src
            imageModal.show()
          })
        })
      })
      .catch((error) => {
        console.error('Error:', error)
        row.innerHTML = '<p>Failed to load the products :(</p>'
      })
  }

  loadCards()
})
