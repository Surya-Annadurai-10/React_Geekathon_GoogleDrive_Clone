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
  showUploading : false,
  bin : [],
  starred : []
}

const userSlice = createSlice({
    name : "USER",
    initialState : initState,
    reducers : {
        addUser(state , action){
            state.userData = action.payload;
        },
        addInFiles(state , action){
            state.files.unshift(action.payload);
            // console.log("files:" , action.payload);
        },
        spreadData(state , action){
           state.files = [...action.payload]
        },

        spreadDataBin(state , action){
            state.bin = [...action.payload]
         },
        setShowNotification(state , action){
          state.showNotification = action.payload;
        },
        setShowUploading(state , action){
            state.showUploading = action.payload;
        },
        setDeletedInBin(state , action){
            state.bin.unshift(action.payload.item);
         
            state.files.splice(action.payload.index , 1);
        },
        removeItemFromBin(state , action){
           state.bin.splice(action.payload,1);
        },
        starredData(state, action){
         state.starred.unshift(action.payload);
        },
        updateIsFavInFiles(state,action){
           state.files.splice(action.payload.index , 1 , action.payload.object);
        }

    }
})
console.log(initState.bin);

export const userReducers = userSlice.reducer;
export const {addUser,updateIsFavInFiles,starredData,removeItemFromBin,spreadDataBin,setDeletedInBin,addInFiles,spreadData,setShowNotification,setShowUploading} = userSlice.actions;