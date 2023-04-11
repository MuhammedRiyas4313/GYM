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

