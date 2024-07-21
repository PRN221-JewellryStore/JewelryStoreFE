import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getAllPromotions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/Promotion/getall`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const createPromotion = async (
  description,
  condition,
  reduce,
  max,
  expire
) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Description", description);
    newFormData.append("ConditionsOfUse", condition);
    newFormData.append("ReducedPercent", reduce);
    newFormData.append("MaximumReduce", max);
    newFormData.append("ExpiresTime", expire);
    const response = await axios.post(
      `${baseUrl}/api/Promotion/create`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const updatePromotion = async (
  id,
  description,
  condition,
  reduce,
  max,
  expire
) => {
  try {
    let newFormData = new FormData();
    newFormData.append("Description", description);
    newFormData.append("ConditionsOfUse", condition);
    newFormData.append("ReducedPercent", reduce);
    newFormData.append("MaximumReduce", max);
    newFormData.append("ExpiresTime", expire);
    const response = await axios.patch(
      `${baseUrl}/api/Promotion/update/${id}`,
      newFormData
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const removePromotion = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/Promotion/delete/${id}`
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};
