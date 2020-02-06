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
});