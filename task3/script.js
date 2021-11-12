var inputField = document.getElementById('input-field');
var boxes = document.getElementById('boxes');
var addBox = document.getElementById('add-box');
var palindromText=document.getElementById('palindrom');
var letterQuality=document.getElementById('letter-quality');
var regex = RegExp('([A-Z])|([a-z])|( )');
var charArray=[];
var num=0;
var letterArray=[];
var letterIndicator=[];
var letterQualityIndicator=[];

inputField.addEventListener('keyup',getInputValue);
addBox.addEventListener('click',addNewElement);

boxes.addEventListener('keyup',function(e){
    if(e.target && e.target.parentNode.matches('div.box')){
        letterInput(e);
    }
})

boxes.addEventListener('click',function(e){
    if(e.target.matches('div.delete-box') && e.target.parentNode.matches('div.box')){
        deleteBox(e);
    }
})

function getInputValue(e){
    console.log('pozvao sam je')
    num=e.target.value;
    if(e.which==13){
        boxes.style.display='flex';
        document.getElementById("input-container").style.display="none";
        for(i=0;i<num;i++){
            addNewEmptyElement();
            letterIndicator[i]=0;
            letterArray[i]='';
        }
    }
}

function addNewEmptyElement(){
    let box=document.createElement('div')
    box.classList="box box-cursor";
    let inputElement=document.createElement('input');
    inputElement.maxLength='1';
    inputElement.classList="box-cursor";
    box.appendChild(inputElement);
    let deleteDiv=document.createElement('div')
    deleteDiv.classList="delete-box";
    deleteDiv.innerHTML="X";
    box.appendChild(deleteDiv);
    addBox.parentNode.insertBefore(box, addBox);
    palindromText.innerHTML="";
}

function addNewElement(){
    addNewEmptyElement();
    num++;
}

function deleteBox(e){
    console.log(e.target);
    num--;
    console.dir(e.target.parentNode);
    var childIndex = whichChild(e.target.parentNode)-1;
    letterIndicator.splice(childIndex,1);
    letterArray.splice(childIndex,1);
    wordCheck()
    e.target.parentNode.remove();
    letterQualityIndicator.splice(childIndex,1);
    letterQualityCheck();
}

function letterInput(e){
    var letter=e.target.value;
    var childIndex = whichChild(e.target.parentNode)-1;
    if(letterCheck(letter)){
        e.target.parentNode.classList.remove('error');
        letterArray[childIndex]=(e.target.value).toLowerCase();
        letterIndicator[childIndex]=1;
        letterQualityIndicator[childIndex]=0;
        wordCheck()
    }else{
        e.target.parentNode.classList.add('error');
        letterIndicator[childIndex]=0;
        letterArray[childIndex]='';
        letterQualityIndicator[childIndex]=1;
    }
    if(e.target.value==''){
        e.target.parentNode.classList.remove('error');
        palindromText.innerHTML="";
        letterQualityIndicator[childIndex]=0;
    }
    letterQualityCheck();
}

function letterCheck(letter){
    if(regex.test(letter)){
        return true;
    }else{
        return false;
        

    }
}

function whichChild(elem){
    var  i= 0;
    while((elem=elem.previousSibling)!=null) ++i;
    return i;
}

function wordCheck(){
    if(letterIndicator.reduce((a, b) => a + b, 0)==num && num!=0){
                console.log('sva slova su ok');
                var word=letterArray.join('');
                console.log(word)
                if(checkPalindrome(word)){
                    palindromText.innerHTML="UNIJETA RIJEČ JE PALINDROM!";
                }
                else{
                    palindromText.innerHTML="UNIJETA RIJEČ NIJE PALINDROM!";
                }
            }else{
                palindromText.innerHTML="";
            }
}

function checkPalindrome(string) {
    const len = string.length;
    for (let i = 0; i < len / 2; i++) {
        if (string[i] !== string[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

function letterQualityCheck(){
    if(letterQualityIndicator.reduce((a, b) => a + b, 0)>0){
        letterQuality.innerHTML='Karakter nije dozvoljen. Molimo Vas unesite odgovarajuci!';
    }else{
        letterQuality.innerHTML='';
    }
}