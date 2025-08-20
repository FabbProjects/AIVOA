import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../features/wizard/wizardSlice';

function Step2() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.wizard);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  // Note: Full file upload logic requires more state management and backend handling.
  // This is a UI placeholder.
  const handleFileChange = (e) => {
    console.log("File selected:", e.target.files[0].name);
    // In a real app, you would dispatch an action to upload the file.
  };

  return (
    <div className="wizard-step-container">
      <h2>2. Details and Context</h2>
      <p>Describe the event in detail and assign responsibility.</p>
      
      <div className="form-group">
        <label htmlFor="description">Detailed Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Provide a full description of what happened, including any relevant background information."
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Warehouse B, Assembly Line 3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="responsibleParty">Responsible Party / Assignee</label>
        <input
          type="text"
          id="responsibleParty"
          name="responsibleParty"
          value={formData.responsibleParty}
          onChange={handleChange}
          placeholder="Name of person responsible for follow-up"
        />
      </div>

      <div className="form-group">
        <label htmlFor="attachments">Attach Documents / Photos</label>
        <input
          type="file"
          id="attachments"
          name="attachments"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default Step2;