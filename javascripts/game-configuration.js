let $emptyField, $containers;
const $winWindow = $('div.win-window');
const $playingField = $('div.playing-field');

const containers = [];

const combinations = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7],
  7: [4, 6, 8],
  8: [5, 7],
};

const isWin = () => {
  let result = true;
  const mas = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  for (let i = 0; i < mas.length; i += 1) {
    if (mas[i] !== containers[i]) {
      result = false; break;
    }
  }

  return result;
};

const getRandomNumber = (min, max) => {
  const randNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randNumber;
};

$(document)
  .ready(() => {
    for (let i = 0; i < 9; i += 1) {
      while (1) {
        let isExist = false;
        const rand = getRandomNumber(0, 8);

        for (let j = 0; j < containers.length; j += 1) {
          if (containers[j] === rand) {
            isExist = true; break;
          }
        }

        if (!isExist) { containers.push(rand); break; }
      } $playingField.append(`<div data-id='${containers[i]}'></div>`);
    }

    $playingField.find('div').each((i, container) => {
      if (containers[i] !== 8) {
        $(container).css('background', `url('./images/fields/${containers[i]}')`);
      } else $emptyField = $(container);
    });
  })
  .on('click', 'div.playing-field div', function () {
    const indexChoosed = $(this).index();
    const indexEmpty = $emptyField.index();

    if (indexChoosed !== indexEmpty) {
      let isCorrectlySelected = false;

      for (let i = 0; i < combinations[indexEmpty].length; i += 1) {
        if (indexChoosed === combinations[indexEmpty][i]) {
          isCorrectlySelected = true; break;
        }
      }

      if (isCorrectlySelected) {
        containers[indexChoosed] = 8;
        containers[indexEmpty] = $(this).data('id');

        // Change elements
        const $choosedElem = $playingField.find('div').eq(indexChoosed);
        $playingField.find('div').eq(indexChoosed).replaceWith('<div data-id="8"></div>');
        $emptyField.replaceWith($choosedElem);
        $emptyField = $playingField.find('div').eq(indexChoosed);

        const result = isWin();
        if (result) $winWindow.addClass('active');
      }
    }
  });
