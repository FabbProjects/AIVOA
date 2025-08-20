import { createSlice } from '@reduxjs/toolkit';

const wizardSlice = createSlice({
  name: 'wizard',
  initialState: {
    currentStep: 1,
    formData: {
      // Step 1 Fields
      eventTitle: '',
      eventType: '',
      initiator: '',
      department: '',
      eventDateTime: '',

      // Step 2 Fields
      description: '',
      location: '',
      responsibleParty: '',
      // Note: attachments are handled by the input but not stored in state for simplicity here
      
      // Step 3 Fields
      severity: '',
      priority: '',
      status: 'Open', // Default status
      dueDate: '',
    },
  },
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetWizard: (state) => {
      // Ensure the reset state matches the new formData structure
      state.currentStep = 1;
      state.formData = {
        eventTitle: '',
        eventType: '',
        initiator: '',
        department: '',
        eventDateTime: '',
        description: '',
        location: '',
        responsibleParty: '',
        severity: '',
        priority: '',
        status: 'Open',
        dueDate: '',
      };
    },
  },
});

export const { nextStep, prevStep, updateFormData, resetWizard } = wizardSlice.actions;
export default wizardSlice.reducer;