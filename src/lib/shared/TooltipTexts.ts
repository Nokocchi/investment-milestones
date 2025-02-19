import { roundAndFormat } from "./utils";

export const tooltipText_EarnPerHour = () => {
    return "Assuming 40 hours of work per week, and 46 work hours per year, you work 1840 hours per year. Assuming your current annual interest is earned in similar 1840 one-hour increments, this value shows how much you earn from interest per work hour.";
}

export const tooltipText_plannedRetirementText = (coastFromDate?: Date) => {
    return "When you want to retire. Your investments are simulated until this date" + (coastFromDate ? `. You have selected a coast fire date of ${coastFromDate.toLocaleDateString()}, so monthly contributions are only taken into account until this date` : "");
}

export const tooltipText_estimatedCoastFireText = (fireNumber: number, currency: string, retireByAge: number, annualInterestPercent: number) => {
    return `The estimated date and time that you could completely stop investing, and your net worth would grow to your fire number ${roundAndFormat(fireNumber, currency)} by the chosen retirement age ${retireByAge}, assuming an annual interest of ${annualInterestPercent}%`;
}

export const tooltipText_whenFireText = (coastFromDate?: Date) => {
    return coastFromDate
        ? `This is the estimated date and time you will hit your fire number, assuming you are coasting from ${coastFromDate.toLocaleDateString()}, and not investing anything after this.`
        : `This is the estimated date and time you will hit your fire number`;
}

export const tooltipText_neededToRetireAmountText = (retireByAge: number, coastFromDate?: Date) => {
    return coastFromDate
        ? `Assuming you keep investing until your coast fire date ${coastFromDate.toLocaleDateString()}, and then you coast until your retirement age of ${retireByAge}`
        : `Assuming you keep investing until your retirement age of ${retireByAge}`;
}

export const tooltipText_FireNumber = (safeWithdrawalRatePercentage: number, annualInterestPercent: number, monthlyExpensesAfterTax: number, currency: string) => {
    return `This is the amount of money you need to be financially independent, assuming a SWR of ${safeWithdrawalRatePercentage}%, an annual interest of ${annualInterestPercent}%, and monthly expenses of ${roundAndFormat(monthlyExpensesAfterTax, currency)}`;

}

export const tooltipText_CoastFromChosenDate = () => {
    return "This is the date from which you will no longer invest any money, and instead you are letting your net worth grow by itself.";
}

export const tooltipText_monthlyExpensesAfterTax = () => {
    return "Your monthly expenses, not including any investments."
}

export const tooltipText_investmentStart = () => {
    return "The year and month you started investing. This is used to calculate how far you are from different milestones, as a function of time. "
}

export const tooltipText_coastFromDate = () => {
    return "At this date, you will stop contributing every month, and instead you will let your portfolio grow in value by itself. You need to fill in your current age and retirement age before this can be selected."
}