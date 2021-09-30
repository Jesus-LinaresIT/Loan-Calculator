// Add Event
document.getElementById('loan-form').addEventListener('submit', e =>{
   // Hide results
   document.getElementById('results').style.display = 'none';
   //Show loader
   document.getElementById('loading').style.display = 'block';

   setTimeout(calculateBenefits, 900);

   e.preventDefault();
});

//Calculate Benefits
function calculateBenefits(){
   // Add UI vars
   const salaryAmount = document.getElementById('salary'),
         discountAfp = document.getElementById('AFP'),
         restAfp = document.getElementById('discount-afp'),
         discountIsss = document.getElementById('isss'),
         discountRent = document.getElementById('rent'),
         totalSalary = document.getElementById('month-salary'),
         biweeklySalary = document.getElementById('biweekly-salary');

   const salary = parseFloat(salaryAmount.value);

   if (salary < 0.01){
      showError('The number entered is incorrect');
   }else{
      // calculate discount AFP and ISSS.
      // As based on the law salary*7.25%
      const afp = salary * 0.0725,
      // As based on the law salary*3%($30 max)
      isss = salary<1000?salary * 0.03:salary-30;

      const salaryDs = salary - afp - isss;
      // Calculation of income tax
      const rent = getRent(salaryDs);

      const salaryMounth = salaryDs - rent;
      const salaryBi = salaryMounth / 2;

      if(isFinite(salaryMounth)){
         discountAfp.value = afp.toFixed(2);
         restAfp.value = (salary - afp).toFixed(2);
         discountIsss.value = isss.toFixed(2);
         discountRent.value = rent.toFixed(2);
         totalSalary.value = salaryMounth.toFixed(2);
         biweeklySalary.value = salaryBi.toFixed(2);

         // Show results
         document.getElementById('results').style.display = 'block';

         // Hide loader
         document.getElementById('loading').style.display = 'none';
      }else{showError('Please check your numbers...');}
   }
}