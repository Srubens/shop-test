(function(){
	
	"use script";

	const $addCart = document.querySelectorAll('[data-js="add-cart"]')

	let products = [
		{
			name:'Camisa Azul Personalizada',
			tag: 'camisa-azul',
			price: 32,
			inCart:0
		},
		{
			name:'Camisa Cinza Personalizada',
			tag: 'camisa-cinza',
			price: 30,
			inCart:0
		},
		{
			name:'Moleton Vermelho Personalizado',
			tag: 'moleton-vermelho',
			price: 52,
			inCart:0
		},
		{
			name:'Moleton Preto Personalizado',
			tag: 'moleton-preto',
			price: 50,
			inCart:0
		}
	]

	for(let a = 0; a < $addCart.length; a++){
		$addCart[a].addEventListener('click', () =>{
			cartNumbers(products[a]);
			totalProducts(products[a]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers')
		let $miniCart = document.querySelector('[data-js="miniCart"]');

		if( productNumbers ){
			$miniCart.textContent = productNumbers
		}

	}

	function cartNumbers(product){

		let productNumbers = localStorage.getItem('cartNumbers');
		let $miniCart = document.querySelector('[data-js="miniCart"]');

		productNumbers = parseInt(productNumbers);

		if(productNumbers){
			localStorage.setItem('cartNumbers', productNumbers + 1);
			$miniCart.textContent = productNumbers + 1;
		}else{
			localStorage.setItem('cartNumbers', 1);
			$miniCart.textContent = 1;
		}

		setItems(product)

	}

	function setItems(product){

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);

		if( cartItems != null ){

			if( cartItems[product.tag] == undefined ){
				
				cartItems = {
					...cartItems,
					[product.tag]: product
				}
			}

			cartItems[product.tag].inCart += 1;

		}else{
			
			product.inCart = 1;
			cartItems = {
				[product.tag]: product
			}
		
		}

		localStorage.setItem("productsInCart", JSON.stringify(cartItems))

	}

	onLoadCartNumbers()

	function totalProducts(product){
		let cartCost = localStorage.getItem("Precototal")

		console.log("o total das compras deram", cartCost)
		console.log(typeof cartCost)

		if(cartCost != null){
			cartCost = parseInt(cartCost)
			localStorage.setItem("Precototal", cartCost + product.price)
		}else{
			localStorage.setItem("Precototal", product.price)
		}

	}

	function displayCart(){
		let cartItems = localStorage.getItem("productsInCart")
		let $container = document.querySelector('[data-js="container-js"]')
		let cartCost = localStorage.getItem("Precototal")
		cartItems = JSON.parse(cartItems)

		console.log(cartItems)

		if(cartItems && $container){
			$container.innerHTML = ``;
			Object.values(cartItems).map(item => {
				$container.innerHTML += `
				<tr class="box-img">
			       <th> <a href='#' title='excluir' ><i class='fa fa-times-circle'></i></a> <img class="img" src="./images/${item.tag}.jpg" alt='./images/${item.tag}' /> </th>
			       <th> R$ ${item.price},00 </th>
			       <th class="inCart" > <a href="#"><i class="fa fa-caret-left"></i></a> ${item.inCart} <a href="#"><i class="fa fa-caret-right"></i></a> </th>
			       <th> R$ ${item.inCart * item.price},00 </th>
			    </tr>
				`;
			})
		}

		$container.innerHTML += `
			  <tr>
			     <th ><a href="#">Finalizar Compra</a></th>
			     <th >Tota das Compras R$ ${cartCost},00</th>
			  </tr>	
		`;

		console.log(cartItems)
	}

	displayCart()

})();