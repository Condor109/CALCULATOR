const buttons=document.querySelectorAll("button");
const inpt=document.querySelector("input");
const span=document.querySelector("span");
var operations=[];
var ppp=[];
var point=false;

function calculate_2(){
  
  let x=inpt.value.slice((inpt.value.lastIndexOf(ppp[1])+1),inpt.value.length);
  ppp.push(parseFloat(x));
  let pro=0
  switch(ppp[1]){
    case "+": pro=ppp[0]+ppp[2]; break;
    case "-": pro=ppp[0]-ppp[2]; break;
    case "*": pro=ppp[0]*ppp[2]; break;
    case "/":  pro=ppp[0]/ppp[2]; break;
  }
  span.innerHTML=pro;
  ppp=[pro];
}

function calculate(){
  let array=operations.map((elm,idx)=>elm=="*"||elm=="/" ? idx:'').filter(String);
  console.log(array)
  let product=0;
  let c=0;
  let j=0;
  for(let i=0; i<array.length; i++){
    c=array[i]-j;
    switch (operations[c]){
      case "*": product=operations[c-1]*operations[c+1]; break;
      case "/": product=operations[c-1]/operations[c+1];break;
    }
    operations.splice(c,2);
    operations[c-1]=product;

    j+=2;
  }
  product=operations[0];
  for(let i=1;i<operations.length;i+=2){
    console.log(i)
    switch(operations[i]){
      case "+": product+=operations[i+1]; break;
      case "-": product-=operations[i+1]; break;
    }
  }
  inpt.value=product;
}


buttons.forEach((button)=>{
  if(!isNaN(button.innerHTML)){
    button.addEventListener('click',function(e){
      inpt.value+=e.currentTarget.innerHTML;
    });
  }
  else if(!['AC','C','=','.'].includes(button.innerHTML)){
    button.addEventListener('click',function(e){
      if(!['+','-','*','/'].includes(inpt.value[inpt.value.length-1])){
        point=false;
        if(inpt.value==""){
          inpt.value+="0";
        }
        if(ppp[0]==null){
          ppp.push(parseFloat(inpt.value));
          inpt.value+=e.currentTarget.innerHTML;
          ppp.push(e.currentTarget.innerHTML);
          return;

        }
        
        calculate_2();
        inpt.value+=e.currentTarget.innerHTML;
        ppp.push(e.currentTarget.innerHTML);

        
      }

    })
  }
})
buttons[15].addEventListener('click',function(e){
  if(!point){
     inpt.value+=e.currentTarget.innerHTML;
    point=true;
  }
})
buttons[0].addEventListener('click',()=>{
  inpt.value=""
  span.innerHTML="0";
  ppp=[];
})
buttons[1].addEventListener('click',()=>{
  inpt.value=inpt.value.slice(0,inpt.value.length-1)
})

buttons[16].addEventListener('click',()=>{
  let axio=inpt.value;
  let c=0;
  let i=0;

  calculate_2();
  ppp=[]
  while(i<axio.length){
    if(isNaN(parseFloat(axio[i])) && axio[i]!="."){
      operations.push(parseFloat(axio.slice(c,i)));
      operations.push(axio[i]);
      c=i+1;
      i+=1;
    }
    i++
  }
  operations.push(parseFloat(axio.slice(c,i)));
  calculate();
  operations=[];
})