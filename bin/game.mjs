// game.mjs
import * as cards from '../lib/cards.mjs';
import {question} from 'readline-sync';
import clear from 'clear';
import {readFile} from 'fs';
import os from 'os';
if(process.argv.length===2){
let deck;
deck = cards.generateDeck();
let shuffled_deck = cards.shuffle(deck)
let { cardsArray, hands } = cards.deal(shuffled_deck);
let [player_hand, computer_hand] = hands;
let discard_pile = new Array();
let [new_deck, starter_card] = cards.draw(cardsArray);
while (starter_card[0].rank === cards.rank[7]) {
	discard_pile.push(starter_card);
	let [new_deck, starter_card] = cards.draw(new_deck);
}

discard_pile.push(starter_card);
let next_card = [...starter_card];
console.log("               CR🤪ZY 8's                        ");
console.log("--------------------------------------------------");
console.log("Next suit/rank to play:➡️  " + cards.handToString(next_card) + "⬅️");
console.log("--------------------------------------------------");
console.log("Top of discard pile: " + cards.handToString(next_card));
console.log("Number of cards left in the deck: " + new_deck.length);
console.log("--------------------------------------------------");
console.log("🤖✋ (computer hand): " + cards.handToString(computer_hand));
console.log("😊✋ (player hand): " + cards.handToString(player_hand));
console.log("--------------------------------------------------");
console.log("😊 Player's turn...");
if (cards.matchesAnyProperty(player_hand, next_card[0]) === true) 
{
	let card_number = question("Enter the number of the card you would like to play\n" + cards.handToString(player_hand, os.EOL, true));
	next_card.pop();
	next_card.push(player_hand[Number(card_number) - 1]);
	delete player_hand[Number(card_number) - 1];
	player_hand[Number(card_number) - 1]=player_hand[0];
	player_hand.shift();
	if (next_card[0].rank === cards.rank[7]) {

		console.log("CRAZY EIGHTS! You played an 8 - choose a suit");
		let suit_eight = question("1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
		if (suit_eight === '1') {
			console.log("You chose to play: " + cards.suits.SPADES);
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.SPADES;
		}
		else if (suit_eight === '2') {
			console.log("You chose to play: " + cards.suits.HEARTS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.HEARTS;
		}
		else if (suit_eight === '3') {
			console.log("You chose to play: " + cards.suits.CLUBS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.CLUBS;
		}
		else {
			console.log("You chose to play: " + cards.suits.DIAMONDS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.DIAMONDS;
		}
	}
	question("Press enter to continue");
}
else if (cards.matchesAnyProperty(player_hand, { suit: next_card[0].suit, rank: cards.rank[7] })) 
{
	let z=0
	while(z<player_hand.length && player_hand[z].rank!=cards.rank[7])
	{
		z++;	
	}
	next_card[0].suit=player_hand[z].suit;
	delete player_hand[z];
	player_hand[z]=player_hand[0];
	player_hand.shift();
	next_card[0].rank = cards.rank[7];
	question("Enter the number of the card you would like to play\n" + cards.handToString(player_hand, os.EOL, true));
	let eight_suit = question("CRAZY EIGHTS! You played an 8 - choose a suit\n1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
	if (eight_suit === '1') {
		console.log("You chose to play: " + cards.suits.SPADES)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.SPADES;
	}
	else if (eight_suit === '2') {
		console.log("You chose to play: " + cards.suits.HEARTS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.HEARTS;
	}
	else if (eight_suit === '3') {
		console.log("You chose to play: " + cards.suits.CLUBS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.CLUBS;
	}
	else {
		console.log("You chose to play: " + cards.suits.DIAMONDS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.DIAMONDS;
	}
	question("Press enter to continue");
}
else {
	console.log("😔 You have no playable cards");
	question("Press ENTER to draw cards until matching:" + next_card[0].rank + "," + next_card[0].suit + ", 8");
	let [new_deck_drawn, drawncards] = cards.drawUntilPlayable(new_deck, next_card[0]);
	new_deck = [...new_deck_drawn];
	console.log(".");
	console.log("Cards Drawn: " + cards.handToString(drawncards));
	let index = 0;
	while (index < drawncards.length && drawncards[index].rank != next_card[0].rank && drawncards[index].suit != next_card[0].suit && drawncards[index].rank != cards.rank[7]) {
		index++;
	}
	if (index === drawncards.length) {
		index = index - 1;
	}
	if (drawncards[index].rank === cards.rank[7]) {
		console.log("CRAZY EIGHTS! You played an 8 - choose a suit");
		let suitt = question("1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
		next_card.pop();
		next_card.push(drawncards[index]);
		if (suitt === '1') {
			console.log("You chose to play: " + cards.suits.SPADES)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.SPADES;
		}
		else if (suitt === '2') {
			console.log("You chose to play: " + cards.suits.HEARTS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.HEARTS;
		}
		else if (suitt === '3') {
			console.log("You chose to play: " + cards.suits.CLUBS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.CLUBS;
		}
		else {
			console.log("You chose to play: " + cards.suits.DIAMONDS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.DIAMONDS;
		}
		question("Press enter to continue");
	}
	else {
		next_card.pop();
		next_card.push(drawncards[index]);
		discard_pile.push(next_card);
		console.log("Card Played: " + drawncards[index].rank + drawncards[index].suit);
		question("Press enter to continue");
	}
	delete drawncards[index];
	drawncards[index]=drawncards[0];
	drawncards.shift();
	for (let iterate=0;iterate<drawncards.length;iterate++)
	{
		player_hand.push(drawncards[i]);
	}
	
	
}
clear();
console.log("               CR🤪ZY 8's                        ");
console.log("--------------------------------------------------");
if (next_card[0].rank === cards.rank[7]) {
	console.log("Next suit/rank to play:➡️  " + next_card[0].suit + "  ⬅️️");
}
else {
	console.log("Next suit/rank to play:➡️  " + cards.handToString(next_card) + "  ⬅️");
}
console.log("--------------------------------------------------");
/*if(next_card[0].rank==cards.rank[7])
{
	console.log("Top of discard pile: " + next_card[0].suit);

}*/
console.log("Top of discard pile: " + cards.handToString(next_card));
console.log("Number of cards left in the deck: " + new_deck.length);
console.log("--------------------------------------------------");
console.log("🤖✋ (computer hand): " + cards.handToString(computer_hand));
console.log("😊✋ (player hand): " + cards.handToString(player_hand));
console.log("--------------------------------------------------");
console.log("🤖 Computer's turn...");
if (cards.matchesAnyProperty(computer_hand, next_card[0]) === true) 
	{
	let card_number = question("Enter the number of the card you would like to play\n" + cards.handToString(computer_hand, os.EOL, true));
	next_card.pop();
	next_card.push(computer_hand[Number(card_number) - 1]);
	delete computer_hand[Number(card_number) - 1];
	computer_hand[Number(card_number) - 1]=computer_hand[0];
	computer_hand.shift();
	if (next_card[0].rank === cards.rank[7]) {

		console.log("CRAZY EIGHTS! You played an 8 - choose a suit");
		let suit_eight = question("1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
		if (suit_eight === '1') {
			console.log("You chose to play: " + cards.suits.SPADES);
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.SPADES;
		}
		else if (suit_eight === '2') {
			console.log("You chose to play: " + cards.suits.HEARTS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.HEARTS;
		}
		else if (suit_eight === '3') {
			console.log("You chose to play: " + cards.suits.CLUBS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.CLUBS;
		}
		else {
			console.log("You chose to play: " + cards.suits.DIAMONDS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.DIAMONDS;
		}
	}
	question("Press enter to continue");
}
else if (cards.matchesAnyProperty(computer_hand, { suit: next_card[0].suit, rank: cards.rank[7] })) 
{
	let z=0
	while(z<computer_hand.length && computer_hand[z].rank!=cards.rank[7])
	{
		z++;	
	}
	next_card[0].suit=computer_hand[z].suit;
	delete computer_hand[z];
	computer_hand[z]=computer_hand[0];
	computer_hand.shift();
	next_card[0].rank = cards.rank[7];
	question("Enter the number of the card you would like to play\n" + cards.handToString(computer_hand, os.EOL, true));
	let eight_suit = question("CRAZY EIGHTS! You played an 8 - choose a suit\n1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
	if (eight_suit === '1') {
		console.log("You chose to play: " + cards.suits.SPADES)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.SPADES;
	}
	else if (eight_suit === '2') {
		console.log("You chose to play: " + cards.suits.HEARTS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.HEARTS;
	}
	else if (eight_suit === '3') {
		console.log("You chose to play: " + cards.suits.CLUBS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.CLUBS;
	}
	else {
		console.log("You chose to play: " + cards.suits.DIAMONDS)
		discard_pile.push(next_card);
		next_card[0].suit = cards.suits.DIAMONDS;
	}
	question("Press enter to continue");
}
else {
	console.log("😔 You have no playable cards");
	question("Press ENTER to draw cards until matching:" + next_card[0].rank + "," + next_card[0].suit + ", 8");
	let [new_deck_drawn, drawncards] = cards.drawUntilPlayable(new_deck, next_card[0]);
	new_deck = [...new_deck_drawn];
	console.log(".");
	console.log("Cards Drawn: " + cards.handToString(drawncards));
	let index = 0;
	while (index < drawncards.length && drawncards[index].rank != next_card[0].rank && drawncards[index].suit != next_card[0].suit && drawncards[index].rank != cards.rank[7]) {
		index++;
	}
	if (index === drawncards.length) {
		index = index - 1;
	}
	if (drawncards[index].rank === cards.rank[7]) {
		console.log("CRAZY EIGHTS! You played an 8 - choose a suit");
		let suitt = question("1: " + cards.suits.SPADES + "\n2: " + cards.suits.HEARTS + "\n3: " + cards.suits.CLUBS + "\n4: " + cards.suits.DIAMONDS + "\n");
		next_card.pop();
		next_card.push(drawncards[index]);
		if (suitt === '1') {
			console.log("You chose to play: " + cards.suits.SPADES)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.SPADES;
		}
		else if (suitt === '2') {
			console.log("You chose to play: " + cards.suits.HEARTS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.HEARTS;
		}
		else if (suitt === '3') {
			console.log("You chose to play: " + cards.suits.CLUBS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.CLUBS;
		}
		else {
			console.log("You chose to play: " + cards.suits.DIAMONDS)
			discard_pile.push(next_card);
			next_card[0].suit = cards.suits.DIAMONDS;
		}
		question("Press enter to continue");
	}
	else {
		next_card.pop();
		next_card.push(drawncards[index]);
		discard_pile.push(next_card);
		console.log("Card Played: " + drawncards[index].rank + drawncards[index].suit);
		question("Press enter to continue");
	}
	delete drawncards[index];
	drawncards[index]=drawncards[0];
	drawncards.shift();
	for (let iterate=0;iterate<drawncards.length;iterate++)
	{
		computer_hand.push(drawncards[i]);
	}
}
clear();
console.log("               CR🤪ZY 8's                        ");
console.log("--------------------------------------------------");
if (next_card[0].rank === cards.rank[7]) {
	console.log("Next suit/rank to play:➡️  " + next_card[0].suit + "  ⬅️️");
}
else {
	console.log("Next suit/rank to play:➡️  " + cards.handToString(next_card) + "  ⬅️");
}
console.log("--------------------------------------------------");
let temps_2= new Array;
temps_2.push(discard_pile.pop());
/*if(next_card[0].rank==cards.rank[7])
{
	console.log("Top of discard pile: " + next_card[0].suit);

}*/
console.log("Top of discard pile: " +cards.handToString(next_card));
console.log("🤖✋ (computer hand): " + cards.handToString(computer_hand));
console.log("😊✋ (player hand): " + cards.handToString(player_hand));
console.log("--------------------------------------------------");
console.log("😊 Player's turn...");
}else
{
	path=process.argv[2];
	readFile(path,(err,data)=>
	{
		if(err){
			throw err;
		}
		let dict=JSON.parse(data);	
	});
	
}
