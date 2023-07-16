let choice = []
let count =0;
let match = 0;
let sec = 0;
let min = 0;

generateCards();


function updateTime(){
    sec = 0;
    min = 0;
    time=setInterval(() => {
        sec++;
        sec = sec < 10 ? "0" + sec : sec;
        document.getElementById('sec').innerText = sec;
        if (sec == 60) {
            sec = 0;
            document.getElementById('sec').innerText = "00";
            if(min<10){
                document.getElementById('min').innerHTML = `0${++min}:`;
            }
            else{
                document.getElementById('min').innerHTML = `${++min}:`;
            }
        }
    }, 1000)
}

function generateCards(){
    let randomArray = new Array;
    let f1=0,f2=0,f3=0,f4=0,f5=0,f6=0;
    let fruits = ['mango','mango','apple','apple','banana','banana','orange','orange','grapes','grapes','strawberry','strawberry'];
    let str =''
    while(randomArray.length < 12){
        let randomIndex= Math.ceil(Math.random()*(13-1))-1
        if(!randomArray.includes(randomIndex)){
            randomArray.push(randomIndex);
        }
    }
    let cardArray = [];
    for(num of randomArray){
        cardArray.push(fruits[randomArray[num]]);
    }
    // console.log(cardArray);
    let container = document.getElementById('container');
    // console.log(container)
    for(let fruit of cardArray){
        switch(fruit){
            case "mango":
                f1++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f1}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="mango" src="/img/mango.png">
                        </div>
                    </div>
                </div>
             `;
             break;
            case "apple":
                f2++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f2}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="apple" src="/img/apple.png">
                        </div>
                    </div>
                </div>
             `;
             break;
            case "banana":
                f3++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f3}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="banana" src="/img/banana.png">
                        </div>
                    </div>
                </div>
             `;
             break;
            case "orange":
                f4++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f4}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="orange" src="/img/orange.png">
                        </div>
                    </div>
                </div>
             `;
             break;
            case "grapes":
                f5++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f5}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="grapes" src="/img/grapes.png">
                        </div>
                    </div>
                </div>
             `;
             break;
            case "strawberry":
                f6++;
                str +=`
                <div class="card">
                    <div class="card__inner" id="${fruit+f6}" onclick="clicked(this.id)">
                        <div class="card__face card__face--front">
                            <h2>JumbleCard</h2>
                        </div>
                        <div class="card__face card__face--back">
                            <img class="strawberry" src="/img/strawberry.png">
                        </div>
                    </div>
                </div>
             `;
             break;
        } 
    }
    container.innerHTML = str;
    
}

let startbtn = document.getElementById('start');
startbtn.addEventListener('click', function start(){
    document.getElementById('restart').removeAttribute('disabled')
    let gameBody = document.getElementById('gameBody');
    gameBody.classList.remove('index')
    updateTime();
    setTimeout(() => {
        startbtn.classList.add('unvisible')
        startbtn.setAttribute('disabled','true')
        restartbtn.classList.remove('unvisible'); 
    }, 1000);
})

let restartbtn = document.getElementById('restart');
restartbtn.addEventListener('click',()=>{
    startbtn.classList.add('unvisble');
    clearInterval(time);
    document.getElementById('min').innerHTML = `00:`;
    document.getElementById('sec').innerText= '00';
    updateTime();
    generateCards();
})

function clicked(id){
    document.getElementById(id).classList.add('nonClickable')
    document.getElementById(id).classList.add('is-flipped')
    count++;
    if(count<2){
        choice.push(id);
    }
    else if(count==2){
        let gameBody = document.getElementById('gameBody');
        gameBody.classList.add('index');
        choice.push(id);
        setTimeout(checkChoice,1000);
        setTimeout(()=>{
            gameBody.classList.remove('index'); 
        },1500)
    }
    else{
        choice = [];
        count=1;    
        choice.push(id);
    }
    console.log(choice)
}

function checkChoice(){
    let gameBody = document.getElementById('gameBody');
    gameBody.classList.add('index');
    choice1 = choice[0].slice(0,choice[0].length-1);
    choice2 = choice[1].slice(0,choice[1].length-1);
    console.log(choice1,choice2)
    if(choice1 == choice2){
        match++;
        if(match==6){
            console.log("you won");
            
            let best = localStorage.getItem('best');
            if(best == null){
                bestTime = [min,sec]
                localStorage.setItem('best',JSON.stringify(bestTime));
            }
            else{
                bestTime= JSON.parse(best)
                bestmin = JSON.parse(localStorage.getItem('best'))[0];
                bestsec = JSON.parse(localStorage.getItem('best'))[1];
                if(min <= bestmin && sec < bestsec){
                    bestTime = [min,sec];
                    localStorage.setItem('best',JSON.stringify(bestTime));
                }
            }
            clearInterval(time)
            console.log(min,sec);
            bestmin =JSON.parse(localStorage.getItem('best'))[0]<10?"0"+JSON.parse(localStorage.getItem('best'))[0] : JSON.parse(localStorage.getItem('best'))[0]
            bestsec =JSON.parse(localStorage.getItem('best'))[1]<10?"0"+JSON.parse(localStorage.getItem('best'))[1] : JSON.parse(localStorage.getItem('best'))[1]
            document.getElementById('best').innerText = `Your best ${bestmin}:${bestsec}`;
            min = min<10?"0"+min :min;
            document.getElementById('solvedTime').innerText = `Time Taken  ${min}:${sec}`;
            document.getElementById('pop').style.display = "block"
        }
        console.log("matched");
        id1 = choice[0];
        id2 = choice[1];
        document.getElementById(id1).style.display = "none"
        document.getElementById(id2).style.display = "none"
    }
    else{
        console.log("not matched");
        id1 = choice[0];
        id2 = choice[1];
        document.getElementById(id1).classList.remove('nonClickable');
        document.getElementById(id2).classList.remove('nonClickable');
        document.getElementById(id1).classList.remove('is-flipped');
        document.getElementById(id2).classList.remove('is-flipped');
    }
    
    gameBody.classList.remove('index')
}

let playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click',()=>{
    document.getElementById('pop').style.display = "none";
    location.reload();
})
