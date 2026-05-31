var left = 0;
var leftMax = 180;
var loading = document.querySelector('.loading_bar');
var timer = document.querySelector('.expire_highlight');
var numbers = document.querySelector('.numbers');
var qrImage = document.querySelector(".qr_image");

var qrImages = [
    { url: "https://i.ibb.co/Pv9QJL7k/qr1.jpg", code: "483721" },  // Obrazek QR1 + kod
    { url: "https://i.ibb.co/Pv9QJL7k/qr2.jpg", code: "654321" }   // Obrazek QR2 + kod
];
var currentQRIndex = 0;

setLeft();

function setLeft() {
    if (left == 0) {
        rotateQR(); // Rotacja obrazków QR
        left = leftMax;
    }
    var min = parseInt(left / 60);
    var sec = parseInt(left - min * 60);
    if (min == 0) {
        timer.innerHTML = sec + " sek."
    } else {
        timer.innerHTML = min + " min " + sec + " sek."
    }
    loading.style.width = (left / leftMax) * 100 + "%";
    left--;
    delay(1000).then(() => {
        setLeft();
    });
}

// Funkcja do rotacji obrazków QR
function rotateQR() {
    // Ustawienie obrazka QR i kodu
    qrImage.innerHTML = `<img src="${qrImages[currentQRIndex].url}" alt="QR Code" class="qr_code_img">`;
    numbers.innerHTML = qrImages[currentQRIndex].code;  // Ustawienie kodu QR (cyfry)

    // Zmiana indeksu obrazka QR (rotacja)
    currentQRIndex = (currentQRIndex + 1) % qrImages.length;

    // Rotacja co 5 sekund
    setTimeout(rotateQR, 18000);  // Zmieniamy obrazek co 5 sekund
}

// Funkcja delay - do obsługi timerów
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}