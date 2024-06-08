const exclusiveWrapper = document.querySelector('.exclusive')
const sellingWrapper = document.querySelector('.selling')

async function produtosList() {
    const response = await fetch('http://localhost:3000/products');
    return response.json()
}

function createProduct(image, name, qtd, price) {
    
}

async function getProducts() {
    const data = await produtosList()  

    data.offer.forEach((product) => {

        const slide = document.createElement('div')
        slide.classList.add('swiper-slide')

        slide.innerHTML += `
        <div class="product">
            <div class="product-image">
                <img src="${product.image}" alt="">
            </div>

            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-qtd">${product.qtd}</p>
            </div>

            <div class="price-addcart">
                <h2 class="product-price">$${product.price}</h2>
                <button class="product-cart__button">+</button>
            </div>
        </div>
        `
        exclusiveWrapper.appendChild(slide)
    })

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 15,
        slidesPerView: 2,
        pagination: {
            el: '.swiper-pagination',
        },
    });
}

getProducts()