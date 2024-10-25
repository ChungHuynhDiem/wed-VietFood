const soups = [
    {keyword: 'Pho Bo', name: 'Фо Бо', price: 450, category: 'soup', count: '600г', image: 'soup1.jpg'},
    {keyword: 'Tom Ym', name: 'Том Ям', price: 480, category: 'soup', count: '650г', image: 'soup2.jpg'},
    {keyword: 'Crab Soup', name: 'Крабовый Суп', price: 430, category: 'soup', count: '500г', image: 'soup3.jpg'},
];

const mainDishes = [
    {keyword: 'Fried Rice With Seafood', name: 'Жареный Рис С Морепродуктами', price: 550, category: 'main food', count: '700г', image: 'mainfood1.jpg'},
    {keyword: 'Fried Noodles with Beef', name: 'Жареная Лапша С Говядиной', price: 520, category: 'main food', count: '700г', image: 'mainfood2.jpg'},
    {keyword: 'Sweet and Sour Chicken with Rice', name: 'Кисло-Сладкий Куриный С Рис', price: 600, category: 'main food', count: '700г', image: 'mainfood3.jpg'},
];

const drinks = [
    {keyword: 'Avocado Shake', name: 'Авокадо Шейк', price: 400, category: 'drink', count: '500 мл', image: 'drink1.jpg'},
    {keyword: 'Mango Shake', name: 'Манго Шейк', price: 400, category: 'drink', count: '500 мл', image: 'drink2.jpg'},
    {keyword: 'Dragon Fruit Shake', name: 'Драконий Фрукт Шейк', price: 400, category: 'drink', count: '500 мл', image: 'drink3.jpg'},
];

// Hàm để hiển thị món ăn
function displayDishes(dishes, sectionSelector) {
    const section = document.querySelector(sectionSelector);
    const blockFood = section.querySelector('.block-food');
    blockFood.innerHTML = ''; // Xóa các phần tử trước đó

    dishes.forEach(dish => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food');
        foodDiv.setAttribute('data-dish', dish.keyword);
        foodDiv.innerHTML = `
            <div class="photo"><img src="${dish.image}" alt="${dish.name}" class="photo-food"></div>
            <p class="price">${dish.price}</p>
            <p class="name-food">${dish.name}</p>
            <p class="weight-volume">${dish.count}</p>
            <div class="button">
                <input type="submit" value="Добавить">
            </div>
        `;
        blockFood.appendChild(foodDiv);
    });
}

soups.sort((a, b) => a.name.localeCompare(b.name));
mainDishes.sort((a, b) => a.name.localeCompare(b.name));
drinks.sort((a, b) => a.name.localeCompare(b.name));

displayDishes(soups, '.soup-food');
displayDishes(mainDishes, '.main-food');
displayDishes(drinks, '.drink');

function addClickListeners() {
    const allFoodItems = document.querySelectorAll('.food');
    allFoodItems.forEach(item => {
        item.addEventListener('click', () => {
            const dishName = item.querySelector('.name-food').textContent;
            const dishPrice = item.querySelector('.price').textContent;
            const dataDish = item.getAttribute('data-dish');
            updateOrderSection(dataDish, dishName, dishPrice);
        });
    });
}

const order = {
    soup: null,
    mainDish: null,
    drink: null,
};

// Cập nhật phần đơn hàng
function updateOrderSection(dataDish, name, price) {
    if (soups.some(d => d.keyword === dataDish)) {
        order.soup = { name, price };
    } else if (mainDishes.some(d => d.keyword === dataDish)) {
        order.mainDish = { name, price };
    } else if (drinks.some(d => d.keyword === dataDish)) {
        order.drink = { name, price };
    }

    renderOrder();
}

function updateHiddenFields() {
    document.getElementById('hidden-soup').value = order.soup ? order.soup.name : "";
    document.getElementById('hidden-main-dish').value = order.mainDish ? order.mainDish.name : "";
    document.getElementById('hidden-drink').value = order.drink ? order.drink.name : "";
    
}



// Render thông tin đơn hàng
function renderOrder() {
    const soupSection = document.querySelector('#soup-order');
    const mainDishSection = document.querySelector('#main-dish-order');
    const drinkSection = document.querySelector('#drink-order');
    const totalSection = document.querySelector('#total-order');
    const SectionOrder = document.querySelector('#order-section');
    const TableChoose = document.querySelector('#table-choose');
    // SectionOrder.innerHTML= "Ничего не выбрано";
    // Cập nhật thông tin cho từng phần
    if(order.soup == null && order.mainDish == null && order.drink == null )
    {
        // console.log("No dishes selected");
        // SectionOrder.innerHTML='Ничего не выбрано';
    }
    else
    {
        SectionOrder.style.display='none';
        TableChoose.style.display = 'block';

            soupSection.innerHTML = order.soup 
        ? `${order.soup.name} - ${order.soup.price}₽` 
        : "Блюдо не выбрано";

    mainDishSection.innerHTML = order.mainDish 
        ? `${order.mainDish.name} - ${order.mainDish.price}₽` 
        : "Блюдо не выбрано";

    drinkSection.innerHTML = order.drink 
        ? `${order.drink.name} - ${order.drink.price}₽` 
        : "Блюдо не выбрано";
    }


            // Считаем общую стоимость
    let totalPrice = 0;
    if (order.soup) totalPrice += parseInt(order.soup.price);
    if (order.mainDish) totalPrice += parseInt(order.mainDish.price);
    if (order.drink) totalPrice += parseInt(order.drink.price);

    // Отображаем итоговую стоимость
    if (totalPrice > 0) {
        totalSection.innerHTML = `${totalPrice}₽`;
        document.getElementById('hidden-total').value = `${totalPrice}₽`;  // Giả sử bạn có hàm tính tổng giá
    } 
    updateHiddenFields();  // Cập nhật các input ẩn mỗi khi đơn hàng thay đổi
}


addClickListeners();

const form = document.querySelector('.form-order');
form.addEventListener('submit', function(event) {
    const soupValue = document.getElementById('hidden-soup').value;
    const mainDishValue = document.getElementById('hidden-main-dish').value;
    const drinkValue = document.getElementById('hidden-drink').value;

    // Kiểm tra xem các input có giá trị hay không
    if (!soupValue || !mainDishValue || !drinkValue) {
        event.preventDefault(); // Ngăn không cho gửi form
        alert("Пожалуйста, выберите суп, главное блюдо и напиток."); // Thông báo cho người dùng
    }
});