require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("Yo, I am alive!");

        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var dimX = paper.width;
        var dimY = paper.height;
        console.log("pWidth is " + dimX + ", and pHeight is " + dimY);
  
        //---------------------------------------------------------------------
        // creating the background rectangle on the raphael paper
        var bgRect = paper.rect(0,0,dimX, dimY/3);
        bgRect.attr({"fill" : "pink"});
        var bgRect1 = paper.rect(0, dimY/3, dimX, 2*dimY/3);
        bgRect1.attr({"fill" : "#89BEFF"});


        var circle1radius = 14; 
        var starttime;
        var play; //variable that will store the set interval function for the game
        var start = "false";
        var startgame = false;
        //setting the controls for the game
        var startButton = document.getElementById('start');
        var leftbutton = document.getElementById('left');
        var rightbutton = document.getElementById('right');
        var brickWidth = 75;
        var brickHeight = 18;

        //creating variables to store the sliders for changing the colour of the ball
        var sliderhue = document.getElementById("colorballH");
        var slidersat = document.getElementById("colorballS");
        var sliderlight = document.getElementById("colorballL");
        
       
         // creating the ball for the game
        var circle1 = paper.circle(dimX/2, dimY/2, circle1radius);
        circle1.attr({"fill" : "#8b97fc"});

        var ballhslString = function(h, s, l){
            var change = "hsl(" + h + ", " + s + "%, " + l + "%)" ;
            return change;
        }

        //to allow the user to change the colour of the ball
        sliderhue.addEventListener("input", function(ev){
            circle1.attr({ "fill" : ballhslString(sliderhue.value, slidersat.value, sliderlight.value)});
        });

        slidersat.addEventListener("input", function(ev){
            circle1.attr({ "fill": ballhslString(sliderhue.value, slidersat.value, sliderlight.value)});
        }); 

        sliderlight.addEventListener("input", function(ev){
            circle1.attr({ "fill": ballhslString(sliderhue.value, slidersat.value, sliderlight.value)});
        });

    // creating the paddle/slider that the ball will bounce off of.
        var slider = paper.rect((dimX-80)/2, dimY-15, 80, 15);
        slider.attr({ "fill" : "#3468ab"});

        //creating the obstacles for the game, that the ball can bounce off and destroy.
        var brick = paper.rect((dimX-70)/2, (dimY-10)/3, brickWidth, brickHeight);
        var brick1 = paper.rect((dimX-70)/2, (dimY-10)/4, brickWidth, brickHeight);
        var brick2 = paper.rect((dimX-70)/2, (dimY-10)/5, brickWidth, brickHeight);

        // randomise colour of the bricks to make it more fun
        brick.colorstring = "hsl(" + Math.random()+ ",1, .75)"; 
        brick.attr({ "fill" : brick.colorstring, "stroke" : "black"});
        brick1.attr({"fill" : brick.colorstring, "stroke" : "black"});
        brick2.attr({"fill" : brick.colorstring, "stroke" : "black"})

        // setting the x and y positions and moving rates for the ball, slider and bricks 
        circle1.xpos=dimX/2;
        circle1.ypos=dimY/2;
        circle1.xrate=3;
        circle1.yrate=7;
        slider.xpos = (dimX-80)/2;
        slider.xrate = 28;
        brick.xpos = (dimX-70)/2;
        brick1.xpos = (dimX-70)/2;
        brick2.xpos = (dimX-70)/2;
       
        brick.ypos = (dimY-10)/3;
        brick1.ypos = (dimY-10)/4;
        brick2.ypos = (dimY-10)/5;
        brick.xrate = 7;
        brick1.xrate = -2;
        brick2.xrate = 5
        


 // draw function that will make the ball bounce off the walls, and off the slider, as well as end the game when it touches the bottom end. 
        var draw = function(){
            
            // to change the x and y positions of the ball and the bricks and to update them as well. 
            circle1.xpos += circle1.xrate;
            circle1.ypos += circle1.yrate;
            brick.xpos += brick.xrate;
            brick1.xpos += brick1.xrate;
            brick2.xpos += brick2.xrate;
            
            circle1.attr({'cx': circle1.xpos, 'cy': circle1.ypos});
            brick.attr({'x' : brick.xpos});
            brick1.attr({'x' : brick1.xpos});
            brick2.attr({'x' : brick2.xpos});

            // to change the direction of the moving bricks when they hit the walls. 
            if (brick.xpos + brick.xrate + brickWidth > dimX){
                brick.xrate = -brick.xrate;
            };
            if (brick.xpos + brick.xrate < 0){
                brick.xrate = -brick.xrate;
            };

             if (brick1.xpos + brick1.xrate + brickWidth > dimX){
                brick1.xrate = -brick1.xrate;
            };
            if (brick1.xpos + brick1.xrate < 0){
                brick1.xrate = -brick1.xrate;
            }

            if (brick2.xpos + brick2.xrate + brickWidth > dimX){
                brick2.xrate = -brick2.xrate;
            };
            if (brick2.xpos + brick2.xrate < 0){
                brick2.xrate = -brick2.xrate;
            }
           
            // to make the bricks disappear after being hit by the ball and to change the direction of the ball when it hits the bricks 
            if (circle1.xpos + circle1.xrate > brick.xpos && circle1.xpos + circle1.xrate < brick.xpos + brickWidth){
                if (circle1.ypos + circle1.yrate > brick.ypos - brickHeight && circle1.ypos + circle1.yrate < brick.ypos) {
                    circle1.yrate = -circle1.yrate
                    brick.hide();

            } };

            if (circle1.xpos + circle1.xrate > brick1.xpos && circle1.xpos + circle1.xrate < brick1.xpos + brickWidth){
                if (circle1.ypos + circle1.yrate > brick1.ypos - brickHeight && circle1.ypos + circle1.yrate < brick1.ypos) {
                    circle1.yrate = -circle1.yrate
                    brick1.hide();
                    alert("CONGRATS!!!! YOU WON!!! (No prize though)");
                    document.location.reload();
                    clearInterval(play); // needed for chrome to end the game.
            } };

            if (circle1.xpos + circle1.xrate > brick2.xpos && circle1.xpos + circle1.xrate < brick2.xpos + brickWidth){
                if (circle1.ypos + circle1.yrate > brick2.ypos - brickHeight && circle1.ypos + circle1.yrate < brick2.ypos) {
                    circle1.yrate = -circle1.yrate
                    brick2.hide();
                    
            } };
            // to change direction of the ball whe it hits the walls and slider, and to end the game when it hits the bottom wall.
             if (circle1.xpos + circle1.xrate > dimX - circle1radius || circle1.xpos + circle1.xrate < circle1radius) {
                circle1.xrate = -circle1.xrate;
            }
            if (circle1.ypos + circle1.yrate < circle1radius) {
                circle1.yrate = - circle1.yrate;
            } else if(circle1.ypos + circle1.yrate > dimY -circle1radius){
                if(circle1.xpos > slider.xpos && circle1.xpos < slider.xpos + 80) {
                    circle1.yrate = -circle1.yrate;
                } else {alert("GAME OVER, YOU LOSE");
                        document.location.reload();
                        clearInterval(play); // Needed for Chrome to end game
                    }     }

        };

        // adding event listeners to the controls that we have created. 
        leftbutton.addEventListener("click", function(ev){
            slider.xpos -= slider.xrate;
            slider.attr({ 'x' : slider.xpos}) 
        });

        rightbutton.addEventListener('click', function(ev){
            slider.xpos += slider.xrate
            slider.attr({ 'x' : slider.xpos})
        });

        // to start the game when the button is pressed. 
         startButton.addEventListener('click', function(ev){
            if (start == "false" ){
                startgame = true;
                play = setInterval(draw, 34);

                start = "true";
            }
        });

           




});