const timeElement = document.getElementById('time');
const params = new URLSearchParams(window.location.search);
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

function setClock() {
  const date = new Date();
  timeElement.innerHTML = `Czas: ${
    date.toTimeString().split(' ')[0]
  } ${date.toLocaleDateString('pl-PL', options)}`;
}

setClock();
setInterval(setClock, 1000);

let webManifest = {
  name: '',
  short_name: '',
  theme_color: '#f5f6fb',
  background_color: '#f5f6fb',
  display: 'standalone',
};

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || window.opera;

  if (/windows phone/i.test(userAgent)) return 1;
  if (/android/i.test(userAgent)) return 2;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 3;
  return 4;
}

if (getMobileOperatingSystem() == 2) {
  document.querySelector('.bottom_bar').style.height = '70px';
}

const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = `data:application/manifest+json;base64,${btoa(
  JSON.stringify(webManifest)
)}`;
document.head.prepend(manifestLink);

const unfoldElement = document.querySelector('.info_holder');
unfoldElement.addEventListener('click', () => {
  unfoldElement.classList.toggle('unfolded');
});

const imageParam = params.get('image');
if (imageParam) {
  document.querySelector(
    '.id_own_image'
  ).style.backgroundImage = `url(${imageParam})`;
}

const birthday = params.get('birthday');
const sex = params.get('sex');
const setData = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value || '';
};

setData('name', params.get('name').toUpperCase());
setData('surname', params.get('surname').toUpperCase());
setData('nationality', params.get('nationality').toUpperCase());
setData('birthday', birthday);
setData('familyName', params.get('familyName'));
setData('sex', sex);
setData('fathersFamilyName', params.get('fathersFamilyName'));
setData('mothersFamilyName', params.get('mothersFamilyName'));
setData('birthPlace', params.get('birthPlace'));
setData('countryOfBirth', params.get('countryOfBirth'));
setData(
  'adress',
  `ul. ${params.get('adress1') || ''}<br>${params.get('adress2') || ''} ${
    params.get('city') || ''
  }`
);
setData('checkInDate', params.get('checkInDate'));

if (birthday) {
  const [day, month, year] = birthday.split('.').map((v) => parseInt(v, 10));
  const adjustedMonth = year >= 2000 ? 20 + month : month;

  const peselSuffix = sex?.toLowerCase() === 'mężczyzna' ? '0295' : '0382';
  const pesel = `${year % 100}${adjustedMonth.toString().padStart(2, '0')}${day
    .toString()
    .padStart(2, '0')}${peselSuffix}7`;
  setData('pesel', pesel);
}
