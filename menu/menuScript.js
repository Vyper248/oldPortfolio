(function(){
    const menuBtn = document.querySelector('.menuCenterBtn');
    const wrapper = document.querySelector('.buttonWrapper');
    const btns = document.querySelectorAll('.buttonBg');

    menuBtn.addEventListener('click', openMenu);
    menuBtn.addEventListener('focus', openMenu);

    const radius = 180;
    const height = 130;
    const segments = btns.length;
    const angle = radius / segments;
    const angleOffset = segments % 2 === 1 ? 0 : -angle/2;
    const menuOffset = -90;

    //set container height and width
    const container = document.querySelector('.menuContainer');
    container.style.width = (height*2)+'px';
    container.style.height = (height*2)+'px';

    //calculate the width the segments need to be and set it
    let [x1, y1] = rotatePoint(0,height,angle/2);
    x1 = (height/y1)*x1;
    const distance = (x1*2)-4;

    Array.from(btns).forEach(btn => {
        btn.style.width = distance+'px';
        btn.style.height = height+'px';
    });

    //set initial menu offset
    Array.from(btns).forEach((btn,i) => {
        btn.style.transform = 'translate(-50%, -100%) rotate('+menuOffset+'deg)';
        btn.style.transitionDelay = '';
    });

    //calculate different angles to use based on number of segments
    let angles = [0+angleOffset];
    for (let i = 1; i < Math.ceil(segments/1.9); i++){
        const a = angle * i;
        angles.push(a+angleOffset, -a+angleOffset);
    }

    function openMenu(){
        wrapper.classList.toggle('open');
        if (wrapper.classList.contains('open')){
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            Array.from(btns).forEach((btn,i) => {
                if (CSS.supports('clip-path', 'polygon(1% 1%, 2% 2%, 3% 3%)') || 
                    CSS.supports('-webkit-clip-path', 'polygon(1% 1%, 2% 2%, 3% 3%)')){
                    btn.style.transform = 'translate(-50%, -100%) rotate('+(angles[i]+menuOffset)+'deg)';
                    btn.style.transitionDelay = '0.3s';
                } else {
                    menuOffset = -180;
                    btn.style.transform = 'translate(40%, -50%) rotate('+(angles[i]+menuOffset)+'deg)';
                    btn.style.transitionDelay = '0.3s';
                }

            });
        } else {
            menuBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            Array.from(btns).forEach((btn,i) => {
                btn.style.transform = 'translate(-50%, -100%) rotate('+menuOffset+'deg)';
                btn.style.transitionDelay = '';
            });
        }
    }

    function rotatePoint(x, y, a){
        const angle = Math.PI / 180 * a;
        const newX = x * Math.cos(angle) - y * Math.sin(angle);
        const newY = y * Math.cos(angle) + x * Math.sin(angle);
        return [Math.round(-newX), Math.round(newY)];
    }
})();