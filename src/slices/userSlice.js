import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { v4 } from "uuid";

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
  starred : [],
  notes :[],
  pinned : [],
  listnotes : {
    incomplete : [],
    completed : [],
    type : "listnotes"
  },
   tasksObj : {
     tasks : [],
     pinned : [],
     completed : [],
     starred : []
   }
 
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
        },
        collectNotesData(state,action){
         state.notes.unshift(action.payload)
        },
        deleteNotes(state,action){
           state.notes.splice(action.payload , 1);
        },
        replaceEditedData(state , action){
          let indexToBeReplaced = state.notes.findIndex((ele) => action.payload.id == ele.id);
          state.notes.splice(indexToBeReplaced , 1 , action.payload);
        },
        collectInPinned(state , action){
            const findIndex = state.notes.findIndex(ele => action.payload.id == ele.id);
            state.notes.splice(findIndex , 1);
             state.pinned.unshift(action.payload);
        },
        unPinData(state , action){
             const findIndex = state.pinned.findIndex(ele => action.payload.id == ele.id);
             state.pinned.splice(findIndex , 1);
             state.notes.unshift(action.payload);

        },
        deleteInPinned(state , action){
          state.pinned.splice(action.payload , 1);
        },
        replaceEditedDataInPinned(state,action){
            const findIndex = state.pinned.findIndex(ele => ele.id == action.payload.id)

            state.pinned.splice(findIndex , 1, action.payload);
        },
        addInListNotes(state , action){
          state.listnotes.incomplete.push(action.payload);
        },
        deleteListNote(state , action){
            let findIndexListNote = state.listnotes.incomplete.findIndex(ele => ele.id == action.payload);
            state.listnotes.incomplete.splice(findIndexListNote , 1);
        },
        addInCompletedListNotes(state , action){
          state.listnotes.incomplete.splice(action.payload.index,1);
          state.listnotes.completed.push(action.payload.value);
        },
        markAsIncompleteAndShift(state , action){
            state.listnotes.completed.splice(action.payload.index , 1);
            state.listnotes.incomplete.unshift(action.payload.value);
        },
        addListNotesInNotesArray(state,action){
           state.notes.push(action.payload)
           state.listnotes.incomplete = [];
           state.listnotes.completed = [];

        },
        deleteListNotesFromNotesArray(state,action){
           const findListNoteIndex = state.notes.findIndex(ele => ele.id == action.payload);
           state.notes.splice(findListNoteIndex,1);
        },
        resetEditableValueInCompletedAndIncomplete(state , action){
              state.listnotes.incomplete = action.payload.incompleteValue,
              state.listnotes.completed = action.payload.completedValue
        },
        replaceEditedListNoteData(state , action){
           let findIndextoReplace = state.notes.findIndex(ele => ele.id == action.payload.id);
           state.notes.splice(findIndextoReplace , 1, action.payload);
           state.listnotes.incomplete = [];
           state.listnotes.completed = [];
       
          },
          addInPinnedArray(state , action){
             let findIndex = state.notes.findIndex(ele => ele.id == action.payload)
             let findValue = state.notes.find(ele => ele.id == action.payload)
              
             state.notes.splice(findIndex , 1);
             state.pinned.push(findValue);
            },
            unPinListNotes(state , action){
                let findIndex= state.pinned.findIndex(ele => ele.id == action.payload)
                let findValue= state.pinned.find(ele => ele.id == action.payload)
              
                state.pinned.splice(findIndex , 1);
                state.notes.unshift(findValue);
            
            },
            addTasks(state , action) {
               state.tasksObj.tasks.push(action.payload)
            },
            markAsCompleted(state ,action) {
              let findIndex = state.tasksObj.tasks.findIndex(ele => ele.id == action.payload);
              let find = state.tasksObj.tasks.find(ele => ele.id == action.payload);


              state.tasksObj.tasks.splice(findIndex , 1);
              state.tasksObj.completed.push(find);
            },
            deleteFromTasksCompleted(state , action){
               let findIndex = state.tasksObj.completed.findIndex(ele => ele.id == action.payload);
               state.tasksObj.completed.splice(findIndex , 1);
            },
            markAsUncompleted(state , action){
              const findIndex = state.tasksObj.completed.findIndex(ele => ele.id == action.payload)
              const findValue = state.tasksObj.completed.find(ele => ele.id == action.payload)

              state.tasksObj.completed.splice(findIndex , 1);
              state.tasksObj.tasks.unshift(findValue);
            },
            addEditedTasksInTasksArray (state , action){
            let findIndex = state.tasksObj.tasks.findIndex(ele => ele.id == action.payload.id);
            state.tasksObj.tasks.splice(findIndex , 1, action.payload)
            },
            addInStarred(state ,action){
              let findValue = state.tasksObj.tasks.find(ele => ele.id == action.payload);
              let findIndex = state.tasksObj.tasks.findIndex(ele => ele.id == action.payload);
                 let newObj = {
                  ...findValue , 
                  starred : true
                 }

                 state.tasksObj.tasks.splice(findIndex , 1, newObj);
              
              state.tasksObj.starred.push(newObj);
            },
            unStarTheTask(state , action){
              let findIndex = state.tasksObj.starred.findIndex(ele => ele.id == action.payload);
              let findValue = state.tasksObj.starred.find(ele => ele.id == action.payload);
              let newObj = {
                ...findValue , 
                starred : false
              }

              let findIndexInTasks = state.tasksObj.tasks.findIndex(ele => ele.id == action.payload);

              state.tasksObj.tasks.splice(findIndexInTasks , 1, newObj)
              state.tasksObj.starred.splice(findIndex , 1 );
            }


    }
})
console.log(initState.bin);

export const userReducers = userSlice.reducer;
export const {addUser,unStarTheTask,addInStarred,addEditedTasksInTasksArray,markAsUncompleted,deleteFromTasksCompleted,markAsCompleted,addTasks,unPinListNotes,addInPinnedArray,replaceEditedListNoteData,resetEditableValueInCompletedAndIncomplete,deleteListNotesFromNotesArray,addListNotesInNotesArray,markAsIncompleteAndShift,addInCompletedListNotes,deleteListNote,addInListNotes,replaceEditedDataInPinned,deleteInPinned,unPinData,collectInPinned,replaceEditedData,deleteNotes,collectNotesData,unstarData,spreadDataStarred,updateIsFavInFiles,starredData,removeItemFromBin,spreadDataBin,setDeletedInBin,addInFiles,spreadData,setShowNotification,setShowUploading} = userSlice.actions;