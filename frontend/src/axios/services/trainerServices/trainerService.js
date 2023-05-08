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

  export const TrainerLoginWithGoogle = async (email) => {

   const value = {
      email
    }
  
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

  export const getTrainerDetails = async (trainerId) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
      try {
        const response = await axiosTrainerInstance.get(`/trainerdetails?trainerId=${trainerId}`,config)
        return response;
      } catch (error) {
        console.log('error in client login......')
      }
  }


  export const addCourse = async (value) => {
  console.log('add course api')
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.post('/addcourse', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  export const getTrainerCourseList = async (trainerId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/courses?trainerId=${trainerId}`,config)
      return response;
    } catch (error) {
      console.log('error in getTrainerDetails ......')
    }
  }

  export const getTrainerClientList = async (trainerId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/clients?trainerId=${trainerId}`,config)
      return response;
    } catch (error) {
      console.log(error.message,'error in getTrainerDetails ......')
    }
  }

  export const getClientDetails = async (clientId,courseId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/client/details?clientId=${clientId}&courseId=${courseId}`,config)
      return response;
    } catch (error) {
      console.log(error.message,'error in getTrainerDetails ......')
    }
  }

  export const updateProfileImage = async (values) => {
    const config = {
      headers: {
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
  
  export const updateProfile = async (values) => {
    console.log(values,'values from the updateProfile')
    const config = {
      headers: {
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
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/wallet?userId=${userId}`,config)
      return response;
    } catch (error) {
      console.log(error.message,'error in getTrainerDetails ......')
    }
  }

  export const getTransactions = async (userId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosTrainerInstance.get(`/transactions?userId=${userId}`,config)
      return response;
    } catch (error) {
      console.log(error.message,'error in getTrainerDetails ......')
    }
  }