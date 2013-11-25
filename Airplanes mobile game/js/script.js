//переменные
var canvas, ctx;
var backgroundImage;
var backgroundImage1;
var iBgShiftX = 100;
var button;
var button1;
var button2;
var button3;
var button4;
var pausebutton;
var button5;
var button6;
var helpbutton;
var Continuepbutton;
var NewGamepbutton;
var playerbutton;
var bDrawDialog = true;
var iDialogPage = 1;
var pauseclick = 0;
var oExplosionImage;
var oCloudImage;
var oBadoblakoImage;
var oStarsImage;
var oCoinsImage;
var tmpImg = null;
var changePlane = false;
var ichgplayer = false;

var iBgShiftY = 9300; //10000 (level length) - 700 (canvas height)
var bPause = false; // game pause
var stars = null; // stars object
var coins = null; // coins object
var plane = null; // plane object
var clouds = []; // array of clouds
//var explosions = []; // array of explosions
var badoblako = []; // array of badoblako
var stars = []; // array of stars
var coins = []; // array of coins
var planeW = 120; // plane width
var planeH = 160; // plane height
var iSprPos = 1; // initial sprite frame for plane
var iMoveDir = 1; // move direction
var iCloudW = 131; // cloud width
var iCloudH = 68; // cloud height
var iBadoblakoW = 174; // badoblako width
var iBadoblakoH = 100; // badoblako height
var istarW = 20; // star width
var istarH = 20; // star height
var icoinW = 100; // star width
var icoinH = 100; // star height
var iRocketSpeed = 10; // initial rocket speed
var iCloudSpeed = 3; // initial cloud speed
var iCloudSpeedMin = 3; // минимальная скорость облака
var iCloudSpeedMax = 4; //максимальная скорость облака
var pressedKeys = []; // array of pressed keys
var iScore = 0; // total score
var points = 0; // очки
var iLife = 100; // total life of plane
var iDamage = 10; // damage per cloud plane
var enTimer = null; // random timer for a new cloud
var bplane = false; //выбор самолета
var iplane = 1; //по умолчанию - 1 самолет
var isSave = false; // по умолчанию игра не сохранена
var icoinNumber = 0; //количество монет
var isEnd = true; // по умолчанию игра не окончена
var iplayer = 1; //по умолчанию - игрок 1
// ------------------------------------------------------------

// объекты:
function Button(x, y, w, h, state, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.imageShift = 0;
    this.image = image;
    this.visible= true;
}

function Plane(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}

function Cloud(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
/*function Explosion(x, y, w, h, sprite, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
}*/
function Badoblako(x, y, w, h, sprite, image, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    this.speed = speed;
}
function Stars(x, y, w, h, sprite, image, speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    this.speed = speed;
}
function Coins(x, y, w, h, sprite, image){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
}

// -------------------------------------------------------------
// получить случайное число между X и Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}
// Display Intro function
function displayIntro() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.drawImage(introImage, 0, 0,700, 700);
    setInterval(drawScene, 20); // loop drawScene
    coins.push(new Coins(ctx.canvas.width/2 + 120, 545, icoinW, icoinH, 0 , oCoinsImage));
    stars.push(new Stars(ctx.canvas.width/2 + 120, 545, istarW, istarH, 0 , oStarsImage));
   // Generate();

          /* // and add first cloud
           addCloud();
           
                setInterval(function(){
                 var rand = Math.random()*100;
              if(rand  <= 40 && !bDrawDialog && !bPause){
                 //  addCloud();
                       addStars(); 
              } else if(rand  <= 45 && !bDrawDialog && !bPause) {
                     addBadoblako();
                     addStars();
                }else if(!bDrawDialog && !bPause)
                   addStars();
            },500);*/
    
}
function Generate()
{
         // and add first cloud
         addCloud();
         setInterval(function(){
                 var rand = Math.random()*100;
                 if(rand  <= 20 && !bDrawDialog && !bPause){
                     //  addCloud(); 
                       addStars(); 
                 } else if(rand  <= 25 && !bDrawDialog && !bPause) {
                     addBadoblako();
                     addStars();
                 }
            },500);
            
}

    // Add Cloud function (adds a new cloud randomly)
    function addCloud() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iCloudH);
    var chanse = getRand(0,100);
    if(chanse <= 20 && !bDrawDialog && !bPause)
        {
          clouds.push(new Cloud(randX, 0, iCloudW, iCloudH, - getRand(iCloudSpeedMin, iCloudSpeedMax), oCloudImage)); //скорость теперь настраивается переменными
        }
    var interval = getRand(900, 1000);
   // var interval = getRand(5000, 10000);
    enTimer = setInterval(addCloud, interval); // повторение кадров
    }
    
    function addBadoblako() {
   // clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iBadoblakoH);
    badoblako.push(new Badoblako(randX, 0, iBadoblakoW, iBadoblakoH, 0 , oBadoblakoImage, -iCloudSpeed));

    //var interval = getRand(1000, 2000);
    //enTimer = setInterval(addBadoblako, interval); // loop
}

