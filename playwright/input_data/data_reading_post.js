const fs = require('fs');
const path = require('path');

const getRandomValueFromApi = async (url, key) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data)) {
            throw new Error('Los datos obtenidos no son un array.');
        }
        
        if (!(key in data[0])) {
            throw new Error(`La clave "${key}" no existe en los datos.`);
        }
        
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomValue = data[randomIndex][key].toString();
        
        return randomValue;
        
    } catch (error) {
        console.error('Error al realizar la petición:', error.message);
    }
};

function getRandomValueFromJson(fileName, key) {
    try {
        const filePath = path.join(__dirname, '../data', fileName);
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        
        // Handle array of objects structure
        if (Array.isArray(jsonData)) {
            const randomIndex = Math.floor(Math.random() * jsonData.length);
            if (key in jsonData[randomIndex]) {
                return jsonData[randomIndex][key];
            }
            throw new Error(`Key "${key}" not found in JSON array objects`);
        }
        
        // Original object handling
        if (!jsonData.hasOwnProperty(key)) {
            throw new Error(`Key "${key}" not found in JSON file.`);
        }
        
        const keyData = jsonData[key];
        if (Array.isArray(keyData)) {
            return keyData[Math.floor(Math.random() * keyData.length)];
        }
        return keyData;
    } catch (error) {
        throw new Error(`Error processing JSON file: ${error.message}`);
    }
}

module.exports = { getRandomValueFromJson, getRandomValueFromApi };