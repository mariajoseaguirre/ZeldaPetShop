//Tienda para comprar alimento de mascotas
//Se crea Array para crear lista de productos

const productos = [
    {art: 1, nombre: 'Acana 2kg', etapa: 'cachorro', precio: 19990, cantidad:0},
    {art: 2, nombre: 'Acana 6kg', etapa:'cualquier edad', precio: 35990, cantidad:0},
    {art: 3, nombre: 'Acana 12kg', etapa:'cualquier edad', precio: 59990, cantidad:0},
    {art: 4,nombre: 'Brit 3kg', etapa:'cualquier edad', precio: 19990, cantidad:0},
    {art: 5, nombre: 'Brit 7kg', etapa:'cachorro', precio: 35990, cantidad:0},
    {art: 6, nombre: 'Orijen 2kg', etapa:'cachorro', precio: 23990, cantidad:0},
]

const carrito = []

// Ordenar productos de menor a mayor
const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Ordenar productos de mayor a menor
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio+ ' '+producto.etapa
    })
    alert('Lista de precios:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Que alimento deseas comprar para tu perro?'+'\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuantos sacos de alimento quieres comprar?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, productoCantidad)
        } else {
            alert('Disculpa, no tenemos el producto que buscas.')
        }

        otroProducto = confirm('¿Desea agregar otro producto?')
    } while (otroProducto);

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoCantidad, productoArt) => {
    const productoRepetido = carrito.find(producto => producto.art === productoArt)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad+'| Etapa: '+producto.etapa
    })

    const checkout = confirm('Checkout: '
        +'\n'+listaProductos.join('\n')
        +'\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (checkout) {
        const datosCliente = solicitarDatos()
        finalizarCompra(listaProductos, datosCliente)
    } else {
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

//Datos cliente
const solicitarDatos = () => {
    alert ('Ingrese sus datos para el envio')
    const nombre = prompt('Ingrese su nombre:');
    const email = prompt('Ingrese su correo electrónico:');
    const telefono = prompt('Ingrese su número de teléfono:');
    const direccion = prompt ('Ingrese su dirección')

    const datosCliente = {
      nombre,
      email,
      telefono,
      direccion
    };
  return datosCliente;
  };

const finalizarCompra = (listaProductos,datosCliente) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n'+listaProductos.join('\n')
        +'\nTotal de productos: '+cantidadTotal
        +'\nEl total de su compra es: '+ precioTotal
        +'\nGracias por su compra!'
        + '\nEstos son los datos de retiro: '
        +'\nNombre: '+datosCliente.nombre
        +'\nEmail: '+datosCliente.email
        +'\nTelefono: '+datosCliente.telefono
        +'\nDireccion: '+datosCliente.direccion
    )

}

const comprar = () => {
    const productosAscendente = confirm('Bienvenido a Zelda Petshop ¿Quieres ordenar la lista de productos del mas barato al mas caro?')

    if (productosAscendente) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};



comprar()
