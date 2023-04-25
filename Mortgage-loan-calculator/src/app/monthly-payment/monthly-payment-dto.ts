export interface MonthlyPaymentDto {
    id?: any;
    partnerToggle?: boolean;
    dealAmount?: any;
    downPayment?: any;
    loanPeriod?: any;
}

export interface MonthlyPaymentResultsDto{
    estimatedMonthlyPayment?: any;
    maxMonthlyPayment?: any;

}
