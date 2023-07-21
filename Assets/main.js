document.addEventListener('DOMContentLoaded', function (event) {
  realTime();
  renderAlarm();
});

async function renderAlarm() {
  var data = [];
  if (localStorage.getItem('alarmData')) {
    document.getElementById('alarmData').innerHTML = '';
    data = JSON.parse(localStorage.getItem('alarmData'));
    var table = document.getElementById('alarmData');
    var innerhtml = '';
    await data.forEach((element, index) => {
      innerhtml +=
        `<tr>
          <td class="text-left">` +
        element +
        `</td>
          <th class="text-right" style="width: 80px">
            <a class="text-danger" href="#!" onClick="deleteData(` +
        index +
        `)">Delete</a>
          </th>
        </tr>`;
    });

    table.innerHTML = innerhtml;
  } else {
    localStorage.setItem('alarmData', JSON.stringify(data));
    document.getElementById('alarmData').innerHTML = '';
  }
}

function deleteData(index) {
  var data = [];
  if (localStorage.getItem('alarmData')) {
    document.getElementById('alarmData').innerHTML = '';
    data = JSON.parse(localStorage.getItem('alarmData'));
    data = data.filter((ele, ind) => ind !== index);
    localStorage.setItem('alarmData', JSON.stringify(data));
  }
  renderAlarm();
}

function addData() {
  var data = [];
  let hours = document.getElementById('hours').value;
  let minutes = document.getElementById('minutes').value;
  let second = document.getElementById('second').value;
  let analogue = document.getElementById('analogue').value;
  if (localStorage.getItem('alarmData')) {
    document.getElementById('alarmData').innerHTML = '';
    data = JSON.parse(localStorage.getItem('alarmData'));
    data.push(hours + ':' + minutes + ':' + second + ' ' + analogue);
    localStorage.setItem('alarmData', JSON.stringify(data));
  } else {
    data.push(hours + ':' + minutes + ':' + second + ' ' + analogue);
    localStorage.setItem('alarmData', JSON.stringify(data));
  }
  renderAlarm();
}

function format(input) {
  if (input.value.length === 1) {
    input.value = '0' + input.value;
  }
}

function realTime() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var halfday = 'AM';
  halfday = hour >= 12 ? 'PM' : 'AM';
  hour = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  hour = update(hour);
  min = update(min);
  sec = update(sec);
  document.getElementById('h').innerText = hour;
  document.getElementById('m').innerText = min;
  document.getElementById('s').innerText = sec;
  document.getElementById('ap').innerText = halfday;
  var str = hour + ':' + min + ':' + sec + ' ' + halfday;

  function checkAlrm(str) {
    if (localStorage.getItem('alarmData')) {
      var data = JSON.parse(localStorage.getItem('alarmData'));
      data.forEach((element) => {
        if (element === str) {
          alert('!!!Alarm Triggered!!!');
        }
      });
    }
  }
  checkAlrm(str);
  setTimeout(realTime, 1000);
}

function update(k) {
  if (k < 10) {
    return '0' + k;
  } else {
    return k;
  }
}
