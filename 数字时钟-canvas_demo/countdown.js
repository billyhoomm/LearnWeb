var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 550;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);//定义圆的半径，上边距和初始左边距,结束时间
var curShowTimeSeconds = 0;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
//
window.onload = function(){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render( context );
            update();
        }
        ,
        50
    );
}//定义2d上下文环境，画布宽高,获取时间，执行函数

function getCurrentShowTimeSeconds() {
   var curTime = new Date();
   //var ret = endTime.getTime()-curTime.getTime();
   //时钟效果
   var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
   //ret = Math.round(ret/1000);
   return ret>=0?ret:0;
}//获取当前时间和设定时间之间的时间差秒数

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
    var curSeconds = curShowTimeSeconds % 60;

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }/*查看当前时间对比上一次执行render函数执行的时间小时，分钟，秒钟是否发生变化，在发生变化的所有地方
    传入x和y以及num参数执行函数addBalls*/

        curShowTimeSeconds = nextShowTimeSeconds;
    }/*获取每一次render函数执行之后的当前时间，如果此时间和render函数执行时的时间不一样则
替换新时间，则下次render函数执行时将使用新时间从而造成时间变换的动画效果`*/

    updateBalls();//如下
    console.log(balls.length);
}
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
        if(balls[i].x>=WINDOW_WIDTH-RADIUS){
        	balls[i].x = WINDOW_WIDTH-RADIUS;
        	balls[i].vx = -balls[i].vx;
        }
    }
    
    var cnt = 0;
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i];

    while( balls.length > Math.min(500,cnt)){
        balls.pop();
    }
    
    /*由于balls数组长度没有清除会不断增加，此处设置条件遍历数组把仍在画布内的小球依次赋值给balls[0]到balls[cnt]，
    即所有在画布外的小球还剩下balls[cnt]到balls[balls.length-1]，再通过balls.pop()将剩余的全部清除。*/

}/*当setInterval函数每执行一次都遍历一次balls数组使数组中的x和y都发生变化导致在下次render函数执行时
外层的小球会被在新的地方重新绘制即产生跌落效果，再计算小球距离画布底部的距离，如果小球触底时，将y方
向的速度改为之前的负值，并加上一个碰撞动能损失，使之反弹，随着setInterval函数不断执行，小球会不断下落再弹起*/
function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall );

            }
}/*遍历三维数组中的digit[num]，从有1的地方根据传入的x和y参数计算出该地方小球的x值和y值，同时
赋予小球x方向的随机速度，y方向的速度，以及小球的随机颜色，再将对象传入balls数组中*/

function render( cxt ){
	cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);//清除画布

    var hours =parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }

}/*每一次发生时间变化时，调用renderDit函数并传入x方向和y方向的值琢次绘制数字，从小时到秒钟; 同时
遍历时间发生变化时所产生的balls数组,用balls数组中的x和y绘制出这个地方的数字的小球*/

function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for(i=0; i<digit[num].length; i++){
        for(j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                /*利用上边距y和左边距x以及半径RADIUS计算圆心位置并在指定位置画出圆*/
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}//利用digit数组绘制其中一个数字的函数（重点）