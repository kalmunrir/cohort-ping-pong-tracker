const contentDiv = document.querySelector(`div#content`);
let isCurrentServer = false

document.addEventListener(`DOMContentLoaded`, init());

function loadStartPage(){
    contentDiv.innerHTML = "";

    const titleH1L1 = document.createElement(`h1`);
        titleH1L1.className = `startTitle`;
        titleH1L1.id = `titleStart`;
        titleH1L1.textContent = `The`;
    const titleH1L2 = document.createElement(`h1`);
        titleH1L2.className = `startTitle`;
        titleH1L2.id = `legendary`;
        titleH1L2.textContent = `Legendary Cohort`;
    const titleH1L3 = document.createElement(`h1`);
        titleH1L3.className = `startTitle`;
        titleH1L3.textContent = `Ping-Pong`;
    const titleH1L4 = document.createElement(`h1`);
        titleH1L4.className = `startTitle`;
        titleH1L4.id = `titleEnd`;
        titleH1L4.textContent = `Tournament`;

    const player1NameInput = document.createElement(`input`);
        player1NameInput.type = `text`;
        player1NameInput.name = `p1Name`;
        player1NameInput.id = `p1Name`;
        player1NameInput.value = "";
        player1NameInput.placeholder = `Player 1 Name`;
        player1NameInput.className = `input-text`;
    const player2NameInput = document.createElement(`input`);
        player2NameInput.type = `text`;
        player2NameInput.name = `p2Name`;
        player2NameInput.id = `p2Name`;
        player2NameInput.value = "";
        player2NameInput.placeholder = `Player 2 Name`;
        player2NameInput.className = `input-text`;
    const newLine1 = document.createElement(`br`);
    const firstServerInput = document.createElement(`input`);
        firstServerInput.type = `text`;
        firstServerInput.name = `firstServer`;
        firstServerInput.id = `firstServer`;
        firstServerInput.value = "";
        firstServerInput.placeholder = `First Serve`;
        firstServerInput.className = `input-text`;
    const newLine2 = document.createElement(`br`);
    const startBtn = document.createElement(`input`);
        startBtn.type = `submit`;
        startBtn.name = `submit`;
        startBtn.id = `submitBtn`;
        startBtn.value = "Start";
        startBtn.className = `input-text`;
    const newGameForm = document.createElement(`form`);
        newGameForm.id = `startNewGame`;
        newGameForm.append(player1NameInput, player2NameInput, newLine1, firstServerInput, newLine2, startBtn)
    
    const startPageDiv = document.createElement(`div`);
        startPageDiv.id = `startPage`;
        startPageDiv.append(titleH1L1, titleH1L2, titleH1L3, titleH1L4, newGameForm);
    
    contentDiv.append(startPageDiv);

    newGameForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        loadScoreKeeper(document.querySelector(`#p1Name`).value,
                        document.querySelector(`#p2Name`).value,
                        document.querySelector(`#firstServer`).value);
    })
}

