let grid_size = 30

let grid_reference = []
function get_cell(x, y) {
	return grid_reference[y][x]
}
function get_cell_tuple(tup) {
	return get_cell(tup[0], tup[1])
}

function copy_tuple(t) {
	return [t[0], t[1]]
}

let table = document.getElementById("grid")

for (let y = 0; y < grid_size; y++) {
	let row = document.createElement("tr")
	grid_reference[y] = []
	for (let x = 0; x < grid_size; x++) {
		let cell = document.createElement("td")
		cell.setAttribute("class", "cell empty-cell")
		row.appendChild(cell)

		grid_reference[y][x] = cell
	}

	table.appendChild(row)
}

let body = [[Math.floor(grid_size / 2), Math.floor(grid_size / 2)]]

let food = []

function make_food() {
	console.trace("Making food")
	let good_spot = false

	let x;
	let y;

	while (!good_spot) {
		let new_x = Math.round(Math.random()*(grid_size-1))
		let new_y = Math.round(Math.random()*(grid_size-1))

		let ok = true
		for (b of body) {
			if (b[0] == new_x && b[1] == new_y) {
				ok = false
				break
			}
		}

		if (ok) {
			for (f of food) {
				if (f[0] == new_x && f[1] == new_y) {
					ok = false
					break
				}
			}
		}

		if (ok) {
			x = new_x
			y = new_y
			break
		}
		console.log("Bad food spot, making new one")
	}

	console.log(x, y)

	let food_tuple = [x, y]

	food[food.length] = food_tuple

	let cell = get_cell_tuple(food_tuple)
	cell.setAttribute("class", "cell food-cell")
	cell.setAttribute("class", "cell food-cell")
}

let direction = 2
let last_direction = direction

let game_over = false

function do_game_over() {
	game_over = true
	
}

function step() {
	if (game_over) {
		return
	}

	let tail = get_cell_tuple(body[body.length-1])

	let new_body = [copy_tuple(body[0])]

	for (let i = 1; i < body.length; i++) {
		new_body[i] = copy_tuple(body[i-1])
	}

	body = new_body

	let head = body[0]
	switch (direction) {
		case 0:
			body[0] = [head[0], head[1] + 1]
			break;

		case 1:
			body[0] = [head[0] + 1, head[1]]
			break;

		case 2:
			body[0] = [head[0], head[1] - 1]
			break;

		case 3:
			body[0] = [head[0] - 1, head[1]]
			break;
	
		default:
			break;
	}

	for (let i = 1; i < body.length; i++) {
		if (body[0][0] == body[i][0] && body[0][1] == body[i][1]) {
			do_game_over()
			return;
		}
	}

	if (body[0][0] < 0 || body[0][0] > grid_size-1 || body[0][1] < 0 || body[0][1] > grid_size-1) {
		do_game_over()
		return;
	}

	let cell = get_cell_tuple(body[0])
	if (!cell) {
		do_game_over()
		return;
	}

	cell.setAttribute("class", "cell snake-cell")
	if (tail) {
		tail.setAttribute("class", "cell empty-cell")
	}
	last_direction = direction

	for (let i = 0; i < food.length; i++) {
		let f = food[i]
		if (body[0][0] == f[0] && body[0][1] == f[1]) {
			body[body.length] = copy_tuple(body[body.length-1])
			make_food()
			food.splice(i, 1)
			console.log(i, f[0], f[1])
		}
	}
}

document.onkeydown = (e) => {
	if (e.key == "s" && last_direction != 2) {
		direction = 0
	} else if (e.key == "d" && last_direction != 3) {
		direction = 1
	} else if (e.key == "w" && last_direction != 0) {
		direction = 2
	} else if (e.key == "a" && last_direction != 1) {
		direction = 3
	}
}

for (let i = 0; i < 20; i++)
	make_food()

setInterval(() => {
	step()
}, 100)