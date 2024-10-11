const getCategory= async () =>{
    const {data}=await axios.get('https://dummyjson.com/products/category-list');
    return data;
}

const displayCategory= async () =>{
    const categories=await getCategory();
    const result=categories.map( (category) =>{
     return `<div class="category"> 
         <h2>${category}</h2>
         <a href="categoryDetails.html?category=${category}" >Detiales</a>

     </div>`
    }).join(' ');

    document.querySelector(".categories .row").innerHTML=result;

}
displayCategory();

const getproduct= async () =>{
    const {data}=await axios.get('https://dummyjson.com/products');
    console.log(data);
    return data;
}

const displayproduct= async () =>{
    const data=await getproduct();
    const result=data.products.map( (product) =>{
     return `<div class="product"> 

         <img src="${product.thumbnail}" alt="${product.description}"/>
          <h2>${product.title}</h2>
          <span>${product.price} $</span> 

     </div>`
    }).join(' ');
    
    document.querySelector(".products .row").innerHTML=result;

}
displayproduct();
