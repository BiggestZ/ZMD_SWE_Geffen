import axios, {
    AxiosRequestConfig,
    Method,
  } from 'axios';
  
  
  export const makeAxiosRequestConfig = (
    method: Method,
    path: string,
    data?: { [key: string]: any },
    params?: any
  ): AxiosRequestConfig => {
    let headers: AxiosRequestConfig['headers'] = {};
    let formData: FormData | undefined = undefined;
  
    if (data) {
      headers['Content-Type'] = 'multipart/form-data';
      formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        // HACK - make type happy…
        const hackVal = val as string | File;
        formData.append(key, hackVal);
      });
    }
  
    return {
      method,
      url: `http://localhost:3000/${path}`,
      data: formData,
      params,
      headers,
    };
  };