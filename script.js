
window.onload = onLoad;
let APODS = [];
let currentIndex = 0;

function printInfo() {
    let image = document.getElementById('image');
    let title = document.getElementById('title');
    let dateLabel = document.getElementById('dateText');
    let explanation = document.getElementById('explanation');
    let count = document.getElementById('count');
    let video = document.getElementById('video');
    explanation.textContent = APODS[currentIndex].explanation;
    dateLabel.textContent = APODS[currentIndex].date;
    title.textContent = APODS[currentIndex].title;
    if (APODS[currentIndex].media_type == 'video') {
        video.removeAttribute('hidden');
        image.setAttribute('hidden','');
        video.src = APODS[currentIndex].url;
    } else {
        video.setAttribute('hidden', '');
        image.removeAttribute('hidden');
        image.src = APODS[currentIndex].url;
    }
    count.textContent = `${currentIndex + 1}/${APODS.length}`
}

function prevClick() {
    currentIndex--;
    if (currentIndex < 0)
        currentIndex = 0;
    printInfo();
}

function nextClick() {
    currentIndex++;
    if (currentIndex > APODS.length)
        currentIndex = APODS.length - 1;
    printInfo();
}

function stateChanged() {
    let checkbox = document.getElementById('datesCheckbox');
    let date = document.getElementById('date');
    let dateStart = document.getElementById('startDate');
    let dateEnd = document.getElementById('endDate');
    localStorage.setItem("Range",checkbox.checked);
    localStorage.setItem("Date",date.value)
    localStorage.setItem("StartDate",dateStart.value);
    localStorage.setItem("EndDate",dateEnd.value)
    if (checkbox.checked) {
        date.setAttribute('hidden', '');
        dateStart.removeAttribute('hidden');
        dateEnd.removeAttribute('hidden');
    } else {
        date.removeAttribute('hidden');
        dateStart.setAttribute('hidden', '');
        dateEnd.setAttribute('hidden', '');

    }

}

function onLoad()
{
    let checkbox = document.getElementById('datesCheckbox');
    range = localStorage.getItem("Range");
    checkbox.checked = range == "true";
    document.getElementById('date').value =   localStorage.getItem("Date");
    document.getElementById('startDate').value =localStorage.getItem("StartDate");
    document.getElementById('endDate').value = localStorage.getItem("EndDate");
    console.log(document.getElementById('date').value);
    console.log(document.getElementById('startDate').value);
    console.log(document.getElementById('endDate').value)
    stateChanged()
    getLinkToImage()

}

function getLinkToImage() {
    let checkbox = document.getElementById('datesCheckbox');
    let date = document.getElementById('date');
    let dateStart = document.getElementById('startDate');
    let dateEnd = document.getElementById('endDate');
    let image = document.getElementById('image');
    let title = document.getElementById('title');
    let dateLabel = document.getElementById('dateText');
    let explanation = document.getElementById('explanation');
    let navigation = document.getElementById('navigation');
    let count = document.getElementById('count');
    console.log(date.value);
    let url = '';
    if (!checkbox.checked)
        url = `https://api.nasa.gov/planetary/apod?date=${date.value}&api_key=QLyvr3mHQ1XA8gZjcAEhxj5ZQzITzUrG2P26nPmW`;
    else
        url = `https://api.nasa.gov/planetary/apod?start_date=${dateStart.value}&end_date=${dateEnd.value}&api_key=QLyvr3mHQ1XA8gZjcAEhxj5ZQzITzUrG2P26nPmW`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (checkbox.checked) {
                currentIndex = 0;
                APODS = data;
                data = APODS[0];
                navigation.removeAttribute('hidden');
                count.textContent = `1/${APODS.length}`
                console.log(APODS);
            } else
                navigation.setAttribute('hidden', '');
            explanation.textContent = data.explanation;
            dateLabel.textContent = data.date;
            title.textContent = data.title;
            if (data.media_type == 'video') {
                video.removeAttribute('hidden');
                image.setAttribute('hidden','');
                video.src = data.url;
            } else {
                video.setAttribute('hidden', '');
                image.removeAttribute('hidden');
                image.src = data.url;
            }

        });
}
