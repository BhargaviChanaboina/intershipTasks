var l=0,t=0,direction="tr",id,next="null",lt,tp,prev="tr",i=1,c=0,x=3,L,T,check=0;z=40,wincount=0,j=0;
var rect=document.getElementsByClassName("inner_rect");
var locs=new Array();
   for(c=0;c<6;c++)
   {
       rect[c].style.top=z+'px';
       rect[c].style.left=x+'px';
       x=x+60;
   }
   x=30;
   z=z+30;
   for(c=6;c<11;c++)
   {
       rect[c].style.top=z+'px';
       rect[c].style.left=x+'px';
       x=x+70;
   }
   x=50;
   z=z+30;
   for(c=11;c<15;c++)
   {
       rect[c].style.top=z+'px';
       rect[c].style.left=x+'px';
       x=x+80;
   }
   for(i=0;i<rect.length;i++)
   {
   L=rect[i].offsetLeft;
   T=rect[i].offsetTop;
   locs.push({"TOP":T,"LEFT":L});
}
document.addEventListener("keydown",function()
{   
    var key=event.which;
    var mover_id=document.getElementById("mover");
    l=mover_id.offsetLeft;
    if(key==37)
    {
        l=l-5;
mover_id.style.left=l+'px';
}
if(key==39)
{
    l=l+5;
mover_id.style.left=l+'px';
}
if(mover_id.offsetLeft<0)
{
    l=0;
  mover_id.style.left= l+'px';
}
if(mover_id.offsetLeft>322)
{
    l=412;
  mover_id.style.left= l+'px';
}
});
function move()
{
    clearInterval(id);
    var mover_id=document.getElementById("mover");
    var ball_id=document.getElementById("ball");
    lt=ball_id.offsetLeft;
    tp=ball_id.offsetTop;
id=setInterval(function()
{
if(direction==="tl")
{
    lt++;
    tp--;
ball_id.style.left=lt+'px';
ball_id.style.top=tp+'px';

}
if(direction==="tr")
{
    lt--;
    tp--;
ball_id.style.left=lt+'px';
ball_id.style.top=tp+'px';

}
if(direction==="bl")
{
    lt++;
    tp++;
ball_id.style.left=lt+'px';
ball_id.style.top=tp+'px';

}
if(direction==="br")
{
    lt--;
    tp++;
ball_id.style.left=lt+'px';
ball_id.style.top=tp+'px';

}
if(ball_id.offsetLeft===470)
{
    if(prev==="tl")
    direction="tr";
    else direction="br";
}
if(ball_id.offsetTop===0)
{
    if(prev==="tl")
    direction="bl";
    else direction="br";
}
if(ball_id.offsetLeft===0)
{
    if(prev==="tr")
    direction="tl";
    else direction="bl";
}
if(ball_id.offsetTop===365)
{
    if((ball_id.offsetLeft-mover_id.offsetLeft)<=80&&(ball_id.offsetLeft-mover_id.offsetLeft)>=0){
   if((ball_id.offsetLeft-mover_id.offsetLeft)<40)
 direction="tr";
 else if((ball_id.offsetLeft-mover_id.offsetLeft)>40)
 {
   direction="tl";
 }
 else if((ball_id.offsetLeft-mover_id.offsetLeft)==40)
  {
      if(prev=="bl")
      direction="tl";
      else direction="tr";
    }
}
}
if(ball_id.offsetTop>380)
{
    clearInterval(id);
    alert("over");
}
for(i=0;i<locs.length;i++)
{
    if(ball_id.offsetTop>=(locs[i].TOP-15)&&ball_id.offsetTop<=(locs[i].TOP+20)&&ball_id.offsetLeft>=(locs[i].LEFT-13)&&ball_id.offsetLeft<=(locs[i].LEFT+30))
    {
    
        rect[i].style.display="none";
      
    if(ball_id.offsetTop>locs[i].TOP+10)
    {  
        if(prev=="tr")
        direction="br";
        else direction="bl";
    }
    if(ball_id.offsetTop<locs[i].TOP)
    {  
        if(prev=="br")
        direction="tr";
        else direction="tl";
    }
    locs[i].TOP=-1;
    locs[i].LEFT=-1;
    
    break;
    } 
}
for(j=0;j<locs.length;j++)
{
    if(locs[j].TOP!=-1)
    break;
}if(j==locs.length)
{
alert("won");
clearInterval(id);
}
prev=direction;
},10)
}