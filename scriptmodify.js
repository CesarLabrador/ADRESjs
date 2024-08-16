document.addEventListener('DOMContentLoaded', () => {
    GetData();
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
const URL_RRA = 'https://localhost:5001/rra/'
const ID = localStorage.getItem('id')

function GetData() {
    try {
        fetch(URL_RRA + 'v1/' + ID, {
            method: 'GET'
        })
            .then(response => response.json())  // convertir a json
            .then(json => {
                if (json.isValid) {
                    FillData(json.resultData);
                }
                else {
                    alert(json.stringValue);
                }
            })
            .catch(err => {
                alert('Error de conexión: ' + err);
            })
    }
    catch (error) {
        alert(error);
    }
}

function FillData(Data) {
    try {
    inpPresupuesto.value = Data.presupuesto;
    inpUnidad.value = Data.unidad;
    inpTipo.value = Data.tipo;
    inpNumero.value = Data.cantidad;
    inpValorUnd.value = Data.valorUnitario;
    inpValorTotal.value = Data.valorTotal;
    inpFecha.value = Data.fecha.substring(0,10);
    inpProveedor.value = Data.proveedor;
    inpDocumentacion.value = Data.documentacion;
    }
    catch (error){
        alert(error);
    }
}

function Save() {
    try {
        fetch(URL_RRA + 'v1/', {
            method: 'PATCH',
            body: JSON.stringify({
                id: parseInt(ID),
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
            .then(response => response.json())
            .then(json => {
                if (json.isValid) {
                    alert(json.stringValue);
                    close();
                }
                else {
                    if(json.status==400)
                        alert(json.title);
                    else
                        alert(json.stringValue);
                }
            })
            .catch(err => {
                alert('Error de conexión: ' + err);
            })
    }
    catch (error) {
        alert(error);
    }
}