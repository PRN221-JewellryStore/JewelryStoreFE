import axios from "axios";
const baseUrl = "https://localhost:7000";

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/User/getAll`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/User/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const updateUser = async (
  id,
  username,
  password,
  fullName,
  email,
  phoneNumber,
  address,
  point,
  roleID
) => {
  try {
    const response = await axios.patch(`${baseUrl}/api/User/update/${id}`, {
      Username: username,
      Password: password,
      FullName: fullName,
      Email: email,
      PhoneNumber: phoneNumber,
      Address: address,
      Point: point,
      RoleID: roleID,
    });
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/User/delete/${id}`);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    throw new CustomError(error.response.status, error.response.data.errors);
  }
};
