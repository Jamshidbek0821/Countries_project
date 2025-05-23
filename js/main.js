let elCountrySelect = document.querySelector(".choose-select")
let elCountryList = document.querySelector(".country-list")
let elSearchInput = document.querySelector(".search-input")
let elLikeCount = document.querySelector(".like-count")
let elSaveCount = document.querySelector(".save-count")



function createOptionToSelect() {
    let defaultOption = document.createElement("option")
    defaultOption.textContent = "All option"
    defaultOption.value = ""
    elCountrySelect.appendChild(defaultOption)

    
    countries.forEach(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        elCountrySelect.appendChild(elOption)
    })
}
createOptionToSelect()

function renderCountry(arr, list) {
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[270px] rounded-[5px] shadow-md shadow-blue-500"
        elItem.innerHTML = `
         <img class="!h-[160px] !w-[270px] object-cover" src="${item.flag}" alt="Country flag" width="267" height="160">
         <div class="p-[24px] pb-[46px]">
                    <strong class="text-[18px] inline-block font-extrabold text-[#111517] mb-[16px]">${item.name}</strong>
                    <p><span class="font-semibold">Population: </span>${item.population}</p>
                    <p><span class="font-semibold">Region: </span>${item.region}</p>
                    <p><span class="font-semibold">Capital: </span>${item.capital}</p>
                </div>
                <div class="px-[24px] pb-[20px] flex justify-between">
                    <button onclick="handleLikeClick(${item.id})" class="${item.isLiked ? "bg-red-500 text-white" :"border-slate-500"} duration-300 border-[2px] p-1  rounded-md w-[30%] cursor-pointer ">Like</button>
                    <button onclick="handleSaveClick(${item.id})" class="${item.isBasket ? "bg-red-500 text-white" :"border-slate-500"} border-[2px] p-1 rounded-md w-[30%] cursor-pointer ">Save</button>
                    <button class="border-[2px] p-1 border-slate-500 rounded-md w-[30%] cursor-pointer ">More</button>
                </div>
      `
        list.appendChild(elItem)
    })
}
renderCountry(countries, elCountryList)

function SearchAndSelect(value, currentValue) {
    let filtered = countries.filter(item => item[`${value}`].toLowerCase().includes(currentValue.toLowerCase()))
    renderCountry(filtered, elCountryList)
}

elSearchInput.addEventListener("input", (e) => SearchAndSelect("name", e.target.value))
elCountrySelect.addEventListener("change", (e) => SearchAndSelect("capital", e.target.value))

function handleLikeClick(id) {
   let findedObj = countries.find(item => item.id == id)
   findedObj.isLiked = !findedObj.isLiked
   renderCountry(countries, elCountryList)
   let likeCount = countries.filter(item => item.isLiked).length
   elLikeCount.textContent = likeCount

   const likeIcon = document.querySelector(".like-icon")
   if (likeIcon) {
       if (likeCount > 0) {
           likeIcon.innerHTML = `
               <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" viewBox="0 0 16 16">
               <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053
               c-.523 1.023-.641 2.5.314 4.385C2.634 9.253 4.548 11.427
               8 13.795c3.452-2.368 5.365-4.542 6.286-6.357
               .955-1.886.838-3.362.314-4.385C13.486.878 10.4.28
               8.717 2.01L8 2.748z"/>
               </svg>
           `;
       } else {
           likeIcon.innerHTML = `
               <svg class="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" viewBox="0 0 16 16">
               <path
                   d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053
                   c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989
                   6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357
                   .955-1.886.838-3.362.314-4.385C13.486.878
                   10.4.28 8.717 2.01zM8 15C-7.333 4.868
                   3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1
                   .176-.17C12.72-3.042 23.333 4.867 8 15" />
               </svg>
           `;
       }
   }
}

function handleLikeBtnClick() {
    let likeList = countries.filter(item => item.isLiked == true)
    renderCountry(likeList, elCountryList)
}

function handleSaveClick(id) {
   let findedObj = countries.find(item => item.id == id)
   findedObj.isBasket = !findedObj.isBasket
   renderCountry(countries, elCountryList)
   elSaveCount.textContent = countries.filter(item => item.isBasket == true).length
   
}


function updateSaveIcon() {
    const saveIcon = document.querySelector(".save-icon")
    let saveCount = countries.filter(item => item.isBasket).length
    elSaveCount.textContent = saveCount

    if (saveIcon) {
        if (saveCount > 0) {
            saveIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                    <path d="M2 2v13.5l6-3.25 6 3.25V2z"/>
                </svg>
            `
        } else {
            saveIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#111517" stroke-width="1.5" viewBox="0 0 16 16">
                    <path d="M2 2h12v13.5l-6-3.25-6 3.25z"/>
                </svg>
            `
        }
    }
}

function handleSaveClick(id) {
   let findedObj = countries.find(item => item.id == id)
   findedObj.isBasket = !findedObj.isBasket
   renderCountry(countries, elCountryList)
   updateSaveIcon()  
}


function handleSaveBtnClick() {
    let saveList = countries.filter(item => item.isBasket == true)
    renderCountry(saveList, elCountryList)
    updateSaveIcon()
}


