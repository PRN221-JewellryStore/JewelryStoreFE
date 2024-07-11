import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Product/getall`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const createProduct = async (
  cost,
  weight,
  quantity,
  description,
  categoryID
) => {
  try {
    const response = await axios.post(`${baseUrl}/api/Product/create`, {
      Cost: cost,
      Weight: weight,
      Quantity: quantity,
      Description: description,
      CategoryID: categoryID,
    });
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const updateProduct = async (
  id,
  cost,
  weight,
  quantity,
  description,
  categoryID
) => {
  try {
    const response = await axios.patch(`${baseUrl}/api/Product/update/${id}`, {
      Cost: cost,
      Weight: weight,
      Quantity: quantity,
      Description: description,
      CategoryID: categoryID,
    });
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/Product/delete/${id}`);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};
