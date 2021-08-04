
    var direction,l=0,t=0,c1=0,c2=0,c3=0,c4=0,id1,id2,id3,id4,key,s;
  var head,cnt=0,count=0,i=0,left=0,check=0;
  //function to find random location and creating new div(body_part)
    function ranloc()
    {
        var loc=document.getElementById("h2");
        var x=Math.floor(Math.random()*300);
        var y=Math.floor(Math.random()*300);
        loc.style.left=x+'px';
        loc.style.top=y+'px';
        cnt=cnt+10;//increase score
        s=document.getElementById("score").innerHTML=cnt;
        var div=document.createElement("div");//creating new div
        div.style.width="10px";
        div.style.height="10px";
        div.style.marginBottom="2px";
         div.style.background="red";
         div.style.float="left";
        div.style.position="absolute";
        div.style.display="none";
        div.style.border="1px solid green";
        div.setAttribute("class","SNAKE");
         var D=document.getElementById("d");
         D.appendChild(div);
    }
    //eventlistener for keydown
    document.addEventListener("keydown", function my()
    {
        clearInterval(id1);
        clearInterval(id2);
        clearInterval(id3);
        clearInterval(id4);

    var l1=document.getElementsByClassName("SNAKE");
    var l2=document.getElementById("h2");
    key=event.which||event.keycode;
        if(key==38)
        {
            id1=setInterval(function()
            {
                check=change(key);
                if(Math.abs(l1[0].offsetLeft-l2.offsetLeft)<10&&Math.abs(l1[0].offsetTop-l2.offsetTop)<10)
                {
                    ranloc();
                }
                if(l1[0].offsetTop<-2||check==1)
                {
                    alert("game over...Your score is "+cnt);
                    clearInterval(id1);
                    document.removeEventListener("keydown",my);
                }
                  clearInterval(id2);
                  clearInterval(id3);
                  clearInterval(id4);
            },100);
        }
        if(key==37)
        {
            id2=setInterval(function()
                {
               check=change(key);
                if(Math.abs(l1[0].offsetLeft-l2.offsetLeft)<7&&Math.abs(l1[0].offsetTop-l2.offsetTop)<7)
                {
                    ranloc(); 
                }
                if(l1[0].offsetLeft<-2||check==1)
                {
                    alert("game over...Your score is "+cnt);
                    clearInterval(id2);
                    document.removeEventListener("keydown",my);
                }
                clearInterval(id1);
                clearInterval(id3);
                clearInterval(id4);
                },100);
        }
        if(key==39)
        {
            id3=setInterval(function()
                {
                check=change(key);
                if(Math.abs(l1[0].offsetLeft-l2.offsetLeft)<7&&Math.abs(l1[0].offsetTop-l2.offsetTop)<7)
                {
                ranloc();
                }
                if(l1[0].offsetLeft>405||check==1)
                {
                    alert("game over...Your score is "+cnt);
                    clearInterval(id3);
                    document.removeEventListener("keydown",my);
                }
                clearInterval(id1);
                clearInterval(id2);
                clearInterval(id4);
                },100);
        }
        if(key==40)
        {
            id4=setInterval(function()
                {
                check=change(key);
                if(Math.abs(l1[0].offsetLeft-l2.offsetLeft)<7&&Math.abs(l1[0].offsetTop-l2.offsetTop)<7)
                {
                    ranloc();   
                }  
                if(l1[0].offsetTop>320||check==1)
                {
                    alert("game over...Your score is "+cnt);
                    clearInterval(id4);
                    document.removeEventListener("keydown",my);
                }   
                clearInterval(id1);
                clearInterval(id2);
                clearInterval(id3);
                },100);
                
     }});
     //change() execute for every 100ns to move bodyparts
     function change()
     {var i,leftpx,toppx;
         var elements=document.getElementsByClassName("SNAKE");
         var len=elements.length;
         elements[len-1].style.display="block";//
         var hleft=elements[0].offsetLeft;
         var htop=elements[0].offsetTop;
         console.log(hleft);
         console.log(htop);
         
         for(i=len-1;i>0;i--)
         {
              leftpx=elements[i-1].offsetLeft;
              toppx=elements[i-1].offsetTop;
         elements[i].style.left=leftpx+'px';
         elements[i].style.top=toppx+'px';
         }
         if(key==39)
         {
             hleft=hleft+10;
        elements[0].style.left=hleft+'px';
         }
         if(key==37)
         {
             hleft=hleft-10;
        elements[0].style.left=hleft+'px';
         }
         if(key==38)
         {
             htop=htop-10;
        elements[0].style.top=htop+'px';
         }
         if(key==40)
         {
             htop=htop+10;
        elements[0].style.top=htop+'px';
         }
         for(i=1;i<len;i++)
         {
             if(elements[0].offsetLeft==elements[i].offsetLeft&&elements[0].offsetTop==elements[i].offsetTop)
             {  
                return 1;  
        }}}
        
     

