from enum import Enum
from tabulate import tabulate



def get_monthly_networth(principal, interest, num_of_years, monthly_contribution):
    monthly_interest = interest / months_in_a_year
    net_worth = [principal]
    for i in range(0, (num_of_years+1) * months_in_year):
      amount = (net_worth[i] * (1 + monthly_interest)) + monthly_contribution
      net_worth.append(amount)
    return net_worth

month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
months_in_a_year = len(month_names)
principal = 0 # The Starting Principal
interest = 0.07 # The Annual Interest Rate to Compound On
num_of_years = 30 # The Number of Years to Compound
monthly_contribution = 15000 # Monthly Contribution Amount
annual_contribution = monthly_contribution * months_in_a_year
monthly_budget_after_tax = 43000 - monthly_contribution
safe_withdrawal_rate = 0.04

net_worth_list = get_monthly_networth(principal, interest, num_of_years, monthly_contribution)
show_graph(net_worth_list)


# SHOW LIST OF NET WORTH AT EACH MONTH
current_month_index = 0

for i, result in enumerate(net_worth_list):
    if i == 0:
        print(f"principal: {principal:,.0f} SEK")
        print()
    else:
        i_adjusted = i - 1
        month = (i_adjusted + current_month_index) % months_in_a_year
        year = 2025 + (i_adjusted // 12)
        print(year, month_names[month], f"{result:,.0f}")


# GENERATE MILESTONE TABLE

milestones_per_hour = range(5, 205, 5)
milestones_annual_interest = [5000, 10000, 20000, 25000, 30000, 40000, 50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 125000, 130000, 140000, 150000, 160000, 170000, 175000, 180000, 190000, 200000, 210000, 220000, 225000, 230000, 240000, 250000, 260000, 270000, 275000, 280000, 290000, 300000, 310000, 320000, 325000, 330000, 340000, 350000, 360000, 370000, 375000, 380000, 390000, 400000, 410000, 420000, 425000, 430000, 440000, 450000, 460000, 470000, 475000, 480000, 490000, 500000]
milestones_monthly_interest = [100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000]
milestones_extra_months_of_investment = range(1, 37)
milestones_monthly_growth = [15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]
milestones_annual_growth = [180000, 190000, 200000, 210000, 220000, 225000, 230000, 240000, 250000, 260000, 270000, 275000, 280000, 290000, 300000, 310000, 320000, 325000, 330000, 340000, 350000, 360000, 370000, 375000, 380000, 390000, 400000, 410000, 420000, 425000, 430000, 440000, 450000, 460000, 470000, 475000, 480000, 490000, 500000]
milestones_own_contribution_percentage_of_growth = [x / 100.0 for x in range(100, 0, -5)]
milestones_interest_percentage_of_contribution =  [x / 100.0 for x in range(5, 205, 5)]
milestones_big_net_worth = [10000, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 750000, 800000, 900000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5250000, 5500000, 5750000, 6000000, 6250000, 650000, 6750000, 7000000, 7250000, 7500000, 7750000, 8000000]
milestones_interest_percentage_of_monthly_spending =  [x / 100.0 for x in range(5, 205, 5)]
milestones_safe_monthly_withdrawal = [100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000]

work_hours_per_year = 46*40 # 46 work weeeks, 40 hours per week

all_milestones = {}

Milestone_Type = Enum('Milestone_Type', ["PER_HOUR", "ANNUAL_INTEREST", "MONTHLY_INTEREST", "EXTRA_MONTHS_OF_INVESTMENT", "MONTHLY_GROWTH", "ANNUAL_GROWTH", "OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH", "INTEREST_PERCENTAGE_OF_CONTRIBUTION", "BIG_NET_WORTH", "INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING", "SAFE_MONTHLY_WITHDRAWAL"])

class Milestone:
    def __init__(self, net_worth, milestone_type, milestone_text, color):
        self.net_worth = net_worth
        self.milestone_type = milestone_type
        self.milestone_text = milestone_text
        self.color = color

def add_to_milestones(milestone):
    net_worth = milestone.net_worth
    if net_worth not in all_milestones:
        all_milestones[net_worth] = []
    all_milestones[net_worth].append(milestone)

# Show milestones by color on graph by months of investment
# Show percentage at each level, in terms of time and not money, add column
# Show approximate date that milestone will be reached, and how much time is left, add column
# Add a "line" in the chart that shows where you are, maybe color some cells differently
# Svelte page, upload to GitHub
# Allow inputs, like monthly contribution, expected interest, etc.

for per_hour_milestone in milestones_per_hour:
    needed = (per_hour_milestone * work_hours_per_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.PER_HOUR, f"{per_hour_milestone} per hour", "red")
    add_to_milestones(milestone)
    
for annual_interest_milestone in milestones_annual_interest:
    needed = annual_interest_milestone / interest
    milestone = Milestone(int(needed), Milestone_Type.ANNUAL_INTEREST, f"{annual_interest_milestone:,.0f} annual interest", "red")
    add_to_milestones(milestone)

for monthly_interest_milestone in milestones_monthly_interest:
    needed = (monthly_interest_milestone * months_in_a_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.MONTHLY_INTEREST, f"{monthly_interest_milestone:,.0f} monthly interest", "red")
    add_to_milestones(milestone)
    
for extra_month_of_investment in milestones_extra_months_of_investment:
    annual_interest_needed = extra_month_of_investment * monthly_contribution
    needed = annual_interest_needed / interest
    milestone = Milestone(int(needed), Milestone_Type.EXTRA_MONTHS_OF_INVESTMENT, f"{extra_month_of_investment} extra months of investment per year", "red")
    add_to_milestones(milestone)  
    
for monthly_growth in milestones_monthly_growth:
    monthly_interest_needed = monthly_growth - monthly_contribution
    needed = (monthly_interest_needed * months_in_a_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.MONTHLY_GROWTH, f"{monthly_growth:,.0f} monthly growth", "red")
    add_to_milestones(milestone)      
    
for annual_growth in milestones_annual_growth:
    annual_interest_needed = annual_growth - annual_contribution
    needed = annual_interest_needed / interest
    milestone = Milestone(int(needed), Milestone_Type.ANNUAL_GROWTH, f"{annual_growth:,.0f} annual growth", "red")
    add_to_milestones(milestone)  
    
for own_contribution_percentage in milestones_own_contribution_percentage_of_growth:
    monthly_growth_needed = monthly_contribution / own_contribution_percentage
    monthly_interest_needed = monthly_growth_needed - monthly_contribution
    needed = (monthly_interest_needed * months_in_a_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH, f"Own contribution is {own_contribution_percentage:,.0%} of monthly growth", "red")
    add_to_milestones(milestone)          
    
for interest_percentage_of_contribution in milestones_interest_percentage_of_contribution:
    monthly_interest_needed = interest_percentage_of_contribution * monthly_contribution
    needed = (monthly_interest_needed * months_in_a_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.INTEREST_PERCENTAGE_OF_CONTRIBUTION, f"Interest is {interest_percentage_of_contribution:,.0%} of monthly contribution", "red")
    add_to_milestones(milestone)              
    
for big_net_worth in milestones_big_net_worth:
    milestone = Milestone(big_net_worth, Milestone_Type.BIG_NET_WORTH, f"{big_net_worth:,.0f}", "red")
    add_to_milestones(milestone) 
    
for interest_percentage_of_monthly_spending in milestones_interest_percentage_of_monthly_spending:
    monthly_interest_needed = interest_percentage_of_monthly_spending * monthly_budget_after_tax
    needed = (monthly_interest_needed * months_in_a_year) / interest
    milestone = Milestone(int(needed), Milestone_Type.INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING, f"Interest is {interest_percentage_of_monthly_spending:,.0%} of monthly budget", "red")
    add_to_milestones(milestone)  

for safe_monthly_withdrawal in milestones_safe_monthly_withdrawal:
    needed = (safe_monthly_withdrawal * months_in_a_year) / safe_withdrawal_rate
    milestone = Milestone(int(needed), Milestone_Type.SAFE_MONTHLY_WITHDRAWAL, f"{safe_monthly_withdrawal:,.0f} can safely be withdrawn per month", "red")
    add_to_milestones(milestone)
    
def get_column_number(milestone_type):
    if milestone_type is Milestone_Type.BIG_NET_WORTH:
        return 0
    elif milestone_type is Milestone_Type.PER_HOUR:
        return 1
    elif milestone_type is Milestone_Type.ANNUAL_INTEREST:
        return 2
    elif milestone_type is Milestone_Type.MONTHLY_INTEREST:
        return 3
    elif milestone_type is Milestone_Type.EXTRA_MONTHS_OF_INVESTMENT:
        return 4
    elif milestone_type is Milestone_Type.MONTHLY_GROWTH:
        return 5
    elif milestone_type is Milestone_Type.ANNUAL_GROWTH:
        return 6
    elif milestone_type is Milestone_Type.OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH:
        return 7
    elif milestone_type is Milestone_Type.INTEREST_PERCENTAGE_OF_CONTRIBUTION:
        return 8
    elif milestone_type is Milestone_Type.INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING:
        return 9
    elif milestone_type is Milestone_Type.SAFE_MONTHLY_WITHDRAWAL:
        return 10
    else:
        return 11
    
table_headers =  ["NET WORTH", "PER_HOUR", "ANNUAL_INTEREST", "MONTHLY_INTEREST", "EXTRA_MONTHS_OF_INVESTMENT", "MONTHLY_GROWTH", "ANNUAL_GROWTH", "OWN_CONTRIBUTION_PERCENTAGE_OF_GROWTH", "INTEREST_PERCENTAGE_OF_CONTRIBUTION", "INTEREST_PERCENTAGE_OF_MONTHLY_SPENDING", "SAFE_MONTHLY_WITHDRAWAL"]
table_data = []
for net_worth, milestones in sorted(all_milestones.items()):
    net_worth_formatted = f"{net_worth:,.0f}"
    row_data = [""] * len(table_headers)
    row_data[0] = net_worth_formatted
    for milestone in milestones:
        message = milestone.milestone_text
        column_number = get_column_number(milestone.milestone_type)
        row_data[column_number] = message 
    table_data.append(row_data)


#for net_worth, milestones in sorted(all_milestones.items()):
#    for milestone in milestones:
#        text = milestone.milestone_text
#        milestone_type = milestone.milestone_type.name
#        print(f"{net_worth:<20,.0f}{milestone_type:<40}{text:<15}")

print(table_data)
#boxprint(tabulate(table_data, headers='firstrow', tablefmt='fancy_grid'))


  