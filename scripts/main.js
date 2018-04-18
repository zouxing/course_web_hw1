var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

function ondraw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var frames = 0;
    var colors = ['#ff6666', '#9933ff', '#cc0099', '#0ff', '#0f0'];
    document.addEventListener('keydown', function(evt){
        if (evt.keyCode === 32) {
            createNewFruit();
            createNewFruit();
            createNewFruit();
        }
    });
	
	function dodrop(event){
	  var dt = event.dataTransfer;
	  var files = dt.files;

	  var count = files.length;
	  document.getElementById("output").textContent = "succesful into dodrop";
	  output("File Count: " + count + "\n");

		for (var i = 0; i < files.length; i++) {
		  output(" File " + i + ":\n(" + (typeof files[i]) + ") : <" + files[i] + " > " +
				 files[i].name + " " + files[i].size + "\n");
		}
	}

	function output(text){
	  document.getElementById("output").textContent += text;
	  //dump(text);
	}


    function createNewFruit() {
        var x = Math.random() * canvas.width / 2 + canvas.width / 4;
        var vx = Math.random()*20 + -10;
        var vy = Math.random()*10 + -35;
        var radius = Math.random()*10 + 10;
        var color = colors[Math.floor(Math.random()*colors.length)];
        fruits.push(new Fruit(x, vx, vy, radius, color));
    }
    function Fruit(x, vx, vy, radius, color) {
        this.x = x;
        this.y = canvas.height;
        this.vx = vx;
        this.vy = vy; // -25 ~ -35
        this.ax = 0;
        this.ay = 1;
        this.radius = radius;
        this.color = color;
    }
    Fruit.prototype.update = function () {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
    };
    Fruit.prototype.isOut = function() {
        return this.x + this.radius < 0 || this.x - this.radius > canvas.width
            || this.y + this.radius < 0 || this.y - this.radius > canvas.height;
    };
    Fruit.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    var fruits = {
        _fruits: [],
        push: function(fruit) {
            this._fruits.push(fruit);
        },
        update: function() {
            // reverse loop for deletion
            for (var i = this._fruits.length-1; i >= 0; i --) {
                this._fruits[i].update();
                if (this._fruits[i].isOut()) {
                    this._fruits.splice(i, 1);
                }
            }
        },
        draw: function() {
            this._fruits.forEach(function(element, index){
                element.draw();
            });
        }
    };
    function loop() {
        frames ++;
        if (frames % 2 === 0) {
            fruits.update();
        }
        if (frames % 5 === 0) {
            createNewFruit();
        }
        ctx.clearRect(0,0, canvas.width, canvas.height);
        fruits.draw();
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
}