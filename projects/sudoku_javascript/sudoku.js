/* 
 Sudoku JavaScript Project

   Three levels of difficulty decided by the number of pre-filled cells. 
   81 - k. 


*/

// Step 1: Initialize grid
let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Step 2: Ensure the numbers are all unique
function isValid(grid, col, row, num) {
  // Check the column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check the row
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] === num) return false;
  }

  // Check the 3x3 box
  let boxRowStart = Math.floor(row / 3) * 3;
  let boxColStart = Math.floor(col / 3) * 3;

  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      if (grid[i][j] === num) return false;
    }
  }

  return true;
}

// Step 3: Fill the grid with random numbers using backtracking
function fillGrid(grid) {
  return solveSudoku(grid);
}

function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Try numbers 1-9 in random order
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);

        for (let num of numbers) {
          if (isValid(grid, col, row, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid)) {
              return true;
            }

            grid[row][col] = 0; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  return true; // Grid is complete
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Step 4: Display the grid
function displayGrid(grid) {
  console.log("Sudoku Grid: " + JSON.stringify(grid));
}

// DOM manipulation functions
function cellClick(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell.classList.contains("empty")) {
    const value = prompt("Enter a number (1-9):");
    if (value >= 1 && value <= 9) {
      const num = parseInt(value);
      // Check if the number is valid according to Sudoku rules
      if (isValid(grid, col - 1, row - 1, num)) {
        cell.textContent = value;
        cell.classList.remove("empty");
        cell.classList.add("filled");
        // Update the grid array
        grid[row - 1][col - 1] = num;

        // Check if board is complete
        if (isBoardComplete()) {
          setTimeout(() => {
            alert(
              "🎉 Congratulations! You have successfully completed the Sudoku puzzle! 🎉"
            );
          }, 100); // Small delay to ensure DOM updates before alert
        }
      } else {
        alert(
          "Invalid move! This number violates Sudoku rules for this position."
        );
      }
    } else if (value !== null) {
      // Don't show alert if user cancelled
      alert("Invalid input. Please enter a number between 1 and 9.");
    }
  }
}

function isBoardComplete() {
  // Check if all cells are filled (no zeros in the grid)
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
}

function cellHover(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell.classList.contains("empty")) {
    cell.style.backgroundColor = "#e0e0e0";
  }
}

function cellLeave(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (cell.classList.contains("empty")) {
    cell.style.backgroundColor = "#f0f0f0";
  }
}

// Initialize the grid when page loads
window.onload = function () {
  initializeGame();
  addEventListeners();
};

function addEventListeners() {
  // Add mouse leave events to all cells
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      cell.addEventListener("mouseleave", () => cellLeave(row, col));
    }
  }
}

function initializeGame() {
  // Fill grid with valid numbers
  fillGrid(grid);

  // Remove some numbers to create puzzle (difficulty level)
  createPuzzle(40); // Remove 40 numbers (easy level)

  // Display the grid in HTML
  displayGridHTML();
}

function createPuzzle(cellsToRemove) {
  let removed = 0;
  while (removed < cellsToRemove) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removed++;
    }
  }
}

function displayGridHTML() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById(`cell-${row + 1}-${col + 1}`);
      if (grid[row][col] === 0) {
        cell.textContent = "";
        cell.classList.add("empty");
        cell.classList.remove("filled");
      } else {
        cell.textContent = grid[row][col];
        cell.classList.add("filled");
        cell.classList.remove("empty");
      }
    }
  }
}
