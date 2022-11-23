import {
  ADD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
} from '../Actions';

let initialState = {
  loader: false,
  data: null,
  error: '',
  addProductData: [],
  addProductStatus: false,
  productTotalPrice: 0,
  myProductTotalPrice: 0,
};

export const LoadProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT_REQUEST:
      return {
        ...state,
        loader: true,
        data: null,
        error: '',
        productTotalPrice: 0,
      };
    case LOAD_PRODUCT_SUCCESS:
      const sum = action?.payload.reduce(
        (partialSum, a) => partialSum + a.price,
        0,
      );

      return {
        ...state,
        loader: false,
        data: action?.payload,
        error: '',
        productTotalPrice: sum.toFixed(2),
      };
    case LOAD_PRODUCT_FAIL:
      return {
        ...state,
        loader: false,
        data: null,
        error: action.payload,
        productTotalPrice: 0,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loader: false,
        error: '',
        addProductData: [...state.addProductData, action?.payload],
        addProductStatus: true,
        myProductTotalPrice: 0,
      };
    case 'GET_MY_PRODUCT':
      const myProductPrice = state?.addProductData.reduce(
        (partialSum, a) => partialSum + a.price,
        0,
      );
      return {...state, myProductTotalPrice: myProductPrice};
    case 'ADD_PRODUCT_SUCCED':
      return {...state, addProductStatus: false};
    default:
      return state;
  }
};