function loadScoreKeeper(player1Name, player2Name, firstServe){
    contentDiv.innerHTML = "";

    const scoreOneP = document.createElement(`p`);
        scoreOneP.id = `scoreOne`;
        scoreOneP.textContent = 0;
    const scoreTwoP = document.createElement(`p`);
        scoreTwoP.id = `scoreTwo`;
        scoreTwoP.textContent = 0;

    const playerOneScoreBtn = document.createElement(`button`);
        playerOneScoreBtn.className = `playerScore`;
        playerOneScoreBtn.id = `playerOneScore`;
        playerOneScoreBtn.append(scoreOneP);
    const playerTwoScoreBtn = document.createElement(`button`);
        playerTwoScoreBtn.className = `playerScore`;
        playerTwoScoreBtn.id = `playerOneScore`;
        playerTwoScoreBtn.append(scoreTwoP);

    const playerOneNameH1 = document.createElement(`h1`);
        playerOneNameH1.className = `playerName`;
        playerOneNameH1.id = `playerOneName`;
        playerOneNameH1.textContent = player1Name;
    const playerTwoNameH1 = document.createElement(`h1`);
        playerTwoNameH1.className = `playerName`;
        playerTwoNameH1.id = `playerTwoName`;
        playerTwoNameH1.textContent = player2Name;

    const playerOneDiv = document.createElement(`div`);
        playerOneDiv.className = `playerNameScore`;
        playerOneDiv.id = `playerOne`;
        playerOneDiv.append(playerOneNameH1, playerOneScoreBtn);
    const playerTwoDiv = document.createElement(`div`);
        playerTwoDiv.className = `playerNameScore`;
        playerTwoDiv.id = `playerTwo`;
        playerTwoDiv.append(playerTwoNameH1, playerTwoScoreBtn);
    const playerContainerDiv = document.createElement(`div`);
        playerContainerDiv.id = `playerContainer`;
        playerContainerDiv.append(playerOneDiv, playerTwoDiv);
    
    const resetBtn = document.createElement(`button`);
        resetBtn.className = `resetSubmitBtns`;
        resetBtn.id = `resetBtn`;
        resetBtn.textContent = `Reset`;
    const submitBtn = document.createElement(`button`);
        submitBtn.className = `resetSubmitBtns`;
        submitBtn.id = `submitBtn`;
        submitBtn.textContent = `Submit`;
    const resetSubmitBtnsDiv = document.createElement(`div`);
        resetSubmitBtnsDiv.id = `resetSubmitBtns`;
        resetSubmitBtnsDiv.append(resetBtn, submitBtn);
    const scoreContainerDiv = document.createElement(`div`);
        scoreContainerDiv.id = `scoreContainer`;
        scoreContainerDiv.append(playerContainerDiv, resetSubmitBtnsDiv);
        contentDiv.append(scoreContainerDiv);

    document.addEventListener(`keydown`, (e) => {
        if(e.key === `q` || e.key === `u`){
            scoreOneP.textContent = parseInt(scoreOneP.textContent) + 1;
        } else if (e.key === `e` || e.key === `o`){
            scoreTwoP.textContent = parseInt(scoreTwoP.textContent) + 1;
        } else if (e.key === `a` || e.key === `j`){
            scoreOneP.textContent = parseInt(scoreOneP.textContent) - 1;
        }else if (e.key === `d` || e.key === `l`){
            scoreTwoP.textContent = parseInt(scoreTwoP.textContent) - 1;
        }        
    })
    resetBtn.addEventListener(`click`, () => {
        scoreOneP.textContent = 0;
        scoreTwoP.textContent = 0;
    })
    submitBtn.addEventListener(`click`, () => {
        let playerWhoWon = '';
        if(parseInt(scoreOneP.textContent) > parseInt(scoreTwoP.textContent)){
            playerWhoWon = playerOneNameH1.textContent;
        } else if(parseInt(scoreOneP.textContent) < parseInt(scoreTwoP.textContent)){
            playerWhoWon = playerTwoNameH1.textContent;
        }
        
        fetch("http://localhost:3000/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                player1: playerOneNameH1.textContent,
                points1: parseInt(scoreOneP.textContent),
                player2: playerTwoNameH1.textContent,
                points2: parseInt(scoreTwoP.textContent),
                winner: playerWhoWon
            }),
        })
        .then(r => r.json())
        .then(gameObj => calcStats(gameObj))
        .then(smthn => loadStartPage())
    })
}

function loadHistoryPage() {
    contentDiv.innerHTML = "";

    const histPageTitleH1 = document.createElement(`h1`);
        histPageTitleH1.className = `pageTitle`;
        histPageTitleH1.textContent = `Game History`;
    contentDiv.append(histPageTitleH1);

    fetch("http://localhost:3000/games")
    .then(r => r.json())
    .then(games => {
        games.forEach((game) => {
            const histPageGameDiv = document.createElement(`div`);
                histPageGameDiv.className = `histPageGame`;

            const histPageP1Div = document.createElement(`div`);
                histPageP1Div.className = `histPageP1`;
            const histPageP1NameH4 = document.createElement(`h4`)
                histPageP1NameH4.className = `histPageName`;
                histPageP1NameH4.textContent = game[`player1`];
            const histPageP1ScoreP = document.createElement(`p`);
                histPageP1ScoreP.className = `histPageScore`;
                histPageP1ScoreP.textContent = game[`points1`];

            const histPageP2Div = document.createElement(`div`);
                histPageP2Div.className = `histPageP2`;
            const histPageP2NameH4 = document.createElement(`h4`)
                histPageP2NameH4.className = `histPageName`;
                histPageP2NameH4.textContent = game[`player2`];
            const histPageP2ScoreP = document.createElement(`p`);
                histPageP2ScoreP.className = `histPageScore`;
                histPageP2ScoreP.textContent = game[`points2`];
            
            histPageP1Div.append(histPageP1NameH4, histPageP1ScoreP);
            histPageP2Div.append(histPageP2NameH4, histPageP2ScoreP);
            histPageGameDiv.append(histPageP1Div, histPageP2Div);
            contentDiv.append(histPageGameDiv);
        })
    })
}

