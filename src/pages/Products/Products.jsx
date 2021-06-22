import { useState } from "react";
import { useData } from "../../context";
import { ProductCard, FilterBox, onlyUnique, Loader } from "../../components";
import styles from "./Products.module.css";

export default function Products() {
    const { productData, showInventoryAll, sortBy, categories, dispatch, isLoading } = useData();
    
    const categoryList = productData.map((property) => property.category).filter(onlyUnique);

    const getSortedData = (productList, sortBy) => {
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
            return productList.sort((a, b) => b["price"] - a["price"]);
        }
      
        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
            return productList.sort((a, b) => a["price"] - b["price"]);
        }
        return productList;
    }
    
    const getFilteredData = (
        productList,{ showInventoryAll, categories })  => {
        return productList
            .filter(product => categories.length > 0 ? categories.includes(product.category) : product)
            .filter(({ inStock }) => (showInventoryAll ? true : inStock))
      }

    const sortedData = getSortedData(productData, sortBy);
    const filteredData = getFilteredData(sortedData, {showInventoryAll, categories});
    
    return (
        <section>
            <div className={`${styles.header}`}>
                <div className={`${styles.headerText} h1`}>Products</div>
            </div>
            <FilterBox 
                showInventoryAll={showInventoryAll}
                categoryList={categoryList}
                categories={categories}
                sortBy={sortBy}
                dispatch={dispatch}
            />
            <div className={`${styles.container}`}>
                <div className={`${styles.productGrid} mt-4`}>
                {
                    filteredData?.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}


// import { useEffect, useState } from "react";
// import { useData } from "../../context";
// import { ProductCard, FilterBox, onlyUnique, Loader } from "../../components";
// import styles from "./Products.module.css";

// export default function Products() {
//     const [showFilter, setShowFilter] = useState(false);
//     const { productData, showInventoryAll, sortBy, categories, dispatch, isLoading } = useData();
    
//     const categoryList = productData.map((property) => property.category).filter(onlyUnique);

//     const getSortedData = (productList, sortBy) => {
//         if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
//             return productList.sort((a, b) => b["price"] - a["price"]);
//         }
      
//         if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
//             return productList.sort((a, b) => a["price"] - b["price"]);
//         }
//         return productList;
//     }
    
//     const getFilteredData = (
//         productList,{ showInventoryAll, categories })  => {
//         return productList
//             .filter(product => categories.length > 0 ? categories.includes(product.category) : product)
//             .filter(({ inStock }) => (showInventoryAll ? true : inStock))
//       }

//     const sortedData = getSortedData(productData, sortBy);
//     const filteredData = getFilteredData(sortedData, {showInventoryAll, categories});
    
//     const filterHandler = () => {
//         setShowFilter(() => !showFilter);
//     }

//     useEffect(() => {
//         if(window.innerWidth > 768) {
//             setShowFilter(true)
//         }
//     },[])
//     return (
//         <>
//         <button 
//             onClick={filterHandler}
//             className={`btn iconBtn ${styles.filterBtn}`}>
//             <i class='bx bx-filter-alt' ></i>Filter
//         </button>
//            <div>
//            { showFilter &&
//                <FilterBox 
//                showInventoryAll={showInventoryAll}
//                categoryList={categoryList}
//                categories={categories}
//                sortBy={sortBy}
//                dispatch={dispatch}
//            />
//            }
//            </div>
//            {isLoading && <Loader/>}
//             <main className={`${styles.main} p-2`}>
//                 <div className={`${styles.productGrid} mt-4`}>
//                     {
//                         filteredData &&
//                         filteredData.map((product) => (
//                             <ProductCard key={product._id} product={product}/>
//                         ))
//                     }
//                 </div>
//             </main>
//         </>
//     )
// }