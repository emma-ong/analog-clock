function clock(){
//1. Calculate angle
   //create multiple empty variables
  let d, h, m, s;
  d = new Date; 

  /*How the clockworks: 
    * 60 seconds : 360 degrees 
    * 1 second : 6 degrees (every second, hand moves 6 degrees)
    * 12 o'clock to 3 o'clock --> 90 degrees
    * 1hr --> 30 degrees (hr hand on clock)
    * 1min --> 6 degrees (min hand on clock)
    * 1sec --> 6 degrees (secs hand on clock)
  */

    //.getHours --> returns hour (0-23) of the date (d)
    //d.getHours() % 12 --> working in mod 12 --> https://nrich.maths.org/4350
      //x%12 returns number relative to mod Y e.g mod 7
      //13%7, number resets to 1 at 7, so x is 6
    //30 multiplied because 1hr is the equivalent to 30degrees
      //so at any point of time, h represents angle/degrees is at based on time
    h = 30 * ( (d.getHours() % 12) + d.getMinutes()/60);
    m = 6 * d.getMinutes();
    s = 6 * d.getSeconds();

//2. Move hands
    //sets the id values to the values of h, m s, or s+180 
    setAttr('h-hand', h);
    setAttr('m-hand', m);
    setAttr('s-hand', s);
    setAttr('s-tail', s+180) // the back tail is 180 degrees the other way (opposite end)
    //setAttr('cat', s); original 
    setAttr('cat', s);

//3. Display time to users 
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();

    //h is back to time again, not angle
    if(h>=12){
      setText("suffix", "PM")
    }else{
      setText("suffix", "AM")
    }

    //%= is the same as h = h % 12
    //if h is not 12
    //h will display the remainder, so not 24-hr time

    if(h != 12){
      h%=12; 
    }

    //UNDER HTML div time-text, displays to users
    setText("sec", s)
    setText("min", m)
    setText("hr", h)

    //call every second
    setTimeout(clock,1000)

};

function setAttr(id,val){
  //rotate() accepts rotation in radians (rotate(angle, [axis]))
    //(+)tive angles = clockwise
    //(-)tive angles = anticlockwise
    //x and y axis at 70
  let v = `rotate(${val},140,140)`;
  document.getElementById(id).setAttribute('transform', v);

};

function setText (id,val){
  if(val < 10){
    val = `0${val}`;
  }
  document.getElementById(id).innerHTML = val;
};

function catShuffle(){
  //x-axis remains at 112 always
  let cat = document.getElementById("cat")
  // //make cat move up and down seconds hand 
  // if(cat.getAttribute("y") === "20"){
  //   cat.setAttribute("y", "60")
  // } else {
  //   cat.setAttribute("y", "20")
  // }
  
  //random generated numbers for each separate y-axis (min and max)
  let randomYSec = getRandomIntInclusive(21, 140)
  let randomYMin = getRandomIntInclusive(40, 120)
  let randomYHr = getRandomIntInclusive(70, 120)
  
  //redefine angle values 
  d = new Date; 
  h = 30 * ( (d.getHours() % 12) + d.getMinutes()/60);
  m = 6 * d.getMinutes();
  s = 6 * d.getSeconds();

  let hands = ["h","m","s"]
  
  //randomly select from hands array 
   let randomHand = () => {
     let hand = hands[getRandomIntInclusive(0,2)]
     return hand
   }

   //store selected hand 
   let hand = randomHand()

  //if hand is h/m/s
    //change hand that cat lands on via setAttr 
    // set cat HTML attribute to reflect where on the hand it moves to
   if(hand === "h"){
    setAttr("cat", m)
    cat.setAttribute("y", randomYMin)
   }
  
    if (hand === "m"){
    setAttr("cat", s)
    cat.setAttribute("y", randomYSec)

   } 
   
   if(hand === "s"){
    setAttr("cat", h)
    cat.setAttribute("y", randomYHr)
   }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

window.onload = clock;

/*
Seconds hand
max x - 112
max y - 140
min y - 20

mins hand
max x - 112
max y - 120 
min y - 40 

hour hand
max x - 112
max y - 120
min y - 70

*/

