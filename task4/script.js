var leftIcon=document.getElementById('left-icon');
var rightIcon=document.getElementById('right-icon');
var images=document.querySelectorAll('.slider-image');
var container=document.querySelector('.slider-container');
var closeButton=document.querySelector('body .slider-container .close-icon')
var imagesArr=Array.from(images);
var currentImage=0;
imagesArr[0].style.display='block';

rightIcon.addEventListener('click',function(){moveImage(1)});
leftIcon.addEventListener('click',function(){moveImage(-1)});
container.addEventListener('click',resizeContainer);
closeButton.addEventListener('click',reduceContainer);
container.addEventListener('mouseover',function(e){
    e.target.parentElement.parentElement.classList.add('active');
 });
 container.addEventListener('mouseout',function(e){
     e.target.parentElement.parentElement.classList.remove('active');
 });
window.addEventListener('keydown',keyHandller);

function moveImage(moveIndicator){
    imagesArr[currentImage].style.display='none';
    calCurrentImage(moveIndicator);
    imagesArr[currentImage].style.display='block';
}

function calCurrentImage(moveIndicator){
    if(currentImage+moveIndicator>imagesArr.length-1){
        currentImage=0;
    }else if(currentImage+moveIndicator<0){
        currentImage=imagesArr.length-1;
    }else{
        currentImage+=moveIndicator;
    }
}

function resizeContainer(e){
    
    if(e.target.localName!='i'){
        e.target.offsetParent.style.width='90vw';
        e.target.offsetParent.style.height='90vh'; 
        closeButton.style.display='block'; 
    }
}

function reduceContainer(e){
    e.target.offsetParent.style.width='50vw';
    e.target.offsetParent.style.height='calc(1080/1920*50vw)'; 
    closeButton.style.display='none';
}

function keyHandller(e){
if(e.which=='37'){
    if(container.classList.contains('active')){
        moveImage(-1);
    }
}
if(e.which=='39'){
    if(container.classList.contains('active')){
        moveImage(-1);
    }
}
}