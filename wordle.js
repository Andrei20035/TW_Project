

let wordList = ["zionism","israel","diaspora", "connection" ,"colture","peoplehood"];
let wordListHebrew = ["ישראל","ציונות","תרבות","הללויה","התקווה","עמיות"];

let height = 6; //number of gusses

var row = 0; //current guess
var col = 0; //current letter for attempt
let colH;

var gameOver = false;

let selectedLanguage;

let listofwords;


window.onload = function() {
    processLanguage();
    user_settings();
    const list = document.getElementById("wordList"); //lista de cuvinte
    const wordInput = document.getElementById("wordInput"); //campul unde introduc parola
    const addBtn = document.getElementById("addBtn"); //butonul de add
    let selectedButtonId = null;

    document.getElementById("english").addEventListener("click", (e) => { 
        selectedButtonId = e.target.id;
        selectedLanguage = selectedButtonId;
    });

    document.getElementById("hebrew").addEventListener("click", (e) => {
        selectedButtonId = e.target.id;
        selectedLanguage = selectedButtonId;
    });

    let listofwords = [];
    let listofwordsHebrew = [];

    if (localStorage.getItem("listofwords")) {
        listofwords = JSON.parse(localStorage.getItem("listofwords"));
    }

    if (localStorage.getItem("listofwordsHebrew")) {
        listofwordsHebrew = JSON.parse(localStorage.getItem("listofwordsHebrew"));
    }

    function renderWordList(words, key) {
        list.innerHTML = "";
        words.forEach(word => {
            const listItem = document.createElement("div");
            listItem.classList.add("list-item");
            listItem.innerText = word;
            listItem.addEventListener("click", () => {
                words = words.filter((item) => item !== word);
                localStorage.setItem(key, JSON.stringify(words));
                list.innerHTML = "";
                renderWordList(words, key);
              });
              
            list.appendChild(listItem);
        });
    }

    wordInput.addEventListener("keyup", (e) => {
        e.stopPropagation();
        e.preventDefault();
    });
  
    function useSelectedButtonId() {
        if (selectedButtonId != null) {
            if (selectedButtonId === "english") {
                console.log(selectedButtonId)
                let key = "listofwords";
                renderWordList(listofwords, key);
                addBtn.addEventListener("click", () => {
                    if (wordInput.value != "") {
                        listofwords.push(wordInput.value);
                        localStorage.setItem("listofwords", JSON.stringify(listofwords));
                        renderWordList(listofwords);
                        wordInput.value = "";
                    }
                });
            
                wordInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        if (wordInput.value != "") {
                            listofwords.push(wordInput.value);
                            localStorage.setItem("listofwords", JSON.stringify(listofwords));
                            renderWordList(listofwords);
                            wordInput.value = "";
                        }
                    console.log("Cuvantul a fost pus in listofWords")
                    console.log(selectedButtonId);
                    }
                    
                });
            } else {
                let key = "listofwordsHebrew";
                renderWordList(listofwordsHebrew, key);
                addBtn.addEventListener("click", () => {
                    if (wordInput.value != "") {
                        listofwordsHebrew.push(wordInput.value);
                        localStorage.setItem("listofwordsHebrew", JSON.stringify(listofwordsHebrew));
                        renderWordList(listofwordsHebrew);
                        wordInput.value = "";
                    }
                });
            
                wordInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        if (wordInput.value != "") {
                            listofwordsHebrew.push(wordInput.value);
                            localStorage.setItem("listofwordsHebrew", JSON.stringify(listofwordsHebrew));
                            renderWordList(listofwordsHebrew);
                            wordInput.value = "";
                        }

                    }
                });
            }
        } else {
            setTimeout(useSelectedButtonId, 100);
        }
    }
    
    wordList = listofwords;
    wordListHebrew = listofwordsHebrew;


    useSelectedButtonId();
};

function processLanguage() {   

    let l1 = document.createElement("span");
    l1.classList.add("language-buttons");
    l1.id="english"
    l1.innerText = "English";
    document.getElementById("language").appendChild(l1);

    let l2 = document.createElement("span");
    l2.classList.add("language-buttons");
    l2.id="hebrew"
    l2.innerText = "Hebrew";
    document.getElementById("language").appendChild(l2);

    document.getElementById("english").addEventListener("click", (e) => {
        selectedLanguage = e.target.id;
        document.getElementById("language").style.display = "none";
        intializeEnglish();
    });

    document.getElementById("hebrew").addEventListener("click", (e) => {
        selectedLanguage = e.target.id;
        document.getElementById("language").style.display = "none";
        intializeHebrew();
    });
    
}


