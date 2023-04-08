import { axiosTrainerInstance } from "../../axios";

export const trainerRegister = async (value) => {
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.post('/register', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const TrainerLogin = async (value) => {
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.post('/login', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const TrainerLoginWithGoogle = async (value) => {
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.post('/loginwithgoogle', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

