import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

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
         spreadDataStarred(state , action){
            state.starred = action.payload;

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
        },
        unstarData(state , action){
          state.starred.splice(action.payload , 1);
        }

    }
})
console.log(initState.bin);

export const userReducers = userSlice.reducer;
export const {addUser,unstarData,spreadDataStarred,updateIsFavInFiles,starredData,removeItemFromBin,spreadDataBin,setDeletedInBin,addInFiles,spreadData,setShowNotification,setShowUploading} = userSlice.actions;