window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    let tab = document.querySelectorAll('.info-header-tab'), // получение переменных
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) { // функция, скрывающая ненужные табы, начиная с а-го 
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1); // показываем только первый таб

    function showTabContent(b) { // функция показа табов
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.add('show');
            tabContent[b].classList.remove('hide');
        }
    };

    info.addEventListener('click', function (e) { //обработчик клика. Используем делегирование
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) { //если место клика содержит таб, то вывести таб по номеру кликнутого
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        };
    });


    // timer

    let deadLine = '2020-5-31';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 3600));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000)

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = setZero(t.hours);
            minutes.textContent = setZero(t.minutes);
            seconds.textContent = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        };

        function setZero(num) {
            num = num + '';
            if (num.length == 1) {
                return '0' + num;
            } else {
                return num;
            }
        }
    };

    setClock('timer', deadLine);

    // modal box

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');

    const openModal = () => { // фукция открытия модального окна
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (event) => { // функция закрытия окна
        const target = event.target;
        if (target === overlay || target.classList.contains('popup-close') || event.keyCode === 27) { // закрывать будетм при клике на оверлей, кнопочку, при нажатии esc
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };
    };

    more.addEventListener('click', openModal);
    descriptionBtn.forEach(function (item) {
        item.addEventListener('click', openModal);
    });

    overlay.addEventListener('click', closeModal);
    document.addEventListener('keyup', closeModal);

    // Forms

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо, мы свяжемся с Вами...',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        secondForm = document.querySelector('#form'),
        input = form.querySelectorAll('input'),
        statusMessage = document.createElement('div'); // блок, где будут выводится сообщения

    statusMessage.classList.add('status');

    function handler(event) {

        event.preventDefault(); // убираем перезагрузку браузера
        this.appendChild(statusMessage);

        let request = new XMLHttpRequest(); // создаем запрос
        request.open('POST', 'server.php'); // настройка запроса (метод, урл сервера, прочее)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');          //если нужен ответ в JSON


        let formData = new FormData(this);

        // let obj = {};
        // formData.forEach((value,key)=>{
        //     obj[key] = value;
        // });
        // let json = JSON.stringify(obj);

        request.send(formData);
        // request.send(json);


        request.addEventListener('readystatechange', () => { // отсеживаем событие readystatechange, 
            if (request.readyState < 4) { // 4 возвращает, когда все ок
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 & request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;

            }
        });

        let inputs = this.querySelectorAll('input'); //очищаем инпуты после отправки формы

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        };
    };

    form.addEventListener('submit', handler); // отслеживаем submit (именно его, а не клик)
    secondForm.addEventListener('submit', handler);



    // slider

    let slideIndex = 1, // параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);


    function showSlides(n) {

        if (n > slides.length) {
            n = 1;
        }

        if (n < 1) {
            n = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[n - 1].style.display = 'block';
        dots[n - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(n)
    };

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target==dots[i-1]) {
                currentSlide(i);
            }
        }
    })








});