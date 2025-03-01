import { Token } from "@berachain-foundation/berancer-sdk";

var drops: any[] = [];

var stopped = false;
// @ts-ignore
var timeouts = [];

export const rain = () => {
    var c: any = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var max = 20;


function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function O() {}

O.prototype = {
	init: function() {
		this.x = random(0, w);
		this.y = 0;
		this.color = 'hsl(180, 100%, 50%)';
		this.w = 2;
		this.h = 1;
		this.vy = random(3, 4);
		this.vw = 3;
		this.vh = 1;
		this.size = 2;
		this.hit = random(h * .8, h * .9);
		this.a = 1;
		this.va = .96;
	},
	draw: function() {
		if (this.y > this.hit) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y - this.h / 2);

			ctx.bezierCurveTo(
				this.x + this.w / 2, this.y - this.h / 2,
				this.x + this.w / 2, this.y + this.h / 2,
				this.x, this.y + this.h / 2);

			ctx.bezierCurveTo(
				this.x - this.w / 2, this.y + this.h / 2,
				this.x - this.w / 2, this.y - this.h / 2,
				this.x, this.y - this.h / 2);

			ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
			ctx.stroke();
			ctx.closePath();
			
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.size, this.size * 5);
		}
		this.update();
	},
	update: function() {
		if(this.y < this.hit){
			this.y += this.vy;
		} else {
			if(this.a > .03){
				this.w += this.vw;
				this.h += this.vh;
				if(this.w > 100){
					this.a *= this.va;
					this.vw *= .98;
					this.vh *= .98;
				}
			} else {
				if (stopped) return;
				this.init();
			}
		}
		
	}
}

function resize(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
}

function setup(){
	drops = [];
	for(var i = 0; i < max; i++){
		(function(j){
			timeouts.push(setTimeout(function(){
				if (stopped) return;
                // @ts-ignore
				var o = new O();
				o.init();
				drops.push(o);
			}, j * 100))
		}(i));
	}
}


function anim() {
	ctx.clearRect(0,0,w,h);
	for(var i in drops){
		drops[i].draw();
	}
	requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);
stopped = false;
let shouldAnim = !drops.length;
setup();
if (shouldAnim) {
	anim();
}
}

export function stop() {
	stopped = true;
	// @ts-ignore
	timeouts.forEach((timeout) => {
		clearTimeout(timeout);
	});
}

export const getTokenImageUrl = (token: Token) => {
	if (token.symbol === 'USDC') {
		return 'https://berascan.com/token/images/usdc_32.png';
	}

	return `https://berascan.com/token/images/honeybera_32.png`;
}
