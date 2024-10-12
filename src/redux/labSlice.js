// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   labs: [], // Initially loaded from your JSON file or API
// };

// const labSlice = createSlice({
//   name: "labs",
//   initialState,
//   reducers: {
//     setLabs: (state, action) => {
//       state.labs = action.payload;
//     },
//     editLab: (state, action) => {
//       const { id, updatedData } = action.payload;
//       const labIndex = state.labs.findIndex((lab) => lab.id === id);
//       if (labIndex >= 0) {
//         state.labs[labIndex] = { ...state.labs[labIndex], ...updatedData };
//       }
//     },
//   },
// });

// export const { setLabs, editLab } = labSlice.actions;
// export default labSlice.reducer;

// // labSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import labData from '../data/lab_data.json'; // Import your JSON file

// // Function to simulate saving to the JSON file
// const saveLabData = async (data) => {
//   console.log("Saving lab data...", data);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 1000); // Simulates a delay
//   });
// };

// // Fetch all labs
// export const fetchLabs = createAsyncThunk('labs/fetchLabs', async () => {
//   // Simulate fetching data
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(labData);
//     }, 500); // Simulates a delay
//   });
// });

// // Add a new lab
// export const addLab = createAsyncThunk('labs/addLab', async (newLab) => {
//   labData.push(newLab); // Add new lab to the local data
//   await saveLabData(labData); // Simulate saving
//   return newLab; // Return the new lab for state update
// });

// // Edit an existing lab
// export const editLab = createAsyncThunk(
//   'labs/editLab',
//   async ({ id, updatedData }) => {
//     const index = labData.findIndex((lab) => lab.id === id);

//     if (index !== -1) {
//       labData[index] = { ...labData[index], ...updatedData };
//       await saveLabData(labData);
//       return labData[index]; // Return the updated lab
//     }
//     throw new Error('Lab not found');
//   }
// );

// // Delete a lab
// export const deleteLab = createAsyncThunk('labs/deleteLab', async (id) => {
//   const index = labData.findIndex((lab) => lab.id === id);

//   if (index !== -1) {
//     const deletedLab = labData.splice(index, 1); // Remove lab from local data
//     await saveLabData(labData); // Simulate saving
//     return deletedLab[0]; // Return the deleted lab
//   }
//   throw new Error('Lab not found');
// });

// // Create slice
// const labSlice = createSlice({
//   name: 'labs',
//   initialState: {
//     labs: [],
//     status: null,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLabs.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLabs.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.labs = action.payload; // Set labs data
//       })
//       .addCase(fetchLabs.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addLab.fulfilled, (state, action) => {
//         state.labs.push(action.payload); // Add new lab to state
//       })
//       .addCase(editLab.fulfilled, (state, action) => {
//         const index = state.labs.findIndex(lab => lab.id === action.payload.id);
//         if (index !== -1) {
//           state.labs[index] = action.payload; // Update lab in state
//         }
//       })
//       .addCase(deleteLab.fulfilled, (state, action) => {
//         const index = state.labs.findIndex(lab => lab.id === action.payload.id);
//         if (index !== -1) {
//           state.labs.splice(index, 1); // Remove lab from state
//         }
//       });
//   },
// });

// src/redux/labSlice.js

// src/redux/labSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import labData from "../data/lab_data.json"; // Static initial data

// Utility functions for localStorage
const getStoredLabs = () => {
  const storedLabs = localStorage.getItem("labData");
  if (!storedLabs) {
    localStorage.setItem("labData", JSON.stringify(labData));
  }

  return storedLabs ? JSON.parse(storedLabs) : labData;
};

const saveLabsToStorage = (labs) => {
  localStorage.setItem("labData", JSON.stringify(labs));
};

// Async Thunks
export const fetchLabs = createAsyncThunk("labs/fetchLabs", async () => {
  return getStoredLabs();
});

export const addLab = createAsyncThunk("labs/addLab", async (newLab) => {
  const labs = getStoredLabs();
  const updatedLabs = [...labs, newLab];
  saveLabsToStorage(updatedLabs);
  return newLab;
});

export const editLab = createAsyncThunk("labs/editLab", async (updatedLab) => {
  const labs = getStoredLabs();
  console.log(labs, "labslabslabs");

  const index = labs.findIndex((lab) => lab.id === updatedLab.id);
  if (index !== -1) {
    labs[index] = updatedLab;
    saveLabsToStorage(labs);
    return updatedLab;
  } else {
    throw new Error("Lab not found");
  }
});

export const deleteLab = createAsyncThunk("labs/deleteLab", async (id) => {
  const labs = getStoredLabs();
  const updatedLabs = labs.filter((lab) => lab.id !== id);
  saveLabsToStorage(updatedLabs);
  return id;
});

// Slice
const labSlice = createSlice({
  name: "labs",
  initialState: {
    labs: [],
    status: null,
    error: null,
  },
  reducers: {
    setLabs(state, action) {
      state.labs = action.payload; // Set the labs directly from payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabs.fulfilled, (state, action) => {
        state.labs = action.payload;
      })
      .addCase(addLab.fulfilled, (state, action) => {
        state.labs.push(action.payload);
      })
      .addCase(editLab.fulfilled, (state, action) => {
        const index = state.labs.findIndex(
          (lab) => lab.id === action.payload.id
        );
        if (index !== -1) {
          state.labs[index] = action.payload;
        }
      })
      .addCase(deleteLab.fulfilled, (state, action) => {
        const index = state.labs.findIndex((lab) => lab.id === action.payload);
        if (index !== -1) {
          state.labs.splice(index, 1);
        }
      });
  },
});

// Exporting both setLabs and the slice reducer
export const { setLabs } = labSlice.actions;
export default labSlice.reducer;
