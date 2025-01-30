import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userData : {
     name : "",
     email : "",
     photoURL : "" ,
     uid : ""
  },
  files : [],
  showNotification : false,
  showUploading : false
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
        },
        setShowNotification(state , action){
          state.showNotification = action.payload;
        },
        setShowUploading(state , action){
            state.showUploading = action.payload;
        }

    }
})
console.log(initState);

export const userReducers = userSlice.reducer;
export const {addUser,addInFiles,spreadData,setShowNotification,setShowUploading} = userSlice.actions;