window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    let tab = document.querySelectorAll('.info-header-tab'),          // получение переменных
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {                                       // функция, скрывающая ненужные табы, начиная с а-го 
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);                                                 // показываем только первый таб

    function showTabContent(b) {                                        // функция показа табов
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.add('show');
            tabContent[b].classList.remove('hide');
        }
    };

    info.addEventListener('click', function(e) {                        //обработчик клика. Используем делегирование
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {   //если место клика содержит таб, то вывести таб по номеру кликнутого
            for (let i=0; i<tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        };
    });


    // timer

    let deadLine = '2020-2-11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*3600));

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
});