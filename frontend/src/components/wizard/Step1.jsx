import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../features/wizard/wizardSlice';

function Step1() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.wizard);

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="wizard-step-container">
      <h2>1. Core Event Information</h2>
      <p>Start by providing the fundamental details of the event.</p>
      
      <div className="form-group">
        <label htmlFor="eventTitle">Event Title / Subject</label>
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
          placeholder="e.g., Annual Production Line Safety Audit"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="eventType">Event Type</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
        >
          <option value="">Select a Type...</option>
          <option value="Audit">Audit</option>
          <option value="Incident">Incident</option>
          <option value="Non-Conformance">Non-Conformance</option>
          <option value="Preventive Action">Preventive Action</option>
          <option value="Customer Complaint">Customer Complaint</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="initiator">Initiator / Reported By</label>
        <input
          type="text"
          id="initiator"
          name="initiator"
          value={formData.initiator}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g., Quality Assurance, Production"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventDateTime">Date and Time of Event</label>
        <input
          type="datetime-local"
          id="eventDateTime"
          name="eventDateTime"
          value={formData.eventDateTime}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}

export default Step1;