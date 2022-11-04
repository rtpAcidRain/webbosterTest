// Товары
const productsContainer = document.getElementById('products');
const products = [
  {
    id: '1',
    img: 'https://basket-03.wb.ru/vol296/part29671/29671332/images/big/2.jpg',
    title: 'С папой буря не страшна',
    autor: 'Пол Брайт',
    year: '2010',
    price: '300',
  },
  {
    id: '2',
    img: 'https://cdn1.ozone.ru/multimedia/1037908934.jpg',
    title: 'Тонкое искусство пофигизма',
    autor: 'Марк Мэнсон',
    year: '2021',
    price: '500',
  },
  {
    id: '3',
    img: 'https://img3.labirint.ru/rc/77c3d28a22caff2a54e051f2231ac2d4/594x918q80/books4/36283/cover.jpg?1280394613',
    title: 'Пролетая над гнездом кукушки',
    autor: 'Кизи К.',
    year: '2019',
    price: '600',
  },
  {
    id: '4',
    img: 'https://img4.labirint.ru/rc/ad456cdfacce2e0fbcbb5881ef3a1d3d/363x561q80/books50/495072/cover.jpg?1612693534',
    title: 'Машина времени',
    autor: 'Герберт Уэллс',
    year: '2020',
    price: '700',
  },
];

const productItem = (id, autor, img, title, year, price) => {
  return `<article class="product">
    <header class="product__header"><img class="product__img" src=${img} alt="Картинка товара"></header>
    <main class="product__info info">
      <ul class="info__list">
        <li class="list__item title"><h2 class="heading heading--h2">${title}</h2></li>
        <li class="list__item autor"><p>Автор: ${autor}</p></li>
        <li class="list__item year-of-issue"><p>Год выпуска: ${year}г.</p></li>
        <li class="list__item year-of-issue"><p>Цена: ${price}р.</p></li>
      </ul>
      <a href='#' class="product__order button" data-product=${id}>Заказать</a>
    </main>
  </article>`;
};

function setProducts() {
  productsContainer.innerHTML = '';
  return (productsContainer.innerHTML = products
    .map((el) => {
      return productItem(el.id, el.autor, el.img, el.title, el.year, el.price);
    })
    .join(''));
}

// Модальное окно
const orderModal = document.getElementById('order');
const modalContainer = orderModal.childNodes[1];
const modalProductName = document.getElementById('productName');
const modalTotal = document.getElementById('total');
const modalClose = document.querySelector('.modal__close');
let productId = 1;

const closeModal = (e) => {
  e.preventDefault();
  modalContainer.removeAttribute('style');

  setTimeout(() => {
    orderModal.classList.remove('open');
  }, 300);
};

modalContainer.addEventListener('click', (e) => {
  e.stopPropagation();
});

orderModal.addEventListener('click', (e) => {
  closeModal(e);
});

modalClose.addEventListener('click', (e) => {
  closeModal(e);
});

// Имитация запроса на бэк
window.onload = () => {
  productsContainer.innerHTML = '<p class="loading">Загрузка...</p>';
  setTimeout(() => {
    setProducts();
    const orderButtons = document.querySelectorAll('.product__order');
    orderButtons.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        orderModal.classList.add('open');
        setTimeout(() => {
          modalContainer.setAttribute('style', 'transform: rotateX(0)');
        }, 100);

        productId = el.dataset.product;
        let product = products.find((el) => el.id === productId);
        modalProductName.innerHTML = product.title;
        modalTotal.innerHTML = product.price;
      });
    });
  }, 1000);
};

// Отправка формы
const orderForm = document.getElementById('orderForm');
const userName = document.getElementById('userName');
const userPhone = document.getElementById('userPhone');
const modalButton = document.querySelector('.modal__button');
const finishFrom = document.querySelector('.finish');
const modalContent = document.querySelector('.modal__content');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(orderForm);
  if (!userName.value.length) {
    return userName.previousElementSibling.classList.add('show');
  }
  if (!userPhone.value.length) {
    return userPhone.previousElementSibling.classList.add('show');
  }
  let product = products.find((el) => el.id === productId);
  formData.append('product', product.title);
  formData.append('price', product.price);

  modalContainer.classList.add('load');
  try {
    let res = await fetch('php/mail.php', {
      method: 'POST',
      body: formData,
    });
    let result = await res.json();
    alert(result.message);
    orderForm.reset();
    modalContent.classList.add('hide');
    finishFrom.classList.add('show');
  } catch (error) {
    modalContainer.classList.remove('load');
    modalButton.previousElementSibling.classList.add('show');
  } finally {
    // Имитация успешной отправки письма
    modalContent.classList.add('hide');
    finishFrom.classList.add('show');
    ym(91053427, 'reachGoal', 'order');
    return true;
  }
});
