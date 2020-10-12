class Product{
  constructor(name, price, year){
    this.name = name,
    this.price = price,
    this.year = year
  }
}
// UI = User Interface -> metodos de agregar y eliminar
class UI{
  addProduct(product){
    const productList = document.getElementById('product-list')
    const element = document.createElement('div')
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product</strong>: ${product.name}
          <strong>Price</strong>: ${product.price}
          <strong>Year</strong>: ${product.year}
          <a href="#" class="btn btn-danger" name="delete">
          Delete</a>
        </div>
      </div>
    `
    productList.appendChild(element)
  }

  resetForm(){
    document.getElementById('product-form').reset()
  }

  deleteProduct(element){
    if (element.name === 'delete'){
      (element.parentElement.parentElement.remove())
      this.showMessage('Product Deleted Successfully', 'info')
    }
  }

  showMessage(message, cssClass){
    const div = document.createElement('div')
    div.className = `alert alert-${cssClass} mt-2`
    div.appendChild(document.createTextNode(message))
    //Mostrando en el DOM
    const container = document.querySelector('.container')
    const app = document.querySelector('#app')
    container.insertBefore(div, app)

    setTimeout(function(){
      document.querySelector('.alert').remove()
    }, 3000)
  }
}

// Eventos de DOM!
document.getElementById('product-form')
  .addEventListener('submit', function(event){
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const year = document.getElementById('year').value

    const product = new Product(name, price, year)

    const ui = new UI()

    if (name === '' || price === '' || year === ''){
      return ui.showMessage('Complete Fields', 'danger')
    }

    ui.addProduct(product)
    ui.showMessage('Product Added Successfully', 'success')
    ui.resetForm()

    event.preventDefault()
  })

document.getElementById('product-list')
  .addEventListener('click', function(event){
    const ui = new UI()
    ui.deleteProduct(event.target)
    event.preventDefault()
  })