function user_settings() {
    const settingsButton = document.getElementById("settings-button");
    const settingsUser = document.getElementsByClassName("settings-user")[0];
    settingsUser.style.display = "none"

    adminButton = document.createElement("button");
    adminButton.id = "admin";
    adminButton.classList.add("user");
    adminButton.innerHTML = "Admin";
    settingsUser.appendChild(adminButton);

    playerButton = document.createElement("button");
    playerButton.id="player";
    playerButton.classList.add("user");
    playerButton.innerHTML = "Player";
    settingsUser.appendChild(playerButton);

    settingsButton.addEventListener("click", function() {
    if (settingsUser.style.display === "none") {
        settingsUser.style.display = "flex";
    } else {
        settingsUser.style.display = "none";
    }
    }); 

    user(settingsUser);

}

function user(settingsUser) {

    const list = document.getElementsByClassName("list-container")[0];
    const password = document.getElementsByClassName("adminpass")[0];
    const pass_field = document.getElementById("password");
    const message = document.getElementById("wrong");
    
    document.getElementById("player").addEventListener("click", (e) => {
        settingsUser.style.display = "none";           
    });

    list.style.display = "none";
    password.style.display = "none";
    message.style.display = "none";

    document.getElementById("admin").addEventListener("click", (e) => {
        settingsUser.style.display = "none";
        password.style.display = "flex";
    });

    const settingsButton = document.getElementById("settings-button");

    document.addEventListener("click", (e) => {
        if (settingsButton.contains(e.target)) {
        list.style.display = "none";
        password.style.display = "none";
        message.style.display = "none";
        pass_field.value = "";
        }
    });

    pass_field.addEventListener("keyup", (e) => {
        e.stopPropagation();
        e.preventDefault();
    });

    pass_field.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            if (pass_field.value != "" && pass_field.value === "andrei") {
                pass_field.value = "";
                password.style.display = "none"
                list.style.display = "flex";
                message.style.display = "none";
            } else if (pass_field.value != "" && pass_field.value != "andrei") {
                message.style.display = "flex";
            }
        }
    });

}
let width;
let word;

function intializeEnglish() { //English game
    //Create game board

    let currentWordIndex = localStorage.getItem("currentWordIndex");
    if(isNaN(currentWordIndex) || currentWordIndex >= wordList.length) {
        currentWordIndex = 0;
    }
    if (currentWordIndex == -1)
        currentWordIndex = wordList.length - 1;
    word = wordList[currentWordIndex];
    console.log(word);
    console.log(wordList);
    localStorage.setItem("currentWordIndex", ++currentWordIndex % wordList.length);
    width = word.length //length of the word

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id=r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    let x = 60 * width;
    document.getElementById("board").style.width = x + "px";
    



    //Create the keyboard
    let keyboard = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Enter","Z","X","C","V","B","N","M","⌫"]];

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id ="Key" + key; //"Key" + "A"
            }

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function intializeHebrew() { //Hebrew game
    //Create game board
    var currentWordIndexHebrew = localStorage.getItem("currentWordIndexHebrew");
    if(isNaN(currentWordIndexHebrew) || currentWordIndexHebrew >= wordListHebrew.length) {
        currentWordIndexHebrew = 0;
    }

    if (currentWordIndexHebrew == -1)
    currentWordIndexHebrew = wordListHebrew.length - 1;

    console.log(currentWordIndexHebrew);

    word = wordListHebrew[currentWordIndexHebrew];
    console.log(word);
    console.log(wordListHebrew);
    localStorage.setItem("currentWordIndexHebrew", ++currentWordIndexHebrew % wordListHebrew.length)
    width = word.length //length of the word
    console.log(width);
    word = word.split('').reverse().join('');
    colH = width - 1;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id=r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    let x = 60 * width;
    document.getElementById("board").style.width = x + "px";

    //Create the keyboard
    let keyboard = [
        ["ק","ר","א","ט","ו","ם","פ","ש","ד","ג"],
        ["כ","ע","י","ח","ל","ך","ף","ז","ס"],
        ["Enter","ב","ה","נ","מ","צ","ת","ץ","⌫"]];

    for (let i = 0; i< keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("א" <= key && key <= "ת") {
                keyTile.id ="Key" + key; //"Key" + "A"
            }

            keyTile.addEventListener("click", processKeyHebrew);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    document.addEventListener("keyup", (e) => {
        processInputHebrew(e);
    })
}



function processKey() {
    let e = {"code" : this.id};
    processInput(e);
}

function processKeyHebrew() {
    let e = {"code" : this.id};
    console.log(e)
    processInputHebrew(e);
}


function processInput(e) {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -= 1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }
    else if (e.code =="Enter" && col == width) {
        update();
    }



    if(!gameOver && row == height) {
        gameOver = true;
        let messageBox = document.getElementById("message-box");
        messageBox.textContent = "Almost! Good luck next time!";
        messageBox.style.display = "flex";
        let currentWordIndex = parseInt(localStorage.getItem('currentWordIndex'));
        currentWordIndex--;
        localStorage.setItem('currentWordIndex', currentWordIndex.toString());
        setTimeout(() => {
            location.reload();  
          }, 5000);
    }
}

