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
  taskSection : [ {
        id : v4(),
        category : "My Tasks",
        tasks : [],
        completed : [],
        starred : [],
      } ],
  //  tasksObj : {
  //    tasks : [],
  //    pinned : [],
  //    completed : [],
  //    starred : []
  //  }
  gemini:[]
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

// --------------------------------------------
            addTasks(state , action) {
               state.taskSection[action.payload.index].tasks.push(action.payload.value)
            },
            markAsCompleted(state ,action) {
              let findIndex = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.id);
              let find = state.taskSection[action.payload.index].tasks.find(ele => ele.id == action.payload.id);


              state.taskSection[action.payload.index].tasks.splice(findIndex , 1);
              state.taskSection[action.payload.index].completed.push(find);
            },
            deleteFromTasksCompleted(state , action){
               let findIndex = state.taskSection[action.payload.index].completed.findIndex(ele => ele.id == action.payload.id);
               state.taskSection[action.payload.index].completed.splice(findIndex , 1);
            },
            markAsUncompleted(state , action){
              const findIndex = state.taskSection[action.payload.index].completed.findIndex(ele => ele.id == action.payload.id)
              const findValue = state.taskSection[action.payload.index].completed.find(ele => ele.id == action.payload.id)

              state.taskSection[action.payload.index].completed.splice(findIndex , 1);
              state.taskSection[action.payload.index].tasks.unshift(findValue);
            },
            addEditedTasksInTasksArray (state , action){
            let findIndex = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.value.id);
            state.taskSection[action.payload.index].tasks.splice(findIndex , 1, action.payload.value)
            },
            addInStarred(state ,action){
              let findValue = state.taskSection[action.payload.index].tasks.find(ele => ele.id == action.payload.id);
              let findIndex = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.id);
                 let newObj = {
                  ...findValue , 
                  starred : true
                 }

                 state.taskSection[action.payload.index].tasks.splice(findIndex , 1, newObj);
              
              state.taskSection[action.payload.index].starred.push(newObj);
            },
            unStarTheTask(state , action){
              let findIndex = state.taskSection[action.payload.index].starred.findIndex(ele => ele.id == action.payload.id);
              let findValue = state.taskSection[action.payload.index].starred.find(ele => ele.id == action.payload.id);
              let newObj = {
                ...findValue , 
                starred : false
              }

              let findIndexInTasks = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.id);

              state.taskSection[action.payload.index].tasks.splice(findIndexInTasks , 1, newObj)
              state.taskSection[action.payload.index].starred.splice(findIndex , 1 );
            },
            setTaskCategoryObjInTaskSection(state , action){
               state.taskSection.push(action.payload);
            },
            deleteFromTasks(state,action){
              let findIndex = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.id)
             state.taskSection[action.payload.index].tasks.splice(findIndex , 1)
           
            },
            moveToTopInTask(state, action){
              let findIndex = state.taskSection[action.payload.index].tasks.findIndex(ele => ele.id == action.payload.id);
              let findValue = state.taskSection[action.payload.index].tasks.find(ele => ele.id == action.payload.id);
              
              state.taskSection[action.payload.index].tasks.splice(findIndex , 1);
              state.taskSection[action.payload.index].tasks.unshift(findValue );
            },
            addSubTasks(state ,action){
              state.taskSection[action.payload.index].tasks[action.payload.subIndex].subtasks.push(action.payload.value);
            },
            replaceEditedTasksInRespectiveSubTaskArray(state , action){
               state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(action.payload.subTaskCardIndex , 1 , action.payload.value);
            },
            addSubTaskInStarred(state,action){
                let findValue = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.find(ele => ele.id == action.payload.id);
                let findIndex = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.findIndex(ele => ele.id == action.payload.id);
                const activateStar = {
                  ...findValue , 
                  starred : true
                }

                state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(findIndex , 1, activateStar);
                state.starred.push(activateStar);

            },
            unStarTheSubTask(state ,action){
              let findValue = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.find(ele => ele.id == action.payload.id);
              let findIndex = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.findIndex(ele => ele.id == action.payload.id);
              const activateStar = {
                ...findValue , 
                starred : false
              }
              state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(findIndex , 1, activateStar);
              let starredIndex = state.starred.findIndex(ele => ele.id == action.payload.id);
              state.starred.splice(starredIndex , 1);


            },
            markSubTaskAsCompleted(state , action){
             let completedObj =  state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks[action.payload.subTaskCardIndex]
                state.completed.push(completedObj);
                state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(action.payload.subTaskCardIndex , 1)
            },
            unIndentSubTask(state , action){
                 let findIndex = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.findIndex(ele => ele.id == action.payload.id)
                 let findValue = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks[findIndex];

                 const taskObj = {
                  id :findValue.id,
                  title :findValue.title,
                  details : findValue.details,
                  period : findValue.subPeriod,
                  starred : false,
                  subtasks : []
                 }
            
                  state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(findIndex, 1);
                
                  state.taskSection[action.payload.index].tasks.push(taskObj);
            
            },
            deleteSubTask(state , action){
               let findIndex = state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.findIndex(ele=> ele.id == action.payload.id);
               state.taskSection[action.payload.index].tasks[action.payload.taskCardIndex].subtasks.splice(findIndex , 1);
              },
              renameInStarred(state , action){
                let findIndex = state.starred.findIndex(ele => ele.baseId == action.payload.id)
                state.starred.splice(findIndex , 1 , action.payload.value);
              },
              renameInFiles(state , action){
                let findIndex = state.files.findIndex(ele => ele.id == action.payload.id)
                state.files.splice(findIndex , 1 , action.payload.value);
              },
             
               geminiData(state , action){
                state.gemini.push(action.payload);
               },
               deleteInStarred(state ,action){
                  let findIndex = state.starred.findIndex(ele => ele.id == action.payload.id)

                  state.starred.splice(findIndex , 1);
               }

    }
})
console.log(initState.bin);

export const userReducers = userSlice.reducer;
export const {addUser,geminiData,renameInFiles,deleteInStarred,renameInStarred,deleteSubTask,unIndentSubTask,markSubTaskAsCompleted,unStarTheSubTask,addSubTaskInStarred,replaceEditedTasksInRespectiveSubTaskArray,addSubTasks,moveToTopInTask,deleteFromTasks,setTaskCategoryObjInTaskSection,unStarTheTask,addInStarred,addEditedTasksInTasksArray,markAsUncompleted,deleteFromTasksCompleted,markAsCompleted,addTasks,unPinListNotes,addInPinnedArray,replaceEditedListNoteData,resetEditableValueInCompletedAndIncomplete,deleteListNotesFromNotesArray,addListNotesInNotesArray,markAsIncompleteAndShift,addInCompletedListNotes,deleteListNote,addInListNotes,replaceEditedDataInPinned,deleteInPinned,unPinData,collectInPinned,replaceEditedData,deleteNotes,collectNotesData,unstarData,spreadDataStarred,updateIsFavInFiles,starredData,removeItemFromBin,spreadDataBin,setDeletedInBin,addInFiles,spreadData,setShowNotification,setShowUploading} = userSlice.actions;