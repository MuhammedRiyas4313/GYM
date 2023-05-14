import { axiosAdminInstance } from "../../axios";

export const AdminLogin = async (values) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.post("/login", values, config);
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getTrainers = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get("/trainerslist", config);
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const changeBlockStatus = async (token,currentStatus, trainerId) => {
  const values = {
    currentStatus,
    trainerId,
  };
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.patch(
      "/trainerblockstatus",
      values,
      config
    );
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getNotifications = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get("/notifications", config);
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getTrainerDetails = async (token,trainerId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/trainerdetails?trainerId=${trainerId}`,
      config
    );
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const verifyTrainer = async (token,trainerId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.patch(
      `/verifytrainer?trainerId=${trainerId}`,
      config
    );
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getClients = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get("/clients", config);
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getUserDetails = async (token,userId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/clientdetails?userId=${userId}`,
      config
    );
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getCourses = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get("/courses", config);
    return response;
  } catch (error) {
    console.log("error in client login......");
  }
};

export const getTransactions = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(`/transactions`, config);
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getTransactionClients = async (token,clientId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/transaction/clients?clientId=${clientId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getTransaction = async (token,transactionId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/transaction?transactionId=${transactionId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getWallet = async (token,adminId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/wallet?adminId=${adminId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getUsersCount = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/usercount`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getUserCount graph ......");
  }
};

export const getPresentCount = async (token) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosAdminInstance.get(
      `/presentcount`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in presentcount graph ......");
  }
};
