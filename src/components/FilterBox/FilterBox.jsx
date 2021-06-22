import { Fragment, useState } from "react";
import styles from "./FilterBox.module.css";

export const FilterBox = (
    {dispatch, 
    showInventoryAll, 
    sortBy, 
    categoryList, 
    categories
    }) => {
        const [isVisible, setVisible] = useState(false);

        const setFilterBoxVisible = () => setVisible((prevState) => !prevState)
    
        const filterBoxStyle = {
            borderRadius: "0.2rem",
            backgroundColor: "#f5f5ff",
            height: isVisible ? "auto" : 0,
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transition: "all 800ms ease-in"
        }

    return (
        <div className={`${styles.wrapper}`}>
                <div className={`${styles.action}`}>
                    <button 
                        onClick={setFilterBoxVisible} 
                        className={`${styles.btnIcon}`}><i className='bx bx-filter-alt mr-1 h4'></i> FILTER
                    </button>

                    <button 
                        onClick={() => dispatch({type: "CLEAR_ALL_FILTERS"})} 
                        className={`${styles.btnIcon} ml-4`}>CLEAR
                    </button>
                    
                    <div className={`${styles.actionSelect}`}>
                        <select onChange={(e) => dispatch({type: "SORT", payload:e.target.value})} className={`${styles.selectOption}`}>
                            <option value="BEST_SELLER">Best Seller</option>
                            <option value="FEATURED">Featured</option>
                            <option value="PRICE_LOW_TO_HIGH">Price, Low to High</option>
                            <option value="PRICE_HIGH_TO_LOW">Price, High to Low</option>
                        </select>
                    </div>

                </div>
                <div style={filterBoxStyle}>
                    <div className={`${styles.filterBox}`}>
                        <div className={`${styles.box}`}>
                            <div className={`${styles.filterName}`}>CATEGORIES</div>
                            <ul className={`mt-2 mb-2`}>
                            {
                                categoryList.map((category) => (
                                <li 
                                    key={category}
                                    className={`d-flex flex-align-center`}>
                                <Checkbox 
                                    checked={categories.some(value => value === category)}
                                    onChange={() => dispatch({type: "TOGGLE_CATEGORY", payload: category})}
                                    name={category}
                                />
                            </li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={`${styles.filterName}`}>RATING</div>
                        
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={`${styles.filterName}`}>PRICE</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Checkbox = ({checked, onChange, name}) => {
    return (
        <Fragment>
                <input 
                type="checkbox"
                checked={checked} 
                onChange={onChange}
                value={name}/>
            <label className={`${styles.labelName}`}>{name}</label>
        </Fragment>
    )
}