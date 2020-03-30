// Hoisting
//  everything that is declared gets hoisted and stored in memory during the compile phase
name = 'Freddy'
let name
// -----------
const cat = {
	name: 'Sam',
	coat: 'Long Hair'
}

const speak = () => {
	console.log('Meow')
}

speak() // we can call this at the end of the file because of hoisting and execution



// Scoping
const dog = {
	name: 'Steve',
	size: 'small'
}

const human = {
	name: 'Joe'
}

const attack = (target) => {
	console.log(target)
	let attacking = true
	while (attacking) {
		const bite = 'BITE'
		console.log(`${bite} ${target.name}\'s leg off!`)
		attacking = false
	}
	// console.log(bite) --> undefined ERROR
}
// console.log(attacking) --> undefined
attack(human)



// Execution (compiling phase, execution phase, ...closure)
// this ==> the window object or global object. 

// window: global object
// this: window
const execute = () => {
	// this ==> the object that represents the function's execution context
	const first = () => {
		console.log(1)
		const second = () => {
			console.log(2)
			const third = () => {
				console.log(3)
			}
			third()
		}
		second()
	}
	first()
}

execute()
// Closure -->
let count = 0

const sum = (x) => {
	// console.log(this, arguments) || this => window object, arguments ==> the arguments passed in (5)
	console.log(x, arguments)
	return y => { // *
		console.log(y, y + x)
		return x + y // --> Closure! (The outer function [ * ] already popped off the execution stack but can still reference 'x')
	}
}

const add5 = sum(5)
console.log(add5) // --> function() { }
count += add5(2)

// -->

class Person {
	constructor(name) {
		this.name = name
	}

	greeting = () => {
		console.log(`Hi, I'm ${this.name}!`) // --> the name of this instance of this object
	}
}

const harry = new Person('Harry')
harry.speak() // --> Hi, I'm Harry!