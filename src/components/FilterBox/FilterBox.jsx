import { useState } from 'react';
import styles from './FilterBox.module.css';

export const FilterBox = ({
    dispatch,
    categoryList,
    categories,
    sizeSelect,
    sizeList,
    rating
}) => {
    const [isVisible, setVisible] = useState(false);
    const setFilterBoxVisible = () => setVisible((prevState) => !prevState);

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.action}`}>
                <button
                    onClick={setFilterBoxVisible}
                    className={`${styles.btnIcon}`}
                >
                    <i className="bx bx-filter-alt mr-1 h4"></i> FILTER
                </button>

                <button
                    onClick={() => dispatch({ type: 'CLEAR_ALL_FILTERS' })}
                    className={`${styles.btnIcon} ml-4`}
                >
                    CLEAR
                </button>

                <div className={`${styles.actionSelect}`}>
                    <select
                        onChange={(e) =>
                            dispatch({ type: 'SORT', payload: e.target.value })
                        }
                        className={`${styles.selectOption}`}
                    >
                        <option value="FEATURED">Featured</option>
                        <option value="PRICE_LOW_TO_HIGH">
                            Price, Low to High
                        </option>
                        <option value="PRICE_HIGH_TO_LOW">
                            Price, High to Low
                        </option>
                    </select>
                </div>
            </div>
            <div
                className={`${styles.filterContainer} ${
                    isVisible || styles.hideFilterCont
                }`}
            >
                <div className={`${styles.filterBox}`}>
                    <div className={`${styles.box1}`}>
                        <div className={`${styles.filterName}`}>CATEGORIES</div>
                        <ul className={`mt-2 mb-2`}>
                            {categoryList.map((category) => (
                                <li
                                    key={category}
                                    className={`d-flex flex-align-center`}
                                >
                                    <CheckboxInput
                                        checked={categories.some(
                                            (value) => value === category
                                        )}
                                        onChange={() =>
                                            dispatch({
                                                type: 'TOGGLE_CATEGORY',
                                                payload: category
                                            })
                                        }
                                        name={category}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`${styles.box2}`}>
                        <div className={`${styles.filterName}`}>RATING</div>
                        <ul className={`mt-2 mb-2`}>
                            <li className={`d-flex flex-align-center`}>
                                <RadioInput
                                    name={4}
                                    checked={rating === 4}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'FILTER_BY_RATING',
                                            payload: 4
                                        })
                                    }
                                />
                            </li>
                            <li className={`d-flex flex-align-center`}>
                                <RadioInput
                                    name={3}
                                    checked={rating === 3}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'FILTER_BY_RATING',
                                            payload: 3
                                        })
                                    }
                                />
                            </li>
                            <li className={`d-flex flex-align-center`}>
                                <RadioInput
                                    name={2}
                                    checked={rating === 2}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'FILTER_BY_RATING',
                                            payload: 2
                                        })
                                    }
                                />
                            </li>
                            <li className={`d-flex flex-align-center`}>
                                <RadioInput
                                    name={1}
                                    checked={rating === 1}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'FILTER_BY_RATING',
                                            payload: 1
                                        })
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.box3}`}>
                        <div className={`${styles.filterName}`}>Sizes</div>
                        <ul className={`mt-2 mb-2`}>
                            {sizeList.map((size) => (
                                <li
                                    key={size}
                                    className={`d-flex flex-align-center`}
                                >
                                    <CheckboxInput
                                        checked={sizeSelect.some(
                                            (value) => value === size
                                        )}
                                        onChange={() =>
                                            dispatch({
                                                type: 'TOGGLE_SIZE',
                                                payload: size
                                            })
                                        }
                                        name={size}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckboxInput = ({ checked, onChange, name }) => {
    return (
        <label className={`${styles.labelName}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                value={name}
            />
            <p className={`ml-2`}>{name}</p>
        </label>
    );
};

const RadioInput = ({ onChange, name, checked }) => {
    return (
        <label className={`${styles.labelName}`}>
            <input type="radio" onChange={onChange} checked={checked} />
            <p className={`ml-2`}>
                {name} <i className="bx bx-star"></i>
            </p>
        </label>
    );
};
