let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (event) => {
  if (event.target.classList.contains('agregar')) {
    validarProductoCarrito(event.target.id);
  }
});

const validarProductoCarrito = (productoId) => {
  const estaRepetido = carrito.some((producto) => producto.id == productoId);

  if (estaRepetido) {
    const producto = carrito.find((producto) => producto.id == productoId);
    producto.cantidad++;
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    actualizarTotalCarrito(carrito);
  } else {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);
    pintarProductoCarrito(producto);
    actualizarTotalCarrito(carrito);
  }
};

const pintarProductoCarrito = (producto) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML += `
    <p>${producto.nombre}</p>
    <p>$ ${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
  `
  carritoContenedor.appendChild(div);
};

const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex((producto) => producto.id == productoId);

  // carrito[productoIndex].cantidad === 1
  //   ? carrito.splice(productoIndex, 1)
  //   : carrito[productoIndex].cantidad--

  if (carrito[productoIndex].cantidad === 1) {
    carrito.splice(productoIndex, 1)
  } else {
    carrito[productoIndex].cantidad--
  }

  pintarCarrito(carrito);
  actualizarTotalCarrito(carrito);
};

const pintarCarrito = (carrito) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  carritoContenedor.innerHTML = '';

  carrito.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');

    div.innerHTML += `
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    carritoContenedor.appendChild(div);
  });
};

const actualizarTotalCarrito = (carrito) => {
  const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const compraTotal = carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

  pintarTotalesCarrito(cantidadTotal, compraTotal);
  guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (cantidadTotal, compraTotal) => {
  const contadorCarrito = document.getElementById('contador-carrito');
  const precioTotal = document.getElementById('precioTotal');

  contadorCarrito.innerText = cantidadTotal;
  precioTotal.innerText = compraTotal;
};

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};