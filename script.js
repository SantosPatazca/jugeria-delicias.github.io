document.addEventListener('DOMContentLoaded', function() {
    const jugos = ['Papaya', 'Piña', 'Fresa'];
    const bebidas = ['Cupcake', 'Queque', 'Pie de manzana'];
    const jugosContainer = document.getElementById('jugosContainer');
    const bebidasContainer = document.getElementById('bebidasContainer');
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; 

   
    function obtenerSeleccionados(nombreCheckbox) {
        return Array.from(document.querySelectorAll(`input[name="${nombreCheckbox}"]:checked`)).map(input => input.value);
    }


    function mostrarPedido(pedido) {
        const pedidosTableBody = document.getElementById('pedidosTableBody');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.nombre}</td>
            <td>${pedido.apellido}</td>
            <td>${pedido.jugo.join(', ')}</td>
            <td>${pedido.bebida.join(', ')}</td>
        `;


        pedidosTableBody.appendChild(row);
    }

    
    jugos.forEach(jugo => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="jugo" value="${jugo}"> ${jugo}
        `;
        jugosContainer.appendChild(label);
        jugosContainer.appendChild(document.createElement('br'));
    });

    
    bebidas.forEach(bebida => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" class="bebida" name="bebida" value="${bebida}"> ${bebida}
        `;
        bebidasContainer.appendChild(label);
        bebidasContainer.appendChild(document.createElement('br'));
    });

    
    pedidos.forEach(pedido => {
        mostrarPedido(pedido);
    });

    
    document.getElementById('pedidoForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellidos').value;
        const jugosSeleccionados = obtenerSeleccionados('jugo');
        const bebidasSeleccionadas = obtenerSeleccionados('bebida');

        
        const nuevoPedido = {
            nombre: nombre,
            apellido: apellido,
            jugo: jugosSeleccionados,
            bebida: bebidasSeleccionadas
        };

        pedidos.push(nuevoPedido); 
        localStorage.setItem('pedidos', JSON.stringify(pedidos)); 


        mostrarPedido(nuevoPedido);



        alert('Pedido enviado');
    });

});
