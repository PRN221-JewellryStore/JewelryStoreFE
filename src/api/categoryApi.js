import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Category/getall`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const getCategory = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/Category/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const createCategory = async (name) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Name", name);
    const response = await axios.post(
      `${baseUrl}/api/Category/Create`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const updateCategory = async (id, name) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Name", name);
    newFormData.append("ID", id);
    const response = await axios.patch(
      `${baseUrl}/api/Category/update/${id}`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};
