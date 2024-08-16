document.addEventListener('DOMContentLoaded', () => {   
});


const tblItems = document.querySelector('#items');
const inpUnidad = document.querySelector('#unidad');
const inpTipo = document.querySelector('#tipo');
const inpFecha = document.querySelector('#fecha');
const inpProveedor = document.querySelector('#proveedor');
const butStyle="background:#52586a;color:#cccfd5;cursor:pointer;border-radius:5px;";
const URL_RRA = 'https://localhost:5001/rra/'

function Close() {
    close();
}

function Filter() {
    try {
        fetch(URL_RRA + 'v1/filter', {
            method: 'POST',
            body: JSON.stringify({
                unidad: inpUnidad.value,
                tipo: inpTipo.value,
                fecha: (inpFecha.value == '' ? Date.now : inpFecha.value),
                proveedor: inpProveedor.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())  
            .then(json => {
                if (json.isValid) {
                    tableDelete();
                    tableCreate(json.resultData);
                }
                else {
                    tableDelete();
                    alert(json.stringValue);

                }
            })
            .catch(err => {
                tableDelete();
                alert('Error de conexión: ' + err);
            })
    }
    catch (error) {
        tableDelete();
        alert(error);
    }
}

function tableDelete() {
    while (tblItems.rows.length > 1) {
        tblItems.deleteRow(1);
    }

}

function tableCreate(data) {
    try {
        for (const _row of data) {
            let tr = tblItems.insertRow();
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.id));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.presupuesto));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.unidad));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.tipo));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.cantidad));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.valorUnitario));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.valorTotal));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.fecha.toString().substring(0, 10)));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.proveedor));
            td = tr.insertCell();
            td.appendChild(document.createTextNode(_row.documentacion));
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Modificar"));
            td.id = _row.id;
            td.style=butStyle;
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Desactivar"));
            td.id = _row.id;
            td.style=butStyle;
        }
        const cells = tblItems.getElementsByTagName('td');
        Array.from(cells).forEach((cell) => {
            switch (cell.cellIndex) {
                case 10:
                    cell.addEventListener('click', () => {
                        Modify(cell.id);
                    });
                    break;
                case 11:
                    cell.addEventListener('click', () => {
                        Deactivate(cell.id);
                    });
                    break;
            }
        });
    }
    catch (err) {
        alert(err);
    }

    function Modify(id) {
        try {
            localStorage.setItem('id', id)
            let params = `width=550,height=600,left=200,top=200,toolbar=no,resizable=no,location=no,menubar=no`;
            var newwindow = window.open("modify.html", "modify", params);
            newwindow.onbeforeunload = function () {
                Filter();
            };
        }
        catch (error) {
            alert(error);
        }
    }

    function Deactivate(id) {
        if (window.confirm("Desea desactivar el registro?")) {
            try {
                fetch(URL_RRA + 'v1/' + id, {
                    method: 'DELETE'
                })
                    .then(response => response.json())  // convertir a json
                    .then(json => {
                        if (json.isValid) {
                            Filter();
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
    }

}
