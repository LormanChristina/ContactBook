import './styles/style.css';
import user, { BASE_URL, Contact } from './utils';
import { regLogInTemplate, regErrorForm, contactBookTemplate, infoInputsSection, addContactTemplate, rowsOfInfoContact, loaderTemplate, recommendationsForUser } from './temp';

const wrapper = document.querySelector("#root");
wrapper.innerHTML = regLogInTemplate(recommendationsForUser());

let name, lastName, email, phone, address, description, number;
let arrContacts = [];

wrapper.onclick = function (e) {
    switch (e.target.id) {
        case "regBtn": registrationSubmit(); break;
        case "logInBtn": logInSubmit(); break;
        case "addContactBtn": wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection()); break;
        case "saveBtn": if (localStorage.getItem('num')) { 
                        operationsWithContacts('PUT', number);
                        } else {
                            contactBookTemplate(arrContacts, operationsWithContacts('POST'));
                        } break;
        case "cancelBtn": wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection()); break;
        case "editBtn": wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection(arrContacts[number])); localStorage.setItem('num', number); copyInfo(number); break;
        case "deleteBtn": deleteContactbyId(arrContacts[number].id); break;
        case "deleteAll": deleteAllContacts(); break;
        case "logOut": localStorage.removeItem('token'); localStorage.removeItem('num'); wrapper.innerHTML = regLogInTemplate(recommendationsForUser()); break;
        case "arrow-btn": wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate());
    }
    if(e.target.hasAttribute('val')) {
        number = parseInt(e.target.parentElement.id); wrapper.innerHTML = contactBookTemplate(arrContacts, rowsOfInfoContact(arrContacts[number]));
    } 
}

wrapper.onchange = function userInfo(e) {
    switch (e.target.id) {
        case "email": user.email = e.target.value; break;
        case "password": user.password = e.target.value; break;
        case "firstName": name = e.target.value; break;
        case "lastName": lastName = e.target.value; break;
        case "emailOfContact": email = e.target.value; break;
        case "phone": phone = e.target.value; break;
        case "address": address = e.target.value; break;
        case "description": description = e.target.value; break;
    }
}

function copyInfo (number) {
    name = arrContacts[number].name
    lastName = arrContacts[number].lastName
    email = arrContacts[number].email
    phone = arrContacts[number].phone
    address = arrContacts[number].address
    description = arrContacts[number].description
}


async function registrationSubmit() {
    loaderTemplate();
    try {
        const response = await fetch(`${BASE_URL}/api/registration`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(user)
        })
        const body = await response.json();
        switch (response.status) {
            case 200: wrapper.innerHTML = contactBookTemplate('', addContactTemplate()); break;
            case 400: case 409: wrapper.innerHTML = regLogInTemplate(regErrorForm(body.message), user); break;
        }
        localStorage.setItem('token', body.token)
    } catch (err) {
        wrapper.innerHTML = regLogInTemplate(regErrorForm("An error occured, please try again."), user);
    }
}

async function logInSubmit() {
    loaderTemplate();
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(user)
        });
        const body = await response.json()
        switch (response.status) {
            case 200: localStorage.setItem('token', body.token); await toGetAllContacts(); wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate()); break;
            case 400: case 401: wrapper.innerHTML = regLogInTemplate(regErrorForm(body.message), user); break;
        }
    } catch (err) {
        wrapper.innerHTML = regLogInTemplate(regErrorForm("An error occured, please try again."), user);
    }
}

async function toGetAllContacts() {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/api/contact`, {
            headers: { 'Authorization': token }
        })
        const body = await response.json();
        switch (response.status) {
            case 200: arrContacts = body.contacts; break;
            case 401: wrapper.innerHTML = contactBookTemplate(body.message, addContactTemplate()); break;
        }
    } catch (err) {
        wrapper.innerHTML = regLogInTemplate(regErrorForm("An error occured, please try again."));
    }
}

async function operationsWithContacts(myMethod, number) {
    let contact;
    loaderTemplate();
    if (myMethod == 'POST') {
        contact = new Contact(address, description, email, arrContacts.length > 0 ? arrContacts.length : 0, lastName, name, phone);
    } else if (myMethod == 'PUT') {
        arrContacts[number] = new Contact(address, description, email, arrContacts[number].id, lastName, name, phone);
        contact = arrContacts[number];
    }
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/api/contact`, {
            method: myMethod,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            body: JSON.stringify(contact)
        })
        const body = await response.json();
        switch (myMethod) {
            case 'POST':
                switch (response.status) {
                    case 200: contact.id = body.id; arrContacts.push(contact); wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection()); break;
                    case 400: case 401: case 409: wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection(contact, regErrorForm(body.message))); break;
                    case 500: throw new Error();
                } break;
            case 'PUT':
                switch (response.status) {
                    case 200: wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate()); localStorage.removeItem('num'); break;
                    case 400: case 401: case 404: wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection(contact, regErrorForm(body.message))); break;
                    case 500: throw new Error();
                } break;
        }
    } catch (err) {
        wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection(contact, regErrorForm("Email and phone must be unique!")));
    }
}

function deleteContact(id) {
    for (let i = 0; i < arrContacts.length; i++) {
        if (arrContacts[i].id == id) {
            arrContacts.splice(i, 1);
            wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate());
        }
    }
}

async function deleteContactbyId(id) {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/api/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        const body = await response.json();
        switch (response.status) {
                case 200: deleteContact(id); break;
                case 400: case 401: case 404: wrapper.innerHTML = contactBookTemplate(arrContacts, infoInputsSection(arrContacts[number]), body.message); break;
            }
    } catch (err) {
        wrapper.innerHTML = contactBookTemplate(arrContacts, rowsOfInfoContact(arrContacts[number]), regErrorForm("An error occured, please try again."));
    }
}

async function deleteAllContacts() {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`${BASE_URL}/api/clear`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        const body = await response.json()
        switch (response.status) {
            case 200: arrContacts.splice(0, arrContacts.length); wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate()); break;
            case 401: wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate(), regErrorForm(body.message)); break;
        }
    } catch (err) {
        wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate(), regErrorForm("An error occured, please try again."));
    }
}

function parseJSON() {
    return new Promise((resolve) => response,json()
        .then((body) => resolve({
            status: response.status,
            ok: response.ok,
            body
        })))
}

function request () {
    let token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token
            },
            body: JSON.stringify(contact)
        })
        .then(parseJSON)
        .then((response) => {
            if(response.ok) {
                return resolve(response.body)
            }
            return reject(response.body.message)
        })
    })
}

export default wrapper;








