import axios, { AxiosError } from 'axios';

export const fetcher = async (url:string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err: AxiosError | unknown) {
      if (err !== undefined && err instanceof AxiosError) {
      throw err.response?.data;
    }
  };
  }