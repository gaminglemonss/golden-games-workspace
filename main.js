<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>New webpage</title>

        <style>
            body {
                margin: 0;
            }
        </style>

    </head>
    <body>

        <script src="script.js" id="PJS_code" type="data" data-height="600" data-width="600">
              /*
            Instructions -
            W to move forward
            Mouse to turn
            Press mouse to speed up
            C to open/close inventory
            
            
            */
            
            /*
            Credits -
            
            Menu - LightningCoder, Lemon Games, Legendary Inc., Ultimate
            Buttons - LightningCoder and Lemon Games
            Particles/Shaking - TDJ
            Player/Enemies - Lemon Games
            Apple Graphic - Horizon
            Water Graphic - Ace Rogers
            Coin Graphic - Ace Rogers
            Powerups Graphics - Legend Oryx
            Inventory - Lemon Games
            Shooting - XEC32
            
            Inspired from Liam K.'s evolv.io
            
            Assignments -
            Lemon Games: Inventory, Items, Coins
            Fireball: Powerups
            Astro: Enemy AI
            
            */
            
            
            //Golden Games 2022
            // /cs/pro/5733417664643072
            
            var player;
            
            var scene = 'load'; // Go to line 1050 to change the scene
            
            var world = {
                width: 5000,
                height:  5000,
                randomX: random(0, this.width),
                randomY: random(0, this.height),
            };
            var cam = {
                x: 0,
                y: 0,
            };
            var shake = {
                x: 0,
                y: 0,
                t: 0,
                run: false,
            };
            
            var stages = ['seed', 'seedling', 'sapling', 'tree', 'ultimate'];
            var animations = [
                {
                    type: 0,
                    x: -600,
                    y: 100,
                    size: 60,
                    message: "Instructions",
                    to: width/2,
                    scene: "help",
                },
                {
                    type: 1,
                    x: width/2,
                    y: 800,
                    size: 30,
                    message: "Use mouse to look around, and W/up\nto move forward, and S/down to move\nbackwards. Space to shoot.\nDefeat the other players and reign\nsupreme.\n\nGood luck!",
                    to: height/2,
                    scene: "help",
                },
                {
                    type: 0,
                    x: -600,
                    y: 100,
                    size: 60,
                    message: "Credits",
                    to: width/2,
                    scene: "credits",
                },
                {
                    type: 1,
                    x: width/2,
                    y: 800,
                    size: 35,
                    message: "Made by Golden Games 2022",
                    to: height/2,
                    scene: "credits",
                },
            ];
            var powerups = [];
            var players = [];
            var apples = [];
            var waters = [];
            var rocks = [];
            var coins = [];
            var logs = [];
            var projectiles = [];
            
            var w = floor(random(1,2));
            
            var r = [
                random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500), random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500)];
            var r1 = [random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500),random(0, 500)];
            var rNum = 0;
            
            var aA = 0;
            var enemies = [];
            var amount = 5;
            for(var i = 0; i < amount; i++) {
                enemies.push({
                    x: random(0, width),
                    y: random(0, height),
                    size: 50,
                    stage: floor(random(1,4)),
                    vx: random(1, 3) * (random() < 0.5 ? 1 : 1),
                    vy: random(1, 3) * (random() < 0.5 ? 1 : 1),
                    color: color(255, 255, 0)
                });
            }
            
            var keys = {};
            
            var clicked = false;
            var dev = true;
            
            textAlign(CENTER,CENTER);
            textFont(createFont("Century Gothic Bold"),46);
            size(600, 600, P2D);
            
            //Graphic Functions
            var leaf = function(x, y, w, h, r, color, type){
                pushMatrix();
                translate(x, y);
                scale(w/10, h/10);
                rotate(r);
                if(type === 1){
                    fill(red(color) - 60, green(color) - 60, blue(color) - 60, alpha(color));
                    beginShape();
                    vertex(0, 24);
                    bezierVertex(5, 2, 27, 7, 9, -25);
                    vertex(5, -25);
                    bezierVertex(-15, 2, -6, 7, 0, 24);
                    endShape();
                    
                    fill(color);
                    beginShape();
                    vertex(0, 24);
                    bezierVertex(-5, -3, 1, -1, 9, -25);
                    vertex(5, -25);
                    bezierVertex(-15, 2, -6, 7, 0, 24);
                    endShape();
                }else if(type === 2){
                    fill(red(color) - 60, green(color) - 60, blue(color) - 60, alpha(color));
                    beginShape();
                    vertex(0, 24);
                    bezierVertex(-5, 2, -27, 7, -9, -25);
                    vertex(-5, -25);
                    bezierVertex(15, 2, 6, 7, 0, 24);
                    endShape();
                    
                    fill(color);
                    beginShape();
                    vertex(0, 24);
                    bezierVertex(2, -3, -17, -1, -9, -25);
                    vertex(-5, -25);
                    bezierVertex(15, 2, 6, 7, 0, 24);
                    endShape();
                }
                
                popMatrix();
            };
            var golden = function(x, y, w, h, color, lvl){
                switch(lvl){
                    case 1:
                        pushMatrix();
                translate(x, y);
                scale(w/50, h/50);
                noStroke();
                fill(color);
                beginShape();
                vertex(-3, -46);
                bezierVertex(15, -20, 30, -23, 35, 0);
                bezierVertex(31, 46, -39, 34, -34, 0);
                bezierVertex(-31, -24, -13, -18, -3, -46);
                endShape();
                
                fill(red(color) - 60, green(color) - 60, blue(color) - 60, alpha(color));
                beginShape();
                vertex(-0, -41);
                bezierVertex(15, -20, 34, -23, 35, 0);
                bezierVertex(34, 46, -39, 34, -34, 0);
                bezierVertex(-35, 36, 31, 34, 29, 0);
                bezierVertex(26, -23, 6, -24, -0, -41);
                endShape();
                
                ellipse(7.5, 11.5, 5.5, 5.5);
                ellipse(-14.4, 14.7, 5.5, 5.5);
                fill(255);
                ellipse(8, 11, 2, 2);
                ellipse(-14, 14, 2, 2);
                popMatrix();
                break;
                case 2:
                    pushMatrix();
                translate(x, y);
                noStroke();
                scale(w/50, h/50);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60, alpha(color));
                
                beginShape();
                vertex(42, -97);
                bezierVertex(1, -80, -21, -49, -6, -25);
                bezierVertex(1, -17, -22, -31, -18, 9);
                bezierVertex(-12, 28, 7, 24, 8, 23);
                bezierVertex(9, 27, 29, 22, 19, 13);
                bezierVertex(18, 12, 30, -5, 13, -17);
                bezierVertex(2, -23, 0, -19, -1, -25);
                bezierVertex(14, -42, 26, -29, 32, -57);
                bezierVertex(32, -72, 29, -79, 42, -97);
                endShape();
                
                fill(color);
                beginShape();
                vertex(42, -97);
                bezierVertex(1, -80, -21, -49, -6, -25);
                bezierVertex(1, -17, -22, -31, -18, 9);
                bezierVertex(-18, 11, -16, 8, -16, 15);
                bezierVertex(4, 37, 35, -8, 0, -22);
                bezierVertex(10, -18, -1, -26, -7, -17);
                bezierVertex(2, -23, 0, -19, -1, -25);
                bezierVertex(-9, -54, 33, -88, 42, -97);
                endShape();
                
                ellipse(-11.5, 25.5, 15, 7);
                
                beginShape();
                vertex(8, 22);
                bezierVertex(12, 9, 28, 13, 18, 23);
                bezierVertex(20, 21, 20, 8, 8, 22);
                endShape();
                
                fill(red(color) - 60, green(color) - 60, blue(color) - 60, alpha(color));
                ellipse(4, 6.6, 3.6, 3.6);
                ellipse(-10, 9.8, 3.6, 3.6);
                ellipse(-12.8, 26.2, 11, 6);
                
                fill(153, 150, 0);
                ellipse(4, 6.8, 2, 2);
                ellipse(-10, 9.8, 2, 2);
                popMatrix();
                break;
                case 3:
                    pushMatrix();
                translate(x, y + 50);
                scale(w/50, h/50);
                fill(red(color), green(color), blue(color));
                ellipse(0, 0, 50, 50);
                
                
                leaf(0, -37, 7, 7, 0, color, 2);
                leaf(37, 0, 7, 7, 90, color, 1);
                leaf(-37, 0, 7, 7, -90, color, 2);
                leaf(0, 37, 7, 7, 180, color, 1);
                
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, -5, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, -5, 4, 4);
                fill(255);
                ellipse(-10, -5, 2, 2);
                
                pushMatrix();
                translate(20, 0);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, -5, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, -5, 4, 4);
                fill(255);
                ellipse(-10, -5, 2, 2);
                popMatrix();
                popMatrix();
                break;
                case 4:
                    pushMatrix();
                translate(x, y + 50);
                scale(w/50, h/50);
                fill(red(color), green(color), blue(color));
                ellipse(0, 0, 50, 50);
                
                
                leaf(0, -37, 7, 7, 0, color, 2);
                leaf(37, 0, 7, 7, 90, color, 1);
                leaf(-37, 0, 7, 7, -90, color, 2);
                leaf(0, 37, 7, 7, 180, color, 1);
                leaf(28, -24, 7, 7, 47, color, 2);
                leaf(29, 25, 7, 7, 119, color, 1);
                leaf(-28, -27, 7, 7, -31, color, 2);
                leaf(-27, 26, 7, 7, 219, color, 1);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, -5, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, -5, 4, 4);
                fill(255);
                ellipse(-10, -5, 2, 2);
                
                pushMatrix();
                translate(20, 0);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, -5, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, -5, 4, 4);
                fill(255);
                ellipse(-10, -5, 2, 2);
                popMatrix();
                popMatrix();
                break;
                case 5:
                    pushMatrix();
                translate(x, y + 50);
                scale(w/50, h/50);
                    for (var i = 0; i < 33; i ++){
                        pushStyle();
                stroke(230, 255, 0, 5);
                strokeWeight(i);
                fill(red(color), green(color), blue(color));
                ellipse(0, 0, 50, 50);
                
                
                leaf(0, -37, 7, 7, 0, color, 2);
                leaf(37, 0, 7, 7, 90, color, 1);
                leaf(-37, 0, 7, 7, -90, color, 2);
                leaf(0, 37, 7, 7, 180, color, 1);
                leaf(28, -24, 7, 7, 47, color, 2);
                leaf(29, 25, 7, 7, 119, color, 1);
                leaf(-28, -27, 7, 7, -31, color, 2);
                leaf(-27, 26, 7, 7, 219, color, 1);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, 0, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, 0, 4, 4);
                fill(255);
                ellipse(-10, 0, 2, 2);
                
                        popStyle();
                    }
                pushMatrix();
                translate(20, 0);
                fill(red(color) - 60, green(color) - 60, blue(color) - 60);
                ellipse(-10, 0, 6, 6);
                fill(red(color) - 30, green(color) - 30, blue(color) - 30);
                ellipse(-10, 0, 4, 4);
                fill(255);
                ellipse(-10, 0, 2, 2);
                popMatrix();
                popMatrix();
                break;
                }
            };
            var water = function(x, y, sz){
                pushMatrix();
                    translate(x, y);
                    scale(sz);
                    
                    // Water {
                    
                    noStroke();
                    fill(0, 100, 255);
                    ellipse(17, -4, 20, 20);
                    ellipse(-4, -4, 15, 15);
                    ellipse(11, -7, 30, 20);
                    ellipse(9, 7, 30, 30);
                    ellipse(-3, 7, 20, 20);
                    
                    // }
                    
                    // Lighting {
                    
                    noFill();
                    stroke(0, 120, 255);
                    strokeWeight(2);
                    arc(-4, -4, 10, 10, -180, -90);
                    arc(-3, 7, 15, 15, -230, -140);
                    arc(11, -4, 25, 20, -80, 30);
                    arc(9, 7, 25, 25, 20, 100);
                    
                    // }
                    
                popMatrix();
            };
            var apple = function(x, y, s) {
                pushMatrix();
                    translate(x, y);
                    scale(s);
                    
                    scale(1.3);
                    
                    noFill();
                    stroke(110, 68, 33);
                    strokeWeight(3);
                    arc(1, 1, 5, 10, 90, 270);
                    
                    noStroke();
                    fill(191, 0, 0);
                    
                    beginShape();
                        vertex(0, 0);
                        bezierVertex(15, -5, 8, 18, 3, 15);
                        bezierVertex(-13, 17, -9, -5, -1, 1);
                    endShape();
                    
                    noFill();
                    strokeWeight(2);
                    stroke(232, 63, 63);
                    
                    arc(3, 5, 5, 5, 258, 398);
                    
                    stroke(158, 6, 6);
                    arc(-1, 10, 5, 5, 432, 558);
                    
                popMatrix();
            };
            var coin = function (x, y, sz) {
                pushMatrix();
                    translate(x, y);
                    scale(sz);
                    
                    // Coin {
                    
                    noStroke();
                    fill(180, 150, 10);
                    ellipse(1.5, 0, 20, 30);
                    
                    fill(200, 170, 10);
                    ellipse(0, 0, 20, 30);
                    
                    strokeWeight(0.6);
                    stroke(180, 150, 10);
                    ellipse(0, 0, 15, 25);
                    
                    // }
                    
                    // 1 {
                    
                    noStroke();
                    fill(180, 150, 10);
                    beginShape();
                    vertex(-3.5, -3);
                    vertex(-1, -6);
                    vertex(1, -6);
                    vertex(1, 6);
                    vertex(-1, 6);
                    vertex(-1, -3);
                    vertex(-2, -2);
                    endShape(CLOSE);
                    
                    noStroke();
                    fill(166, 138, 13);
                    beginShape();
                    vertex(-0.7, -3);
                    vertex(-0.7, 6);
                    vertex(-1, 6);
                    vertex(-1, -3);
                    endShape(CLOSE);
                    
                    beginShape();
                    vertex(-3.5, -3);
                    vertex(-1, -6);
                    vertex(-0.7, -6);
                    vertex(-3.1, -3.1);
                    vertex(-1.8, -2.2);
                    vertex(-2, -2);
                    endShape(CLOSE);
                    
                    // }
                    
                    // Lighting {
                    
                    noFill();
                    strokeWeight(1);
                    stroke(220, 185, 20);
                    arc(0, 0, 18, 28, -180, -90);
                    
                    // }
                    
                    // Shading {
                    
                    noStroke();
                    fill(0, 10);
                    arc(0, 0, 20, 30, -45, 135);
                    
                    // }
                    
                popMatrix();
            };
            var rock = function(x, y, s){
                pushMatrix();
                translate(x, y);
                scale(s);
                
                fill(158, 158, 158);
                stroke(97, 97, 97);
                strokeWeight(7);
                strokeCap(SQUARE);
                
                beginShape();
                vertex(35, 0);
                vertex(18, 35);
                vertex(46, 60);
                vertex(82, 54);
                vertex(89, 8);
                vertex(61, -6);
                vertex(32, 2);
                endShape();
                
                popMatrix();
            };
            var onCanvas = function(obj){
                return obj.x > cam.x - obj.w && obj.x < cam.x + width &&
                       obj.y > cam.y - obj.h && obj.y < cam.y + height;
            };
            
            //Custom Functions
            var grid = function(){
                for (var i = 0; i < world.width/60; i ++){
                    for (var j = 0; j < world.height/60; j ++){
                        var newGrid = {x: j * 60, y: i * 60, w: 60, h: 60};
                        if (onCanvas(newGrid)){
                            strokeCap(SQUARE);
                            strokeWeight(3);
                            stroke(0, 122, 14);
                            line(0, i * 60, world.width - 20, i * 60);
                            line(j * 60, 0, j * 60, world.height - 20);
                        }
                    }
                }
            };
            var circCirc = function(c1,c2) {
                return dist(c1.x,c1.y,c2.x,c2.y) < c2.size/2;
            };
            
            function Button(x, y, txt, sign, to){
                this.x = x;
                this.y = y;
                this.txt = txt;
                this.sign = sign;
                this.to = to;
                this.width = 200;
                this.x1 = this.x;
                this.x2 = this.x + this.width/2;
                this.y1 = this.y;
                this.y2 = this.y + 25;
                this.flipped = false;
                this.radius=5;
            }
            Button.prototype.draw = function() {
                fill(255, 225, 0);
                rect(this.x1+3, this.y1+5, this.width/2, 25);
                rect(this.x1+3, this.y2, this.width/2, 25);
                rect(this.x2+3, this.y1+5, this.width/2, 25);
                rect(this.x2+3, this.y2, this.width/2, 25);
                
                
                if (!this.flipped){
                    fill(0);
                    textSize(-this.txt.length + 36);
                    text(this.txt, this.x + this.width/2, this.y + 27);
                }
                if (this.flipped){
                    fill(0);
                    textSize(30);
                    text(this.sign, this.x + this.width/2, this.y + 27);
                }
                
                if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + 50){
                    this.x1 = lerp(this.x1, this.x - this.width/3, 0.5);
                    this.x2 = lerp(this.x2, this.x + this.width, 0.5);
                    this.y1 = lerp(this.y1, this.y - 25, 0.5);
                    this.y2 = lerp(this.y2, this.y + 50, 0.5);
                    
                    if (clicked){
                        scene = this.to;
                    }
                    
                    this.flipped = true;
                } else {
                    this.x1 = lerp(this.x1, width/2-100, 0.5);
                    this.x2 = lerp(this.x2, this.x + this.width/2, 0.5);
                    this.y1 = lerp(this.y1, this.y, 0.5);
                    this.y2 = lerp(this.y2, this.y + 25, 0.5);
                    
                    this.flipped = false;
                }
            };
            
            var homebutton = new Button(width/2-100, 206, "Play", "▶", "game");
            var howbutton = new Button(width/2-100, 295, "How", "?", "help");
            var creditbutton = new Button(width/2-100, 376, "Credits", "©", "credits");
            var backbutton = new Button(width/2-100, 500, "Back", "⬅", 'menu');
            
            var imgs = {
                seed: function(){
                    background(0, 0, 0, 0);
                    golden(width/2, 302, 200, 200, color(255, 251, 0), 1);
                    
                    return get(0, 0, width, height);
                },
                seedling: function(){
                    background(0, 0, 0, 0);
                    golden(width/2, 302, 150, 150, color(255, 251, 0), 2);
                    return get(0, 0, width, height);
                },
                sapling: function(){
                    background(0, 0, 0, 0);
                    golden(width/2, 302, 150, 150, color(255, 251, 0), 3);
                    return get(0, 0, width, height);
                },
                ultimate: function(){
                    background(0, 0, 0, 0);
                    golden(width/2, height/2, 150, 150, color(255, 251, 0), 5);
                    
                    return get(0, 0, width, height);
                },
                tree: function(){
                    background(0, 0, 0, 0);
                    golden(width/2, 302, 150, 150, color(255, 251, 0), 4);
                    return get(0, 0, width, height);
                },
                apple: function(){
                    background(0, 0, 0, 0);
                    apple(width/2, 127, 20);
                    
                    return get(0, 0, width, height);
                },
                water: function(){
                    background(0, 0, 0, 0);
                    water(width/2, height/2, 8);
                    
                    return get(0, 0, width, height);
                },
                coin: function(){
                    background(0, 0, 0, 0);
                    coin(width/2, height/2, 2);
                    
                    return get();
                },
            };
            
            function Particle(config) {
                this.x = config.x;
                this.y = config.y;
                this.w = config.w;
                this.r = config.r;
                
                this.clr = config.clr;
                this.o = config.o;
                
                this.xv = config.xv;
                this.yv = config.yv;
                this.rv = config.rv;
                
                this.dead = false;
                
                this.display = function() {
                    pushMatrix();
                    translate(this.x, this.y);
                    rotate(this.r);
                    noStroke();
                    fill(this.clr, this.o);
                    rect(0, 0, this.w, this.w);
                    popMatrix();
                };
                
                this.update = function() {
                    this.x += this.xv;
                    this.y += this.yv;
                    this.r += this.rv;
                    this.o -= 3;
                    
                    if (this.o <= 0) {
                        this.dead = true;
                    }
                };
            }
            function Projectile(config) {
                this.x = config.x;
                this.y = config.y;
                this.rotation = config.rotation;
                this.speed = config.speed;
                this.damage = config.damage;
                this.lifetime = config.lifetime;
                this.dead = false;
                
                this.display = function() {
                    pushMatrix();
                    translate(this.x, this.y);
                    rotate(this.rotation);
                    
                    fill(251, 255, 0);
                    noStroke();
                    rectMode(CENTER);
                    rect(0, 0, 10, 50, 5);
                    rectMode(CORNER);
                    
                    popMatrix();
                };
                this.update = function() {
                    this.x += sin(this.rotation) * this.speed;
                    this.y -= cos(this.rotation) * this.speed;
                    this.lifetime -= 1;
                };
                this.inflictDamage = function() {
                    for (var i = players.length-1; i >= 0; i--) {
                        var p = players[i];
                        if (dist(this.x, this.y, p.x, p.y) < p.size/2) {
                            this.dead = true;
                            p.health -= this.damage;
                            shake.run = true;
                            
                            for (var j = projectiles.length-1; j >= 0; j --){
                                projectiles.splice(j, 1);
                            }
                        }
                    }
                    if (dist(this.x, this.y, player.x, player.y) < player.size/2) {
                        this.dead = true;
                        player.health -= this.damage;
                        shake.run = true;
                        
                        for (var j = projectiles.length-1; j >= 0; j --){
                            projectiles.splice(j, 1);
                        }
                    }
                };
            }
            
            function Invetory(){
                this.y = -600;
                this.opened = false;
                
                this.draw = function() {
                    pushMatrix();
                    pushStyle();
                    translate(0, this.y);
                    noStroke();
                    fill(0,75);
                    rect(0, 0, width, height);
                    image(imgs[player.name.level], 100, 175, 200, 200);
                    
                    fill(255);
                    textSize(60+-player.name.name.length);
                    text(player.name.name + "'s Stats", width/2, 76);
                    
                    textSize(30);
                    textAlign(LEFT);
                    text("Stage - " + player.name.level + "\n" + player.health.toFixed() + "HP", 179, 175);
                    stroke(255);
                    strokeWeight(5);
                    noFill();
                    for (var i = 0; i < 3; i ++){
                        rect(i*75 + 60, 300, 70, 70);
                    }
                    
                    image(imgs.apple, 95, 335, 50, 50);
                    image(imgs.coin, 168, 335);
                    textSize(25);
                    text(player.apples, 112, 361);
                    text(player.money, 188, 361);
                    
                    text('[E] to eat an apple and gain +10 health\n\n[C] to exit inventory', 60, 421);
                    popStyle();
                    
                    popMatrix();
                    
                    if (this.opened){
                        this.y = lerp(this.y, 0, 0.05);
                    } else if (!this.opened) {
                        this.y = lerp(this.y, -600, 0.05);
                    }
                };
            }
            
            var inv = new Invetory();
            
            var drawEnemies = function() { 
                for(var i = 0; i < enemies.length; i++) {
                    //get the current enemy
                    var enemy = enemies[i];
                    
                    //if the enemy hits one of the sides of the world...
                    if( enemy.x <= enemy.size / 2 || enemy.x >= 700 - enemy.size / 2 ||
                        enemy.y <= enemy.size / 2 || enemy.y >= 700 - enemy.size / 2) {
                        
                        //change the vertical/horizontal directions
                        enemy.vx = random(1, 3) * (random() < 0.5 ? 1 : -1);
                        enemy.vy = random(1, 3) * (random() < 0.5 ? 1 : -1);
                    }
                    
                    //move in the current directions
                    enemy.x = constrain(enemy.x + enemy.vx, enemy.size / 2, world.w - enemy.size / 2);
                    enemy.y = constrain(enemy.y + enemy.vy, enemy.size / 2, world.h - enemy.size / 2);
                    
                    
                    noStroke();
                    golden(enemy.x, enemy.y, enemy.size, enemy.size, enemy.color,enemy.stage);
                    textAlign(CENTER);
                    textFont(createFont("Roboto"), enemy.tSize);
                   fill(0, 255, 21);
                   strokeWeight(3);
                        stroke(0, 122, 14);
                    rect(enemy.x - enemy.size, enemy.y - enemy.size, 100, 10);
                }
            };
            var drawApples = function() {
            apple(r[0],r[10], 1.5);
            apple(r[1],r[11], 1.5);
            apple(r[2],r[12], 1.5);
            apple(r[3],r[13], 1.5);
            apple(r[4],r[14], 1.5);
            apple(r[5],r[15], 1.5);
            apple(r[6],r[16], 1.5);
            apple(r[7],r[17], 1.5);
            apple(r[8],r[18], 1.5);
            apple(r[9],r[19], 1.5);
            };
            var drawWater = function() {
                water(r1[0],r1[1],4);
                water(r1[2],r1[3],4);
            };
            
            function Entity(x, y, type){
                this.x = x;
                this.y = y;
                this.size = 100;
                this.kills = 0;
                this.angle = -27;
                this.focus = player;
                this.speed = 5;
                this.health = 100;
                this.hydrate = 100;
                this.apples = 0;
                this.money = 0;
                this.particles = [];
                
                this.names = [
                    {
                        name: "Lemon Games",
                        level: "sapling",
                    },
                    {
                        name: "Captain Longtreader",
                        level: "tree",
                    },
                    {
                        name: "Ace Rogers",
                        level: "seedling",
                    },
                    {
                        name: "TDJ",
                        level: "sapling",
                    },
                    {
                        name: "Kev",
                        level: "sapling",
                    },
                    {
                        name: "LightBender",
                        level: "sapling",
                    },
                ];
                this.target = player;
                this.name = this.names[~~random(this.names.length)];
                this.g = get();
                
                this.stage = this.name.level;
                this.mood = "idle";
                this.type = type;
            
                this.damage = 10;
                this.reload = 0;
                this.reloadTime = 20;
                this.spread = 0;
                this.dead = false;
                
                this.draw = function() {
                    for (var i in this.particles) {
                        var part = this.particles[i];
                        
                        part.display();
                        part.update();
                        
                        if (part.dead) {
                            this.particles.splice(i, 1);
                        }
                    }
                    
                    pushMatrix();
                    imageMode(CENTER);
                    translate(this.x, this.y);
                    rotate(-this.angle);
                    image(imgs[this.name.level], 0, 0, this.size, this.size);
                    
                    popMatrix();
                    if (this.type==="enemy"){
                        fill(0, 255, 21);
                        pushStyle();
                        rectMode(CENTER);
                        rect(this.x, this.y - this.size/3, this.health, 10);
                        popStyle();
                    }
                    fill(0);
                    textSize(20);
                    text((dev?"Stat: "+this.mood+"\n":"") + this.name.name, this.x, this.y - this.size/2);
                };
                this.move = function(){
                    this.x = constrain(this.x, this.size/4, world.width - this.size/2);
                    this.y = constrain(this.y, this.size/4, world.height - this.size/2);
                    this.hydrate = constrain(this.hydrate,0,100);
                    this.health = constrain(this.health,0,100);
                    switch(this.type){
                        case 'player':
                            {
                                this.name.level = 'seed';
                                this.angle = atan2(mouseX - width/2, mouseY - height/2);
                                
                                if (keys.w || keys[UP]){
                                    this.x+= sin(this.angle)*this.speed; 
                                    this.y += cos(this.angle)*this.speed;
                                }
                                if (keys.s || keys[DOWN]){
                                    this.x -= sin(this.angle)*this.speed; 
                                    this.y -= cos(this.angle)*this.speed;
                                }
                                
                                if (mouseIsPressed){
                                    this.speed = 7;
                                } else {
                                    this.speed = 5;
                                }
                                
                                if (this.hydrate > 0){
                                    this.health += 0.05;
                                }
                                
                                this.hydrate -= 0.02;
                            
                            }
                        break;
                        case 'enemy':
                            {
                                var dp = dist(this.x,this.y,player.x,player.y);
                                for (var i in waters){
                                    var w = waters[i];
                                    var dw = dist(this.x, this.y, w.x, w.y);
                                    if (dw <= 300 && this.mood!=='attack') {
                                        this.mood = 'drink';
                                    }
                                } 
                                
                                if (dp <= 250){
                                    this.mood = "attack";
                                } else {
                                    this.mood = 'idle';
                                }
                                
                                if (this.mood==="attack"){
                                    this.angle = atan2(this.target.x-this.x,this.target.y-this.y);
                                    this.target = player;
                                    if (dp >= 150){
                                        this.x += sin(this.angle)*2;
                                        this.y += cos(this.angle)*2;
                                    }
                                    if (this.reload <= 0){
                                        projectiles.push(new Projectile({
                                            x: this.x+sin(this.angle)*50,
                                            y: this.y+cos(this.angle)*50,
                                            rotation: (-this.angle+180) + random(-this.spread/2, this.spread/2),
                                            speed: 20,
                                            damage: 5,
                                            lifetime: 200
                                        })); 
                                        this.reload = this.reloadTime;
                                    }
                                }
                                if (this.mood==="drink"){
                                    this.angle = atan2(this.target.x-this.x,this.target.y-this.y);
                                    for (var i in waters){
                                        this.target = waters[i];
                                    }
                                    this.x += sin(this.angle)*2;
                                    this.y += cos(this.angle)*2;
                                }
                            }
                        }
                    
                    if (frameCount % 3 === 0) {
                        this.particles.push(new Particle({
                            x: this.x,
                            y: this.y,
                            w: random(2, 5),
                            r: random(0, 360),
                            clr: color(255, 251, 0),
                            o: random(150, 220),
                            xv: random(-0.5, 0.5),
                            yv: random(-0.5, 0.5),
                            rv: random(-0.5, 0.5),
                        }));
                    }
                    
                    for (var i in waters){
                        if (circCirc(this,waters[i])){
                            this.hydrate+=0.05;
                            this.speed = 3;
                        }
                    }
                    for (var i in rocks){
                        var ang = atan2(this.x-rocks[i].x,this.y-rocks[i].y);
                        
                        if (circCirc(this,rocks[i])){
                            while (circCirc(this,rocks[i])){
                            
                                this.x += cos(ang)/3;
                                this.y += sin(ang)/3;
                            }
                        }
                    }
                    
                    if (this.health <= 0){
                        this.dead = true;
                    }
                    
                    this.reload --;
                };
                this.shoot = function() {
                    this.reload --; 
                    if (this.reload < 0) {
                        this.reload = 0;
                    }
                    if (this.type === "player" && keys[32] && this.reload <= 0) {
                        projectiles.push(new Projectile({
                            x: this.x+sin(this.angle)*50,
                            y: this.y+cos(this.angle)*50,
                            rotation: (-this.angle+180) + random(-this.spread/2, this.spread/2),
                            speed: 20,
                            damage: this.damage,
                            lifetime: 200
                        })); 
                        this.reload = this.reloadTime;
                    }
                };
            }
            
            function Apple(x, y){
                this.x = x;
                this.y = y;
                this.size = 50;
                
                this.draw = function() {
                    image(imgs.apple, this.x, this.y, this.size, this.size);
                };
            }
            function Water(x, y){
                this.x = x;
                this.y = y;
                this.size = 250;
                
                this.draw = function() {
                    image(imgs.water, this.x, this.y, this.size, this.size);
                };
            }
            for (var i = 0; i < 6; i ++){
                waters.push(new Water(random(100, world.width), random(100, world.height)));
            }
            
            player = new Entity(random(0, world.width), random(0, world.height), 'player');
            
            
            var curLoad = 0;
            function load(){
                
                var obj = Object.keys(imgs);
                var l = obj.length;
                
                imgs[obj[curLoad]] = imgs[obj[curLoad]]();
                
                curLoad ++;
                
                if (curLoad >= Object.keys(imgs).length){
                    scene = 'game';
                }
                
                background(0);
                pushStyle();
                noFill();
                strokeWeight(10);
                strokeCap(SQUARE);
                stroke(255);
                arc(width/2, height/2, 300, 300, 0, curLoad*100);
                popStyle();
                fill(255);
                textSize(49);
                text("Loading...", width/2, 100);
            }
            
            for (var i = 0; i < 14; i ++){
                    players.push(new Entity(random(0, world.width), random(0, world.height), 'enemy'));
            }
            for (var i in players){
                players[i].draw();
                players[i].move();
                players[i].stage = stages[~~floor(random(stages.length))];
            }
            
            function menu(){
                grid();
                drawWater();
                drawApples();
                drawEnemies();
                
                textAlign(CENTER,CENTER);
                textFont(createFont("Century Gothic Bold"),46);
                
                fill(255, 255, 255);
                text("golden.io",300,80);
                
                noStroke();
                homebutton.draw();
                howbutton.draw();
                creditbutton.draw();
            }
            function game(){
                translate(shake.x, shake.y);
                translate(-cam.x, -cam.y);
                translate(mouseX/50, mouseY/50);
                grid();
                
                cam.x = lerp(cam.x, player.x - width/2, 0.05);
                cam.y = lerp(cam.y, player.y - height/2, 0.05);
                
                for (var i = apples.length-1; i >= 0; i --){
                    apples[i].draw();
                    
                    if (circCirc(player, apples[i])){
                        player.apples++;
                        apples.splice(i, 1);
                    }
                }
                for (var i in waters){
                    waters[i].draw();
                }
                for (var i = players.length-1; i >= 0; i --){
                    players[i].draw();
                    players[i].move();
                    
                    if (players[i].dead){
                        players.splice(i, 1);
                    }
                }
                for (var i in projectiles){
                    projectiles[i].display();
                    projectiles[i].update();
                    projectiles[i].inflictDamage();
                }
                
                if (frameCount % 100 === 0){
                    apples.push(new Apple(random(0, world.width), random(0, world.height)));
                }
                
                player.draw();
                player.move();
                player.shoot();
                
                resetMatrix();
                
                pushStyle();
                    stroke(204, 204, 204, 75);
                    strokeWeight(10);
                    fill(4, 255, 0);
                    rect(50, 500, player.health*5, 50, 38);
                    fill(0, 128, 255);
                    rect(50, 437, player.hydrate*5, 50, 38);
                popStyle();
                
                inv.draw();
                
                noStroke();
                fill(0, 75);
                rect(0, 550, 50, 50);
                
                fill(255);
                textSize(50);
                text("...", 25,560);
                
                if (mouseX>0&&mouseX<50&&mouseY>550&&mouseY<height&&clicked){
                    inv.opened = !inv.opened;
                }
                
                if (shake.run) {
                    shake.x = lerp(shake.x, random(-5, 5), 0.5);
                    shake.y = lerp(shake.y, random(-5, 5), 0.5);
                    shake.t++;
                } else {
                    shake.x = 0;
                    shake.y = 0;
                    shake.t = 0;
                }
                if (shake.t > 60) {
                    shake.x = 0;
                    shake.y = 0;
                    shake.t = 0;
                    shake.run = false;
                }
            }
            function help(){
                grid();
            
                noStroke();
                backbutton.draw();
            }
            function credits(){
                grid();
            
                
                noStroke();
                backbutton.draw();
            }
            
            draw = function() {
                try {
                background(0, 140, 2);
                this[scene]();
                
                for (var i in animations){
                    var a = animations[i];
                    
                    if (scene===a.scene){
                        fill(0);
                        textSize(a.size);
                        text(a.message, a.x, a.y);
                        
                        void(a.type===0?a.x = lerp(a.x, a.to, 0.05):null);
                        void(a.type===1?a.y = lerp(a.y, a.to, 0.05):null);
                    }
                }
                
                clicked=false;
                }catch(e){
                    _clearLogs();
                    println(e);
                }
            };
            
            keyPressed = function(){
                keys[key.toString().toLowerCase()] = true;
                keys[keyCode] = true;
                if (keys.c){
                    inv.opened = !inv.opened;
                }
                if (keys.e&&player.apples>0&&player.health<100){
                    player.apples--;
                    player.health+=10;
                }
            };
            keyReleased = function(){
                delete keys[key.toString().toLowerCase()];
                delete keys[keyCode];
            };
            mouseReleased = function(){
                clicked = true;
            };


        </script>
        <script src="https://cdn.jsdelivr.net/gh/vExcess/library_files@main/runPJS_onKA.js"></script>

    </body>
</html>