function addStars() {
            //for (var ekey in enemies){    
            var rand1 = Math.random()*100; 
                if (rand1 <=40){ 
                    for (var okey in badoblako) {
                        if (badoblako[okey] != undefined) {
                             //var rand2 = Math.random()*100;
//                             console.log( badoblako[okey].x);
                                if(badoblako[okey].x < 400){
                                    var randX = getRand((badoblako[okey].x + badoblako[okey].w), 550);
                                }else 
                                    var randX = getRand(0, badoblako[okey].x);     
                        }
                    }
                } else if(rand1 <=60){
                    for (var ekey in clouds){
                        if (clouds[ekey] != undefined){
                            if(clouds[ekey].x < 400){
                                var randX = getRand((clouds[ekey].x + clouds[ekey].w), 550);
                            }else 
                                var randX = getRand(0, clouds[ekey].x);
                        }
                    }  
                } else 
                    var randX = getRand(0, canvas.height); 
//    console.log(randX); 

    stars.push(new Stars(randX, 0, istarW, istarH, 0 , oStarsImage, -iCloudSpeed));
}
    
    //отрисовка полупрозрачного градиента
    function drawGradient()
    {
          var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
          bg_gradient.addColorStop(0.0, 'rgba(111, 107, 149, 0.3)');
          bg_gradient.addColorStop(1.0, 'rgba(224, 224, 224, 0.3)');

          ctx.beginPath(); // начало фигуры
          ctx.fillStyle = bg_gradient;
          ctx.moveTo(0, 0);
          ctx.lineTo(ctx.canvas.width - 2, 0);
          ctx.lineTo(ctx.canvas.width - 2, ctx.canvas.height - 2);
          ctx.lineTo(0, ctx.canvas.height - 2);
          ctx.lineTo(0, 0);
          ctx.closePath(); // конец фигуры
          ctx.fill(); // заполнение фигуры*
    }
    
    function NoSave()
    {
       iBgShiftY = 9300;
       iScore = 0;
       iLife = 100;
       for (var ekey in clouds) {
       if (clouds[ekey] !== undefined)
          delete clouds[ekey];
       }
       for (var okey in badoblako) {
         if (badoblako[okey] !== undefined)
           delete badoblako[okey];
          }
       for (var skey in stars) {
         if (stars[skey] !== undefined) 
            delete stars[skey];
         }
    }
    
