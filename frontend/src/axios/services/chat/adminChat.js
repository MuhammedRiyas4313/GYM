import { axiosAdminInstance } from "../../axios";

export const createConversation = async (adminId,trainerId) => {
    const value = {
        adminId,
        trainerId,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosAdminInstance.post("/chat", value, config);
      return response.data;
    } catch (error) {
      console.log(error.message, "error in conversation creation api trainer");
    }
  };
  
  export const getConversation = async (adminId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosAdminInstance.get(
        `/chat?adminId=${adminId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getUser = async (trainerId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosAdminInstance.get(
        `/chat/user?trainerId=${trainerId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getMessages = async (conversationId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosAdminInstance.get(
        `/chat/messages?conversationId=${conversationId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.message, "from getMessages trainer");
    }
  };
  
  export const saveMessage = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosAdminInstance.post(
        "/chat/message",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.message, "from getMessages trainer");
    }
  };
  