function processInputHebrew(e) {
    if (gameOver) return;

    if (("Keyא" <= e.code && e.code <= "Keyת") || ("KeyA" <= e.code && e.code <= "KeyZ")) {
        console.log(row.toString() + '-' + colH.toString());
        if (colH >= 0 ) {
            let currTile = document.getElementById(row.toString() + '-' + colH.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                colH = colH - 1;
                console.log(colH);
            }
        }
    }
    else if (e.code == "Backspace") {
        console.log(colH)
        if (-1 <= colH && colH < width - 1) {
            colH += 1;
        }
        let currTile = document.getElementById(row.toString() + '-' + colH.toString());
        currTile.innerText = "";
    }
    else if (e.code =="Enter" && colH == -1) {
        updateHebrew();
    }



    if(!gameOver && row == height) {
        gameOver = true;
        let messageBox = document.getElementById("message-box");
        messageBox.textContent = "Almost! Good luck next time!";
        messageBox.style.display = "flex";
        let currentWordIndexHebrew = parseInt(localStorage.getItem('currentWordIndexHebrew'));
        currentWordIndexHebrew--;
        localStorage.setItem('currentWordIndexHebrew', currentWordIndexHebrew.toString());
        setTimeout(() => {
            location.reload();
          }, 5000);
    }
}


function update() {
    let guess = "";

    for(let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase();
    
    let correct = 0;
    let letterCount = {}; // A dictionary with letter frequencies
    for (let i = 0; i < word.length; i++) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }

    //At first iteration, check all the correct ones
    for (let c= 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        //If it is in the correct position
        if ( word[c].toUpperCase() == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }

        if(correct == width) {
            gameOver = true;
            let messageBox = document.getElementById("message-box");
            messageBox.textContent = "You did it! Great Job!";
            messageBox.style.display = "flex";

            setTimeout(() => {
                location.reload();
              }, 5000);
        }
    }

    

    for (let c= 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText.toLowerCase();

        if(!currTile.classList.contains("correct")) {
            // If it is in the word
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                let keyTile = document.getElementById("Key" + letter.toUpperCase());
                if(!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } //If not in the word
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter.toUpperCase());
                keyTile.classList.add("absent");
            }
        }
    }

    row += 1; //start a new row
    col = 0; //start at 0 for new row
    
}

function updateHebrew() {
    let guess = "";

    for(let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.split('').reverse().join('');
    guess = guess.toLowerCase();
    console.log(guess)

    
    let correct = 0;
    let letterCount = {}; // A dictionary with letter frequencies
    for (let i = 0; i < word.length; i++) {
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }

    //At first iteration, check all the correct ones
    for(let c = width - 1; c >= 0; c--) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        console.log(word[c].toUpperCase() + " " + letter)
        //If it is in the correct position
        if ( word[c].toUpperCase() == letter) {
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }


        if(correct == width) {
            gameOver = true;
            let messageBox = document.getElementById("message-box");
            messageBox.textContent = "You did it! Great Job!";
            messageBox.style.display = "flex";

            setTimeout(() => {
                location.reload();
              }, 5000);
        }
    }

    

    for(let c = width - 1; c >= 0; c--) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText.toLowerCase();

        if(!currTile.classList.contains("correct")) {
            // If it is in the word
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                let keyTile = document.getElementById("Key" + letter.toUpperCase());
                if(!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } //If not in the word
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter.toUpperCase());
                keyTile.classList.add("absent");
            }
        }
    }

    row += 1; //start a new row
    colH = width - 1; //start at end of the word for new row    
}