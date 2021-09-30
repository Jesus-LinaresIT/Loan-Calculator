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
}