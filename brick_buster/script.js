var grid_table = document.getElementById("grid");
var option_table = document.getElementById("options");
var grid = [];
var grid_size = [8, 8];
for (var y = 0; y < grid_size[1]; y++) {
    var row = document.createElement("tr");
    for (var x = 0; x < grid_size[0]; x++) {
        if (!grid[x]) {
            grid[x] = [];
        }
        var cell = document.createElement("td");
        cell.classList.add("cell");
        cell.classList.add("empty-cell");
        grid[x][y] = cell;
        row.appendChild(cell);
    }
    grid_table.appendChild(row);
}
var things = [
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
];
function check_lines() {
    for (var x = 0; x < grid_size[0]; x++) {
        var line_cleared = true;
        for (var y = 0; y < grid_size[1]; y++) {
            var cell = grid[x][y];
            if (cell.classList.contains("empty-cell")) {
                line_cleared = false;
                break;
            }
        }
        if (line_cleared) {
            var _loop_1 = function (y) {
                var cell = grid[x][y];
                cell.className = "";
                cell.classList.add("cell", "cleared-cell");
                setTimeout(function () {
                    cell.classList.remove("cleared-cell");
                    cell.classList.add("empty-cell");
                }, 760);
            };
            for (var y = 0; y < grid_size[1]; y++) {
                _loop_1(y);
            }
        }
    }
    for (var y = 0; y < grid_size[1]; y++) {
        var line_cleared = true;
        for (var x = 0; x < grid_size[0]; x++) {
            var cell = grid[x][y];
            if (cell.classList.contains("empty-cell")) {
                line_cleared = false;
                break;
            }
        }
        if (line_cleared) {
            var _loop_2 = function (x) {
                var cell = grid[x][y];
                cell.className = "";
                cell.classList.add("cell", "cleared-cell");
                setTimeout(function () {
                    cell.classList.remove("cleared-cell");
                    cell.classList.add("empty-cell");
                }, 800);
            };
            for (var x = 0; x < grid_size[0]; x++) {
                _loop_2(x);
            }
        }
    }
}
function make_thing(thing) {
    var outer_table = document.createElement("table");
    outer_table.classList.add("grid");
    for (var y = 0; y < thing.height; y++) {
        var row = document.createElement("tr");
        for (var x = 0; x < thing.width; x++) {
            var cell = document.createElement("td");
            cell.classList.add("cell");
            if (thing.cells[y][x] !== 0) {
                cell.classList.add(thing.color);
            }
            else {
                cell.classList.add("empty-cell");
            }
            row.appendChild(cell);
        }
        outer_table.appendChild(row);
    }
    var holder = document.createElement("div");
    holder.classList.add("center");
    holder.appendChild(outer_table);
    return [holder, outer_table];
}
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});
function setup_thing(thing_data) {
    var res = make_thing(thing_data);
    var thing = res[0];
    var tbl = res[1];
    var rel_x;
    var rel_y;
    var holding = false;
    var holding_setup_done = false;
    var last_grid_x;
    var last_grid_y;
    var last_valid_x;
    var last_valid_y;
    var old_highlighted = [];
    function on_mousedown(ev) {
        rel_x = ev.clientX - tbl.offsetLeft;
        rel_y = ev.clientY - tbl.offsetTop;
        holding = true;
    }
    function on_touchstart(ev) {
        on_mousedown(ev.targetTouches[0]);
    }
    function on_mouseup() {
        tbl.style.position = "";
        tbl.style.left = "";
        tbl.style.right = "";
        tbl.style.opacity = "1";
        holding = false;
        holding_setup_done = false;
        for (var _i = 0, old_highlighted_1 = old_highlighted; _i < old_highlighted_1.length; _i++) {
            var cell = old_highlighted_1[_i];
            cell.classList.remove("highlighted-cell");
        }
        old_highlighted.splice(0, old_highlighted.length);
        if (last_valid_x > -1 && last_valid_y > -1) {
            for (var x = 0; x < thing_data.width; x++) {
                for (var y = 0; y < thing_data.height; y++) {
                    var cell_x = last_valid_x + x;
                    var cell_y = last_valid_y + y;
                    var cell = grid[cell_x][cell_y];
                    if (thing_data.cells[y][x]) {
                        cell.classList.remove("empty-cell");
                        cell.classList.add(thing_data.color);
                    }
                }
            }
            thing.remove();
            tbl.removeEventListener("mousedown", on_mousedown);
            tbl.removeEventListener("touchstart", on_touchstart);
            document.body.removeEventListener("mouseup", on_mouseup);
            document.body.removeEventListener("touchend", on_mouseup);
            document.body.removeEventListener("mousemove", on_mousemove);
            document.body.removeEventListener("touchmove", on_touchmove);
            check_lines();
        }
    }
    function on_mousemove(ev) {
        if (holding) {
            tbl.style.left = "".concat(ev.clientX - rel_x, "px");
            tbl.style.top = "".concat(ev.clientY - rel_y, "px");
            if (!holding_setup_done) {
                tbl.style.position = "absolute";
                tbl.style.opacity = "0.3";
                holding_setup_done = true;
            }
            var offset_x = tbl.offsetLeft - grid_table.offsetLeft;
            var offset_y = tbl.offsetTop - grid_table.offsetTop;
            var grid_x = Math.round(offset_x / 42);
            var grid_y = Math.round(offset_y / 42);
            if (grid_x > -1
                && grid_x + thing_data.width - 1 < grid_size[0]
                && grid_y > -1
                && grid_y + thing_data.height - 1 < grid_size[1]
                && (grid_x !== last_grid_x || grid_y !== last_grid_y)) {
                last_grid_x = grid_x;
                last_grid_y = grid_y;
                last_valid_x = grid_x;
                last_valid_y = grid_y;
                for (var _i = 0, old_highlighted_2 = old_highlighted; _i < old_highlighted_2.length; _i++) {
                    var cell = old_highlighted_2[_i];
                    cell.classList.remove("highlighted-cell");
                }
                old_highlighted.splice(0, old_highlighted.length);
                for (var y = 0; y < thing_data.height; y++) {
                    for (var x = 0; x < thing_data.width; x++) {
                        var cell_grid_x = grid_x + x;
                        var cell_grid_y = grid_y + y;
                        var cell = grid[cell_grid_x][cell_grid_y];
                        if (cell.classList.contains("empty-cell")) {
                            if (thing_data.cells[y][x]) {
                                cell.classList.add("highlighted-cell");
                                old_highlighted.push(cell);
                            }
                        }
                        else if (thing_data.cells[y][x]) {
                            for (var _a = 0, old_highlighted_3 = old_highlighted; _a < old_highlighted_3.length; _a++) {
                                cell = old_highlighted_3[_a];
                                cell.classList.remove("highlighted-cell");
                            }
                            old_highlighted.splice(0, old_highlighted.length);
                            last_valid_x = -1;
                            last_valid_y = -1;
                            return;
                        }
                    }
                }
            }
            else if (grid_x < 0
                || grid_x + thing_data.width - 1 >= grid_size[0]
                || grid_y < 0
                || grid_y + thing_data.height - 1 >= grid_size[1]) {
                for (var _b = 0, old_highlighted_4 = old_highlighted; _b < old_highlighted_4.length; _b++) {
                    var cell = old_highlighted_4[_b];
                    cell.classList.remove("highlighted-cell");
                }
                old_highlighted.splice(0, old_highlighted.length);
                last_valid_x = -1;
                last_valid_y = -1;
            }
        }
    }
    function on_touchmove(ev) {
        on_mousemove(ev.targetTouches[0]);
    }
    tbl.addEventListener("mousedown", on_mousedown);
    tbl.addEventListener("touchstart", on_touchstart);
    document.body.addEventListener("mouseup", on_mouseup);
    document.body.addEventListener("touchend", on_mouseup);
    document.body.addEventListener("mousemove", on_mousemove);
    document.body.addEventListener("touchmove", on_touchmove);
    return res;
}
function make_new_things() {
    for (var i = 0; i < 4; i++) {
        var thing_to_make = Math.round(Math.random() * (things.length - 1));
        var thing_data = things[thing_to_make];
        var res = setup_thing(thing_data);
        var thing = res[0];
        option_table.appendChild(thing);
    }
}
var removeObserver = new MutationObserver(function () {
    if (option_table.children.length <= 0) {
        make_new_things();
    }
});
make_new_things();
removeObserver.observe(option_table, { attributes: true, childList: true, characterData: true });
