import { axiosClientInstance } from "../../axios";

export const createConversation = async (trainerId, clientId) => {
    const value = {
      trainerId,
      clientId,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosClientInstance.post("/chat", value, config);
      return response.data;
    } catch (error) {
      console.log(error.message, "error in conversation creation api trainer");
    }
  };
  
  export const getConversation = async (clientId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosClientInstance.get(
        `/chat?clientId=${clientId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axiosClientInstance.get(
        `/chat/user?userId=${userId}`,
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
      const response = await axiosClientInstance.get(
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
      const response = await axiosClientInstance.post(
        "/chat/message",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.message, "from getMessages trainer");
    }
  };
  