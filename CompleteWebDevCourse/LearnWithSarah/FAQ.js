let buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
        let nextDiv = this.nextElementSibling;
        console.log(nextDiv.style.height);
        if(!nextDiv.style.height || nextDiv.style.height === '0px'){
            let height = nextDiv.firstElementChild.clientHeight;
            nextDiv.style.height = (height+50)+'px';
            console.log(nextDiv.style.height);
        } else {
            nextDiv.style.height = '0px';
        }
    });
}