// фукнции отрисовки :
function clear() { // функция очистки canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

var inc = true;
var setValue = function(elem, value, inc, shift, speed){
    var interval = false; 
    if (inc) {
        interval = setInterval(function(){
            if (elem*1+shift >= value) {
                elem = value;
                clearInterval(interval);
            } else {
                elem = elem*1+shift;
            }
        }, speed);
    } /*else {
        interval = setInterval(function(){
            if (elem.innerHTML*1-shift <= value) {
                elem.innerHTML = value;
                clearInterval(interval);
            } else {
                elem.innerHTML = elem.innerHTML*1-shift;
            }
        }, speed);
    }*/   
};

function drawDialog() { // функция отрисовки диалога
    if (bDrawDialog) {
        // draw background
        ctx.drawImage(backgroundImage, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);
        drawGradient();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
        ctx.stroke(); // отрисовка границы
        // отрисовка текста
        ctx.font = '42px Condensed';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#000';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillStyle = '#F4F3FC';
        if (iDialogPage === 1) {
            ctx.fillText('Airplanes mobile game', ctx.canvas.width/2, ctx.canvas.height/2 - 280);
            button2.visible=false;
            button3.visible=false;
            button4.visible=false;
            pausebutton.visible=false;
            button5.visible=false;
            button6.visible=false;
            if (!isSave)
            {
               Continuepbutton.visible=false;
            }
            else
            { 
                Continuepbutton.visible=true;
            }
        } else if (iDialogPage === 2) {
            ctx.fillText('Выбор самолета', ctx.canvas.width/2, ctx.canvas.height/2 - 300);
            button2.visible=true; 
            button3.visible=true;
            button4.visible=true;
            pausebutton.visible=false;
            button5.visible=false;
            button6.visible=false;
            helpbutton.visible=false;
            NewGamepbutton.visible=false;
            Continuepbutton.visible=false;
            if (!bplane)
            {
               ctx.lineWidth = 2;
               ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
               ctx.strokeRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 200, 200, 200);
            }
            else
            {
               ctx.lineWidth = 5;
               ctx.strokeStyle = 'rgba(255, 255, 204, 0.4)';
               ctx.strokeRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 200, 200, 200);
            }
             // draw plane
            tmpImg= new Image();
            if (iplane == 1)
            {
               tmpImg.src='images/plan.png';
               plane.image.src=tmpImg.src;
               ctx.drawImage(plane.image, iSprPos*plane.w + 10, 0, plane.w+5, plane.h, plane.x - plane.w/2 - 5, plane.y - plane.h/2 - 360, plane.w, plane.h);
              // console.log(iplane);
            }
            else if (iplane == 2)
            {
               tmpImg.src='images/plan2.png';
               plane.image.src=tmpImg.src;
              // plane.w=110;
               //plane.h=143;
               ctx.drawImage(plane.image, iSprPos*plane.w + 15, 0, plane.w+10, plane.h, plane.x - plane.w/2 - 5, plane.y - plane.h/2 - 360, plane.w, plane.h);
               //console.log(iplane);
            }
        }
        else if (iDialogPage === 3) {
            ctx.fillText('Справка', ctx.canvas.width/2, ctx.canvas.height/2 - 300);
            button2.visible=true; 
            button3.visible=false;
            button4.visible=false;
            pausebutton.visible=false;
            button5.visible=false;
            button6.visible=false;
            helpbutton.visible=false;
            NewGamepbutton.visible=false;
            Continuepbutton.visible=false;
            ctx.font = '24px Calibri';
            ctx.fillText('Управляйте самолетом ', ctx.canvas.width/2 - 150, 190);
            ctx.drawImage(plane.image, iSprPos*plane.w + 10, 0, plane.w+5, plane.h, plane.x - plane.w/2 + 30, plane.y - plane.h/2 - 360, plane.w/2, plane.h/2);
            ctx.fillText(', передвигая его влево и', ctx.canvas.width/2 + 165, 190);
            ctx.fillText('вправо. Избегайте попадания в облака', ctx.canvas.width/2 - 80, 250);
            ctx.drawImage(oCloudImage, ctx.canvas.width/2 + 130, ctx.canvas.height/2 - 105, iCloudW/2, iCloudH/2);
            ctx.fillText('и зоны', ctx.canvas.width/2 + 240, 250);
            ctx.fillText('турбулентности ', ctx.canvas.width/2 - 195, 300);
            ctx.drawImage(oBadoblakoImage, 0, 0, iBadoblakoW, iBadoblakoH, ctx.canvas.width/2 - 110, ctx.canvas.height/2 - 65, iBadoblakoW/2, iBadoblakoH/2);
            ctx.fillText('. Собирайте звездочки ', ctx.canvas.width/2 + 100, 300);
            ctx.drawImage(oStarsImage, 0, 0, istarW*2, istarH*2, ctx.canvas.width/2 + 210, ctx.canvas.height/2 - 50, istarW*2, istarH*2);
            ctx.fillText('для ', ctx.canvas.width/2 + 285, 300);
            ctx.fillText('накопления очков и получения монет', ctx.canvas.width/2 - 85, 350);
            ctx.drawImage(oCoinsImage, 0, 0, icoinW, icoinH, ctx.canvas.width/2 + 120, 345, icoinW/2.5, icoinH/2.5);
            ctx.fillText('и баки с', ctx.canvas.width/2 + 210, 350);
            ctx.fillText('топливом для пополнения топлива самолета.', ctx.canvas.width/2 - 45, 400);
          }
          else if (iDialogPage === 4) {
            button5.visible=true;
            button6.visible=true;
            pausebutton.visible=false;  
            // draw score
            ctx.font = '28px Verdana';
            ctx.fillStyle = '#fff';
            points = iScore * 10;
            ctx.fillText('Game over, your score: ' + points + ' points', ctx.canvas.width/2, ctx.canvas.height/2 - 250);  
            //setValue(points, iScore * 10, true, 10, 1);
            ctx.fillText('x ', ctx.canvas.width/2 + 10, ctx.canvas.height/2 - 185); 
            if(points > 100) 
            {
                icoinNumber = 1;
            }
            else if (points > 500)
            {
                icoinNumber = 2;
            }
            else if (points > 1000)
            {
                icoinNumber = 3;
            }
            ctx.font = '35px Verdana';
            ctx.fillStyle = '#fff';
            ctx.fillText(icoinNumber, ctx.canvas.width/2 + 40, ctx.canvas.height/2 - 190);
            //draw coins
            if (coins.length > 0) {
             for (var skey in coins) {
                if (coins[skey] !== undefined) {
                   ctx.drawImage(coins[skey].image, coins[skey].sprite*coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width/2 - 60, ctx.canvas.height/2 - 190, coins[skey].w/2, coins[skey].h/2);
                   coins[skey].sprite++;
                  if (coins[skey].sprite > 9) {
                    coins[skey].sprite = 0;
                  } 
                }
             }
          }
          ctx.font = '25px Verdana';
          ctx.fillStyle = '#fff';
          ctx.fillText("Имя игрока:", ctx.canvas.width/2 - 50, ctx.canvas.height/2 - 110);
          ctx.fillStyle = '#F4F3FC';
          ctx.fillText("Игрок " + iplayer, ctx.canvas.width/2 + 90, ctx.canvas.height/2 - 110);
         }
         else if (iDialogPage === 5) {
            ctx.fillText('Смена игрока', ctx.canvas.width/2, ctx.canvas.height/2 - 300);
            button2.visible=true; 
            button3.visible=true;
            button4.visible=true;
            pausebutton.visible=false;
            button5.visible=false;
            button6.visible=false;
            helpbutton.visible=false;
            playerbutton.visible=false;
            NewGamepbutton.visible=false;
            Continuepbutton.visible=false;
            if (!ichgplayer)
            {
               ctx.lineWidth = 2;
               ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
               ctx.strokeRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 200, 200, 200);
            }
            else
            {
               ctx.lineWidth = 5;
               ctx.strokeStyle = 'rgba(255, 255, 204, 0.4)';
               ctx.strokeRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 200, 200, 200);
            }
             // информация об игроке
                ctx.font = '25px Verdana';
                ctx.fillStyle = '#fff';
                ctx.fillText("Игрок " + iplayer, ctx.canvas.width/2, ctx.canvas.height/2 - 180);
                ctx.fillText('x ', ctx.canvas.width/2, ctx.canvas.height/2 - 70); 
                ctx.fillText('x ', ctx.canvas.width/2, ctx.canvas.height/2 - 130); 
                ctx.font = '35px Verdana';
                ctx.fillStyle = '#fff';
                ctx.fillText(points, ctx.canvas.width/2 + 75, ctx.canvas.height/2 - 135);
                ctx.fillText(icoinNumber, ctx.canvas.width/2 + 45, ctx.canvas.height/2 - 75);
                //draw stars
                if (stars.length > 0) {
                  for (var skey in stars) {
                    if (stars[skey] !== undefined) {
                    ctx.drawImage(stars[skey].image, stars[skey].sprite*stars[skey].w, 0, stars[skey].w, stars[skey].h, ctx.canvas.width/2 - 55, ctx.canvas.height/2 - 135, stars[skey].w*1.5, stars[skey].h*1.5);
                    stars[skey].sprite++;          
                    if (stars[skey].sprite > 10) {
                        stars[skey].sprite = 0;
                    }
                    }
                   }
                }
                //draw coins
                if (coins.length > 0) {
                 for (var skey in coins) {
                  if (coins[skey] !== undefined) {
                       ctx.drawImage(coins[skey].image, coins[skey].sprite*coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width/2 - 65, ctx.canvas.height/2 - 83, coins[skey].w/2, coins[skey].h/2);
                       coins[skey].sprite++;
                         if (coins[skey].sprite > 9) {
                          coins[skey].sprite = 0;
                         } 
                  }
                 }
                }
        }
    }
    else if (!bDrawDialog)
    {
       pausebutton.visible=true;
    }
}