function loadStatisticsPage() {
    contentDiv.innerHTML = "";

    const histPageTitleH1 = document.createElement(`h1`);
        histPageTitleH1.className = `pageTitle`;
        histPageTitleH1.textContent = `Player Stats`;
    contentDiv.append(histPageTitleH1);  
}

function calcStats(gameObj){
    checkPlayerName(gameObj);
    calcWins(gameObj);
    calcLosses(gameObj);
    calcGamesPlayed(gameObj);
    calcTotalPoints(gameObj);
    calcAvgPointsPerGame();
}


function checkPlayerName(gameObj){
    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        if (gameObj[`player1`] !== player[`name`]) {
            addPlayer(gameObj[`player1`]);
        } else if (gameObj[`player2`] !== player[`name`]){
            addPlayer(gameObj[`player2`]);
        }
    }))
}
function addPlayer(pName) {
    fetch("http://localhost:3000/playerStats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: pName,
                wins: 0,
                losses: 0,
                gamesPlayed: 0,
                avgPointsScored: 0
            }),
        })
        .then(r => r.json());
}

function calcWins(gameObj){
    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        if(player[`name`] === gameObj[`winner`]){
            fetch(`http://localhost:3000/playerStats/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    wins: player[`wins`] + 1
                })
            })
            .then(r => r.json())
        }
    }))
}

function calcLosses(gameObj) {
    let loser = "";
    if (gameObj[`player1`] === gameObj[`winner`]){
        loser = gameObj[`player2`];
    } else if (gameObj[`player2`] === gameObj[`winner`]){
        loser = gameObj[`player1`];
    }

    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        if(player[`name`] === loser){
            fetch(`http://localhost:3000/playerStats/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    losses: player[`losses`] + 1
                })
            })
            .then(r => r.json())
        }
    }))
}

function calcGamesPlayed(gameObj) {
    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        if(player[`name`] === gameObj[`player1`] || player[`name`] === gameObj[`player2`]){
            fetch(`http://localhost:3000/playerStats/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    gamesPlayed: player[`gamesPlayed`] + 1
                })
            })
            .then(r => r.json())
        }
    }))
}

function calcTotalPoints(gameObj) {
    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        if(player[`name`] === gameObj[`player1`]){
            fetch(`http://localhost:3000/playerStats/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    totalPoints: player[`totalPoints`] + gameObj[`points1`]
                })
            })
            .then(r => r.json())
        } else if (player[`name`] === gameObj[`player2`]){
            fetch(`http://localhost:3000/toys/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    totalPoints: player[`totalPoints`] + gameObj[`points2`]
                })
            })
            .then(r => r.json())
        }
    }))
}

function calcAvgPointsPerGame() {
    fetch("http://localhost:3000/playerStats")
    .then(r => r.json())
    .then(players => players.forEach(player => {
        fetch(`http://localhost:3000/toys/${player[`id`]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    totalPoints: player[`totalPoints`] / player[`gamesPlayed`]
                })
            })
    }))
}






function init() {
    // loadStartPage();
    // document.querySelector(`#homeLink`).addEventListener(`click`, () => {
    //     loadStartPage();
    // });
    // // document.querySelector(`#statLink`).addEventListener(`click`, () => {

    // // })
    // document.querySelector(`#histLink`).addEventListener(`click`, () => {
    //     loadHistoryPage();
    // });
    
}