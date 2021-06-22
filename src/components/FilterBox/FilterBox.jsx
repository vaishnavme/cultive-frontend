import { useState } from "react";

// import styles from "./FilterBox.module.css";

// export const FilterBox = (
//     {dispatch, 
//     showInventoryAll, 
//     sortBy, 
//     categoryList, 
//     categories
//     }) => {


//     return (
//         <>
//             <div className={`${styles.sidebar}`}>
//                 <div className={`${styles.card} mt-4`}>
//                     <div className={`d-flex flex-justify-space-between flex-align-center p-1 pb-2 mb-2 ${styles.cardSection}`}>
//                         <h5>FILTER</h5>
//                         <button
//                             onClick={() => dispatch({type: "CLEAR_ALL_FILTERS"})}
//                             className={`btn ${styles.btn}`}>
//                             CLEAR
//                         </button>
//                     </div>
//                     <div className={`p-1 pb-2 mb-2 ${styles.cardSection}`}>
//                         <h6 className={`mt-1 mb-1`}>Categories</h6>
//                         <ul>
//                             {
//                                 categoryList.map((category) => (
//                                 <li 
//                                     key={category}
//                                     className={`d-flex flex-justify-space-between flex-align-center`}>
//                                     <label>{category}</label>
//                                     <input 
//                                         type="checkbox"
//                                         checked={categories.some(value => value === category)} 
//                                         onChange={() => dispatch({type: "TOGGLE_CATEGORY", payload: category})}
//                                         value={category}/>
//                                 </li>
//                                 ))
//                             }
//                         </ul>
//                     </div>

//                     <div className={`p-1 pb-2 mb-2`}>
//                         <h6 className={`mt-1 mb-1`}>Sort By</h6>
//                         <ul>
//                             <li className={`d-flex flex-justify-space-between flex-align-center`}>
//                                 <label htmlFor="lowTohigh">Price: Low to High</label>
//                                 <input 
//                                     type="radio" 
//                                     checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
//                                     onChange={() => dispatch({type: "SORT", payload: "PRICE_LOW_TO_HIGH"})}
//                                 />
//                             </li>
//                             <li className={`d-flex flex-justify-space-between flex-align-center`}>
//                                 <label htmlFor="hightToLow">Price: High to Low</label>
//                                 <input 
//                                     type="radio" 
//                                     checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
//                                     onChange={() => dispatch({type: "SORT", payload: "PRICE_HIGH_TO_LOW"})}
//                                 />
//                             </li>
//                             <li className={`d-flex flex-justify-space-between flex-align-center`}>
//                                 <label htmlFor="tropical">Include Out of Stock</label>
//                                 <input 
//                                     type="checkbox"
//                                     checked={showInventoryAll}
//                                     onChange={() => dispatch({type: "TOGGLE_INVENTORY"})}
//                                 /> 
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

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
                                <input 
                                    type="checkbox"
                                    checked={categories.some(value => value === category)} 
                                    onChange={() => dispatch({type: "TOGGLE_CATEGORY", payload: category})}
                                    value={category}/>
                                <label className={`${styles.labelName}`}>{category}</label>
                            </li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={`${styles.filterName}`}>PRICE</div>
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={`${styles.filterName}`}>RATING</div>
                    </div>
                </div>
            </div>
        </div>
    )
}