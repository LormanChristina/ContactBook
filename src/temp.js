import 'bootstrap/dist/css/bootstrap.min.css';
import wrapper from '.';

export function regLogInTemplate(errors = '', user = '') {
    return (
        `<div>
            <header class="d-flex justify-content-between m-auto"><h1 class="text-uppercase">Contact book</h1></header>
            <div class="form borders br w-50 mx-auto my-3 p-3">
                <h2 class="text-center">Log In / Registration</h2>
                <label for="basic-url" class="form-label">Email:</label>
                <div class="input-group">
                    <input type="text" value="${user.email || ''}" class="form-control bg br" id="email" placeholder=" Enter your email"/>
                </div>
                <label for="basic-url" class="form-label mt-2">Password:</label>
                <div class="input-group">
                    <input type="password" value="${user.password || ''}" class="form-control bg br" id="password" placeholder=" Enter your password"/>
                </div>
                ${errors}
                <div class="buttons d-flex justify-content-around w-50 m-auto">
                    <button id="logInBtn" class="buttons br bg ms-2">Log In</button>
                    <button id="regBtn" class="buttons br bg me-2">Registration</button>
                </div>
            </div>
        </div>`
    )
}

export function regErrorForm(message) {
    return (
        `<div class="p-2 errorSection my-2 d-flex br">
            <p class="text-start m-0">${message}</p>
         </div>`
    )
}

export function contactBookTemplate(contactsCads = "", rightSection = "", message="") {
    return (
        `<div>
            <header class="d-flex justify-content-between m-auto">
                <h1 class="text-uppercase">Contact book</h1>
                <button id="logOut" class="buttons bg br my-auto">Log Out</button>
            </header>
            <div class="main_section mt-2 d-flex justify-content-between">
                ${contactsCads.length == 0 ? `<div class="contactsList"><h2 class="text-center">Empty contact book</h2></div>` : 
                    `<div class="contactsList borders d-flex flex-column br">
                        <button id="deleteAll" class="buttons bg br mx-auto my-2 w-50">Delete all contacts</button>
                        ${message}
                        ${contactsCads.map((c, i) => cardTemplate(c, i)).join(' ')}
                    </div>`}
                    ${rightSection}
            </div>
        </div>`
    )
}

export function cardTemplate(contact, index) {
    return (
        `<div class="cardContact br py-2 px-3" id=${index}>
            <h2 class="card-title" val="card">${index + 1}. ${contact.name}</h2>
            <h4 class="card-subtitle text-muted" val="card">${contact.phone}</h4>
            <p class="card-text" val="card">${contact.address}</p> 
        </div>`
    )
}

export function infoInputsSection(contact='', message='') {
    return (
        `<div class="contactsForm borders br">
            <button id="arrow-btn"></button>
            <div class="info_section w-75 m-auto">
                <div class="buttons d-flex justify-content-center my-2">
                    <button id="saveBtn" class="buttons bg br mx-2">Save</button>
                    <button id="cancelBtn" class="buttons bg br mx-2">Cancel</button>
                </div>
                <div>
                    ${message}
                    <label for="basic-url" class="form-label m-0">First name:</label>
                    <div class="input-group">
                        <input type="text" style="height: 30px;" class="form-control bg br" id="firstName" placeholder=" Enter First name" value=${contact.name ? contact.name : ''}>
                    </div>
                    <label for="basic-url" class="form-label pt-3 m-0">Last name:</label>
                    <div class="input-group">
                        <input type="text" style="height: 30px;" class="form-control bg br" id="lastName" placeholder=" Enter Last name" value=${contact.lastName ? contact.lastName : ''}>
                    </div>
                    <label for="basic-url" class="form-label pt-3 m-0">Email:</label>
                    <div class="input-group">
                        <input type="text" style="height: 30px;" class="form-control bg br" id="emailOfContact" placeholder=" Enter email" value=${contact.email ? contact.email : ''}>
                    </div>
                    <label for="basic-url" class="form-label pt-3 m-0">Phone:</label>
                    <div class="input-group">
                        <input type="number" style="height: 30px;" class="form-control bg br" id="phone" placeholder=" Enter telephone number" value=${contact.phone ? contact.phone : ''}>
                    </div>
                    <label for="basic-url" class="form-label pt-3 m-0">Address:</label>
                    <div class="input-group">
                        <input type="text" style="height: 30px;" class="form-control bg br" id="address" placeholder=" Enter address" value=${contact.address ? contact.address : ''}>
                    </div>
                    <label for="basic-url" class="form-label pt-3 m-0 br">Description:</label>
                    <div class="form-floating py-2">
                        <textarea class="form-control bg" placeholder="Enter description of contact" id="description">${contact.description ? contact.description : ''}</textarea>
                    </div>
                </div>
            </div>
        </div>`
    )
}

export function addContactTemplate() {
    return (
        `<div class="d-flex justify-content-center contactsForm">
            <button id="addContactBtn" class="buttons br bg my-2">Add New Contact</button>
        </div>`
    )
}

export function rowsOfInfoContact(contact) {
    return (
        `<div class="contactsForm">
            <div class="info_section w-75 m-auto borders br">
                <div class="buttons d-flex justify-content-center my-2">
                    <button id="editBtn" class="buttons br bg mx-2">Edit</button>
                    <button id="deleteBtn" class="buttons br bg mx-2">Delete</button>
                </div>
                <div class="d-flex flex-column text-md my-2 w-75 m-auto">
                    <p class="headerColor">First name: <span style="color:aqua">${contact.name}</span></p>
                    <p class="headerColor">Last name: <span  style="color:aqua">${contact.lastName}</span></p>
                    <p class="headerColor">Email: <span style="color:aqua">${contact.email}</span></p>
                    <p class="headerColor">Phone: <span style="color:aqua">${contact.phone}</span></p>
                    <p class="headerColor">City: <span style="color:aqua">${contact.address}</span></p>
                    <div>
                        <label for="basic-url" class="form-label headerColor">Description: </label>
                        <p class="desc">${contact.description || ' - '}</p>
                    </div>
                </div>
            </div>
        </div>`
    )
}

export function recommendationsForUser() {
    return (
        `<div class="regErrorForm py-2">
            <ul class="requirementList mt-2 br py-2">
                <li>Email must contains one @ and minimum 2 symbols after last dot</li>
                <li>Password must contain at least one uppercase and one lowercase letters!</li>
                <li>Password must contain at least one digit!</li>
                <li>Password must contain at least one special symbol from [‘$’, ’~’, ’-‘, ’_’]!</li>
            </ul>
        </div>`
    )
}

export function loaderTemplate() {
    wrapper.innerHTML =  `<div class="d-flex justify-content-center">
                            <h3>
                                <span class="let1 loader">l</span>  
                                <span class="let2 loader">o</span>  
                                <span class="let3 loader">a</span>  
                                <span class="let4 loader">d</span>  
                                <span class="let5 loader">i</span>  
                                <span class="let6 loader">n</span>  
                                <span class="let7 loader">g</span>  
                            </h3>
                        </div>`
}
