//start timer to auto rotate images
let sliderInterval = setInterval(() => {
        rotate('.imageContent', 1);
    },5000);

//event listeners for each button
let sliderLeftBtn = document.querySelector('#sliderLeftBtn');
sliderLeftBtn.addEventListener('click', (e)=>{
    clearInterval(sliderInterval);
    rotate('.imageContent', -1);
});

let sliderRightBtn = document.querySelector('#sliderRightBtn');
sliderRightBtn.addEventListener('click', (e)=>{
    clearInterval(sliderInterval);
    rotate('.imageContent', 1);
});

//function to rotate images based on id tags (no need to keep track)
const rotate = (selector, direction) => {
    const ids = getIDs(selector);
    const currentImage = document.querySelector(selector+'.visible');
    const currentID = currentImage.getAttribute('id');
    const currentIndex = ids.indexOf(currentID);

    let nextIndex = (currentIndex+direction)%ids.length;
    if (nextIndex < 0) nextIndex = ids.length-1;
    const nextID = ids[nextIndex];

    const nextImage = document.querySelector('#'+nextID);

    currentImage.classList.remove('visible');
    nextImage.classList.add('visible');
};

//get array of IDs
const getIDs = (selector = '') => {
    if (selector.length === 0) {
        throw('Error: Selector needs to be defined');
    }

    const tags = document.querySelectorAll(selector);

    const IDs = [];
    for (let i = 0; i < tags.length; i++){
        const id = tags[i].getAttribute('id');
        IDs.push(id);
    }

    return IDs;
}