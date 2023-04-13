
import { axiosClientInstance } from '../../axios';

  export const clientRegister = async (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post('/register', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('error in clientRegister service')
    }
  };

  export const ClientLogin = async ( values ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post('/login',values,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

  export const ClientLoginWithGoogle = async ( email ) => {

    const values = {
      email
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post('/loginwithgoogle',values,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }

  export const ClientOtpConfirmation = async (values,id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post(`/verifyotp?userId=${id}`,values,config)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }
  export const ClientResendOtp = async (values,id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post(`/resendotp?userId=${id}`,values,config)
      return response;
    } catch (error) {
      console.log('error in resend otp ......')
    }
  }