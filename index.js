let passworddispalyd=document.querySelector(".passworddisplay");
let passwordlengthd=document.querySelector(".passwordnumber");
let rangesliderd=document.querySelector('.range-slider');
let uppercased=document.querySelector('.uppercase');
let lowercased=document.querySelector('.lowercase');
let copied=document.querySelector('.cpybutton');
let Numberd=document.querySelector('.Number');
let symbold=document.querySelector('.symbol');
 let generatepasswordd=document.querySelector('#generatepassword')
 const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
 let strenthcold=document.querySelector('.strenthcol')
 const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordlength=10;
let checkCount=0;
  
function show(){
    if(passworddispalyd.type=='password'){
        passworddispalyd.type='text';
    }
    else{
        passworddispalyd.type='password' 
    }
}
function handleslider(){
    rangesliderd.value=passwordlength;
    passwordlengthd.innerHTML=passwordlength
}
handleslider();
function setcolor(color){

    strenthcold.style.backgroundColor=color;
    

}

function getrandominteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getupper(){
    return String.fromCharCode(getrandominteger(65,91));
}
function getlower(){
    return String.fromCharCode(getrandominteger(97,123));
}
function getsymbol(){
    let index=getrandominteger(0,symbols.length);
    return symbols.charAt(index);
}

function checkboxd(){
    let upper=false;
    let lower=false;
    let  number=false;
    let symbol=false;

    if(uppercased.checked){
        upper=true;
    }
    if(lowercased.checked){
        lower=true;
    }
    if(Numberd.checked){
        number=true;
    }
    if( symbold.checked){
        symbol=true;
    }


    if((upper&&lower&&(number||symbol)&&passwordlength>=8)){
        setcolor("green");
    }
    else if((upper||lower)&&(number||symbol)&&passwordlength>=6){
        setcolor("yellow");
    }else {
        setcolor("red");
    }
}

function getrandomnum(){
    return getrandominteger(0,9);
}


async function copypassword(){
    try{
        await navigator.clipboard.writeText(passworddispalyd.value);
        
        copied.innerText="copied";
        

        


    }
    catch(e){
        copied.innerText="failed";
    }

    copied.classList.add("active");
     setTimeout(() => {
    copied.classList.remove("active");
    
        
    },2000);
    passworddispalyd.value="";
    



}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function checkboxchange(){
  
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleslider();
    }
}


allCheckBox.forEach((checkbox)=>{
     checkbox.addEventListener('change',checkboxchange)
});


rangesliderd.addEventListener('input',()=>{
    passwordlength=rangesliderd.value;
    handleslider();
})

copied.addEventListener('click',()=>{
    if(passworddispalyd.value){
        copypassword();
    }
})
generatepasswordd.addEventListener('click',()=>{
    if(checkCount==0){
        return;
    }

    if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleslider();
    }
    password="";

    let arr=[];

    if(uppercased.checked){
        arr.push(getupper);
    }
    if(lowercased.checked){
        arr.push(getlower);
    }
    if(Numberd.checked){
        arr.push(getrandomnum);
    }
    if(symbold.checked){
        arr.push(getsymbol);
    }
      for(let i=0;i<arr.length;i++){
        password+=arr[i]();
      }
  
      for(let i=0;i<passwordlength-arr.length;i++){
        let randindex=getrandominteger(0,arr.length);
        password+=arr[randindex]();
      }
      password = shufflePassword(Array.from(password)); 
        
      passworddispalyd.value=password;
      

      checkboxd();
});