function drawButton() { // функция отрисовки кнопки
	if(button.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button.image, 0, button.imageShift, button.w, button.h, button.x, button.y, button.w, button.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Новая игра', ctx.canvas.width/2 - 3, ctx.canvas.height/2 - 87);
	}
        if(button1.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button1.image, 0, button1.imageShift, button1.w, button1.h, button1.x, button1.y, button1.w, button1.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Выбор самолета', ctx.canvas.width/2 - 2, ctx.canvas.height/2 - 23);
	}
        if(button2.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button2.image, 0, button2.imageShift, button2.w, button2.h, button2.x, button2.y, button2.w, button2.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Назад в Меню', ctx.canvas.width/2 - 200, ctx.canvas.height/2 + 263);
	}
        if(button3.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button3.image, 0, button3.imageShift, button3.w, button3.h, button3.x, button3.y, button3.w, button3.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Предыдущий', ctx.canvas.width/2 - 154, ctx.canvas.height/2 + 52);
	}
        if(button4.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button4.image, 0, button4.imageShift, button4.w, button4.h, button4.x, button4.y, button4.w, button4.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Следующий', ctx.canvas.width/2 + 150, ctx.canvas.height/2 + 52);
	}
        if(pausebutton.visible==true)
        {
		// отрисовка кнопки
		ctx.drawImage(pausebutton.image, 0, pausebutton.imageShift, pausebutton.w, pausebutton.h, pausebutton.x, pausebutton.y, pausebutton.w, pausebutton.h);
        }
        if(button5.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button5.image, 0, button5.imageShift, button5.w, button5.h, button5.x, button5.y, button5.w, button5.h);

		// отрисовка текста на кнопке
		ctx.font = '19px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Сохранить и выйти', ctx.canvas.width/2 - 3, ctx.canvas.height/2 - 20);
	}
        if(button6.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button6.image, 0, button6.imageShift, button6.w, button6.h, button6.x, button6.y, button6.w, button6.h);

		// отрисовка текста на кнопке
		ctx.font = '19px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Выйти без сохранения', ctx.canvas.width/2 - 2, ctx.canvas.height/2 + 43);
	}
        if(helpbutton.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(helpbutton.image, 0, helpbutton.imageShift, helpbutton.w, helpbutton.h, helpbutton.x, helpbutton.y, helpbutton.w, helpbutton.h);

		// отрисовка текста на кнопке
		ctx.font = '19px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Справка', ctx.canvas.width/2 - 3, ctx.canvas.height/2 + 39);
	}
        if(Continuepbutton.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(Continuepbutton.image, 0, Continuepbutton.imageShift, Continuepbutton.w, Continuepbutton.h, Continuepbutton.x, Continuepbutton.y, Continuepbutton.w, Continuepbutton.h);

		// отрисовка текста на кнопке
		ctx.font = '19px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Продолжить', ctx.canvas.width/2 - 3, ctx.canvas.height/2 - 151);
	}
        if(playerbutton.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(playerbutton.image, 0, playerbutton.imageShift, playerbutton.w, playerbutton.h, playerbutton.x, playerbutton.y, playerbutton.w, playerbutton.h);

		// отрисовка текста на кнопке
		ctx.font = '19px Condensed';
		ctx.fillStyle = '#F4F3FC';
		ctx.fillText('Смена игрока', ctx.canvas.width/2 - 3, ctx.canvas.height/2 + 99);
	}
}
                
