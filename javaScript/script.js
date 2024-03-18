document.querySelector(".control-buttons span").onclick=function(){
  let theName = prompt("what is your name")
  if(theName==""||theName==null)
  {
    document.querySelector(".info-container .name span").textContent="Unknown"
  }else{
    document.querySelector(".info-container .name span").textContent=theName
  }
  document.querySelector(".control-buttons").remove();
}

let duration =1000
let Containerblocks=document.querySelector(".memory-game-blocks")
let blocks = Array.from(Containerblocks.children);
let orderRange=[...Array(blocks.length).keys()]

shuffle(orderRange)
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener("click",function(){
        flip(block)
    })
})

function shuffle(arr)
{
    let current=arr.length,
    temp,random
    for(let i=0;i<current;i++)
    {
        random=Math.floor(Math.random()*current)
        temp=arr[i];
        arr[i]=arr[random];
        arr[random]=temp;
    }
    return arr;
}




function flip(selecblock){
    selecblock.classList.add("is-flipped")
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if(allFlippedBlocks.length===2)
    {
        stopClicking()
        matching(allFlippedBlocks[0],allFlippedBlocks[1])
    }
}

function stopClicking(){
    Containerblocks.classList.add("no-clicking")

    setTimeout(function(){
        Containerblocks.classList.remove("no-clicking")
    },duration)
}

function matching(Fblock,Sblock){
    let triesElement=document.querySelector(".tries span")

    if(Fblock.dataset.player===Sblock.dataset.player)
    {
        Fblock.classList.remove("is-flipped");
        Sblock.classList.remove("is-flipped");

        Fblock.classList.add("has-match");
        Sblock.classList.add("has-match")

    }else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;
        setTimeout(function(){
            Fblock.classList.remove("is-flipped");
            Sblock.classList.remove("is-flipped");
        },duration)
    }
}

