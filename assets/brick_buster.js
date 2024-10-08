let grid_table = document.getElementById("grid")
let option_table = document.getElementById("options")

let grid = []

let grid_size = [8, 8]

for (let y = 0; y < grid_size[1]; y++) {
	let row = document.createElement("tr")
	for (let x = 0; x < grid_size[0]; x++) {
		if (!grid[x]) {
			grid[x] = []
		}

		let cell = document.createElement("td")
		cell.classList.add("cell")
		cell.classList.add("empty-cell")

		grid[x][y] = cell
		row.appendChild(cell)
	}
	grid_table.appendChild(row)
}

let things = [
	{
		height: 1,
		width: 1,
		color: "red",
		cells: [
			[1]
		]
	},
	{
		height: 3,
		width: 3,
		color: "blue",
		cells: [
			[1, 0, 0],
			[1, 0, 0],
			[1, 1, 1]
		]
	},
	{
		height: 3,
		width: 3,
		color: "blue",
		cells: [
			[0, 0, 1],
			[0, 0, 1],
			[1, 1, 1]
		]
	},
	{
		height: 3,
		width: 3,
		color: "blue",
		cells: [
			[1, 1, 1],
			[1, 0, 0],
			[1, 0, 0]
		]
	},
	{
		height: 3,
		width: 3,
		color: "blue",
		cells: [
			[1, 1, 1],
			[0, 0, 1],
			[0, 0, 1]
		]
	},
	{
		height: 3,
		width: 2,
		color: "green",
		cells: [
			[1, 0],
			[1, 0],
			[1, 1]
		]
	},
	{
		height: 3,
		width: 2,
		color: "green",
		cells: [
			[0, 1],
			[0, 1],
			[1, 1]
		]
	},
	{
		height: 3,
		width: 2,
		color: "green",
		cells: [
			[1, 1],
			[0, 1],
			[0, 1]
		]
	},
	{
		height: 3,
		width: 2,
		color: "green",
		cells: [
			[1, 1],
			[1, 0],
			[1, 0]
		]
	},
	{
		height: 2,
		width: 3,
		color: "yellow",
		cells: [
			[0, 0, 1],
			[1, 1, 1],
		]
	},
	{
		height: 2,
		width: 3,
		color: "yellow",
		cells: [
			[1, 0, 0],
			[1, 1, 1],
		]
	},
	{
		height: 2,
		width: 3,
		color: "yellow",
		cells: [
			[1, 1, 1],
			[0, 0, 1],
		]
	},
	{
		height: 2,
		width: 3,
		color: "yellow",
		cells: [
			[1, 1, 1],
			[1, 0, 0],
		]
	},
	{
		height: 5,
		width: 1,
		color: "flamingo",
		cells: [
			[1],
			[1],
			[1],
			[1],
			[1]
		]
	},
	{
		height: 1,
		width: 5,
		color: "flamingo",
		cells: [
			[1, 1, 1, 1, 1]
		]
	},
	{
		height: 3,
		width: 1,
		color: "peach",
		cells: [
			[1],
			[1],
			[1]
		]
	},
	{
		height: 1,
		width: 3,
		color: "peach",
		cells: [
			[1, 1, 1]
		]
	},
	{
		height: 2,
		width: 2,
		color: "sky",
		cells: [
			[1, 1],
			[1, 1]
		]
	},
	{
		height: 3,
		width: 3,
		color: "teal",
		cells: [
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1]
		]
	},
	{
		height: 3,
		width: 3,
		color: "mauve",
		cells: [
			[1, 1, 1],
			[0, 1, 0],
			[0, 1, 0]
		]
	},
	{
		height: 3,
		width: 3,
		color: "mauve",
		cells: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 1]
		]
	}
]

