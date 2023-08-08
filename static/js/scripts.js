// Открытие модального окна
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"; // Показываем модальное окно
}

// Закрытие модального окна
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; // Скрываем модальное окно
}

// Отправка сообщения из модального окна
function sendMessageInsideModal() {
    // Получение значений полей из модального окна
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Отправка данных на сервер
    fetch("/home", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "modalSubmit=true&name=" + encodeURIComponent(name) +
              "&phone=" + encodeURIComponent(phone) +
              "&email=" + encodeURIComponent(email) +
              "&message=" + encodeURIComponent(message)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Выводим сообщение из ответа сервера
        closeModal(); // Закрываем модальное окно
    })
    .catch(error => console.error(error));
}

// Скрипт для прокрутки элементов в секции Преимущества
const featuresList = document.querySelector('.features ul');

function updateScroll() {
    const lastElement = featuresList.lastElementChild;
    const lastElementRect = lastElement.getBoundingClientRect();

    if (lastElementRect.right < 0) {
        // Удаляем последний элемент, который вышел за пределы экрана
        lastElement.remove();

        // Создаем новый элемент и добавляем его в начало списка
        const newElement = lastElement.cloneNode(true);
        featuresList.prepend(newElement);

        // Добавляем анимацию для плавного появления нового элемента
        newElement.style.animation = 'fadeIn 1s';
    }
}

// Запускаем функцию updateScroll каждые 5 секунд
setInterval(updateScroll, 5000);

// Код выполняется после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Автоматическая горизонтальная прокрутка "features"
    const featureList = document.getElementById('featureList');
    let scrollStep = 1;
    let scrollSpeed = 50; // Время задержки в миллисекундах (меньше - быстрее)
    let scrollInterval;

    function updateScroll() {
        const lastElement = featureList.lastElementChild;
        const lastElementOffset = lastElement.offsetLeft + lastElement.offsetWidth;
        const containerOffset = featureList.offsetWidth;
        if (lastElementOffset > containerOffset) {
            featureList.scrollLeft -= scrollStep; // Прокручиваем влево
        } else {
            featureList.scrollLeft = 0; // Возвращаем в начальное положение
        }
    }

    function startScrolling() {
        scrollInterval = setInterval(updateScroll, scrollSpeed); // Запускаем автоматическую прокрутку
    }

    function stopScrolling() {
        clearInterval(scrollInterval); // Останавливаем автоматическую прокрутку при наведении
    }

    featureList.addEventListener("mouseover", stopScrolling);
    featureList.addEventListener("mouseout", startScrolling);

    startScrolling();
});

// Код выполняется после полной загрузки документа
$(document).ready(function() {
    // Предзагрузка изображений
    function preloadImages(images) {
        for (let i = 0; i < images.length; i++) {
            new Image().src = images[i]; // Создаем новый объект Image и предзагружаем изображения
        }
    }

    const imagePaths = [
        "{{ url_for('static', filename='images/image1.jpg') }}",
        "{{ url_for('static', filename='images/image2.jpg') }}",
        "{{ url_for('static', filename='images/image3.jpg') }}"
    ];

    preloadImages(imagePaths);

    var slider = $('.slider');
    var images = slider.find('.image');
    var dots = slider.find('.dot');
    var currentImageIndex = 0;

    // Показать первую картинку и активировать соответствующую точку
    showImage(0);

    function showImage(index) {
        images.hide(); // Скрываем все изображения
        images.eq(index).show(); // Показываем изображение с указанным индексом
        dots.removeClass('active'); // Убираем активный класс у всех точек
        dots.eq(index).addClass('active'); // Добавляем активный класс к точке с указанным индексом
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length; // Вычисляем индекс следующего изображения
        showImage(currentImageIndex); // Показываем следующее изображение
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // Вычисляем индекс предыдущего изображения
        showImage(currentImageIndex); // Показываем предыдущее изображение
    }

    var interval = setInterval(showNextImage, 5000); // Запускаем автоматическую смену изображений

    slider.hover(
        function() {
            clearInterval(interval); // Останавливаем автоматическую смену изображений при наведении
        },
        function() {
            interval = setInterval(showNextImage, 5000); // Возобновляем автоматическую смену изображений после ухода курсора
        }
    );

    $('.prev-button').click(function() {
        clearInterval(interval); // Останавливаем автоматическую смену изображений
        showPrevImage(); // Показываем предыдущее изображение
    });

    $('.next-button').click(function() {
        clearInterval(interval); // Останавливаем автоматическую смену изображений
        showNextImage(); // Показываем следующее изображение
    });

    dots.click(function() {
        var clickedIndex = dots.index($(this)); // Получаем индекс нажатой точки
        showImage(clickedIndex); // Показываем изображение по индексу точки
        currentImageIndex = clickedIndex; // Обновляем текущий индекс изображения
        clearInterval(interval); // Останавливаем автоматическую смену изображений
        interval = setInterval(showNextImage, 10000); // Запускаем автоматическую смену с новым интервалом
    });
    // Открытие модального окна с изображением слайдера
function openSliderImageModal(imageUrl) {
    var modal = document.getElementById("sliderImageModal");
    var modalImage = document.getElementById("sliderModalImage");
    modalImage.src = imageUrl;
    modal.style.display = "block";
}

// Закрытие модального окна с изображением слайдера
function closeSliderImageModal() {
    var modal = document.getElementById("sliderImageModal");
    modal.style.display = "none";
}

// Обработчик клика на кнопку закрытия нового модального окна
var closeSliderButton = document.getElementById("closeSliderImageModal");
closeSliderButton.addEventListener("click", closeSliderImageModal);

// Обработчик клика на изображение слайдера для открытия нового модального окна
sliderImages.forEach(function(image) {
    image.addEventListener("click", function() {
        var imageUrl = this.getAttribute("src");
        openSliderImageModal(imageUrl);
    });
});
});

