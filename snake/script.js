var grid_size = 30;
var grid_reference = [];
function get_cell(x, y) {
    return grid_reference[y][x];
}
function get_cell_tuple(tup) {
    return get_cell(tup[0], tup[1]);
}
function copy_tuple(t) {
    return [t[0], t[1]];
}
var table = document.getElementById("grid");
if (table == null) {
    throw new Error("Unable to get grid");
}
for (var y = 0; y < grid_size; y++) {
    var row = document.createElement("tr");
    grid_reference[y] = [];
    for (var x = 0; x < grid_size; x++) {
        var cell = document.createElement("td");
        cell.setAttribute("class", "cell empty-cell");
        row.appendChild(cell);
        grid_reference[y][x] = cell;
    }
    table.appendChild(row);
}
var body = [[Math.floor(grid_size / 2), Math.floor(grid_size / 2)]];
var food = [];
function make_food() {
    var good_spot = false;
    var x = -1;
    var y = -1;
    while (!good_spot) {
        var new_x = Math.round(Math.random() * (grid_size - 1));
        var new_y = Math.round(Math.random() * (grid_size - 1));
        var ok = true;
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var b = body_1[_i];
            if (b[0] == new_x && b[1] == new_y) {
                ok = false;
                break;
            }
        }
        if (ok) {
            for (var _a = 0, food_1 = food; _a < food_1.length; _a++) {
                var f = food_1[_a];
                if (f[0] == new_x && f[1] == new_y) {
                    ok = false;
                    break;
                }
            }
        }
        if (ok) {
            x = new_x;
            y = new_y;
            break;
        }
    }
    if (x < 0 || y < 0) {
        throw new Error("Should be unreachable");
    }
    var food_tuple = [x, y];
    food[food.length] = food_tuple;
    var cell = get_cell_tuple(food_tuple);
    cell.setAttribute("class", "cell food-cell");
    cell.setAttribute("class", "cell food-cell");
}
var direction = 2;
var last_direction = direction;
var game_over = false;
function do_game_over() {
    game_over = true;
}
function step() {
    if (game_over) {
        return;
    }
    var tail = get_cell_tuple(body[body.length - 1]);
    var new_body = [copy_tuple(body[0])];
    for (var i = 1; i < body.length; i++) {
        new_body[i] = copy_tuple(body[i - 1]);
    }
    body = new_body;
    var head = body[0];
    switch (direction) {
        case 0:
            body[0] = [head[0], head[1] + 1];
            break;
        case 1:
            body[0] = [head[0] + 1, head[1]];
            break;
        case 2:
            body[0] = [head[0], head[1] - 1];
            break;
        case 3:
            body[0] = [head[0] - 1, head[1]];
            break;
        default:
            break;
    }
    for (var i = 1; i < body.length; i++) {
        if (body[0][0] == body[i][0] && body[0][1] == body[i][1]) {
            do_game_over();
            return;
        }
    }
    if (body[0][0] < 0 || body[0][0] > grid_size - 1 || body[0][1] < 0 || body[0][1] > grid_size - 1) {
        do_game_over();
        return;
    }
    var cell = get_cell_tuple(body[0]);
    if (!cell) {
        do_game_over();
        return;
    }
    cell.setAttribute("class", "cell snake-cell");
    if (tail) {
        tail.setAttribute("class", "cell empty-cell");
    }
    last_direction = direction;
    for (var i = 0; i < food.length; i++) {
        var f = food[i];
        if (body[0][0] == f[0] && body[0][1] == f[1]) {
            body[body.length] = copy_tuple(body[body.length - 1]);
            make_food();
            food.splice(i, 1);
        }
    }
}
document.onkeydown = function (e) {
    if (e.key == "s" && last_direction != 2) {
        direction = 0;
    }
    else if (e.key == "d" && last_direction != 3) {
        direction = 1;
    }
    else if (e.key == "w" && last_direction != 0) {
        direction = 2;
    }
    else if (e.key == "a" && last_direction != 1) {
        direction = 3;
    }
};
for (var i = 0; i < 10; i++)
    make_food();
setInterval(function () {
    step();
}, 100);
export {};
