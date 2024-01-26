const showFormBtn = document.querySelector(".show_form"),
  searchInput = document.querySelector(".search"),
  popupForm = document.querySelector(".popup_form"),
  popupContent = document.querySelector(".popup_content"),
  closeBtn = document.querySelector(".popup_content .close"),
  inputFile = popupContent.querySelector(".image input[type='file']"),
  imgEl = popupContent.querySelector(".image img"),
  changeImgEl = popupContent.querySelector(".image .change_img"),
  nameEl = popupContent.querySelector(".name input"),
  prenomEl = popupContent.querySelector(".prenom input"),
  ageEl = popupContent.querySelector(".age input"),
  numberEl = popupContent.querySelector(".number input"),
  lieuxEl = popupContent.querySelector(".lieux_travail input"),
  addOfficer = popupContent.querySelector(".add_officer"),
  clearAllBtn = document.querySelector(".clear"),
  contentPage = document.querySelector(".content"),
  footerDate = document.querySelector("footer .date");

// console.log(contentPage);

let tempId,
  theStatus = false;

const arrayEl = JSON.parse(localStorage.getItem("infos") || "[]");

showFormBtn.addEventListener("click", () => {
  popupForm.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popupForm.classList.remove("active");
});

changeImgEl.addEventListener("click", () => inputFile.click());

inputFile.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let filReader = new FileReader();
  filReader.readAsDataURL(file);
  filReader.addEventListener("load", () => {
    const url = filReader.result;
    imgEl.src = url;
  });

  // imgEl.src = URL.createObjectURL(file);
});

const showData = (searchValue) => {
  document.querySelectorAll(".item").forEach((item) => item.remove());
  let liTag = "";
  arrayEl.forEach((data, index) => {
    const { image, name, prenom, age, number, lieux } = data;
    // console.log(searchValue, image, name, prenom, age, number, lieux);
    if (
      searchValue === name ||
      searchValue === prenom ||
      searchValue === age ||
      searchValue === number ||
      searchValue === lieux ||
      !searchValue
    ) {
      liTag += ` <li class="item">
                                <div class="item_img">
                                <img class="img_item" src="${image}" alt="">
                                </div>
                                <p>Name: <span>${name}</span></p>
                                <p>Prenom: <span>${prenom}</span></p>
                                <p>Number Officer: <span>${number}</span></p>
                                <p>Age: <span>${age}</span></p>
                                <p>Lieux de Travail: <span>${lieux}</span></p>
                                <div class="setting">
                                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis elips"></i>
                                    <ul class="menu">
                                       <li onclick="editItem(${index}, '${image}', '${name}', '${prenom}', '${age}', '${number}', '${lieux}')" class="edit"><i class="fa-solid fa-pen-to-square"></i> Edit</li>
                                       <li onclick="deleteItem(${index})" class="delete"><i class="fa-solid fa-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </li>`;

      // contentPage.insertAdjacentHTML("beforeend", liTag || `<span class="empty_parent">Do You No Have A officer Here Please Insert A officer!</span>`);
    }
  });

  contentPage.innerHTML =
    liTag ||
    `<li class="empty_parent">you don't have an officer here, please add one?</li>`;

  if (arrayEl.length > 0) {
    const allImgItems = document.querySelectorAll(".item .img_item");
    allImgItems.forEach((img) => {
      img.addEventListener("click", () => {
        img.parentElement.parentElement.classList.toggle("show_all");
      });
    });
  }
};

showData();

searchInput.addEventListener("keyup", () => {
  showData(searchInput.value.toLowerCase().trim());
});

function showMenu(el) {
  el.parentNode.classList.add("active");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" && e.target != el) {
      el.parentNode.classList.remove("active");
    }
  });
}

const deleteItem = (ItemId) => {
  arrayEl.splice(ItemId, 1);
  localStorage.setItem("infos", JSON.stringify(arrayEl));
  showData();
};

function editItem(id, img, name, prenom, age, number, lieux) {
  //   console.log(id, img, name, prenom, age, number, lieux);
  tempId = id;
  theStatus = true;
  addOfficer.innerText = "Edit Officer";
  (imgEl.src = img),
    (nameEl.value = name),
    (prenomEl.value = prenom),
    (ageEl.value = age),
    (numberEl.value = number),
    (lieuxEl.value = lieux);
  showFormBtn.click();
}

addOfficer.addEventListener("click", () => {
  let imgSrc = imgEl.src,
    nameValue = nameEl.value.toLowerCase(),
    prenomValue = prenomEl.value.toLowerCase(),
    ageValue = ageEl.value.toLowerCase(),
    numberValue = numberEl.value.toLowerCase(),
    lieuxValue = lieuxEl.value.toLowerCase();

  if (
    nameValue == "" ||
    prenomValue == "" ||
    ageValue == "" ||
    numberValue == "" ||
    lieuxValue == ""
  ) {
    return alert("please don't leave a field empty!");
  }

  let obj = {
    image: imgSrc,
    name: nameValue,
    prenom: prenomValue,
    age: ageValue,
    number: numberValue,
    lieux: lieuxValue,
  };

  if (!theStatus) {
    arrayEl.push(obj);
  } else {
    arrayEl[tempId] = obj;
    theStatus = false;
  }

  addOfficer.innerText = "Add Officer";
  emptyAllElement();
  console.log(arrayEl);
  localStorage.setItem("infos", JSON.stringify(arrayEl));

  showData();
  closeBtn.click();
});

function emptyAllElement() {
  (imgEl.src = `imgs/user.jpg`),
    (nameEl.value = ""),
    (prenomEl.value = ""),
    (ageEl.value = ""),
    (numberEl.value = ""),
    (lieuxEl.value = "");
}

clearAllBtn.addEventListener("click", () => {
  let confirmMsg = confirm("tu est sur de suprimer tout les ofiicier ?");
  if (!confirmMsg) return;
  arrayEl.splice(0, arrayEl.length);
  console.log(arrayEl);
  localStorage.setItem("infos", JSON.stringify(arrayEl));
  showData();
});

window.addEventListener("DOMContentLoaded", () => {
  const allMonth = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "May",
    "Juin",
    "Juillet",
    "Aout",
    "September",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  let dateDisplay = new Date(),
    years = dateDisplay.getFullYear(),
    month = allMonth[dateDisplay.getMonth()],
    date = dateDisplay.getDate();

  footerDate.innerHTML = `<span>${month} ${date}, ${years}</span>`;
});
