import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userData : {
     name : "",
     email : "",
     photoURL : "" ,
     uid : ""
  },
  files : []
}

const userSlice = createSlice({
    name : "USER",
    initialState : initState,
    reducers : {
        addUser(state , action){
            state.userData = action.payload;
        },
        addInFiles(state , action){
            state.files.push(action.payload);
            // console.log("files:" , action.payload);
        },
        spreadData(state , action){
           state.files = [...action.payload]
        }


    }
})
console.log(initState);

export const userReducers = userSlice.reducer;
export const {addUser,addInFiles,spreadData} = userSlice.actions;