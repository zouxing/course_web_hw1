function ondraw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
	var startGame = "Start Game";
	ctx.font = "130px Arial ";
	ctx.strokeStyle = 'white';
	ctx.strokeText(startGame,270,350);
	
	
	var showRanking = 0;
	document.getElementById("apple").addEventListener("click", changeDefaultFruit);
	document.getElementById("banana").addEventListener("click", changeDefaultFruit);
	document.getElementById("basaha").addEventListener("click", changeDefaultFruit);
	document.getElementById("peach").addEventListener("click", changeDefaultFruit);
	document.getElementById("btnRanking").addEventListener("click", listAllItems);
	document.getElementById("btnRule").addEventListener("click", openRule);
	document.getElementById("btnLink").addEventListener("click", openLink);
	
	var Bomb = new Image();
	Bomb.src ="images/fruit/bomb.png";
	var BombSrc = Bomb.src;
	var FruitSrc = "images/fruit/apple.png";
	var isBomb = 0;  //控制現在出現的水果是否為bomb
	document.getElementById("output").addEventListener("drop", function(event){
		
		var dt = event.dataTransfer;
		var files = dt.files;
		Bomb.src ="images/fruit/"+files[0].name;
		BombSrc = Bomb.src;
		//document.getElementById("output").textContent = "images/fruit/"+files[0].name+"\n" ;
		document.getElementById("bbomb").src = BombSrc;
		
		  
	});
	
	var audio = document.getElementById("bgMusic");
	audio.loop = true;
	audio.play();
	
	
	<!--defaultFruit.addEventListener("mouseover", slice);-->
	
	
	
	var errorCount = 0;
			
		var defaultFruit = new Image();
		defaultFruit.src ="images/fruit/apple.png";
		
		var lp = new Image();
		lp.src ="images/score.png";
		
		var err1 = new Image();
		err1.src ="images/x.png";
		
		var err2 = new Image();
		err2.src ="images/xx.png";
		
		var err3 = new Image();
		err3.src ="images/xxx.png";
		
		<!-- var defaultFruit = document.getElementById("apple"); -->
		
		
		var score = 0 ;
		
		
		
		
		
		var x =Math.random()* (canvas.width*0.75);;
		var y =canvas.height-10;
		var dx = 0.2;
		var dy = -2;
		var mousePos;
		var myVar;
		
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
			  x: evt.clientX - rect.left,
			  y: evt.clientY - rect.top
			};
		}
	  
		canvas.addEventListener("mousemove", function(evt){
			mousePos = getMousePos(canvas, evt);
			
			<!--drawKnift(mousePos); -->
			
			if(mousePos.x < x + (defaultFruit.width/2) && (mousePos.x > x - (defaultFruit.width/2))){
				if((mousePos.y < y + (defaultFruit.height/2)) && (mousePos.y > y - (defaultFruit.height/2))){
					if(isBomb == 0){
						var audio1 = document.getElementById("sliceMusic");
						audio1.play();
						score++;
						createFruit();
					}
					else{
						gameOver();
					}
				}
			
				<!--alert("text"); -->
			}
		
		},false);
		
		canvas.addEventListener("click", function(evt){
			mousePos = getMousePos(canvas, evt);
			
			<!--drawKnift(mousePos); -->
			
			if(mousePos.x < 1000 && (mousePos.x > 270)){
				if((mousePos.y < 600) && (mousePos.y > 250)){
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					myVar =  setInterval(draw, 5);
				}
			
				
			}
		
		},false);
		
		
		
		function showRanking() {
			//var myHeading = document.querySelector('h1');
			//myHeading.textContent = 'GameOver!';
			//document.getElementById("showRank").textContent = localStorage.getItem("789");
			var tttxt="";
			for(var key in localStorage){
				//tttxt = tttxt + localStorage.getItem(localStorage.ket(i));
				console.log(key);
			}
			document.getElementById("showRank").textContent = tttxt ;	
			
			
		}
		
		function openRule(){
			var myWindow = window.open("", "MsgWindow", "width=600,height=300");
			myWindow.document.write("<p>規則：</p> <p><br>滑鼠移動即可切水果<br>每切一個水果score+1<br>當切到炸彈時，即顯示GameOver<br>或當水果掉落沒有切到3次，也顯示GameOver");
		}
		
		function openLink(){
			document.getElementById("link").style.right = 150 + "px" ;
			var imgFB= document.createElement('IMG');
			imgFB.setAttribute("src", "images/facebook.png");
			imgFB.setAttribute("id","btnFB");
			imgFB.setAttribute("width","25");
			imgFB.setAttribute("height","25");
			imgFB.onclick = function(){
				var myWindow = window.open("https://zh-tw.facebook.com/", "MsgWindow", "width=800,height=800");
			};
			var imgTT= document.createElement('IMG');
			imgTT.setAttribute("src", "images/twitter.png");
			imgTT.setAttribute("id","btnTT");
			imgTT.setAttribute("width","25");
			imgTT.setAttribute("height","25");
			imgTT.onclick = function(){
				var myWindow = window.open("https://twitter.com/?lang=zh-tw", "MsgWindow", "width=800,height=800");
			};
			document.body.appendChild(imgFB);
			document.body.appendChild(imgTT);
			
		}
		
		function cmp(a, b) {
			return a[1].localeCompare(b[1]);
		}
		

		function listAllItems(){  
			if(showRanking == 0){
				var arr = [];
				
				for (i=0; i<=localStorage.length-1; i++)  
				{  
					key = localStorage.key(i);  
					//alert("user: "+ key + "score is: " +localStorage.getItem(key));
					
					arr.push([key,localStorage.getItem(key)]);
					
					
				} 
				arr.sort(cmp);
				
				var ttttxt="name  score <br>";
				var cnt;
				if(arr.length>10){
					cnt=arr.length-9;
					
				}
				else{
					cnt=0;
				}
					
				for(i=arr.length-1; i>cnt;i--)
				{	
					ttttxt=  ttttxt + "<br>" + arr[i];
				}
				
				document.getElementById("showRank").innerHTML = ttttxt;
				showRanking = 1;
			}
			else{
				document.getElementById("showRank").innerHTML = "";
				showRanking = 0;
			}
			
		}

	
		function createFruit() {
			x = Math.random()* (canvas.width*0.75);
			y = canvas.height-30;
			dx = 0;
			dy = -2;
			
			var step =  Math.random()* 4;
			if (step<3){
				isBomb = 0;
				defaultFruit.src = FruitSrc ;
				
			}
			else{
				isBomb = 1;
				defaultFruit.src = BombSrc;
				
			}
		}
		
		function changeDefaultFruit() {
			
			if(this.id == "apple"){
				defaultFruit.src ="images/fruit/apple.png";
				FruitSrc = defaultFruit.src;
				
			}
			else if(this.id == "banana"){
				defaultFruit.src ="images/fruit/banana.png";
				FruitSrc = defaultFruit.src;
				
			}
			else if(this.id == "basaha"){
				defaultFruit.src ="images/fruit/basaha.png";
				FruitSrc = defaultFruit.src;
				
			}
			else{
				defaultFruit.src ="images/fruit/peach.png";
				FruitSrc = defaultFruit.src;
				
			}
		}	
		
		function slice() {
			

			alert("text"); 
			if(this.clientX < (x+20) )
			{
				alert("text"); 
				score++;
				var tt1 = document.querySelector('h1');
				tt1.textContent = score.toString() ;
				
				gameOver();
			}
		}
		
		function drawBall() {
		
			ctx.drawImage(defaultFruit,x,y);
			ctx.drawImage(lp,20,20);
			ctx.drawImage(err1,1000,20);
			ctx.drawImage(err2,1050,20);
			ctx.drawImage(err3,1100,20);
			ctx.font = "30px Arial ";
			ctx.strokeText(score,90,50);
			ctx.font = "130px Arial ";
			//ctx.strokeText(startGame,270,350);
			
		
			ctx.beginPath();
			//ctx.arc(x, y, 10, 0, Math.PI*2);
			//ctx.fillStyle = "#0095DD";
			//ctx.fill();
			//ctx.closePath();
			
			
			
		}
		
		function drawKnift() {
			
			ctx.strokeStyle = "white";
			ctx.lineWidth = 8;
			ctx.moveTo(mousePos.x +50, mousePos.y-30); 
			ctx.lineTo(mousePos.x -40, mousePos.y+20); 
			ctx.stroke()
			
			ctx.lineWidth = 3;
			ctx.moveTo(mousePos.x -30, mousePos.y-20); 
			ctx.lineTo(mousePos.x +30, mousePos.y+60); 
			ctx.stroke()
		}
		
		function draw()
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawBall();
			drawKnift();
			x += dx;
			
			if(y<10){
				dy = dy*(-1);
			}
			
			y += dy;
			if(y>canvas.height )
			{
				if(isBomb == 0)
				{
					errorCount++;
					if(errorCount ==1){
						err1.src ="images/xf.png";
					}
					else if(errorCount ==2){
						err2.src ="images/xxf.png";
					}
					else if(errorCount ==3){
						err3.src ="images/xxxf.png";
						ctx.drawImage(err3,1100,20);
						gameOver();
						
					}
				}
				createFruit();
			}
		}
		
		//var myVar =  setInterval(draw, 5);
		
		function gameOver() {
			
			clearInterval(myVar);
			
			//var myHeading = document.querySelector('h1');
			//myHeading.textContent = 'GameOver!';
			
		var askNameBox = prompt("your score is :" + score.toString() + "!!! \n Please input your name!!");
		if (askNameBox == null || askNameBox == "") {
			//myHeading.textContent  = "nono User cancelled the prompt.";
			console.log("nothing");
		} 
		else {
			//myHeading.textContent  ="!yesy es How are you today?";
			localStorage.setItem( askNameBox , score);
		}
			
			
			
			//alert("your score is :" + score.toString() + "!!!");
			 
			
			
		}
		
		
	
	   
}