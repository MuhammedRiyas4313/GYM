import { axiosAdminInstance } from "../../axios";

export const AdminLogin = async ( values ) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.post('/login',values,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

export const getTrainers = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.get("/trainerslist",config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

export const changeBlockStatus = async (currentStatus,trainerId) => {
  const values = {
    currentStatus,
    trainerId
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.patch("/trainerblockstatus",values,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

export const getNotifications = async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.get("/notifications",config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

export const getTrainerDetails = async (trainerId) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.get(`/trainerdetails?trainerId=${trainerId}`,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

export const verifyTrainer = async (trainerId) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.patch(`/verifytrainer?trainerId=${trainerId}`,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }


export const getClients = async () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    try {
      const response = await axiosAdminInstance.get('/clients',config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

  export const getUserDetails = async (userId) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
      try {
        const response = await axiosAdminInstance.get(`/clientdetails?userId=${userId}`,config)
        return response;
      } catch (error) {
        console.log('error in client login......')
      }
    }
