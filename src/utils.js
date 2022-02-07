export const BASE_URL = 'https://contacts-telran.herokuapp.com';
export class Contact {
    constructor(address, description, email, id, lastName, name, phone) {
        this.address = address
        this.description = description
        this.email = email
        this.id = id
        this.lastName = lastName
        this.name = name
        this.phone = phone;
    }
}
let user = {
    email: '',
    password: ''
}
export default user;




























// function updateExistСontact(number) {
//     arrContacts[number] = new Contact(address, description, email, arrContacts[number].id, lastName, name, phone);
//     contact = arrContacts[number];
//     let token = localStorage.getItem('token');
//     fetch(`${BASE_URL}/api/contact`, {
//         method: 'PUT',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': token
//         },
//         body: JSON.stringify(contact)
//     })
//         .then(response => {
//             let status = response.status
//             return response.json()
//         .then(body => {
//             switch(status) {
//                 case 200: wrapper.innerHTML = contactBookTemplate(arrContacts, addContactTemplate()); break;
//                 case 400: case 401: case 404: wrapper.innerHTML = contactBookTemplate(arrContacts, arrContacts); break;
//             }
//         })    
//     })
// }

