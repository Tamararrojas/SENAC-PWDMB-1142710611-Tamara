
function getProperties() {
    const propertiesString = localStorage.getItem('properties');
    return propertiesString ? JSON.parse(propertiesString) : {};
}

function saveProperties(properties) {
    localStorage.setItem('properties', JSON.stringify(properties));
}

function addProperty() {
    const propertyNameInput = document.getElementById('propertyName');
    const propertyValueInput = document.getElementById('propertyValue');
    const propertyTypeInput = document.getElementById('propertyType');
    const propertyPurchaseDateInput = document.getElementById('propertyPurchaseDate');
    const propertyDetailsInput = document.getElementById('propertyDetails');
    const propertyList = document.getElementById('propertyList');

    const newPropertyName = propertyNameInput.value.trim();
    const newPropertyValue = propertyValueInput.value.trim();
    const newPropertyType = propertyTypeInput.value.trim();
    const newPropertyPurchaseDate = propertyPurchaseDateInput.value;
    const newPropertyDetails = propertyDetailsInput.value.trim();

    if (newPropertyName !== '' && newPropertyValue !== '' && newPropertyType !== '' && newPropertyPurchaseDate !== '') {
        const properties = getProperties();

        // Adiciona todas as informações ao criar uma nova propriedade
        properties[newPropertyName] = {
            value: newPropertyValue,
            type: newPropertyType,
            purchaseDate: newPropertyPurchaseDate,
            details: newPropertyDetails
        };

        saveProperties(properties);
        displayProperties();
        // Limpa os campos de entrada
        propertyNameInput.value = '';
        propertyValueInput.value = '';
        propertyTypeInput.value = '';
        propertyPurchaseDateInput.value = '';
        propertyDetailsInput.value = '';
    }
}

function editProperty(propertyName) {
    const properties = getProperties();
    const currentProperty = properties[propertyName];

    // Solicita as novas informações
    const newPropertyValue = prompt(`Digite o novo valor para ${propertyName}:`, currentProperty.value);
    const newPropertyType = prompt(`Digite o novo tipo para ${propertyName}:`, currentProperty.type);
    const newPropertyPurchaseDate = prompt(`Digite a nova data de compra para ${propertyName}:`, currentProperty.purchaseDate);
    const newPropertyDetails = prompt(`Digite os novos detalhes para ${propertyName}:`, currentProperty.details);

    // Atualiza as informações se não for cancelado
    if (newPropertyValue !== null && newPropertyType !== null && newPropertyPurchaseDate !== null && newPropertyDetails !== null) {
        currentProperty.value = newPropertyValue;
        currentProperty.type = newPropertyType;
        currentProperty.purchaseDate = newPropertyPurchaseDate;
        currentProperty.details = newPropertyDetails;

        saveProperties(properties);
        displayProperties();
    }
}

function deleteProperty(propertyName) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a propriedade "${propertyName}"?`);
    if (confirmDelete) {
        const properties = getProperties();
        delete properties[propertyName];
        saveProperties(properties);
        displayProperties();
    }
}

function displayProperties() {
    const propertyList = document.getElementById('propertyList');
    const properties = getProperties();

    // Ordena as propriedades por nome
    const sortedProperties = Object.keys(properties).sort();

    // Limpa a lista antes de exibir as propriedades novamente
    propertyList.innerHTML = '';

    sortedProperties.forEach(propertyName => {
        const currentProperty = properties[propertyName];
        const listItem = document.createElement('li');
        listItem.textContent = `${propertyName}: Valor: R$${currentProperty.value} | Tipo: ${currentProperty.type} | Data de Compra: ${currentProperty.purchaseDate} | Detalhes: ${currentProperty.details}`;

        // Adiciona botões de edição, adição de detalhes e exclusão para cada propriedade
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editProperty(propertyName));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteProperty(propertyName));

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        propertyList.appendChild(listItem);
    });
}

document.getElementById('addPropertyButton').addEventListener('click', addProperty);

displayProperties();
