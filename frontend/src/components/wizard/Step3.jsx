import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../features/wizard/wizardSlice';

function Step3() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.wizard);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="wizard-step-container">
      <h2>3. Classification and Timeline</h2>
      <p>Assess the event's impact and set expectations for resolution.</p>
      
      <div className="form-group">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
        >
          <option value="">Select Severity...</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority...</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Step3;