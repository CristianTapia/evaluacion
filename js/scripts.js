// Load HTML page before the JS scripts
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {

    // Select product from store
    let itemSelection = document.getElementsByClassName('btn-dark');
    for (let i = 0; i < itemSelection.length; i++) {
        let item = itemSelection[i];
        item.addEventListener('click', addToCart)
    }
  
    function addToCart(event) {
      let buttonClicked = event.target;
      let getPictureParent = buttonClicked.closest('div.product-overlay').previousElementSibling;
      let getTitleParent = buttonClicked.closest('div.mb-3.position-relative').nextElementSibling;
      let getPriceParent = buttonClicked.closest('div.mb-3.position-relative').nextElementSibling.nextElementSibling;
      let picture = getPictureParent.querySelector('.img-fluid').src;
      let title = getTitleParent.querySelector('.reset-anchor').innerText;
      let price = getPriceParent.innerText;
      addItemToCart(title, price, picture);
    }
  
    function addItemToCart(title, price, picture) {
      let cartContainer = document.createElement('div');
      cartContainer.classList.add('product-content');
      let cartContent = document.getElementsByClassName('offcanvas-body')[0];
      let productContent =  `
        <tr>
            <th class="ps-0 py-3 border-light" scope="row">
              <div class="d-flex align-items-center"><a class="reset-anchor d-block animsition-link"><img src="${picture}" alt="..." width="70"></a>
                <div class="ms-3"><strong class="h6"><a class="reset-anchor animsition-link product-title">${title}</a></strong></div>
              </div>
            </th>
            <td class="p-3 align-middle border-light">
              <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>
                <div class="quantity">
                  <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                  <input class="product-qty form-control form-control-sm border-0 shadow-0 p-0" type="number" value="1">
                  <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                </div>
              </div>
            </td>
            <td class="p-3 align-middle border-light">
              <p class="mb-0 small product-price">${price}</p>
            </td>
            <td class="p-3 align-middle border-light"><a class="reset-anchor" href="#!"><i class="fas fa-trash-alt small text-muted"></i></a></td>
        </tr>
        `;
        let productTitle = document.getElementsByClassName('product-title');
        for (let j = 0; j < productTitle.length; j++) {
            if (productTitle[j].innerText == title) {
                alert('El producto ya fue ingresado a la comanda');
                return
            }
            }
      cartContainer.innerHTML = productContent;
      cartContent.append(cartContainer);
      updateCartTotal();
      removeProducts();
      qtyProducts();
    }
  
    // Remove products from cart
    function removeProducts() {
      let removeProductFromCart = document.getElementsByClassName('fa-trash-alt');
      for (let i = 0; i < removeProductFromCart.length; i++) {
        let binButton = removeProductFromCart[i];
        binButton.addEventListener('click', removeElement);
      }
  
      function removeElement(event) {
        let buttonClicked = event.target;
        let removeItem = buttonClicked.closest('div.product-content').remove();
        updateCartTotal();
      }
    }
  
    // Accept only quantity products >= 0
    function qtyProducts() {
      let quantityInputs = document.getElementsByClassName('product-qty');
      for (let i = 0; i < quantityInputs.length; i++) {
        let qtyInputs = quantityInputs[i];
        qtyInputs.addEventListener('change', qtyChange);
      }
  
      function qtyChange(event) {
        let qtyInputs = event.target;
        if (isNaN(qtyInputs.value) || qtyInputs.value <= 0) {
          qtyInputs.value = 1;
        }
        updateCartTotal();
      }
    }
  
    // Update cart total
    function updateCartTotal() {
      let cartContent = document.getElementsByClassName('offcanvas-body')[0];
      let productContent = cartContent.getElementsByClassName('product-content');
      let total = 0;
      for (let i = 0; i < productContent.length; i++) {
        let cartProducts = productContent[i];
        let productPrice = cartProducts.getElementsByClassName('product-price')[0].innerText;
        let productQuantity = cartProducts.getElementsByClassName('product-qty')[0];
        let price = parseInt(productPrice.replace(/\D/g,''));
        let quantity = productQuantity.value;
        total = total + (price * quantity);
      }
      document.getElementById("checkout").innerHTML = `Total: $${total}`;
    }
  }