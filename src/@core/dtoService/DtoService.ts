const BASE_URL = 'https://api.summafx.com/swagger/v1/swagger.json';

export const fetchAllSchemas = async ({dto}:{dto: string}) => {
    const response = await fetch(BASE_URL, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Error al obtener el esquema: ${response.statusText}`);
    }
    const data = await response.json();
    const schemas = data.components?.schemas[dto];
    if (!schemas) {
        throw new Error('No se encontraron schemas en la documentación Swagger');
    }
    return schemas;
};
