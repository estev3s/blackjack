let player = {
    name: "Chips",
    chips: 200
}

let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let betValue = 0
let betOutcome = 0

let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")

let dealerCardsEl = document.getElementById("dealercards-el")
let dealerSumEl = document.getElementById("dealersum-el")

let startGameBtn = document.getElementById("startGame-btn")

playerEl.textContent = player.name + ": $" + player.chips

function getBetValue() {
        let betInput = document.getElementById("bet-ipt")
        betValue = parseInt(betInput.value)
        betEl.textContent = "Your bet: $" + betValue
        player.chips -= betValue
        playerEl.textContent = player.name + ": $" + player.chips
        startGameBtn.style.display = "inline"
        document.getElementById("resetBet-btn").style.display = "inline"
        document.getElementById("bet-btn").style.display = "none"
}

function resetBet() {
        player.chips += betValue
        betValue = 0
        betEl.textContent = "Your bet: $" + betValue
        playerEl.textContent = player.name + ": $" + player.chips
        startGameBtn.style.display = "none"
        document.getElementById("resetBet-btn").style.display = "none"
        document.getElementById("bet-btn").style.display = "inline"
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    let card1 = getRandomCard()
    let card2 = getRandomCard()
    if (card1 === 11 && card2 === 11) {
        card2 = 1
    }
    cards = [card1, card2]
    sum = card1 + card2
    document.getElementById("startGame-btn").style.display = "none"
    document.getElementById("resetBet-btn").style.display = "none"
    document.getElementById("bet-ipt").style.display = "none"
    document.getElementById("newCard-btn").style.display = "inline"
    document.getElementById("call-btn").style.display = "inline"
    renderGame()
}

function playAgain() {
    messageEl.textContent = "Place your bet to play a round!"
    betEl.textContent = "Your bet: $0"
    cardsEl.textContent = ""
    sumEl.textContent = ""
    dealerCardsEl.textContent = ""
    dealerSumEl.textContent = ""
    document.getElementById("playAgain-btn").style.display = "none"
    document.getElementById("bet-ipt").style.display = "inline"
    document.getElementById("bet-btn").style.display = "inline"
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if(sum < 21) {
        messageEl.textContent = "Do you want to draw a new card?"
    } else if(sum === 21) {
        won()
    } else {
        lose()
    }
}

function newCard() {
        let card = getRandomCard()
        if (sum > 10 && card === 11){
            card = 1
        }
        sum += card
        cards.push(card)
        renderGame()
}

function dealerStartGame() {
    let dealerCard1 = getRandomCard()
    let dealerCard2 = getRandomCard()
    if (dealerCard1 === 11 && dealerCard2 === 11) {
        dealerCard2 = 1
    }
    dealerCards = [dealerCard1, dealerCard2]
    dealerSum = dealerCard1 + dealerCard2
    dealerRenderGame()
}

function dealerRenderGame() {
    while (dealerSum < (sum + 1)) {
        let dealerCard = getRandomCard()
        if (dealerSum > 10 && dealerCard === 11){
            dealerCard = 1
        }
        dealerSum += dealerCard
        dealerCards.push(dealerCard)
    }
    dealerCardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    if(dealerSum > 21) {
        won()
    } else {
        lose()
    }
}

function won() {
    betOutcome = 2 * betValue
    messageEl.textContent = "You won!!!!! + $" + betOutcome
    player.chips += betOutcome
    playerEl.textContent = player.name + ": $" + player.chips
    document.getElementById("newCard-btn").style.display = "none"
    document.getElementById("call-btn").style.display = "none"
    document.getElementById("playAgain-btn").style.display = "inline"
}

function lose() {
    messageEl.textContent = "You lost... Better luck next time!"
    playerEl.textContent = player.name + ": $" + player.chips
    document.getElementById("newCard-btn").style.display = "none"
    document.getElementById("call-btn").style.display = "none"
    document.getElementById("playAgain-btn").style.display = "inline"
}