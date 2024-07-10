// handle the navbar 

// 1)handle the responsive 
let icon = document.querySelector("nav .cont i")
icon.addEventListener("click",function(){
    document.querySelector("nav .cont ul").classList.toggle("visible");
});

// 2)handle the the click on the li 
let listName = document.querySelectorAll("nav .cont ul li");
listName.forEach(function(li){
    li.addEventListener("click",function(){
        listName.forEach(function(li){
            li.classList.remove("active");
        });
        li.classList.add("active");
    })
});



// handle the api category
import { game } from "./game.js";
import { detailss } from './details.js';

async function getapi(name){
    let loader = document.querySelector(".loader");
    loader.style.display = "flex";
    const options = {
        	method: 'GET',
        	headers: {
        		'x-rapidapi-key': 'd52635b26emsh098e01c0058e359p13725ajsnffd1a4cfe46c',
        		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        	}
        };
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${name}` ,options )
        let response = await api.json();
        loader.style.display = "none";
        
            display(response);
        

        return response;
        // console.log(response);
}


listName.forEach(function(li){

    li.addEventListener("click", function(e){
        getapi(e.target.dataset.name.toLowerCase());
        // console.log(e.target.dataset.name.toLowerCase());
    })
});

// display games 
function display(games = []){
    let containerOfGames = document.querySelector(".game")
    containerOfGames.innerHTML = "";
    games.forEach(function(gameData){
        let gameToDisplay = new game(gameData.id,gameData.title, gameData.short_description, gameData.game_url, gameData.platform, gameData.thumbnail, gameData.genre);
        let box = document.createElement("div");
        box.classList.add("box");
        // box.setAttribute("data-id",gameToDisplay.id)
        box.innerHTML = `
        <div class="inner" data-id="${gameToDisplay.id}">
                <div class="image">
                    <img src="${gameToDisplay.thumbnail}" alt="" />
                  </div>
                  <div class="dis">
                    <h4 class="game-name">${gameToDisplay.name}</h4>
                    <p class="salary">free</p>
                  </div>
                  <p class="details">
                    ${gameToDisplay.disc}
                  </p>
                  <div class="help">
                    <button class="shooter">${gameToDisplay.gener}</button>
                    <button class="pc">${gameToDisplay.platform}</button>
                  </div>
            </div>
        `;
        containerOfGames.appendChild(box)
        let boxs = document.querySelectorAll(".box .inner");
    boxs.forEach(function(box){
        box.addEventListener("click", function(e){
            getdata(this.dataset.id);
            document.querySelector(".game-discription").style.display = "block";
            document.querySelector(".all-game-sec").style.display = "none";
            // console.log("box");
        });
    })
    });
}
getapi("MMORPG");



// import {detailss} from './details.js';
// handle api of details 

async function getdata(id){
    let loader = document.querySelector(".loader");
    loader.style.display = "flex";
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd52635b26emsh098e01c0058e359p13725ajsnffd1a4cfe46c',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options);
    let response = await api.json();
    loader.style.display = "none";
    displayDitails(response);
}
// getdata(329)

function displayDitails (detailsOfGames){
    let detalisOfGame = new detailss(detailsOfGames.id , detailsOfGames.title , detailsOfGames.genre,detailsOfGames.platform , detailsOfGames.status , detailsOfGames.thumbnail , detailsOfGames.description ,detailsOfGames.game_url )
    let de = document.querySelector(".game-discription");
    de.innerHTML = "";
    de.innerHTML = `
    <div class="title container">
        <h2 class="tit">Details Game</h2>
        <p class="closee">X</p>
      </div>
      <div class="cap container">
        <div class="image">
          <img src="${detalisOfGame.thumbnail}" alt="" />
        </div>
        <div class="cap-disc">
          <h2 class="cap-disc-tit">Title: ${detalisOfGame.title} Reloaded</h2>
          <p class="catigor">Category: <span>${detalisOfGame.genre}</span></p>
          <p class="platform">Platform: <span>${detalisOfGame.platform}</span></p>
          <p class="status">Status: <span>${detalisOfGame.status}</span></p>
          <p class="big-dic">
            ${detalisOfGame.description}
          </p>
          <button><a href="${detalisOfGame.game_url}"  class="click">Shwo Game</a></button>
        </div>
      </div>
    `
    let closee = document.querySelector(".closee")
    closee.addEventListener("click",function(e) {
        document.querySelector(".game-discription").style.display = "none";
        document.querySelector(".all-game-sec").style.display = "block";
    })

}
// handle the closing
