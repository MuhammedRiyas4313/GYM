import { axiosTrainerInstance } from "../../axios";

export const trainerRegister = async (value) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post(
      "/register",
      value,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const TrainerLogin = async (value) => {
  console.log(value,'login values...in trainer')
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post("/login", value, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const TrainerLoginWithGoogle = async (email) => {
  const value = {
    email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post(
      "/loginwithgoogle",
      value,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainerDetails = async (token, trainerId) => {
  
  try {
    console.log("token..", token);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
    const response = await axiosTrainerInstance.get(`/trainerdetails?trainerId=${trainerId}`, config );
    return response;
  } catch (error) {
    console.log(error.message,"error in getTrainerDetails......");
  }
};

export const addCourse = async (token, value) => {
  console.log("token..", token);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post(
      "/addcourse",
      value,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTrainerCourseList = async (token, trainerId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/courses?trainerId=${trainerId}`,
      config
    );
    return response;
  } catch (error) {
    console.log("error in getTrainerDetails ......");
  }
};

export const getTrainerClientList = async (token, trainerId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/clients?trainerId=${trainerId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getClientDetails = async (token, clientId, courseId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/client/details?clientId=${clientId}&courseId=${courseId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const updateProfileImage = async (token, values) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.patch(
      `/updateprofileImage`,
      values,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const updateProfile = async (token, values) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.patch(
      `/updateprofile`,
      values,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getWallet = async (userId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/wallet?userId=${userId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getTransactions = async (token, userId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/transactions?userId=${userId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const registerAttendance = async (token, data) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post(
      `/attendance`,
      data,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};

export const getUserProgress = async (token, clientId, courseId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/clientprogress?clientId=${clientId}&courseId=${courseId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getUserProgress ......");
  }
};

export const getClientAttendance = async (token, clientId, courseId) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/client/attendance?clientId=${clientId}&courseId=${courseId}`,
      config
    );
    return response;
  } catch (error) {
    console.log(error.message, "error in getTrainerDetails ......");
  }
};
