"use strict";
String.prototype.replaceIn = function (idx, rep) {
  return this.substring(0, idx) + rep + this.substring(idx + rep.length);
};

const langs = {
  english: "abcdefghijklmnopqrstuvwxyz".split(""),
  russian: "абвгдеёжзийклмнопрстуфхцчшщьъыэюя".split(""),
  chinese: "诶 必 西 弟 衣 艾付 记 爱耻 挨 宅 开 饿罗 饿母 恩 呕 披 酷 耳 艾斯 踢 忧 维 大波留 埃克斯 歪 再得".split(" ")
}

let language = "cn",
  curalpha = langs.chinese,
  size = 26,
  iter = 1,
  numberOfRecs = 1;
const table = document.getElementById("table");

function getData() {
  let idseed = "seedcn",
    iderr = "errcn";

  if (language === "en") {
    idseed = "seeden";
    faker.locale = "en";
    curalpha = langs.english;
    iderr = "erren";
    size = 26;
  } else if (language === "cn") {
    idseed = "seedcn";
    faker.locale = "zh_CN";
    iderr = "errcn";
    curalpha = langs.chinese;
    size = 26;
  } else if (language === "ru") {
    idseed = "seedru";
    faker.locale = "ru";
    iderr = "errru";
    curalpha = langs.russian;
    size = 33;
  } else return;

  const x = +document.getElementById(idseed).value,
    z = +document.getElementById(iderr).value;
  faker.seed(x * iter);
  const arg = new Math.seedrandom(x * iter),
    wholeNumber = Math.floor(z),
    fraction = z % 1;

  for (let i = 0; i < 20; i++) {
    const arr = [
      faker.name.findName(),
      faker.address.city() + " " + faker.address.streetAddress() + " ",
      faker.internet.email(),
      faker.phone.phoneNumber(),
      faker.random.uuid(),
    ];

    for (let j = 0; j < wholeNumber; j++) {
      const index = Math.floor(arg() * 5),
        word = arr[index],
        oper = Math.floor(arg() * 3);
      if (oper == 0) {
        let rep = curalpha[Math.floor(arg() * size)];
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, rep);
      } else if (oper == 1) {
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, "");
      } else {
        let pos = Math.floor(arg() * word.length);

        if (pos < word.length - 1) {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos + 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos + 1, c1);
        } else {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos - 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos - 1, c1);
        }
      }
    }
    if (fraction > 0 && arg() < fraction) {
      let index = Math.floor(arg() * 5);
      let word = arr[index];
      let oper = Math.floor(arg() * 3);
      if (oper == 0) {
        let rep = curalpha[Math.floor(arg() * size)];
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, rep);
      } else if (oper == 1) {
        let pos = Math.floor(arg() * word.length);
        arr[index] = arr[index].replaceIn(pos, "");
      } else {
        let pos = Math.floor(arg() * word.length);

        if (pos < word.length - 1) {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos + 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos + 1, c1);
        } else {
          let c1 = arr[index].charAt(pos);
          let c2 = arr[index].charAt(pos - 1);
          arr[index] = arr[index].replaceIn(pos, c2);
          arr[index] = arr[index].replaceIn(pos - 1, c1);
        }
      }
    }

    table.innerHTML += `
        <tr>
          <td class='bold'>${numberOfRecs}</td>
          <td class='normal'>${arr[0]}</td>
          <td class='normal'>${arr[3]}</td>
          <td class='normal'>${arr[4]}</td>
          <td class='normal'>${arr[1]}</td>
          <td class='normal'>${arr[2]}</td>
        </tr>
      `;
    numberOfRecs++;
  }
  iter++;
}

function reload() {
  $("input[lang]").hide();
  $("button[lang]").hide();
  let elem = document.getElementById("language");
  let l = elem.options[elem.selectedIndex].text;

  if (l === "USA") {
    language = "en";
    $('input[lang="en"]').show();
    $('button[lang="en"]').show();
  } else if (l === "China") {
    language = "cn";
    $('input[lang="cn"]').show();
    $('button[lang="cn"]').show();
  } else if (l === "Russia") {
    language = "ru";
    $('input[lang="ru"]').show();
    $('button[lang="ru"]').show();
  } else return;
  refresh();
}

function refresh() {
  iter = 1;
  numberOfRecs = 1;
  table.innerHTML = `
      <thead>
        <tr>
          <td class='bold'>#</td>
          <td class='bold'>Full Name</td>
          <td class='bold'>Phone Number</td>
          <td class='bold'>Id</td>
          <td class='bold'>Address</td>
          <td class='bold'>Email</td>
        </tr>
      </thead>
    `;
  getData();
}


window.addEventListener("scroll", () => {
  const y = window.pageYOffset + window.innerHeight;

  if (y >= document.getElementById("table").offsetHeight)
    getData();
});