# CompuSalary
A simple salary calculator that computes an employee's total salary based on the `daily rate`, `overtime rate`, number of `working days`, `overtime hours`, and `holidays` (special and legal).

## Features 
- **Currency Selection:** Choose from various currencies to display the calculated salary.
- **Input Fields:**
  - Daily Rate  
  - Overtime Rate
  - Number of days worked 
  - Number of overtime hours 
  - Number of special holidays
  - Number of legal holidays
       
- **Salary Calculation:**
  - Regular Pay `(Daily Rate × Number of days worked)`
  - Overtime Pay `(Overtime rate × Number of overtime hours)`
  - Special Holiday Pay `(Daily Rate × 30%)`
  - Legal Holiday Pay `(Daily Rate)`
      
- **Result Display:** Displays calculated `regular pay`, `overtime pay`, `holiday pay`, and `total salary` in the selected currency.

## Technology Used
- HTML
- CSS
- JavaScript 
- jQuery
- Select2
- SweetAlert2

## Installation 
**Link:** [CompuSalary on Netlify](https://compusalary.netlify.app)

## Usage 
1. **Select Currency**: Choose your preferred currency from the dropdown.
2. **Enter Rates**: Input the `Rate per Day` and `Overtime Rate`.
3. **Enter Details**: Specify the `Number of Days Worked`, `Overtime Hours`, `Special Holidays`, and `Legal Holidays`.
4. **Calculate**: Click the **Calculate** button to see the breakdown and total salary.
