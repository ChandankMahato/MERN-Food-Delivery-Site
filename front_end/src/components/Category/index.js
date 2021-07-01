// import React, { useEffect } from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import { getAllCategory, getInitialData} from '../../actions';
// import './style.css';

// /**
// * @author
// * @function Category
// **/

// const Category = (props) => {

//   const dispatch = useDispatch();
//   const category = useSelector(state => state.category);

//   useEffect(() => {
//     dispatch(getAllCategory());
//     dispatch(getInitialData());
//   }, [])

//   const renderCategories = (categories) => {
//     let myCategories = [];
//     for(let category of categories){
//       myCategories.push(

//         <li className="categoryLI">
//           <a href={`/?${category._id}`} >{category.name}</a>
//         </li>
//       );
//     }
//     return myCategories;
//   }

//   return(
//     <>
//         <div className = "categoryContainer">
//             <div className="categoryHeading">
//                 Categories
//             </div>

//             <div className="categoryList">
//                 {category.categories.length > 0 ? renderCategories(category.categories) : null}
//             </div>
//         </div>
//     </>
//    )

//  }

// export default Category