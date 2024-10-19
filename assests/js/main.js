const getCategory = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;
}

const displayCategory = async () => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const categories = await getCategory();
        const result = categories.map((category) => {
            return `<div class="category"> 
         <h2>${category}</h2>
         <a href="categoryDetails.html?category=${category}" >Detiales</a>

     </div>`
        }).join(' ');

        document.querySelector(".categories .row").innerHTML = result;
    } catch (erorr) {
        document.querySelector(".categories .row").innerHTML = "<p>erorr to load category</p>";


    }
    finally {
        loader.classList.remove("active");

    }
}
displayCategory();

const getproduct = async (page) => {
    const skip=(page-1)*30;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    console.log(data);
    return data;
}

const displayproduct = async (page=1) => {
    
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getproduct(page);
        const numberOfPages = Math.ceil(data.total / 30);
        console.log(numberOfPages);
        const result = data.products.map((product) => {
            return `<div class="product"> 
       
         <img src="${product.thumbnail}" alt="${product.description}"/>
          <h2>${product.title}</h2>
          <span>${product.price} $</span> 

     </div>`
        }).join(' ');

        document.querySelector(".products .row").innerHTML = result;
        let paginationLink = ``;
        if(page==1){
            paginationLink += `<li class="page-item"><button disabled class="page-link" >&laquo;</button></li>`

        }
        else{
            paginationLink += `<li class="page-item"><button onclick=displayproduct('${page-1}') class="page-link" >&laquo;</button></li>`

        }
        for (let i = 1; i <= numberOfPages; i++) {
            paginationLink += `<li class="page-item ${i == page?'active':''} "><button onclick=displayproduct('${i}') class="page-link">${i}</button></li>`
        }
        if(page==numberOfPages){
            paginationLink += `<li class="page-item"><button disabled class="page-link" >&raquo;</button></li>`
        }
            else{       
                 paginationLink += `<li class="page-item"><button onclick=displayproduct('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`
        }
        document.querySelector(".pagination").innerHTML = paginationLink;
    } catch (erorr) {
        document.querySelector(".products .row").innerHTML = "<p>erorr to load category</p>";


    }
    finally {
        loader.classList.remove("active");

    }
}
displayproduct();
window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".categories")
    if (window.scrollY > categories.offsetTop) {
        nav.classList.add("schrollNavbar");
    }
    else {
        nav.classList.remove("schrollNavbar");
    }
}
const countDown = () => {
    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;
}
setInterval(() => {
    countDown()
}, 1000);  