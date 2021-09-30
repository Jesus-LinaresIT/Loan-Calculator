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
         // Add UI vars to DOM
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

// Obtain income tax according to the income tax withholding table issued by law
function getRent(amount) {
   // Taxed wages payable monthly (Through the General Directorate of Internal Taxes)
   const sections = {
      sect1: 472.60,
      sect2: 895.24,
      sect3: 2038.10
   };
   let val = sections;
   let rentResult;

   switch (true) {
      // I TRAMO
      case amount <= val.sect1:
         rentResult = 0.00;
         break;
      // II TRAMO
      case amount >= val.sect1 && amount <= val.sect2:

         const fixedFee1 = 17.67,
            calc1 = amount - val.sect1+0.01,
            porcentAply1 = calc1 * 0.1;
         rentResult = porcentAply1 + fixedFee1;
         break;
      // III TRAMO
      case amount > val.sect2 && amount <= val.sect3:

         const fixedFee2 = 60.00,
            calc2 = amount - val.sect2+0.01,
            porcentAply2 = calc2 * 0.2;

         rentResult = porcentAply2 + fixedFee2;
         break;
      // IV TRAMO
      case amount > val.sect3:

         const fixedFee3 = 288.57,
            calc3 = amount - val.sect3+0.01,
            porcentAply3 = calc3 * 0.3;
         rentResult = porcentAply3 + fixedFee3;
   };

   return rentResult;
}

// Show Error message
function showError(error){
   // Hide results
   document.getElementById('results').style.display = 'none';
   // Hide loader
   document.getElementById('loading').style.display = 'none';

   // Create a div
   const errorDiv = document.createElement('div');
   // get elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   // Add class
   errorDiv.className = 'alert alert-danger';
   // Create textNode and appende to div
   errorDiv.appendChild(document.createTextNode(error));
   // Insert error above heading
   card.insertBefore(errorDiv, heading);
   // Clear error after 3 seconds
   setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
   document.querySelector('.alert').remove();
}