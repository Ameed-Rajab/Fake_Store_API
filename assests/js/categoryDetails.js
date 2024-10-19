const getproduct= async () =>{
    const params=new URLSearchParams(window.location.search);
    const category=params.get('category');
    const {data}=await axios.get(`https://dummyjson.com/products/category/${category}`);
    console.log(data);
    return data;
}

const displayproduct= async () =>{
    const loader= document.querySelector( ".loader-container");
    loader.classList.add("active");
    try{
    const data=await getproduct();
    const result=data.products.map( (product) =>{
     return `<div class="product"> 

         <img src="${product.thumbnail}" alt="${product.description}"/>
          <h2>${product.title}</h2>
          <span>${product.price} $</span>

     </div>`
    }).join(' ');
    
    document.querySelector(".products .row").innerHTML=result;
}catch(erorr){
    document.querySelector(".products .row").innerHTML="<p>erorr to load category</p>";


}
finally{
    loader.classList.remove("active");

}
}
displayproduct();