// функции рисования:
function drawScene() { // основная функция отрисовки сцены  
    // отрисовка диалога
    drawDialog();
    drawButton();
    if(!bDrawDialog)
    {
        if (! bPause) {
        iBgShiftY -= 2; // move main ground
          /*  bDrawDialog = true;
            iDialogPage = 4;*/
        if (iBgShiftY < 5) { // Finish position
            bPause = true;
            //clear();
            // draw score
          /*  ctx.font = '40px Verdana';
            ctx.fillStyle = '#FFF6EC';
            ctx.fillText('Вы проиграли, ваши очки: ' + iScore * 10 + ' points', ctx.canvas.width/2, ctx.canvas.height/2 - 100);*/
            bDrawDialog = true;
            iDialogPage = 4;
            isEnd = true;
            //return;
        }

        // process pressed keys (movement of plane)
        processPressedKeys();

        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw background
        ctx.drawImage(backgroundImage, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);

        // draw plane
        if (iplane == 1)
        {
           ctx.drawImage(plane.image, iSprPos*plane.w + 15, 0, plane.w+10, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);
        }
        if (iplane == 2)
        {
           ctx.drawImage(plane.image, iSprPos*plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);
        }
        
        // draw pause
        ctx.drawImage(pausebutton.image, 0, pausebutton.imageShift, pausebutton.w, pausebutton.h, pausebutton.x, pausebutton.y, pausebutton.w, pausebutton.h);

      /*  // draw explosions
        if (explosions.length > 0) {
            for (var key in explosions) {
                if (explosions[key] != undefined) {
                    // display explosion sprites
                    ctx.drawImage(explosions[key].image, explosions[key].sprite*explosions[key].w, 0, explosions[key].w, explosions[key].h, explosions[key].x - explosions[key].w/2, explosions[key].y - explosions[key].h/2, explosions[key].w, explosions[key].h);
                    explosions[key].sprite++;

                    // remove an explosion object when it expires
                    if (explosions[key].sprite > 10) {
                        delete explosions[key];
                    }
                }
            }
        }*/
            
        
        // draw badoblako
        if (badoblako.length > 0) {
            for (var okey in badoblako) {
                if (badoblako[okey] != undefined) {
                    ctx.drawImage(badoblako[okey].image, badoblako[okey].sprite*badoblako[okey].w, 0, badoblako[okey].w, badoblako[okey].h, badoblako[okey].x - badoblako[okey].w/2, badoblako[okey].y - badoblako[okey].h/2, badoblako[okey].w, badoblako[okey].h);
                    var rand = Math.random()*100;
                    if( 20 >= rand <= 50)
                    badoblako[okey].sprite++;          
                    badoblako[okey].y -= badoblako[okey].speed;

                    if (badoblako[okey].sprite > 5) {
                    badoblako[okey].sprite = 0;
                    }
                    // remove an enemy object if it is out of screen
                    if (badoblako[okey].y > canvas.height) {
                        delete badoblako[okey];
                    }
                    //console.log(badoblako[okey].sprite)
                }
            }
        }
        //draw stars
         if (stars.length > 0) {
            for (var skey in stars) {
                if (stars[skey] != undefined) {
                    ctx.drawImage(stars[skey].image, stars[skey].sprite*stars[skey].w, 0, stars[skey].w, stars[skey].h, stars[skey].x - stars[skey].w/2, stars[skey].y - stars[skey].h/2, stars[skey].w, stars[skey].h);
                    //var rand = Math.random()*100;
                    //if( 20 >= rand <= 50)
                    stars[skey].sprite++;          
                    stars[skey].y -= stars[skey].speed;

                    if (stars[skey].sprite > 10) {
                        stars[skey].sprite = 0;
                    }
                    // remove an enemy object if it is out of screen
                    if (stars[skey].y > canvas.height) {
                        delete stars[skey];
                    }
                    //console.log(stars[skey].x)
                }
            }
        }

        // draw clouds
        if (clouds.length > 0) {
            for (var ekey in clouds) {
                if (clouds[ekey] != undefined) {
                    ctx.drawImage(clouds[ekey].image, clouds[ekey].x, clouds[ekey].y);
                    clouds[ekey].y -= clouds[ekey].speed;

                    // remove an cloud object if it is out of screen
                    if (clouds[ekey].y > canvas.height) {
                        delete clouds[ekey];
                    }
                }
            }
        }

        if (clouds.length > 0) {
            for (var ekey in clouds) {
                if (clouds[ekey] != undefined) {

                    // collisions with plane
                    if (clouds[ekey] != undefined) {
                        if (plane.y - plane.h/2 < clouds[ekey].y + clouds[ekey].h/2 && plane.x - plane.w/2 < clouds[ekey].x + clouds[ekey].w && plane.x + plane.w/2 > clouds[ekey].x) {
                            //explosions.push(new Explosion(clouds[ekey].x + clouds[ekey].w / 2, clouds[ekey].y + clouds[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete cloud and make damage
                            delete clouds[ekey];
                            iLife -= iDamage;

                            if (iLife <= 0) { // Game over
                                bPause = true;

                                // draw score
                             /*   ctx.font = '38px Verdana';
                                ctx.fillStyle = '#fff';
                                ctx.fillText('Вы проиграли, ваши очки: ' + iScore * 10 + ' points', ctx.canvas.width/2, ctx.canvas.height/2 - 100);*/
                                bDrawDialog = true;
                                iDialogPage = 4;
                                isEnd = true;
                              //  return;
                            }
                        }
                    }

        //collision with badoblako
        if (badoblako.length > 0) {
            for (var ekey in badoblako) {
                if (badoblako[ekey] != undefined) {

                    // collisions with plane
                //    if (badoblako[ekey] != undefined) {
                        console.log(badoblako[ekey].x);
                        console.log(plane.x);
                        if (plane.y - plane.h/2 < badoblako[ekey].y + badoblako[ekey].h/2 && plane.x - plane.w/2 < badoblako[ekey].x + badoblako[ekey].w && plane.x + plane.w/2 > badoblako[ekey].x) {
                            //console.log(badoblako[ekey].x);
                            
                            //explosions.push(new Explosion(badoblako[ekey].x + badoblako[ekey].w / 2, badoblako[ekey].y + badoblako[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete badoblako and make damage
                            delete badoblako[ekey];
                            iLife -= iDamage;

                            if (iLife <= 0) { // Game over
                                bPause = true;

                                // draw score
                               /* ctx.font = '38px Verdana';
                                ctx.fillStyle = '#fff';
                                ctx.fillText('Game over, your score: ' + iScore * 10 + ' points:'+ plane.y, 25, 200);*/
                                bDrawDialog = true;
                                iDialogPage = 4;  
                                isEnd = true;
                               // return;
                            }
                        }
                  //  }
                }
            }
                    for (var ekey in stars) {
			if (stars[ekey] != undefined) {
                    //collision with stars
                    if (stars[skey] != undefined) {
                        if (plane.y - plane.h/2 < stars[ekey].y + stars[ekey].h/2 && plane.x - plane.w/2 < stars[ekey].x + stars[ekey].w && plane.x + plane.w/2 > stars[ekey].x) {
                            //explosions.push(new Explosion(badoblako[okey].x + badoblako[okey].w / 2, badoblako[okey].y + badoblako[okey].h / 2, 120, 120, 0, oExplosionImage));
                            console.log(plane.y);
                            // delete enemy and make damage
                            delete stars[skey];
                            iScore++;

                            }
                        }
                        }
                    }
        }
                }
            }
        }
        // display life and score
        ctx.font = '14px Verdana';
        ctx.fillStyle = '#FFF6EC';
        ctx.fillText('Топливо: ' + iLife + ' / 100', 75, 660);
        ctx.fillText('Очки: ' + iScore * 10, 33, 680);
    }       
    }
}

// -------------------------------------------------------------

// Process Pressed Keys function
function processPressedKeys() {
    if (pressedKeys[37] != undefined) { // 'Left' key
        if (iSprPos > 0) {
            iSprPos = 2;
            iMoveDir = -3;//скорость поворота самолета
        }
        if (plane.x - plane.w / 2 > 10) {
            plane.x += iMoveDir;
        }
    }
    else if (pressedKeys[39] != undefined) { // 'Right' key
        if (iSprPos < 2) {
            iSprPos = 0;
            iMoveDir = 3;
        }
        if (plane.x + plane.w / 2 < canvas.width - 10) {
            plane.x += iMoveDir;
        }
    }
}

