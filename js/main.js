import imageItems from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const originalImage = document.querySelector('.lightbox__image');
const lightBox = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

imageItems.forEach((image, index) => {
    const imageList = `<li class="gallery__item"><a class="gallery__link" href="${image.original}"><img class="gallery__image" src="${image.preview}" data-source="${image.original}" data-index="${index}" alt="${image.description}"/></a></li>`;
    gallery.insertAdjacentHTML('beforeend', imageList);
})

function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    originalImage.setAttribute('src', event.target.dataset.source);
    originalImage.setAttribute('alt', event.target.alt);
    lightBox.classList.add('is-open');
}

function closeModal() {
    lightBox.classList.remove('is-open');
    originalImage.setAttribute('src', '');
    originalImage.setAttribute('alt', '');
}

function btnClose(event) {
    if (event.target === closeBtn) {
        closeModal();
    }
}

function lightBoxClose(event) {
    if (event.currentTarget.nodeName === event.target.nodeName) {
        closeModal();
    }
}

function closeEsc(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
}

function btnSlider(event) {
    let index = event.target.firstElementChild.dataset.index;
    if (event.code === 'ArrowLeft' && index > 0) {
        index--;
    }
    if (event.code === 'ArrowRight' && index < imageItems.length - 1) {
        index++;
    }
    event.target.firstElementChild.dataset.index = index;
    originalImage.setAttribute('src', imageItems[index].original);
    originalImage.setAttribute('alt', imageItems[index].description);
}

gallery.addEventListener('click', openModal);
lightBox.addEventListener('click', btnClose);
lightBox.addEventListener('click', lightBoxClose);
window.addEventListener('keydown', closeEsc);
window.addEventListener('keydown', btnSlider);