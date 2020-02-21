const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .menu a")

//CSS do menu está dinâmico
for (item of menuItems){
  if (currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}