
var left = 180;
var leftMax = left;
var loading = document.querySelector('.loading_bar');
var timer = document.querySelector('.timer_highlight');

document.querySelectorAll('.close').forEach((element) => {
    element.addEventListener('click', () => {
        sendTo('qr')
    })
})

setLeft();
function setLeft(){
    if (left == 0){
        sendTo('qr')
    }
    var min = parseInt(left/60);
    var sec = parseInt(left - min*60);
    if (min == 0){
        timer.innerHTML = sec + " sek."
    }else{
        timer.innerHTML = min + " min " + sec + " sek."
    }
    loading.style.width = (left/leftMax)*100 + "%"
    left--;
    delay(1000).then(() => {
        setLeft()
    })
}

loadTempData();
async function loadTempData() {
    var db = await getDb();
    var data = await getData(db, 'temp');

    deleteData(db, 'temp');

    setImage("data:image/png;base64," + data['picture']);

    var date = new Date();
    date.setDate(1)

    setData('verificationDate', date.toLocaleDateString("pl-PL", { year: 'numeric', month: '2-digit', day: '2-digit', minute: '2-digit', hour: '2-digit' }));

    setData('birthDate', reformatDate(data['birthDate']));
    setData('mobileIdCardValidFrom', reformatDate(data['mobileIdCardValidFrom']));
    setData('mobileIdCardValidTo', reformatDate(data['mobileIdCardValidTo']));

    setData('mobileIdCardNumber', data['mobileIdCardNumber']);
    setData('names', data['names'].toUpperCase());
    setData('surname', data['surname'].toUpperCase());
    setData('motherName', data['motherName'].toUpperCase());
    setData('fatherName', data['fatherName'].toUpperCase());
    setData('pesel', data['pesel']);
    setData('citizenship', data['citizenship'].toUpperCase())
}

function setData(id, value){
    document.getElementById(id).innerHTML = value;
}

function setImage(image){
    document.getElementById('picture').src = image;
}

function reformatDate(date){
    
    var dateSplit = date.split('-');

    var year = parseInt(dateSplit[0]);
    var month = parseInt(dateSplit[1]);
    var day = parseInt(dateSplit[2]);

    var date = new Date();
    date.setDate(day);
    date.setMonth(month-1);
    date.setFullYear(year);

    return date.toLocaleDateString("pl-PL", options)
}