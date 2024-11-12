//تعريف متغير للاسم
let name = prompt("Please Enter your name:");

//تعريف متغير للتحقق من أن الاسم فقط يحتوي على حروف الأبجديةوالمسافة
//فهان عملته يحتوي على الرموز و الارقام
let regexname = /[^ a-zA-Z]/g;

//هان استخدمت الدالة لتطلع مل التطابقات الارفام و الرموز
let checkName = name.match(regexname);
//و الامور تمام التمامnull فاذا مان في تطابق حيكون للمتغيير قيمة واذا لا اذا قيمته 

//هان في حالة كان النص يحوي على ارقام او رموز حيضل يعيد لحد ما يدخل المستخدم اسم صحيح
while(checkName != null){
    name = prompt("Please Enter your name:");
    checkName = name.match(regexname);
}

// تعريف متغير للسنة يتم ادخاله من المستخدم
let birth = prompt("Please Enter your birth year:");
let regexBirth =/[^0-9]/g;

//فحص انه فقط يحتوي على ارقام
let checkBirth = birth.match(regexBirth);

//التاكد انه فقط ارقام واقل من 2010
let isNumber =(checkBirth == null) && (birth < 2010) ;

//اذا ما كان يطابق المطلوب يضل يعيد
while(!isNumber){
    birth = prompt("Please Enter your birth year:");
    checkBirth = birth.match(regexBirth);
    isNumber =(checkBirth == null) && (birth < 2010)
}

//حساب العمر
let age = 2024-birth;
//طباعة المدخلات
document.getElementById('userName').innerHTML =name;
document.getElementById('userBirth').innerHTML =birth;
document.getElementById('userAge').innerHTML =age;