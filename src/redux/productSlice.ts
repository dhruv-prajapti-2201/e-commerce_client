import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type categoriesType={
  name:string
}

type sellerProductType={
  quantity_in_stock:number
}

type sellersType={
  name:string,
  seller_product:sellerProductType
}

export type productData={
  categories:categoriesType[],
  desc:string,
  id:number,
  image_url:string,
  name:string,
  price:number,
  sellers:sellersType[]
}

type IntialType={
  loading:boolean,
  data:productObject
}

export type productObject={
  [key:string]:productData[]
}


const initialState:IntialType={
  loading: false,
  data: {}
};


export const getProducts = createAsyncThunk("product/getProducts", async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
      
      const rawData:productData[]=data.data;

      const obj:productObject={};

      rawData.forEach((data,index)=>{
        if(obj[data.categories[0].name]){
          obj[data.categories[0].name].push(data);
        }else{
          obj[data.categories[0].name]=[data]
        }
      });

      return obj;
    } catch (err) {
      console.log(err);
      return err;
    }
  });

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload as productObject;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

//export const {  } = usersSlice.actions;
export default productSlice.reducer;
