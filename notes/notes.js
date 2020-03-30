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



// Execution
const execute = () => {
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
	console.log(x, arguments)
	return y => {
    console.log(y, y + x)
    return x + y
	}
}

const add5 = sum(5)
console.log(add5) // --> function() { }
count += add5(2)
