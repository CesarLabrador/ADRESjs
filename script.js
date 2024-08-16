document.addEventListener('DOMContentLoaded', () => {
});

const btnAddRRA=document.querySelector('#create');
const btnCnsRRA=document.querySelector('#consult');


btnAddRRA.addEventListener('click',()=>{
create();
});

btnCnsRRA.addEventListener('click',()=>{
consult();
});

function consult(){
    let params=`toolbar=no,resizable=no,location=no,menubar=no`;
    window.open("consult.html","consult",params);
}

function create(){
let params=`width=550,height=600,left=200,top=200,toolbar=no,resizable=no,location=no,menubar=no`;
window.open("create.html","create",params);
}