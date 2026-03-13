let pizzaActual = null
let carrito = []

const pizzas = {

    pepperoni:{
        titulo:"Pizza Pepperoni",
        imagen:"img/Pizza pepperoni.jpeg",
        descripcion:"Deliciosa pizza con pepperoni, queso mozzarella y salsa de tomate.",

        precios:{
            pequena:"$45.000",
            mediana:"$70.000",
            familiar:"$80.000"
        }
    },

    hawaiana:{
        titulo:"Pizza Hawaiana",
        imagen:"img/Pizza Hawaina.jpeg",
        descripcion:"Pizza con jamón, piña y queso mozzarella.",

        precios:{
            pequena:"$35.000",
            mediana:"$50.000",
            familiar:"$70.000"
        }
    },

    margarita:{
        titulo:"Pizza Margarita",
        imagen:"img/Pizza Margarita.jpeg",
        descripcion:"Pizza con tomate, queso mozzarella y albahaca.",

        precios:{
            pequena:"$50.000",
            mediana:"$70.000",
            familiar:"$85.000"
        }
    },

    polloChampi:{
        titulo:"Pizza Pollo con Champiñones",
        imagen:"img/Pizza Pollo con champiñon.jpeg",
        descripcion:"Pollo, salsa BBQ y queso mozzarella.",
        precios:{
            pequena:"$50.000",
            mediana:"$75.000",
            familiar:"$85.000"
        }
    },

    cuatroQuesos:{
        titulo:"Pizza Cuatro Quesos",
        imagen:"img/Pizza de pollo salsa BBQ.jpg",
        descripcion:"Mozzarella, parmesano, cheddar y queso azul.",
        precios:{
            pequena:"$70.000",
            mediana:"$85.000",
            familiar:"$100.000"
        }
    },

    vegetariana:{
        titulo:"Pizza Vegetariana",
        imagen:"img/Pizzavegetariana.jpg",
        descripcion:"Pimentón, champiñones, aceitunas y cebolla.",
        precios:{
            pequena:"$36.000",
            mediana:"$52.000",
            familiar:"$72.000"
        }
    }

}

function mostrarPizza(tipo){

    const pizza = pizzas[tipo]

    pizzaActual = pizza

    document.getElementById("tituloPizza").innerText = pizza.titulo
    document.getElementById("imagenPizza").src = pizza.imagen
    document.getElementById("descripcionPizza").innerText = pizza.descripcion
    document.getElementById("precioPizza").innerHTML = `
    <div class="opcion-precio">
    <input type="radio" name="tamano" checked>
    Pequeña (6 porciones) - ${pizza.precios.pequena}
    </div>

    <div class="opcion-precio">
    <input type="radio" name="tamano">
    Mediana (8 porciones) - ${pizza.precios.mediana}
    </div>

    <div class="opcion-precio">
    <input type="radio" name="tamano">
    Familiar (12 porciones) - ${pizza.precios.familiar}
    </div>
    `

    document.getElementById("detallePizza").classList.remove("oculto")
}

function comprarPizza(){

    const tamanos = document.getElementsByName("tamano")

    let tamanoSeleccionado = ""

    if(tamanos[0].checked){
        tamanoSeleccionado = "Pequeña"
    }
    else if(tamanos[1].checked){
        tamanoSeleccionado = "Mediana"
    }
    else{
        tamanoSeleccionado = "Familiar"
    }

    const pedido = {
        pizza:pizzaActual.titulo,
        tamano:tamanoSeleccionado,
        precio:pizzaActual.precios
    }

    carrito.push(pedido)
    actualizarContador()

    mostrarToast("🍕 Pizza agregada al carrito")
    console.log(carrito)

    cerrarDetalle()
}

function cerrarDetalle(){
    document.getElementById("detallePizza").classList.add("oculto")
}

function animarPizzas(){

    const pizzas = document.querySelectorAll(".pizza-card")

    pizzas.forEach((pizza, index)=>{

        setTimeout(()=>{

            pizza.classList.add("animar")

        }, index * 300)

    })

}

function mostrarToast(mensaje){

    const toast = document.getElementById("toast")

    toast.innerText = mensaje
    toast.classList.remove("oculto")

    setTimeout(()=>{

        toast.classList.add("oculto")

    },3000)

}

function actualizarContador(){
    document.getElementById("contadorCarrito").innerText = carrito.length
}

function abrirCarrito(){
    const lista = document.getElementById("listaCarrito")
    
    lista.innerHTML = ""
    
    carrito.forEach((item)=>{
        lista.innerHTML += `<div class="item-carrito">🍕 ${item.pizza} - ${item.tamano}</div>`
    })
    document.getElementById("modalCarrito").classList.remove("oculto")
}

function hacerPedido(){

    if(carrito.length === 0){

        mostrarToast("Tu carrito está vacío")
        return
    }

    const contenedor = document.getElementById("detalleRecibo")

    contenedor.innerHTML = ""

    let total = 0

    carrito.forEach(item => {

        let precio = 0

        if(item.tamano === "Pequeña"){
            precio = item.precio.pequena
        }
        else if(item.tamano === "Mediana"){
            precio = item.precio.mediana
        }
        else{
            precio = item.precio.familiar
        }

        total += parseInt(precio.replace(/\D/g,''))

        contenedor.innerHTML += `
        <div class="item-recibo">
        <span>${item.pizza} (${item.tamano})</span>
        <span>${precio}</span>
        </div>
        `

    })

    document.getElementById("totalRecibo").innerText =
    "Total: $" + total.toLocaleString()

    document.getElementById("modalRecibo").classList.remove("oculto")

    carrito = []

    actualizarContador()

    cerrarCarrito()

}

function cerrarCarrito(){
    document.getElementById("modalCarrito").classList.add("oculto")
}

function cerrarRecibo(){

    document.getElementById("modalRecibo").classList.add("oculto")

}

window.addEventListener("load", function(){

    setTimeout(function(){

        document.getElementById("loader").style.display="none"

        animarPizzas()

    },2000)

})
