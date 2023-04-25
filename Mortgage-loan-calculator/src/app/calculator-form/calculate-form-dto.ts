export interface CalculateFormDto {

  id?: any;
  homePrice?: any;
  monthlyFamilyIncome?: any;
  loanTerm?: any;
  familyMembers?: any;
  haveChildren?: any;
  city?: any;
  
}
export interface CalculateResultsDto {
  id?: any;
  maxLoan?: any;
  totalInterestPaid?: any;
  agreementFee?: any;
  totalPaymentSum?: any;
  // calculateForm?: any;
}

