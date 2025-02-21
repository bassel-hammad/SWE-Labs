/* IMPORTANT NOTES
1- You are using JS Name Casing (CamelCasing)
2- Make this code as clean as possible 
3- Apply all the concepts you learned during this lab (Naming, comments, functions)
*/

class Point {
  // Constructor to initialize the Point class
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width and height"); // Throws an error if width or height is <= 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  // Calculate the area of the rectangle
  calculateArea() {
    return this.width * this.height;
  }

  // Calculate the perimeter of the rectangle
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }

  // Update the height of the rectangle
  updateHeight(newHeight) {
    if (newHeight && newHeight > 0) {
      this.height = newHeight;
    } else {
      throw Error("Invalid height"); // Throws an error if new height is <= 0
    }
  }

  // Update the rectangle's properties
  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width and height"); // Throws an error if width or height is <= 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  // Get the height of the rectangle
  getHeight() {
    return this.height;
  }

  // Get the width of the rectangle
  getWidth() {
    return this.width;
  }

  // Print the endpoints of the rectangle
  printEndpoints() {
    const topRightX = this.startingPoint.coordX + this.width;
    const bottomLeftY = this.startingPoint.coordY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRightX);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeftY);
  }
}

// Build a rectangle object
function buildRectangle(width, coordX, height, coordY) {
  const startingPoint = new Point(coordX, coordY);
  const rectangle = new Rectangle(startingPoint, width, height);
  return rectangle;
}

// Construct a square object
function constructSquare(coordX, coordY, sideLength) {
  if (!sideLength || sideLength <= 0) {
    throw Error("Invalid side length"); // Throws an error if side length is <= 0
  }
  const square = buildRectangle(sideLength, coordX, sideLength, coordY);
  const squareArea = square.calculateArea();
  const squarePerimeter = square.calculatePerimeter();
  console.log("Square Area: ", squareArea);
  console.log("Square Perimeter: ", squarePerimeter);
  return square;
}

// Example usage
const myRectangle = buildRectangle(2, 3, 5, 4);
const mySquare = constructSquare(1, 1, 4);

console.log("Rectangle Perimeter: ", myRectangle.calculatePerimeter());
myRectangle.printEndpoints();

myRectangle.updateHeight(3);
console.log("Updated Rectangle Height: ", myRectangle.getHeight());