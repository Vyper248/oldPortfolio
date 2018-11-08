async function createNavbar() {
    const matches = document.location.href.match(/[a-zA-Z]+.html/g);
    const en = document.location.href.includes('/en/');
    const thisPage = matches ? matches[0] : '';
    
    const response = await fetch('templates.html');
    const templates = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(templates, 'text/html');
    
    const navbar = doc.querySelector('#navbar').content.cloneNode(true);
    document.querySelector('#navbar').append(navbar);
    
    const footer = doc.querySelector('#footer').content.cloneNode(true);
    document.querySelector('#footerDiv').append(footer);
    
    const header = doc.querySelector('#header').content.cloneNode(true);
    document.querySelector('header').append(header);

    const navbtn = document.querySelector('#navbar a[href="'+thisPage+'"]');
    if (navbtn) navbtn.classList.add('selected');

    addComingSoonLinks();
    setupMenuEvents();
//    setupLanguageBtns(thisPage, en);
}

function addComingSoonLinks(){
    const menuBtns = document.querySelectorAll('.menu a.basicBtn');
    Array.from(menuBtns).forEach(btn => {
        const href = btn.getAttribute('href');
        if (!href){
            btn.setAttribute('href', 'comingSoon.html');
        }
    });
}

function setupMenuEvents(){
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
}

function setupLanguageBtns(thisPage, en){
    //temp code while working on website - only add links for pages that exist
    const finishedPagesEn = ['faq.html', 'index.html', 'contact.html', 'about.html', 'comingSoon.html'];
    const finishedPagesFa = ['faq.html', 'index.html', 'about.html', 'contact.html', 'comingSoon.html'];
    
    if (en && finishedPagesFa.includes(thisPage)){
        const farsiBtn = document.querySelector('#farsiBtn');
        farsiBtn.setAttribute('href', '../'+thisPage);
    } else if (!en && finishedPagesEn.includes(thisPage)) {
        const engBtn = document.querySelector('#englishBtn');
        engBtn.setAttribute('href', 'en/'+thisPage);
    }
}

createNavbar();