function check_lines() {
	for (let x = 0; x < grid_size[0]; x++) {
		let line_cleared = true
		for (let y = 0; y < grid_size[1]; y++) {
			let cell = grid[x][y]
			if (cell.classList.contains("empty-cell")) {
				line_cleared = false
				break
			}
		}

		if (line_cleared) {
			for (let y = 0; y < grid_size[1]; y++) {
				let cell = grid[x][y]
				cell.className = ""
				cell.classList.add("cell", "cleared-cell")
				setTimeout(() => {
					cell.classList.remove("cleared-cell")
					cell.classList.add("empty-cell")
				}, 760)
			}
		}
	}

	for (let y = 0; y < grid_size[1]; y++) {
		let line_cleared = true
		for (let x = 0; x < grid_size[0]; x++) {
			let cell = grid[x][y]
			if (cell.classList.contains("empty-cell")) {
				line_cleared = false
				break
			}
		}

		if (line_cleared) {
			for (let x = 0; x < grid_size[0]; x++) {
				let cell = grid[x][y]
				cell.className = ""
				cell.classList.add("cell", "cleared-cell")
				setTimeout(() => {
					cell.classList.remove("cleared-cell")
					cell.classList.add("empty-cell")
				}, 800)
			}
		}
	}
}

function get_valid_positions(thing_data) {
	let valid_positions = []
	for (let grid_x = 0; grid_x < grid_size[0]-thing_data.width+1; grid_x++) {
		for (let grid_y = 0; grid_y < grid_size[1]-thing_data.height+1; grid_y++) {
			let valid = true
			for (let x = 0; x < thing_data.width; x++) {
				for (let y = 0; y < thing_data.height; y++) {
					if (thing_data.cells[y][x] && !grid[grid_x+x][grid_y+y].classList.contains("empty-cell")) {
						valid = false
						break
					}
				}
				if (!valid)
					break
			}

			if (valid) {
				valid_positions.push([grid_x, grid_y])
			}
		}
	}
	return valid_positions
}

function make_thing(thing) {
	let outer_table = document.createElement("table")
	outer_table.classList.add("grid")
	for (let y = 0; y < thing.height; y++) {
		let row = document.createElement("tr")
		for (let x = 0; x < thing.width; x++) {
			let cell = document.createElement("td")
			cell.classList.add("cell")
			if (thing.cells[y][x] !== 0) {
				cell.classList.add(thing.color)
			} else {
				cell.classList.add("empty-cell")
			}
			row.appendChild(cell)
		}
		outer_table.appendChild(row)
	}

	let holder = document.createElement("div")
	holder.classList.add("center")
	holder.appendChild(outer_table)

	return [holder, outer_table]
}

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

