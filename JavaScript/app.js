const productosTienda = document.getElementById("productosTienda");
const mostrarCarro = document.getElementById("mostrarCarro");
const contenedor = document.getElementById("contenedor");

//

// ARRAY

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// LOCAL STORAGE DE ITEMS

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// RECUPERAR ITEMS

JSON.parse(localStorage.getItem("carrito"));

// CARGA DE PRODUCTOS

// const productosJson = async () =>{
//   const resp = await fetch ("/data.json");
//   const productos = await resp.json();

  productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}"></img>
      <h3>${product.nombre}</h3>
      <p class="price">$ ${product.precio}</p>
      `;
  
    productosTienda.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "Agregar";
    comprar.className = "comprar";
  
    content.appendChild(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          nombre: product.nombre,
          img: product.img,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        saveLocal();
      }
    });
  });
// }
// productosJson();

// Busqueda productos

const buscadorProductos = document.getElementById('buscador');
const resultadoBusqueda = document.getElementById('buscadorResult');

buscadorProductos.addEventListener('keyup', function() {
  const busqueda = buscadorProductos.value.toLowerCase();
  const itemBuscado = productos.filter(function(item) {
    return item.nombre.toLowerCase().includes(busqueda)
  });

  mostrarResultado(itemBuscado);
});


function mostrarResultado(resultado) {
  resultadoBusqueda.innerHTML = '';

  if (resultado.length === 0) {
    resultadoBusqueda.innerText = 'No results found.';
    return;
  }

  const resultList = document.createElement('ul');
  resultado.forEach(function(result) {
    const listItem = document.createElement('li');
    listItem.className = "list-busc"
    listItem.innerText =result.nombre + ' $ ' + result.precio;
    resultList.appendChild(listItem);
  });

  resultadoBusqueda.appendChild(resultList);
}


// --- CARRO ---

const crearCarro = () => {
  contenedor.innerHTML = "";
  contenedor.style.display = "flex";
  const carroHeader = document.createElement("div");
  carroHeader.className = "carro-header";
  carroHeader.innerHTML = `
    <h1 class="carro-header-title">Productos agregados</h1>   
    `;
  contenedor.appendChild(carroHeader);

  const carroBoton = document.createElement("button");
  carroBoton.innerText = "X";
  carroBoton.className = "carro-header-button";

  carroBoton.addEventListener("click", () => {
    contenedor.style.display = "none";
  });

  carroHeader.appendChild(carroBoton);

  // AGREGAR PRODUCTO AL CARRO

  carrito.forEach((product) => {
    let productoAgregado = document.createElement("div");
    productoAgregado.className = "carro-content";
    productoAgregado.innerHTML = `
        <img class ="img-carro" src="${product.img}"></img>
        <h3>${product.nombre}</h3>
        <p>$${product.precio * product.cantidad}</p>
        <button class ="menos"> ➖ </button>
        <p>Cantidad: ${product.cantidad}</p>        
        <button class ="mas"> ➕ </button> 
        <button class ="eliminar-producto"> Eliminar </button>      
        `;

    contenedor.appendChild(productoAgregado);

    // -producto AGREGAR ~ ELIMINAR PROD CUANDO ES MENOR QUE 1

    let menos = productoAgregado.querySelector(".menos");
    menos.addEventListener("click", () => {
      if (product.cantidad != 1) product.cantidad--;
      crearCarro();
      saveLocal();
    });

    // +producto en carro

    let mas = productoAgregado.querySelector(".mas");
    mas.addEventListener("click", () => {
      product.cantidad++;
      crearCarro();
      saveLocal();
    });

    let eliminar = productoAgregado.querySelector(".eliminar-producto");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  // TOTAL FINAL DE LA COMPRA

  const total = carrito.reduce((a, b) => a + b.precio * b.cantidad, 0);

  const totalDeCompra = document.createElement("div");
  totalDeCompra.className = "contentenido-total";
  totalDeCompra.innerHTML = `Total a pagar: $ ${total}`;
  contenedor.appendChild(totalDeCompra);

  // CANTIDAD PRODUCTOS EN EL CARRO

  const totalP = carrito.reduce((x, y) => x + y.cantidad, 0);

  const totalProdCarro = document.createElement("div");
  totalProdCarro.className = "contentenido-total";
  totalProdCarro.innerHTML = `Total de productos: ${totalP}`;
  contenedor.appendChild(totalProdCarro);
};

mostrarCarro.addEventListener("click", crearCarro);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  crearCarro();
  saveLocal();
  guardarCant();
};

// 




