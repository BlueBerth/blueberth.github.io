
var share = document.querySelector('.share_button');

share.addEventListener('click', () => {
    var code = localStorage.getItem('code');
    var qrCode = localStorage.getItem('qrCode');

    localStorage.removeItem('code');
    localStorage.removeItem('qrCode')

    var body = {};

    if (code){
        body['code'] = code;
    }else if (qrCode){
        body['qrCode'] = qrCode;
    }

    body['validFrom'] = localStorage.getItem('givenDate');
    body['validTo'] = localStorage.getItem('expiryDate');
    body['seriesAndNumber'] = localStorage.getItem('seriesAndNumber');
    body['pesel'] = localStorage.getItem('pesel');

    fetch('/qr/scan?' + params, {
        method: 'POST',
        body: JSON.stringify(body)
    })

    sendTo('confirmation');
})