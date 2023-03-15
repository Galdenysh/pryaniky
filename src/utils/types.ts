export interface IResponse {
  error_code: number;
  error_message: string;
  data: IData[];
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
