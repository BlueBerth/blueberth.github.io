
document.querySelectorAll('.close').forEach((element) => {
    element.addEventListener('click', () => {
        if (localStorage.getItem('top') === 'card'){
            sendTo('card');
        }else{
            sendTo('qr');
        }
    });
})