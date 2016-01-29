var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
//var finger=document.querySelector(".finger");
//var slider=document.querySelector(".hua");
var a3=document.querySelector(".a3");
var img=a3.querySelector("img");

var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if(winW/winH<desW/desH){//���ո߶ȱ���ȥ����
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{//���տ�ȱ���ȥ����?
    main.style.webkitTransform = "scale("+winW/desW+")";
}
//finger.onclick=function(){
//    slider.style.display="block";
//    setTimeout(function(){
//        slider.setAttribute("class","hua select")
//    },500)
//
//};


[].forEach.call(oLis,function(){
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
})

function start(e){
    this.startX = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch-this.startX;
    var index = this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className = "";
        if(arguments[1]!=index){
            arguments[0].style.display = "none"
        }
arguments[0].firstElementChild.id="";

    })
    if(movePos>0){/*��   movePos������?*/
        this.prevSIndex = (index == 0?oLis.length-1:index-1);
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+(-winH+movePos)+"px)";
        var duration = -winH+movePos;
    }else if(movePos<0){/*��*/
        this.prevSIndex = (index == oLis.length-1?0:index+1);
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+(winH+movePos)+"px)";
        var duration = winH+movePos;
    }
    this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+")  translate(0,"+movePos+"px)";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display ="block";
}
function end(e) {
    if (this.flag) { //Ϊ������ǵ���¼����Ǵ����¼�
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.5s ease-out";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function (e) {
            if (e.target.tagName == "LI") {
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="a"+(this.index+1);
            $("#a2 img").addClass('animated shake');
            setTimeout(function () {
                $("#a2 img").removeClass('shake');
            }, 8000);

            $("#a2 p span.ask").addClass("speak");
            setTimeout(function () {
                $("#a2 p span.fill").addClass("animated lightSpeedOut");
            }, 1000)
            setTimeout(function () {
                $("#a2 p span.fill").removeClass("animated lightSpeedOut");
            }, 10000)

            $("#a3 .detail").addClass("animated rubberBand");
            $("#a8 .pp1").addClass("animated bounce");
            $("#a8 .pp2").addClass("animated flash");




        }, false)
    }
}



