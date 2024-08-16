document.addEventListener('DOMContentLoaded', () => {
});

const btnSave = document.querySelector('#save');
const btnCancel = document.querySelector('#cancel');

btnSave.addEventListener('click', () => {
    Save();
})

btnCancel.addEventListener('click', () => {
    close();

})
const inpPresupuesto = document.querySelector('#presupuesto');
const inpUnidad = document.querySelector('#unidad');
const inpTipo = document.querySelector('#tipo');
const inpNumero = document.querySelector('#numero');
const inpValorUnd = document.querySelector('#valorund');
const inpValorTotal = document.querySelector('#valortotal');
const inpFecha = document.querySelector('#fecha');
const inpProveedor = document.querySelector('#proveedor');
const inpDocumentacion = document.querySelector('#documentacion');
const URL_RRA='https://localhost:5001/rra/'

function Save() {
    try {
        fetch(URL_RRA+'v1/', {
            method: 'POST',
            body: JSON.stringify({
                presupuesto: parseFloat(inpPresupuesto.value),
                unidad: inpUnidad.value,
                tipo: inpTipo.value,
                cantidad: parseFloat(inpNumero.value),
                valorUnitario: parseFloat(inpValorUnd.value),
                valorTotal: parseFloat(inpValorTotal.value),
                fecha: inpFecha.value,
                proveedor: inpProveedor.value,
                documentacion: inpDocumentacion.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())  // convertir a json
            .then(json => {
                console.log(json);
                if (json.isValid) {
                    alert(json.stringValue); // "Registro grabado";
                    close();
                }
                else {
                    alert(json.stringValue);
                }
            })
            .catch(err => {
                alert('Error de conexión: '+err);
            }) 
    }
    catch (error) {
        alert(error);
    }
}