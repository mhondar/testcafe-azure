// var dt = new Date();
var dt = new Date(2017, 3, 29)
console.log(dt)
dt.setDate(dt.getDate() + 5);
console.log(dt)
var curr_date = dt.getDate();
var curr_month = dt.getMonth()+1;
var curr_year = dt.getFullYear();
console.log(curr_date + "-" + curr_month + "-" + curr_year);