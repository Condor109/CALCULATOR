const buttons=document.querySelectorAll("button");
const inpt=document.querySelector("input");
buttons.forEach((button)=>{
  button.addEventListener('click',function(e){
    inpt.value+=e.currentTarget.innerHTML;
  })
})