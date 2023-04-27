export interface CalculateFormDto {
  id?: any;
  homePrice?: any;
  monthlyFamilyIncome?: any;
  loanTerm?: any;
  familyMembers?: any;
  haveChildren?: any;
  detailedFormDto?: DetailedFormDto;

}
export interface CalculateResultsDto {
  id?: any;
  maxLoan?: any;
  totalInterestPaid?: any;
  agreementFee?: any;
  totalPaymentSum?: any;
  // calculateForm?: any;
}

export interface DetailedFormDto {
  city?: any;
  buyOption?: any;
  studentLoan?: any;
  otherLoan?: any;
  politicalyExposed?: any;
}
