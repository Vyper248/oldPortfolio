const div = document.querySelector('.codeBackground');
let targets;

fetch('/lines.js').then((data) => {
    return data.text();
}).then(data => {
    data = data.replace(/const/g, '<span class="blue codeColor">const</span>');
    data = data.replace(/\.([a-zA-Z]+)/g, '.<span class="purple codeColor">$1</span>');
    data = data.replace(/(\s[a-zA-Z]+\(\))/g, '<span class="purple codeColor">$1</span>');
    data = data.replace(/function/g, '<span class="purple codeColor">function</span>');
    data = data.replace(/('[.#a-zA-Z]+')/g, '<span class="orange codeColor">$1</span>');
    data = data.replace(/return/g, '<span class="blue codeColor">return</span>');
    data = data.replace(/([0-9]+)/g, '<span class="green codeColor">$1</span>');
    div.innerHTML = data;
    targets = document.querySelectorAll('.codeColor');
    setInterval(highlight, 500);
});

function highlight(){
    const index = parseInt(Math.random()*targets.length)-1;
    const target = targets[index];
    if (target){
        target.style.opacity = 1;
        setTimeout(() => target.style.opacity = 0.3, 1000);
    }
}