import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
  isSorted: boolean;
};

export const App: React.FC = () => {
  const [ReorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
    isSorted: false,
  });

  const getReorderedGoods = (goods: string[]) => {
    const visibleGoods = [...goods];

    if (ReorderOptions.sortType === SortType.ALPHABET) {
      visibleGoods.sort((a, b) => a.localeCompare(b));
    } else if (ReorderOptions.sortType === SortType.LENGTH) {
      visibleGoods.sort((a, b) => a.length - b.length);
    }

    if (ReorderOptions.isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const setSortAlphabetically = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.ALPHABET,
      isSorted: true,
    }));
  };

  const setSortByLength = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.LENGTH,
      isSorted: true,
    }));
  };

  const toggleReverse = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
      isSorted: true,
    }));
  };

  const reset = () => {
    setReorderOptions(prevState => ({
      ...prevState,
      sortType: SortType.NONE,
      isReversed: false,
      isSorted: false,
    }));
  };

  const goods = getReorderedGoods(goodsFromServer);
  const { isSorted } = ReorderOptions;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSorted ? '' : 'is-light'}`}
          onClick={setSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${isSorted ? '' : 'is-light'}`}
          onClick={setSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isSorted ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          <li data-cy="Good" key={index}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
