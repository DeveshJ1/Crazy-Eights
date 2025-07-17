// cards.mjs
export const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
export const rank=["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export function range(...args)
{
	let start;
	let inc; 
	let end;
	if(args.length===1)
	{
		 start=0;
		 inc=1;
		 end=args[0];
	}
	else if(args.length===2)
	{
		 start=args[0];
		 end=args[1];
		 inc=1;
	}else
	{
		 start=args[0];
		 end=args[1];
		 inc=args[2]
	}
	let arr=new Array();
	for(i=start;i<end;i+=inc)
	{
		arr.push(i);
	}
	return arr
}
export function generateDeck()
{
	let deck = new Array();
	for(let i = 0; i < 4; i++)
	{
		for(let x = 0; x < rank.length; x++)
		{
			let card = null;
			if (i===0)
			{
				 card = {suit: suits.CLUBS, rank:rank[x]};
			}
			else if(i===1)
			{
				 card = {suit: suits.DIAMONDS, rank:rank[x]};
			}
			else if(i===2)
			{
				 card = {suit: suits.HEARTS, rank:rank[x]};
			}
			else
			{
				 card = {suit: suits.SPADES, rank:rank[x]};
			}
			deck.push(card);
		}
	} 
	return deck; 
	}
export function shuffle(deck)
{
	let newdeck=[...deck];
	for (let i = newdeck.length - 1; i > 0; i--)
	{
    let j = Math.floor(Math.random() * i);
    let temp = newdeck[i];
    newdeck[i] = newdeck[j];
    newdeck[j] = temp;
	}
return newdeck;
}
export function draw(...args)
{
	let cardsArray=[...args[0]];
	let n;
	if (args.length===1)
	{
		n=1
	}
	else
	{
		n=args[1];
	}
	let removed=new Array();
	if(n===1)
	{
		let card=cardsArray.pop();
		removed.push(card);
	}else
	{
		let count=0;
		while(count<n)
		{
			let card=cardsArray.pop()
			removed.push(card);
			count++;
		}
	}
	let lastly= new Array();
	lastly.push(cardsArray);
	lastly.push(removed);
	return lastly;	
}
export function deal(...args)
{
	//console.log(args.length);
	let cardsArray=new Array()
	cardsArray=[...args[0]];
	let numHands;
	let cardsPerHand;
	if(args.length===1)
	{
		numHands=2;
		cardsPerHand=5;
	}
	else if(args.length===2)
	{
		numHands=args[1]
		cardsPerHand=5;
	}
	else
	{
		numHands=args[1];
		cardsPerHand=5;
	}
	let i=0;
	let hands= new Array();
	while(i<numHands)
	{
		let temp= new Array();
		let count=0;
		while(count<cardsPerHand)
		{
			let card=cardsArray.pop()
			temp.push(card);
			count++
		}
		hands.push(temp);
		i++;
		}	
	let lastly = { cardsArray: cardsArray , hands: hands};
	return lastly;
}
export function handToString(...args)
{
	
	let hand=args[0];
	let sep;
	let numbers;
	if(args.length===1)
	{
		sep="  "
		numbers=false;
	}
	else if(args.length===2)
	{
		sep=args[1];
		numbers=false
	}
	else
	{
		sep=args[1];
		numbers=args[2];
	}
	let deckstring="";
	if(numbers===false)
	{
		for(let i=0;i<hand.length;i++)
		{
			deckstring=deckstring +  hand[i].rank+hand[i].suit +  sep;
		}
	}else
	{
		for(let i=0;i<hand.length;i++)
		{
			deckstring=deckstring + (i+1) + ': ' + hand[i].rank+hand[i].suit +  sep;
		}
	}
	return deckstring;
}
export function matchesAnyProperty(obj,matchObj)
{
	let i=0
	while(i<obj.length)
	{
		if(obj[i].rank===matchObj.rank || obj[i].suit===matchObj.suit)
		{
			return true;
		}
		i++; 
	}
	return false;
}
export function drawUntilPlayable(deck, matchObject)
{
	let lastly= new Array();
	let newdeck=[...deck];
	let temp= new Array();
	let i=newdeck.length-1;
	while (i >= 0) {
		if (newdeck[i].rank === 8 || newdeck[i].rank === matchObject.rank || newdeck[i].suit === matchObject.suit) 
		{
			temp = newdeck.splice(i);
			break;
		}
		i--;
	}
	lastly.push(newdeck);
	lastly.push(temp);
	return lastly;
}

