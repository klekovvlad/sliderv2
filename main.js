const prevButton = document.querySelector('.slider__prev');
const nextButton = document.querySelector('.slider__next');
const slider = document.querySelector('.slider');
const sliderItem = document.querySelectorAll('.slider__item');
let leftOffset = window.getComputedStyle(sliderItem[0]).getPropertyValue('margin-left');
let scrollPosition = sliderItem[1].offsetLeft - parseInt(leftOffset);
let i = 1;
let sliderLength = sliderItem.length;

function nextSlide(){
    if(i <= sliderLength) {
        slider.scrollLeft = scrollPosition * i;
        i++;
    };
    if(i > sliderLength) {
        slider.scrollLeft = 0;
        i = 1;
    };
    activePag();
};
nextButton.addEventListener('click',() => {
    swipeNext();
});
prevButton.addEventListener('click', () => {
    swipePrev();
});

function swipeNext() {
    nextSlide();
    clearInt();
}
function swipePrev() {
    if(i > 0 && i <= sliderLength) {
        i = i - 1;
        slider.scrollLeft = scrollPosition * (i - 1);
        if(i <= 0) {
            slider.scrollLeft = scrollPosition * sliderLength;
            i = sliderLength;
        }
    }
    activePag();
    clearInt();
}

const sliderPagination = document.querySelector('.slider__pagination');
let pgSize = 1;
while(pgSize <= sliderLength){
    const sliderPaginationItem = document.createElement('li');
    sliderPagination.append(sliderPaginationItem);
    pgSize++;
};
const sliderPaginationItem = document.querySelectorAll('.slider__pagination > li');
activePag();

function activePag() {
    sliderPaginationItem.forEach(el => {
        let activeIndex = i - 1;
        el.classList.remove('pagination__active');
        sliderPaginationItem[activeIndex].classList.add('pagination__active');
    });
};

sliderPaginationItem.forEach(function(el, index) {
    el.addEventListener('click', () => {
        i = index + 1;
        slider.scrollLeft = scrollPosition * (i - 1);
        activePag();
        clearInt();
    });
});

function autoLoop(){
    nextSlide();
}

let autoloop = setInterval(autoLoop, 5000);

function clearInt() {
    clearInterval(autoloop);
    autoloop = setInterval(autoLoop, 5000);
}

slider.addEventListener('mouseover', () => {
    prevButton.classList.add('slider__nav');
    nextButton.classList.add('slider__nav');
});
slider.addEventListener('mouseout', () => {
    prevButton.classList.remove('slider__nav');
    nextButton.classList.remove('slider__nav');
});

function posOne(e) {
    return x1 = e.changedTouches[0].clientX;
};
function posTwo(e) {
    return x2 = e.changedTouches[0].clientX;
};
slider.addEventListener('touchstart', (e) => {
    posOne(e);
});
slider.addEventListener('touchend', (e) => {
    posTwo(e);
    if (x1 > x2) {
        swipeNext()
    }else{
        swipePrev();
    }
});