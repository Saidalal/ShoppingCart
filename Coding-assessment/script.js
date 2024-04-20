document.addEventListener('DOMContentLoaded', function(){
    const switchMen = document.getElementById('men');
    const switchWomen = document.getElementById('women');
    const switchKids = document.getElementById('kids');
    const gridContainer = document.getElementById('gridContainer');

    switchMen.addEventListener('click', function(){
        fetchImages('Men');
    })
    switchWomen.addEventListener('click', function(){
        fetchImages('Women');
    })
    switchKids.addEventListener('click', function(){
        fetchImages('Kids');
    })

    async function fetchImages(category) {
        const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
        console.log(apiUrl);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const categoryData = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
            if (categoryData) {
                const categoryImages = categoryData.category_products.slice(0, 4); 
                displayImages(categoryImages);
            } else {
                console.error('Category not found:', category);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    function displayImages(images) {
        gridContainer.innerHTML = ''; 
        images.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
    
            
            const img = document.createElement('img');
            img.src = image.image;
            img.alt = image.title;
            gridItem.appendChild(img);
    
          
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info-container');
            gridItem.appendChild(infoContainer);
    
            const title = document.createElement('p');
            title.textContent = image.title;
            title.classList.add('title'); 
            infoContainer.appendChild(title);
    
           
            const vendor = document.createElement('p');
            vendor.textContent = `${image.vendor}`;
            vendor.classList.add('vendor'); 
            infoContainer.appendChild(vendor);
    
            
            const priceContainer = document.createElement('div');
            priceContainer.classList.add('price-container');
            gridItem.appendChild(priceContainer);
    
            const price = document.createElement('p');
            price.textContent = `Rs ${image.price}`;
            priceContainer.appendChild(price);
    
          
            const comparePrice = document.createElement('p');
            comparePrice.textContent = ` ${image.compare_at_price}`;
            comparePrice.classList.add('compare-price'); 
            priceContainer.appendChild(comparePrice);
    
 
            const discountText = document.createElement('span');
            discountText.classList.add('discount-text');
            discountText.textContent = '50% OFF';
            priceContainer.appendChild(discountText);
    
            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.classList.add('add-to-cart-btn'); 
            addToCartBtn.addEventListener('click', () => {
                
                console.log('Item added to cart:', image.title);
            });
            gridItem.appendChild(addToCartBtn);
    
         
            if (index === 2) { 
                const onOfferBtn = document.createElement('button');
                onOfferBtn.textContent = 'On Offer';
                onOfferBtn.classList.add('on-offer-btn'); 
                gridItem.insertBefore(onOfferBtn, gridItem.firstChild); 
            }
    
            if (index ===0 || index === 3) { 
                const onSeasonBtn = document.createElement('button');
                onSeasonBtn.textContent = 'New Season';
                onSeasonBtn.classList.add('on-season-btn'); 
                gridItem.insertBefore(onSeasonBtn, gridItem.firstChild); 
            }
            gridContainer.appendChild(gridItem);
        });
    }
    
    
})
