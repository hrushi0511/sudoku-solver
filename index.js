var _board = [[], [], [], [], [], [], [], [], []];
var id_number;
var z = 0;
var compare, ref;
var x = 1;
var input_x_position, input_y_position;

$(".solve").click(solve);

document.addEventListener("keypress", function (event) {
  var input_value = event.key;
  var input_id = event.path[0].id;
  if (input_value === "Enter") {
    if (input_id.length === 2) {
      id_number = input_id[1];
    }
    if (input_id.length === 3) {
      id_number = input_id[1] + input_id[2];
    }
    if(id_number==81){
      document.querySelector("#_1").focus();
    }else{
    id_number = String(Number(id_number) + 1);
    document.querySelector("#_" + id_number).focus();
    }
  } else if (input_value % 2 === 1 || input_value % 2 === 0) {
    if (input_id.length === 2) {
      id_number = input_id[1];
      z = Number(id_number);
      ref = z;
    }
    if (input_id.length === 3) {
      id_number = input_id[1] + input_id[2];
      z = Number(id_number);
      ref = z;
    }

    horizontal_validity(input_id, input_value);

    vertical_validity(input_id, input_value);

    box_validity(input_id, input_value);
  } else {
    document.querySelector("#" + input_id).classList.add("invalid_alert");
    $("#" + input_id).replaceWith($("#" + input_id).clone());
    document.querySelector("#" + input_id).style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("#" + input_id).style.backgroundColor = "";
    }, 100);
  }
});

$(".clear").click(clear);
// functions

function solve() {
  x = 1;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var y = "#_" + x;
      if (document.querySelector(y).value === "") {
        _board[i][j] = ".";
      } else {
        _board[i][j] = document.querySelector(y).value;
      }
      x++;
    }
  }

  sodokoSolver(_board);

  x = 1;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var y = "#_" + x;
      document.querySelector(y).value = _board[i][j];
      x++;
    }
  }
}

function isValid(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
}

function sodokoSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == ".") {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = `${k}`;
            if (sodokoSolver(data)) {
              return true;
            } else {
              data[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function clear() {
  x = 1;
  for (var i = 1; i < 82; i++) {
    var y = "#_" + i;
    document.querySelector(y).value = "";
  }
  _board = [[], [], [], [], [], [], [], [], []];
}

function horizontal_validity(id, input) {
  if (z % 9 === 0) {
    input_x_position = 9;
  } else {
    input_x_position = z % 9;
  }
  for (i = 0; i < input_x_position - 1; i++) {
    z = z - 1;
    z = String(z);
    compare = document.querySelector("#_" + z).value;
    z = Number(z);
    if (compare === input) {
      document.querySelector("#" + id).classList.add("invalid_alert");
      $("#" + id).replaceWith($("#" + id).clone());
      document.querySelector("#" + id).style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("#" + id).style.backgroundColor = "";
      }, 100);

      // invalid
      // alerts
      // must be added
    }
  }
  z = ref;
  for (var i = 0; i < 9 - input_x_position; i++) {
    z = z + 1;
    z = String(z);
    compare = document.querySelector("#_" + z).value;
    z = Number(z);
    if (compare === input) {
      document.querySelector("#" + id).classList.add("invalid_alert");
      $("#" + id).replaceWith($("#" + id).clone());
      document.querySelector("#" + id).style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("#" + id).style.backgroundColor = "";
      }, 100);
      // invalid
      // alerts
      // must be added
    }
  }
  z = ref;
}

function vertical_validity(id, input) {
  if (z % 9 === 0) {
    input_y_position = z / 9;
  } else {
    input_y_position = Math.floor(z / 9 + 1);
  }

  for (var i = 0; i < 9 - input_y_position; i++) {
    z = z + 9;
    z = String(z);
    compare = document.querySelector("#_" + z).value;
    z = Number(z);
    if (compare === input) {
      document.querySelector("#" + id).classList.add("invalid_alert");
      $("#" + id).replaceWith($("#" + id).clone());
      document.querySelector("#" + id).style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("#" + id).style.backgroundColor = "";
      }, 100);
      // invalid
      // alerts
      // must be added
    }
  }
  z = ref;
  for (var i = 0; i < input_y_position - 1; i++) {
    z = z - 9;
    z = String(z);
    compare = document.querySelector("#_" + z).value;
    z = Number(z);
    if (compare === input) {
      document.querySelector("#" + id).classList.add("invalid_alert");
      $("#" + id).replaceWith($("#" + id).clone());
      document.querySelector("#" + id).style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("#" + id).style.backgroundColor = "";
      }, 100);
      // invalid
      // alerts
      // must be added
    }
  }
  z = ref;
}

function box_validity(id, input) {
  if (z >= 1 && z <= 27) {
    if (
      input_x_position === 1 ||
      input_x_position === 2 ||
      input_x_position === 3
    ) {
      var box_num = "1";
    }
    if (
      input_x_position === 4 ||
      input_x_position === 5 ||
      input_x_position === 6
    ) {
      var box_num = "2";
    }
    if (
      input_x_position === 7 ||
      input_x_position === 8 ||
      input_x_position === 9
    ) {
      var box_num = "3";
    }
  }
  if (z >= 28 && z <= 54) {
    if (
      input_x_position === 1 ||
      input_x_position === 2 ||
      input_x_position === 3
    ) {
      var box_num = "4";
    }
    if (
      input_x_position === 4 ||
      input_x_position === 5 ||
      input_x_position === 6
    ) {
      var box_num = "5";
    }
    if (
      input_x_position === 7 ||
      input_x_position === 8 ||
      input_x_position === 9
    ) {
      var box_num = "6";
    }
  }
  if (z >= 55 && z <= 81) {
    if (
      input_x_position === 1 ||
      input_x_position === 2 ||
      input_x_position === 3
    ) {
      var box_num = "7";
    }
    if (
      input_x_position === 4 ||
      input_x_position === 5 ||
      input_x_position === 6
    ) {
      var box_num = "8";
    }
    if (
      input_x_position === 7 ||
      input_x_position === 8 ||
      input_x_position === 9
    ) {
      var box_num = "9";
    }
  }
  for (var i = 0; i < 9; i++) {
    var compare_id = document.querySelectorAll(".box_" + box_num);
    if (compare_id[i].id !== id) {
      compare = document.querySelector("#" + compare_id[i].id).value;
      if (compare === input) {
        document.querySelector("#" + id).classList.add("invalid_alert");
        $("#" + id).replaceWith($("#" + id).clone());
        document.querySelector("#" + id).style.backgroundColor = "red";
        setTimeout(function () {
          document.querySelector("#" + id).style.backgroundColor = "";
        }, 100);
        // invalid
        // alerts
        // must be added
      }
    }
  }
}
