import { CalculateFormDto } from "./calculator-form/calculate-form-dto";

export interface Customer {
  name: string;
  id: string;
  phoneNumber: string;
  email: string;
  ipAddress: string;
  time: Date;
  action: string;
  calculateForm: CalculateFormDto;
}