// инициализация
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    
    backgroundImage = new Image();
    backgroundImage.src = 'images/levelmap.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }

    // initialization of explosion image
    oExplosionImage = new Image();
    oExplosionImage.src = 'images/explosion.png';
    oExplosionImage.onload = function() { }

    // initialization of empty cloud
    oCloudImage = new Image();
    oCloudImage.src = 'images/oblako_1.png';
    oCloudImage.onload = function() { }
    
    // initialization of badoblako
    oBadoblakoImage = new Image();
    oBadoblakoImage.src = 'images/badoblako.png';
    oBadoblakoImage.onload = function() { }

    //initialization of stars
    oStarsImage = new Image();
    oStarsImage.src = 'images/zvezda.png';
    oStarsImage.onload = function() { }
    
    //initialization of coins 
    oCoinsImage = new Image();
    oCoinsImage.src = 'images/coin.png';
    oCoinsImage.onload = function() { }

    // initialization of plane1
    var oPlaneImage = new Image();
    oPlaneImage.src = 'images/plan.png';
    oPlaneImage.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlaneImage);
    }
    // initialization of plane2
    var oPlane2Image = new Image();
        oPlane2Image.src = 'images/plan2.png';
        oPlane2Image.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlane2Image);
    }

    // загрузка кнопки меню
    var buttonImage = new Image();
    buttonImage.src = 'images/menu1.png';
    buttonImage.onload = function() {
    }
    // загрузка кнопки паузы
    var pauseImage = new Image();
    pauseImage.src = 'images/pause-button1.png';
    pauseImage.onload = function() {
    }
    button = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 100, 202, 52, 'normal', buttonImage);//кнопка Новая игра
    button1 = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 35, 202, 52, 'normal', buttonImage); //кнопка Выбор самолета
    button2 = new Button(ctx.canvas.width/2 - 300, ctx.canvas.height/2 + 250, 202, 52, 'normal', buttonImage); //кнопка возврат в Меню из диалога Выбора самолета
    button3 = new Button(ctx.canvas.width/2 - 250, ctx.canvas.height/2 + 40, 202, 52, 'normal', buttonImage); //кнопка Предыдущий самолет
    button4 = new Button(ctx.canvas.width/2 + 50, ctx.canvas.height/2 + 40, 202, 52, 'normal', buttonImage); //кнопка Следующий самолет
    pausebutton = new Button(ctx.canvas.width/2 - 345, ctx.canvas.height/2 - 345, 38, 38, 'normal', pauseImage); //кнопка паузы
    button5 = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 35, 202, 52, 'normal', buttonImage); //кнопка Сохранить и выйти
    button6 = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 + 30, 202, 52, 'normal', buttonImage); //кнопка Выйти без сохранения
    helpbutton = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 + 25, 202, 52, 'normal', buttonImage); //кнопка Справка
    Continuepbutton = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 165, 202, 52, 'normal', buttonImage); //кнопка Продолжить
    NewGamepbutton = new Button(ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 25, 202, 52, 'normal', buttonImage); //кнопка Новая игра
    playerbutton = new Button(ctx.canvas.width/2 - 100, ctx.canvas.height/2 + 85, 202, 52, 'normal', buttonImage); //кнопка Смена игрока
    
    $(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }
    });

    $(window).keyup(function (evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            // revert plane sprite to default position
            if (iSprPos > 1) {
                for (var i = iSprPos; i >= 1; i--) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            } else {
                for (var i = iSprPos; i <= 1; i++) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            }
        }
    });

    $('#scene').mousedown(function(e) { // привязываем событие нажатия мыши (для перетаскивания)

        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        
        if (iDialogPage == 2)
            {
                if (mouseX >  ctx.canvas.width/2 - 100 && mouseX <  ctx.canvas.width/2 - 100 + 200 && mouseY > ctx.canvas.height/2 - 200 && mouseY < ctx.canvas.height/2 - 200 + 200) {
                    bplane = true;
                }
                else
                {
                    bplane = false;
                }
            }
        if (iDialogPage == 5)
        {
            if (mouseX >  ctx.canvas.width/2 - 100 && mouseX <  ctx.canvas.width/2 - 100 + 200 && mouseY > ctx.canvas.height/2 - 200 && mouseY < ctx.canvas.height/2 - 200 + 200) {
               ichgplayer = true;
            }
            else
            {
               ichgplayer = false;
            }
        }

        // поведение кнопок
        if(button.visible)
        {        
            if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                button.state = 'pressed';
                button.imageShift = 112;
            }
        }
        if(button1.visible)
        {        
            if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                button1.state = 'pressed';
                button1.imageShift = 112;
            }
        }
        if(button2.visible)
        {        
            if (mouseX > button2.x && mouseX < button2.x+button2.w && mouseY > button2.y && mouseY < button2.y+button2.h) {
                button2.state = 'pressed';
                button2.imageShift = 112;
            }
        }   
        if(button3.visible)
        {        
            if (mouseX > button3.x && mouseX < button3.x+button3.w && mouseY > button3.y && mouseY < button3.y+button3.h) {
                button3.state = 'pressed';
                button3.imageShift = 112;
            }
        }  
        if(button4.visible)
        {        
            if (mouseX > button4.x && mouseX < button4.x+button4.w && mouseY > button4.y && mouseY < button4.y+button4.h) {
                button4.state = 'pressed';
                button4.imageShift = 112;
            }
        }  
        if(pausebutton.visible)
        {        
            if (mouseX > pausebutton.x && mouseX < pausebutton.x+pausebutton.w && mouseY > pausebutton.y && mouseY < pausebutton.y+pausebutton.h) {
                pausebutton.state = 'pressed';
                pausebutton.imageShift = 0;
            }
        }
        if(button5.visible)
        {        
            if (mouseX > button5.x && mouseX < button5.x+button5.w && mouseY > button5.y && mouseY < button5.y+button5.h) {
                button5.state = 'pressed';
                button5.imageShift = 112;
            }
        }  
        if(button6.visible)
        {        
            if (mouseX > button6.x && mouseX < button6.x+button6.w && mouseY > button6.y && mouseY < button6.y+button6.h) {
                button6.state = 'pressed';
                button6.imageShift = 112;
            }
        }
        if(helpbutton.visible)
        {        
            if (mouseX > helpbutton.x && mouseX < helpbutton.x+helpbutton.w && mouseY > helpbutton.y && mouseY < helpbutton.y+helpbutton.h) {
                helpbutton.state = 'pressed';
                helpbutton.imageShift = 112;
            }
        }
        if(Continuepbutton.visible)
	{
            if (mouseX > Continuepbutton.x && mouseX < Continuepbutton.x+Continuepbutton.w && mouseY > Continuepbutton.y && mouseY < Continuepbutton.y+Continuepbutton.h) {
                Continuepbutton.state = 'pressed';
                Continuepbutton.imageShift = 112;
            }
	}
        if(NewGamepbutton.visible)
	{
            if (mouseX > NewGamepbutton.x && mouseX < NewGamepbutton.x+NewGamepbutton.w && mouseY > NewGamepbutton.y && mouseY < NewGamepbutton.y+NewGamepbutton.h) {
                NewGamepbutton.state = 'pressed';
                NewGamepbutton.imageShift = 112;
            }
	}
        if(playerbutton.visible)
	{
            if (mouseX > playerbutton.x && mouseX < playerbutton.x+playerbutton.w && mouseY > playerbutton.y && mouseY < playerbutton.y+playerbutton.h) {
                playerbutton.state = 'pressed';
                playerbutton.imageShift = 112;
            }
	}
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        // поведение кнопок
        if(button.visible)
        {
            if (button.state != 'pressed') {
                button.state = 'normal';
                button.imageShift = 0;
                if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                    button.state = 'hover';
                    button.imageShift = 54;
                }
            }
        }
        if(button1.visible)
        {
            if (button1.state != 'pressed') {
                button1.state = 'normal';
                button1.imageShift = 0;
                if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                    button1.state = 'hover';
                    button1.imageShift = 54;
                }
            }
        }
        if(button2.visible)
        {
            if (button2.state != 'pressed') {
                button2.state = 'normal';
                button2.imageShift = 0;
                if (mouseX > button2.x && mouseX < button2.x+button2.w && mouseY > button2.y && mouseY < button2.y+button2.h) {
                    button2.state = 'hover';
                    button2.imageShift = 54;
                }
            }
        }
        if(button3.visible)
        {
            if (button3.state != 'pressed') {
                button3.state = 'normal';
                button3.imageShift = 0;
                if (mouseX > button3.x && mouseX < button3.x+button3.w && mouseY > button3.y && mouseY < button3.y+button3.h) {
                    button3.state = 'hover';
                    button3.imageShift = 54;
                }
            }
        }
        if(button4.visible)
        {
            if (button4.state != 'pressed') {
                button4.state = 'normal';
                button4.imageShift = 0;
                if (mouseX > button4.x && mouseX < button4.x+button4.w && mouseY > button4.y && mouseY < button4.y+button4.h) {
                    button4.state = 'hover';
                    button4.imageShift = 54;
                }
            }
        }
        if(pausebutton.visible)
        {
            if (pausebutton.state != 'pressed') {
                pausebutton.state = 'normal';
                pausebutton.imageShift = 0;
                if (mouseX > pausebutton.x && mouseX < pausebutton.x+pausebutton.w && mouseY > pausebutton.y && mouseY < pausebutton.y+pausebutton.h) {
                    pausebutton.state = 'hover';
                    pausebutton.imageShift = 0;
                }
            }
        }
        if(button5.visible)
        {
            if (button5.state != 'pressed') {
                button5.state = 'normal';
                button5.imageShift = 0;
                if (mouseX > button5.x && mouseX < button5.x+button5.w && mouseY > button5.y && mouseY < button5.y+button5.h) {
                    button5.state = 'hover';
                    button5.imageShift = 54;
                }
            }
        }
        if(button6.visible)
        {
            if (button6.state != 'pressed') {
                button6.state = 'normal';
                button6.imageShift = 0;
                if (mouseX > button6.x && mouseX < button6.x+button6.w && mouseY > button6.y && mouseY < button6.y+button6.h) {
                    button6.state = 'hover';
                    button6.imageShift = 54;
                }
            }
        }
        if(helpbutton.visible)
        {
            if (helpbutton.state != 'pressed') {
                helpbutton.state = 'normal';
                helpbutton.imageShift = 0;
                if (mouseX > helpbutton.x && mouseX < helpbutton.x+helpbutton.w && mouseY > helpbutton.y && mouseY < helpbutton.y+helpbutton.h) {
                    helpbutton.state = 'hover';
                    helpbutton.imageShift = 54;
                }
            }
        }
        if(Continuepbutton.visible)
	{
            if (Continuepbutton.state != 'pressed') {
                Continuepbutton.state = 'normal';
                Continuepbutton.imageShift = 0;
                if (mouseX > Continuepbutton.x && mouseX < Continuepbutton.x+Continuepbutton.w && mouseY > Continuepbutton.y && mouseY < Continuepbutton.y+Continuepbutton.h) {
                    Continuepbutton.state = 'hover';
                    Continuepbutton.imageShift = 54;
                }
            }
	}
        if(NewGamepbutton.visible)
	{
            if (NewGamepbutton.state != 'pressed') {
                NewGamepbutton.state = 'normal';
                NewGamepbutton.imageShift = 0;
                if (mouseX > NewGamepbutton.x && mouseX < NewGamepbutton.x+NewGamepbutton.w && mouseY > NewGamepbutton.y && mouseY < NewGamepbutton.y+NewGamepbutton.h) {
                    NewGamepbutton.state = 'hover';
                    NewGamepbutton.imageShift = 54;
                }
            }
	}
        if(playerbutton.visible)
	{
            if (playerbutton.state != 'pressed') {
                playerbutton.state = 'normal';
                playerbutton.imageShift = 0;
                if (mouseX > playerbutton.x && mouseX < playerbutton.x+playerbutton.w && mouseY > playerbutton.y && mouseY < playerbutton.y+playerbutton.h) {
                    playerbutton.state = 'hover';
                    playerbutton.imageShift = 54;
                }
            }
	}
    });

    $('#scene').mouseup(function(e) { // привязываем событие отжатия кнопки

        // поведение кнопок
        //кнопка Новая игра
        if(button.visible)
        {
            if (button.state === 'pressed') {
                  Generate();
                  NoSave();
                  iDialogPage = 0;
                  bDrawDialog = false;
                  bPause = false;
                  button.visible=false;
                  helpbutton.visible=false;
                  playerbutton.visible=false;
                  button1.visible=false;
                  button2.visible=false;
                  button3.visible=false;
                  button4.visible=false;
                  NewGamepbutton.visible=false;
                  Continuepbutton.visible=false;
            }
                
        }
        button.state = 'normal';
        button.imageShift = 0;
        //кнопка Продолжить
        if(Continuepbutton.visible)
        {
            if (Continuepbutton.state === 'pressed') {
                  iDialogPage = 0;
                  bDrawDialog = false;
                  bPause = false;
                  button.visible=false;
                  helpbutton.visible=false;
                  playerbutton.visible=false;
                  button1.visible=false;
                  button2.visible=false;
                  button3.visible=false;
                  button4.visible=false;
                  Continuepbutton.visible=false;
            }
        }
        Continuepbutton.state = 'normal';
        Continuepbutton.imageShift = 0;
        //кнопка Выбор самолета
        if(button1.visible)
        {
            if (button1.state === 'pressed') {
                iDialogPage = 2;
                changePlane = true;
                button.visible=false;
                helpbutton.visible=false;
                button1.visible=false;
                playerbutton.visible=false;
                button2.visible=true;
                button3.visible=true;
                button4.visible=true;
                NewGamepbutton.visible=false;
                Continuepbutton.visible=false;
            }
        }
        button1.state = 'normal';
        button1.imageShift = 0;
        //кнопка возврат в Меню из диалога Выбора самолета
        if(button2.visible)
        {
            if (button2.state === 'pressed') {
              iDialogPage = 1;
              button.visible=true;
              helpbutton.visible=true;
              playerbutton.visible=true;
              button1.visible=true;
              button2.visible=false;
              button3.visible=false;
              button4.visible=false;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
            }

        }
        button2.state = 'normal';
        button2.imageShift = 0;
        //кнопка Предыдущий самолет
        if(button3.visible)
        {
            if (button3.state === 'pressed') {
              if(changePlane)
              {
                 bplane = false;
                   if (iplane > 1 )
                    {
                       iplane = iplane - 1;
                    }
              }
              else
              {
                 ichgplayer = false;
                   if (iplayer > 1 )
                    {
                       iplayer = iplayer - 1;
                    }
              } 
              button.visible=false;
              helpbutton.visible=false;
              playerbutton.visible=false;
              button1.visible=false;
              button2.visible=true;
              button3.visible=true;
              button4.visible=true;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
            }

        }
        button3.state = 'normal';
        button3.imageShift = 0;
        //кнопка Следующий самолет
        if(button4.visible)
        {
            if (button4.state === 'pressed') {
              if(changePlane)
              {
                 bplane = false;
                  if (iplane >= 1 )
                  {
                     iplane = iplane + 1;
                  }
              }
              else
              {
                 ichgplayer = false;
                   if (iplayer >= 1 )
                    {
                       iplayer = iplayer + 1;
                    }
              } 
              button.visible=false;
              helpbutton.visible=false;
              playerbutton.visible=false;
              button1.visible=false;
              button2.visible=true;
              button3.visible=true;
              button4.visible=true;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
            }
        }
        button4.state = 'normal';
        button4.imageShift = 0;
        //кнопка паузы
        if(pausebutton.visible)
        {
            if (pausebutton.state === 'pressed') {
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
              playerbutton.visible=false;
              if (pauseclick == 0)
              {
                drawGradient();
                bPause = true;
                pauseclick = 1;
                button5.visible=true;
                button6.visible=true;
              }
              else if (pauseclick == 1)
              {
                bPause = false;
                pauseclick = 0;
                button5.visible=false;
                button6.visible=false;
              }
            }
        }
        pausebutton.state = 'normal';
        pausebutton.imageShift = 0;
        //кнопка Сохранить и выйти
        if(button5.visible)
        {
            if (button5.state === 'pressed') {
              clear();
              bDrawDialog = true;
              drawDialog();
              isSave = true;
              iDialogPage = 1;
              button.visible=true;
              helpbutton.visible=true;
              playerbutton.visible=true;
              button1.visible=true;
              button2.visible=false;
              button3.visible=false;
              button4.visible=false;
              button5.visible=false;
              button6.visible=false;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
              if(isEnd)
              {
                  NoSave();    
              }
            }

        }
        button5.state = 'normal';
        button5.imageShift = 0;
        //кнопка Выйти без сохранения
        if(button6.visible)
        {
            if (button6.state === 'pressed') {
              // clear canvas
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              bDrawDialog = true;
              drawDialog();
              isSave = false;
              iDialogPage = 1;
              NoSave();
              button.visible=true;
              helpbutton.visible=true;
              playerbutton.visible=true;
              button1.visible=true;
              button2.visible=false;
              button3.visible=false;
              button4.visible=false;
              button5.visible=false;
              button6.visible=false;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
            }

        }
        button6.state = 'normal';
        button6.imageShift = 0;
        //кнопка Справка
        if(helpbutton.visible)
        {
            if (helpbutton.state === 'pressed') {
                iDialogPage = 3;
                button.visible=false;
                helpbutton.visible=false;
                playerbutton.visible=false;
                button1.visible=false;
                button2.visible=true;
                button3.visible=false;
                button4.visible=false;
                NewGamepbutton.visible=false;
                Continuepbutton.visible=false;
            }
        }
        helpbutton.state = 'normal';
        helpbutton.imageShift = 0;
        //кнопка Смена игрока
        if(playerbutton.visible)
        {
            if (playerbutton.state === 'pressed') {
                iDialogPage = 5;
                playerbutton.visible=false;
                button.visible=false;
                helpbutton.visible=false;
                button1.visible=false;
                button2.visible=true;
                button3.visible=false;
                button4.visible=false;
                button3.visible=true;
                button4.visible=true;
                NewGamepbutton.visible=false;
                Continuepbutton.visible=false;
            }
        }
        playerbutton.state = 'normal';
        playerbutton.imageShift = 0;
    });
        displayIntro(); // Display intro once
    });
