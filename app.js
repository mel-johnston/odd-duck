'use strict';

// ******* GLOBALS *******
let productArray = [];
let votingRounds = 25;


//  ****** DOM WINDOWS *******
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// ***** CONSTRUCTOR FUNCTION ******
function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
  Product.productArray.push(this);
}

Product.productArray = [];

// ***** HELPER FUNCTIONS / UTILITIES *****
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = [];
function renderImg() {

  while (indexArray.length < 6) {
    let randoNum = randomIndex();
    if (!indexArray.includes(randoNum)) {
      indexArray.push(randoNum);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.titles = productArray[imgThreeIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

// **** EVENT HANDLERS *****
function handleClick(event) {
  let imgClicked = event.target.title;
  console.log(imgClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  votingRounds--;

  renderImg();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    renderChart();
  }
}

// *******************

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  for (let i = 0; i < Product.productArray.length; i++) {
    productNames.push(Product.productArray[i].name);
    productVotes.push(Product.productArray[i].votes);
    productViews.push(Product.productArray[i].views);
  }

  // resultsBtn.removeEventListener('click', renderChart);

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productVotes,
      backgroundColor: [
        'hsl(11, 52%, 45%)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 2
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgb(243, 251, 151)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 2
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}

// **** EXECUTABLE CODE *****
const bag = new Product('bag');
const banana = new Product('banana');
const bathroom = new Product('bathroom');
const boots = new Product('boots');
const breakfast = new Product('breakfast');
const bubblegum = new Product('bubblegum');
const chair = new Product('chair');
const cthulhu = new Product('cthulhu');
const dogDuck = new Product('dog-duck');
const dragon = new Product('dragon');
const pen = new Product('pen');
const petSweep = new Product('pet-sweep');
const scissors = new Product('scissors');
const shark = new Product('shark');
const sweep = new Product('sweep', 'png');
const tauntaun = new Product('tauntaun');
const unicorn = new Product('unicorn');
const waterCan = new Product('water-can');
const wineGlass = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
// resultsBtn.addEventListener('click', renderChart);

console.log(productArray);
