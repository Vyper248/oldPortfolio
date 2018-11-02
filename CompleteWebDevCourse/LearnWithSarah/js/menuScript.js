//add click event to dropdown buttons
let dropdownBtns = document.querySelectorAll('.basicBtn.dropdown');
for (let i = 0; i < dropdownBtns.length; i++){
    //Mouse Enter for when display is large enough for normal menu
    dropdownBtns[i].addEventListener('mouseenter', function(e){
        if (innerWidth > 570){
            e.stopPropagation();
            let dropdownArea = this.querySelector('.dropdownArea');
            dropdownArea.classList.add('open');
            setTimeout(()=>{
                dropdownArea.classList.add('visible');
            },0);
        }
    });

    //Mouse Leave to close menus, when display is large enough
    dropdownBtns[i].addEventListener('mouseleave', function(e){
        if (innerWidth > 570){
            let dropdownArea = this.querySelector('.dropdownArea');
            dropdownArea.classList.remove('visible');
            setTimeout(()=>{
                dropdownArea.classList.remove('open');
            },200);
        }
    });

    //Click for when on small displays and the menu is displayed as column
    dropdownBtns[i].addEventListener('click', function(e){
        if (innerWidth <= 570){
            e.stopPropagation();
            let dropdownArea = this.querySelector('.dropdownArea');
            dropdownArea.classList.toggle('open');
        }
    });
}

//Event listener to open and close menu when display is small enough
document.querySelector('.menuBtn').addEventListener('click', ()=>{
    let menu = document.querySelector('.menu');
    menu.classList.toggle('open');
});

document.addEventListener('click', function(){
    let dropdownAreas = document.querySelectorAll('.dropdownArea');
    for (let i = 0; i < dropdownAreas.length; i++){
        dropdownAreas[i].classList.remove('open');
        dropdownAreas[i].classList.remove('visible');
    }
});

function addMultipleListeners(element, events, callback){
    events.split(' ').forEach(event => {
        element.addEventListener(event, callback);
    });
}