import styles from "./FilterBox.module.css";

export const FilterBox = (
    {dispatch, 
    showInventoryAll, 
    sortBy, 
    categoryList, 
    categories
    }) => {


    return (
        <>
            <div className={`${styles.sidebar}`}>
                <div className={`${styles.card} mt-4`}>
                    <div className={`d-flex flex-justify-space-between flex-align-center p-1 pb-2 mb-2 ${styles.cardSection}`}>
                        <h5>FILTER</h5>
                        <button
                            onClick={() => dispatch({type: "CLEAR_ALL_FILTERS"})}
                            className={`btn ${styles.btn}`}>
                            CLEAR
                        </button>
                    </div>
                    <div className={`p-1 pb-2 mb-2 ${styles.cardSection}`}>
                        <h6 className={`mt-1 mb-1`}>Categories</h6>
                        <ul>
                            {
                                categoryList.map((category) => (
                                <li 
                                    key={category}
                                    className={`d-flex flex-justify-space-between flex-align-center`}>
                                    <label>{category}</label>
                                    <input 
                                        type="checkbox"
                                        checked={categories.some(value => value === category)} 
                                        onChange={() => dispatch({type: "TOGGLE_CATEGORY", payload: category})}
                                        value={category}/>
                                </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={`p-1 pb-2 mb-2`}>
                        <h6 className={`mt-1 mb-1`}>Sort By</h6>
                        <ul>
                            <li className={`d-flex flex-justify-space-between flex-align-center`}>
                                <label htmlFor="lowTohigh">Price: Low to High</label>
                                <input 
                                    type="radio" 
                                    checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                                    onChange={() => dispatch({type: "SORT", payload: "PRICE_LOW_TO_HIGH"})}
                                />
                            </li>
                            <li className={`d-flex flex-justify-space-between flex-align-center`}>
                                <label htmlFor="hightToLow">Price: High to Low</label>
                                <input 
                                    type="radio" 
                                    checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                                    onChange={() => dispatch({type: "SORT", payload: "PRICE_HIGH_TO_LOW"})}
                                />
                            </li>
                            <li className={`d-flex flex-justify-space-between flex-align-center`}>
                                <label htmlFor="tropical">Include Out of Stock</label>
                                <input 
                                    type="checkbox"
                                    checked={showInventoryAll}
                                    onChange={() => dispatch({type: "TOGGLE_INVENTORY"})}
                                /> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}