function setup_thing(thing_data) {
	let res = make_thing(thing_data)

	let thing = res[0]
	let tbl = res[1]

	let rel_x
	let rel_y
	let holding = false
	let holding_setup_done = false

	let last_grid_x
	let last_grid_y
	let last_valid_x
	let last_valid_y
	let old_highlighted = []

	let light_cells = false
	let old_light = []

	function on_mousedown(ev) {
		rel_x = ev.clientX - tbl.offsetLeft
		rel_y = ev.clientY - tbl.offsetTop
		holding = true
	}

	function on_touchstart(ev) {
		on_mousedown(ev.targetTouches[0])
	}

	function on_mouseup(ev) {
		tbl.style.position = ""
		tbl.style.left = ""
		tbl.style.right = ""
		tbl.style.opacity = "1"
		holding = false
		holding_setup_done = false
		for (cell of old_highlighted) {
			cell.classList.remove("highlighted-cell")
		}
		light_cells = false
		for (cell of old_light) {
			cell.classList.remove("light-cell")
		}
		old_highlighted.splice(0, old_highlighted.length)

		if (last_valid_x > -1 && last_valid_y > -1) {
			for (let x = 0; x < thing_data.width; x++) {
				for (let y = 0; y < thing_data.height; y++) {
					let cell_x = last_valid_x+x
					let cell_y = last_valid_y+y

					let cell = grid[cell_x][cell_y]

					if (thing_data.cells[y][x]) {
						cell.classList.remove("empty-cell")
						cell.classList.add(thing_data.color)
					}
				}
			}
			thing.remove()
			tbl.removeEventListener("mousedown", on_mousedown)
			tbl.removeEventListener("touchstart", on_touchstart)
			document.body.removeEventListener("mouseup", on_mouseup)
			document.body.removeEventListener("touchend", on_mouseup)
			document.body.removeEventListener("mousemove", on_mousemove)
			document.body.removeEventListener("touchmove", on_touchmove)
			check_lines()
		}
	}

	function on_mousemove(ev) {
		if (holding) {
			if (!light_cells) {
				let positions = get_valid_positions(thing_data)
				for (pos of positions) {
					let p = pos
					let grid_x = p[0]
					let grid_y = p[1]

					for (let x = 0; x < thing_data.width; x++) {
						for (let y = 0; y < thing_data.height; y++) {
							let cell = grid[grid_x+x][grid_y+y]
							if (thing_data.cells[y][x] && !cell.classList.contains("light-cell")) {
								cell.classList.add("light-cell")
								old_light.push(cell)
							}
						}
					}
				}
				light_cells = true
			}

			tbl.style.left = `${ev.clientX-rel_x}px`
			tbl.style.top = `${ev.clientY-rel_y}px`

			if (!holding_setup_done) {
				tbl.style.position = "absolute"
				tbl.style.opacity = "0.3"
				holding_setup_done = true
			}

			let offset_x = tbl.offsetLeft-grid_table.offsetLeft
			let offset_y = tbl.offsetTop-grid_table.offsetTop

			let grid_x = Math.round(offset_x/42)
			let grid_y = Math.round(offset_y/42)

			if (
				grid_x > -1 
				&& grid_x+thing_data.width-1 < grid_size[0]
				&& grid_y > -1
				&& grid_y+thing_data.height-1 < grid_size[1]
				&& (grid_x !== last_grid_x || grid_y !== last_grid_y)
			) {
				
				last_grid_x = grid_x
				last_grid_y = grid_y
				last_valid_x = grid_x
				last_valid_y = grid_y

				for (cell of old_highlighted) {
					cell.classList.remove("highlighted-cell")
				}
				old_highlighted.splice(0, old_highlighted.length)

				for (let y = 0; y < thing_data.height; y++) {
					for (let x = 0; x < thing_data.width; x++) {
						let cell_grid_x = grid_x+x
						let cell_grid_y = grid_y+y

						let cell = grid[cell_grid_x][cell_grid_y]
						if (cell.classList.contains("empty-cell")) {
							if (thing_data.cells[y][x]) {
								cell.classList.add("highlighted-cell")
								old_highlighted.push(cell)
							}
						} else if (thing_data.cells[y][x]) {
							for (cell of old_highlighted) {
								cell.classList.remove("highlighted-cell")
							}
							old_highlighted.splice(0, old_highlighted.length)
							last_valid_x = -1
							last_valid_y = -1
							return
						}
					}
				}
			} else if (
				grid_x < 0
				|| grid_x+thing_data.width-1 >= grid_size[0]
				|| grid_y < 0
				|| grid_y+thing_data.height-1 >= grid_size[1]
			) {
				for (cell of old_highlighted) {
					cell.classList.remove("highlighted-cell")
				}
				old_highlighted.splice(0, old_highlighted.length)
				last_valid_x = -1
				last_valid_y = -1
			}
		}
	}

	function on_touchmove(ev) {
		on_mousemove(ev.targetTouches[0])
	}

	tbl.addEventListener("mousedown", on_mousedown)
	tbl.addEventListener("touchstart", on_touchstart)
	document.body.addEventListener("mouseup", on_mouseup)
	document.body.addEventListener("touchend", on_mouseup)
	document.body.addEventListener("mousemove", on_mousemove)
	document.body.addEventListener("touchmove", on_touchmove)

	return res
}

function make_new_things() {
	for (let i = 0; i < 4; i++) {
		let thing_to_make = Math.round(Math.random()*(things.length-1))
		let thing_data = things[thing_to_make]
		let res = setup_thing(thing_data)
	
		let thing = res[0]
	
		option_table.appendChild(thing)
	}
}

let removeObserver = new MutationObserver(() => {
	if (option_table.children.length <= 0) {
		make_new_things()
	}
})

make_new_things()

removeObserver.observe(option_table, {attributes: true, childList: true, characterData: true})