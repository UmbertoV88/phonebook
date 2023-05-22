var datiCod = [
    {
        nome: "Maurizio",
        cognome: "Postiglione",
        email: "maurizio.postiglione@gmail.com",
        telefono: "3333333333"        
    },
    {
        nome: "Mario",
        cognome: "Rossi",
        email: "mario.rossi@gmail.com",
        telefono: "343242342334"
    },
    {
        nome: "Luigi",
        cognome: "Verdi",
        email: "luigi.verdi@gmail.com",
        telefono: "343242342334"
    },
    {
        nome: "Giovanni",
        cognome: "Bianchi",
        email: "lhjklhjklnj,.l",
        telefono: "343242342334"
    },
    {
        nome: "Marco",
        cognome: "Gialli",
        email: "daskldasdjasd.las@dadadl",
        telefono: "55555555555"
    }
];
var data = !(JSON.parse(localStorage.getItem("data"))) ? datiCod : JSON.parse(localStorage.getItem("data"));

function createTable() {
    var tableContactsDiv = document.getElementById("tableContactsDiv");
    if (tableContactsDiv){
        var table = document.createElement("table"); 
        table.id = "tableContainer";
        table.className = "table table-striped table-hover shadow-lg p-3 mb-5 bg-body rounded";
        table.innerHTML = "";

        var thead = document.createElement("thead"); 

        var row = document.createElement("tr"); 
        row.className = "table-dark";
        var nameCont = document.createElement("th"); 
        var surnameCont = document.createElement("th");
        var emailCont = document.createElement("th");
        var phoneCont = document.createElement("th");
        var editCont = document.createElement("th");
        var delCont= document.createElement("th");
        nameCont.innerHTML = "Nome";
        nameCont.scope = "col";
        surnameCont.innerHTML = "Cognome";
        surnameCont.scope = "col";
        emailCont.innerHTML = "E-mail";
        emailCont.scope = "col";
        phoneCont.innerHTML = "Telefono";
        phoneCont.scope = "col";
        row.appendChild(nameCont);
        row.appendChild(surnameCont);
        row.appendChild(emailCont);
        row.appendChild(phoneCont);
        row.appendChild(editCont);
        row.appendChild(delCont);
        table.appendChild(thead);
        thead.appendChild(row);
    };
    createContact(table, data)
}
function createContact(table, array){

    if (!array || array == null || array == undefined || array < 0) {
        alert( "NESSUN CONTATTA IN AGENDA!!! ")
        return;
    }
    for (let i = 0; i < array.length; i++) {
        var tbody = document.createElement("tbody"); 
        
        var row = document.createElement("tr");

        var nameCont = document.createElement("td");
        var surnameCont = document.createElement("td");
        var emailCont = document.createElement("td");
        var phoneCont = document.createElement("td");
        var editCont = document.createElement("td");
        var delCont = document.createElement("td");

        nameCont.innerHTML = array[i].nome;
        surnameCont.innerHTML = array[i].cognome;
        emailCont.innerHTML = array[i].email;
        phoneCont.innerHTML = array[i].telefono;  

        var edit = document.createElement("button");
        edit.className = "btn btn-warning";
        edit.onclick = () => updateContact(array[i].nome,array[i].cognome,array[i].email,array[i].telefono,i)
        edit.innerHTML = "Modifica";

        var cancell = document.createElement("button");
        cancell.className = "btn btn-danger";
        cancell.onclick = () => deleteContact(i);
        cancell.innerHTML = "Elimina"; 


        editCont.appendChild(edit);
        delCont.appendChild(cancell);

        row.appendChild(nameCont);
        row.appendChild(surnameCont);
        row.appendChild(emailCont);        
        row.appendChild(phoneCont);                
        row.appendChild(editCont);
        row.appendChild(delCont);
        table.appendChild(tbody);
        tbody.appendChild(row);
        
    }
    
    tableContactsDiv.innerHTML = "<h1>TABELLA CONTATTI</h1>";
    tableContactsDiv.appendChild(table);
}

function addContact() {
    var formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("d-none");

    var submitButton = document.getElementById("submitButton");
    submitButton.value = "Aggiungi";

    var floatingName = document.getElementById("floatingName");
    var floatingSurname = document.getElementById("floatingSurname");
    var floatingEmail = document.getElementById("floatingEmail");
    var floatingPhone = document.getElementById("floatingPhone");
    
    floatingName.value = "";
    floatingSurname.value = "";
    floatingEmail.value = "";
    floatingPhone.value = "";

    submitButton.onclick = () => {

        var persona = {
            nome : floatingName.value,
            cognome : floatingSurname.value,
            email : floatingEmail.value,
            telefono : floatingPhone.value
        }
        data.push(persona);
        formContainer.classList.add("d-none");
        updateLocalS(data);
    }
};

function updateContact(nome, cognome, email, telefono,index) {
    var formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("d-none");

    var submitButton = document.getElementById("submitButton");
    submitButton.value = "Modifica";

    var floatingName = document.getElementById("floatingName");
    var floatingSurname = document.getElementById("floatingSurname");
    var floatingEmail = document.getElementById("floatingEmail");
    var floatingPhone = document.getElementById("floatingPhone");

    floatingName.value = nome;
    floatingSurname.value = cognome;
    floatingEmail.value = email;
    floatingPhone.value = telefono;

    console.log(data[index])

    document.getElementById("submitButton").onclick = function () {
        
        data[index] = {
            nome : floatingName.value,
            cognome : floatingSurname.value,
            email : floatingEmail.value,
            telefono : floatingPhone.value
        }
        formContainer.classList.add("d-none");
        updateLocalS(data);
        
    };
}

function deleteContact(index) {
    var  contact = data.indexOf(index);
    console.log(index);
    data.splice(contact, 1);
    updateLocalS(data);
}

function updateLocalS(currentData) {
    localStorage.setItem("data", JSON.stringify(currentData));
    createTable();
}

window.addEventListener("DOMContentLoaded", createTable());

