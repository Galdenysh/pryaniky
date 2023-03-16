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

export interface IResponseSet extends IResponse {
  data: IData;
}

export interface ISetData {
  documentStatus?: string;
  employeeNumber?: string;
  documentType?: string;
  documentName?: string;
  companySignatureName?: string;
  employeeSignatureName?: string;
  employeeSigDate?: string;
  companySigDate?: string;
}

export interface IData extends ISetData {
  id?: string;
}

export interface ILoginData {
  username: string, 
  password: string
}
