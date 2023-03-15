export interface IResponse {
  error_code: number;
  error_message: string;
}

export interface IResponseData extends IResponse {
  data: IData[];
}

export interface IResponseToken extends IResponse {
  data: { token: string };
}

export interface IData {
  id?: string;
  documentStatus?: string;
  employeeNumber?: string;
  documentType?: string;
  documentName?: string;
  companySignatureName?: string;
  employeeSignatureName?: string;
  employeeSigDate?: string;
  companySigDate?: string;
}

export interface ILoginData {
  username: string, 
  password: string
}
