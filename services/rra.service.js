// var xhr = new XMLHttpRequest(); //invocar nueva instancia de XMLHttpRequest
// xhr.onload = exito; // llamar a la funcion exito si exitosa
// xhr.onerror = error;  // llamar a la funcion error si fallida
// xhr.open('GET', 'https://api.github.com/users/manishmshiva'); // Abrir solicitud GET
// xhr.send(); // mandar la solicitud al vervidor.
class rraService
{
    Save(){
// Solicitud GET (Request).
fetch('https://api.github.com/users/manishmshiva')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

};
};

    // datos mandados con la solicutud POST
// let _datos = {
//     titulo: "foo",
//     principal: "bar", 
//     Id:1
//   }
  
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify(_datos),
//     headers: {"Content-type": "application/json; charset=UTF-8"}
//   })
//   .then(response => response.json()) 
//   .then(json => console.log(json));
//   .catch(err => console.log(err));