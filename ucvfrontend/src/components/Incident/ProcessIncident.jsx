import axios from 'axios';
import { getAuthHeader } from '../../Utils/Auth';

export const getAllDeparments = async () => {
  try {
    const response = await axios.get("https://herramientas-ucv-19.onrender.com/api/ucv/deparmentList", {
      headers: getAuthHeader(),
    });
    console.log("Departamentos recibidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    return [];
  }
};


export const getAllCategories = async () => {
  try {
    const response = await axios.get("https://herramientas-ucv-19.onrender.com/api/ucv/categoryList", {
      headers: getAuthHeader(),
    });
    console.log("Categorías recibidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};



export const registerIncident = async (incidentData) => {
  try {
    const response = await axios.post("https://herramientas-ucv-19.onrender.com/api/ucv/createIncident", incidentData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar la incidencia:", error);
    throw error;
  }
};

// Consultar por ID
export const getIncidentById = async (id) => {
  const response = await axios.get(`https://herramientas-ucv-19.onrender.com/api/ucv/getAllIncidents`, {
    headers: getAuthHeader(),
  });
  return response.data.find(incident => String(incident.id) === String(id));
};

// Actualizar incidencia
export const updateIncident = async (id, data) => {
  await axios.put(`https://herramientas-ucv-19.onrender.com/api/ucv/incidentUpdate/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
};

// Eliminar incidencia
export const deleteIncident = async (id) => {
  await axios.delete(`https://herramientas-ucv-19.onrender.com/api/ucv/incidentDelete/${id}`, {
    headers: getAuthHeader(),
  });
};

export const excelDownload = async () => {
  try {
    const response = await axios.post("https://herramientas-ucv-19.onrender.com/api/ucv/incidentExcel", {},{
      headers: getAuthHeader(),
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Error al descargar el archivo Excel:", error);
  }
}

export const pdfDownload = async () => {
  try {
    const response = await axios.post("https://herramientas-ucv-19.onrender.com/api/ucv/incidentPDF", {},{
      headers: getAuthHeader(),
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error("Error al descargar el archivo PDF:", error);
  }
}