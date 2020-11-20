/*       Hello World!    
...............................
.   Code du launcher Tabris,  .
.   Un launcher fait avec     .
.   Electron, par VoidSplit.  .
.........................................................................................
.       Version 1.0.1         . Par VoidSplit -- Projet sur GitHub                      .
.........................................................................................
.       To do list                                                                      .
.   • Lancement du jeu séléctionné                                                      .
.   • Scroll automatique avec manette                                                   .
.   • Scroll avec les flèches                                                           .
.   • Hover de la sidebar avec manette                                                  .
.   • Changement de fond en hover avec la souris comme pour le hover avec la manette    .
.   • Ajout des jeux automatiques                                                       .
.   • Thèmes                                                                            .
.   • Loader (il est designé faut juste le mettre au bon moment (class .loader))        .
.........................................................................................
.       Optionnel                                                                       .
.   • Sons                                                                              .
.........................................................................................
*/

var delayInMilliseconds = 1000;						                // variable pour delay
var buttonSensibility = 10; 						                // sensibilité des boutons
var gameNumber = 3; 							                    // numero du jeu survollé
var gameNumberMax = 9; 							                    // nombre de jeu installés
var gameNumberMin = 2; 							                    // nombre de jeu minimum
var buttonSensibilityCount = 0;						                // compte de la sensibilité des bouttons
var Hoverable = document.getElementsByClassName('Hoverable');		// liste des items pouvant être survollés
let gameItem = document.getElementsByClassName('gameItem');         // Tout les éléments gameItem (les jeux)

// Fonctions 

// Boutons manette 
function launchGame()   
{  
    child_process.execFile('"' + json["game" + (gameNumber)]["gameDirectory"] + '"');  

    
}  
function buttonPressA() {
    $.getJSON("games.json", function(json) {
        if(document.getElementsByClassName('gameItem')[5].classList.contains('clic')) {
            launchGame();
        }
    });
}
function buttonPressB() {
    
}
function buttonPressX() {
    
}
function buttonPressY() {
    
}
function buttonPressStart() {
    settings();
}

// Fonctions techniques 

function settings() {
    if(document.getElementById('settingsTab').classList.contains('invisible')) {
        var elements = document.getElementsByClassName('tab');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add("open");
            elements[i].classList.remove("close");
        }
        document.getElementById('settingsTab').classList.remove('invisible');
        document.getElementById('settingsTab').classList.add('visible');
    }
    else if(document.getElementById('settingsTab').classList.contains('visible')) {
        var elements = document.getElementsByClassName('tab');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add("close");
            elements[i].classList.remove("open");
        }
        document.getElementById('settingsTab').classList.remove('visible');
        document.getElementById('settingsTab').classList.add('invisible');
    }
}

function render() {
    if(gameNumber <= gameNumberMin) {
        gameNumber = gameNumberMin+1;
        
    }
    if(gameNumber >= gameNumberMax+1) {
        gameNumber = gameNumberMax;
    }
    Hoverable[gameNumber-1].classList.add("Hovered");
    $.getJSON("games.json", function(json) {
        console.log(gameNumber);
        var cardImage = json["game" + (gameNumber - 2)]["cardImage"];
        var backImage = json["game" + (gameNumber - 2)]["backImage"];
        document.getElementsByClassName("gameItem")[gameNumber-3].style.backgroundImage = 'url(' + cardImage + ')';
        document.getElementById("gameBG").style.backgroundImage = 'url(' + backImage + ')';
    });
}

// Initialisation du background
window.onload = function(){
    $.getJSON("games.json", function(json) {
    var elements = document.getElementsByClassName('gameItem');
    var backImage = json["game1"]["backImage"];
        for (let i = 0; i < elements.length-1; i++) {
            document.getElementsByClassName("gameItem")[i].style.backgroundImage = 'url(' + json["game" + (i+1)]["cardImage"] + ')';
        }
        document.getElementById("gameBG").style.backgroundImage = 'url(' + backImage + ')';
    });
}


// Gestion manette
window.addEventListener('gamepadconnected', (event) => {
    const update = () => {
        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            // Joysticks
            for (const [index, axis] of gamepad.axes.entries()) {
                buttonSensibilityCount++;                                   // Delay pour la sensibilité des bouton
                if(buttonSensibilityCount >= buttonSensibility) {           // Car sinon ça clique 40x en 1s
                    // Pad gauche de la manette
                    // Direction droite
                    if(axis == 1 && index == 0) {
                        document.getElementById('output').innerHTML = "right"; // débug
                        Hoverable[gameNumber-1].classList.remove("Hovered");
                        gameNumber++;
                        render();
                    }
                    // Direction gauche
                    if(axis == -1 && index == 0) {
                        document.getElementById('output').innerHTML = "left"; // débug
                        Hoverable[gameNumber-1].classList.remove("Hovered");
                        gameNumber--;
                        render();
                    }
                    // Pad droit de la manette
                    // Direction droite
                    if(axis == 1 && index == 2) {
                        document.getElementById('output').innerHTML = "right"; // débug
                        Hoverable[gameNumber-1].classList.remove("Hovered");
                        gameNumber++;
                        render();
                    }
                    // Direction gauche
                    if(axis == -1 && index == 2) {
                        document.getElementById('output').innerHTML = "left"; // débug
                        Hoverable[gameNumber-1].classList.remove("Hovered");
                        gameNumber--;
                        render();
                    }
                    buttonSensibilityCount = 0;     // Réinitialisation de la variable pour la sensibilité
                }
        
            }
            // Boutons
            for (const [index, button] of gamepad.buttons.entries()) {
                buttonSensibilityCount++;                                   // Delay pour la sensibilité des bouton
                if(buttonSensibilityCount >= buttonSensibility) {           // Car sinon ça clique 40x en 1s
                    // Bouton A
                    if(button.pressed == true && index == 0) {
                        document.getElementById('output').innerHTML = "A"; // débug
                        for(let i = 0; i < gameItem.length-1; i++) { // on enleve la class clic a tout les jeux 
                            gameItem[i].classList.remove("clic");
                        }
                        gameItem[gameNumber-3].classList.add("clic"); // on met la class clic au jeu sélectionné
                        buttonPressA();
                    }
                    // Bouton B
                    if(button.pressed == true && index == 1) {
                        document.getElementById('output').innerHTML = "B"; // débug
                        buttonPressB();
                    }
                    // Bouton X
                    if(button.pressed == true && index == 2) {
                        document.getElementById('output').innerHTML = "X"; // débug
                        buttonPressX();
                    }
                    // Bouton Y
                    if(button.pressed == true && index == 3) {
                        document.getElementById('output').innerHTML = "Y"; // débug
                        buttonPressY();
                    }
                    // Bouton Start
                    if(button.pressed == true && index == 9) {
                        buttonPressStart();
                    }
                    buttonSensibilityCount = 0;     // Réinitialisation de la variable pour la sensibilité
                }
            }
        }
        requestAnimationFrame(update); // update
    };
    update();
});