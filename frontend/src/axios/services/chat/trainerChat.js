import { axiosTrainerInstance } from "../../axios";

export const createConversation = async (trainerId,clientId) => {

    const value = {
        trainerId,
        clientId
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.post('/chat', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

export const getConversation = async (trainerId) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/chat?trainerId=${trainerId}`, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };