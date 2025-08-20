import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, prevStep, resetWizard } from '../../features/wizard/wizardSlice';
import { createEvent, resetEventsState } from '../../features/events/eventSlice';
import { useNavigate } from 'react-router-dom';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Button from '../common/Button';
import WizardProgressBar from './WizardProgressBar';
import './Wizard.css';

function EventCreationWizard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentStep, formData } = useSelector((state) => state.wizard);
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.events);

  const [animationClass, setAnimationClass] = useState('step-fade-enter');

  useEffect(() => {
    setTimeout(() => setAnimationClass(''), 10);
  }, []);

  // ==================================================================
  // THIS IS THE CORRECTED useEffect HOOK
  // ==================================================================
  useEffect(() => {
    // This logic runs when the component is active
    if (isError) {
      alert(`Error creating event: ${message}`);
      dispatch(resetEventsState()); // Reset the error state immediately
    }

    if (isSuccess) {
      alert('Event created successfully!');
      dispatch(resetWizard());
      // We will navigate away, and the cleanup function will reset the event state.
      navigate('/events');
    }

    // --- The Cleanup Function ---
    // This function is returned by the effect. React will execute it
    // when the component unmounts (i.e., when you navigate away).
    return () => {
      dispatch(resetEventsState());
    };
  }, [isSuccess, isError, message, dispatch, navigate]);
  // ==================================================================

  const handleStepChange = (action) => {
    setAnimationClass('step-fade-exit');
    setTimeout(() => {
      dispatch(action);
      setAnimationClass('step-fade-enter');
      setTimeout(() => setAnimationClass(''), 10);
    }, 300);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.eventTitle || !formData.eventType || !formData.initiator || !formData.department || !formData.eventDateTime) {
        alert('Please fill in all required fields for Step 1.');
        return;
      }
    }
    handleStepChange(nextStep());
  };

  const handlePrev = () => {
    handleStepChange(prevStep());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.severity || !formData.priority || !formData.status) {
      alert('Please fill in all fields for Step 3.');
      return;
    }
    const dataToSend = {
      ...formData,
      eventDateTime: formData.eventDateTime ? new Date(formData.eventDateTime).toISOString() : '',
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : '',
    };
    dispatch(createEvent(dataToSend));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>Create New QMS Event</h1>
      </div>
      <WizardProgressBar currentStep={currentStep} />
      <form className="wizard-form" onSubmit={handleSubmit}>
        <div className={`step-content-wrapper ${animationClass}`}>
          {renderStep()}
        </div>
        <div className="wizard-navigation">
          {currentStep > 1 && (
            <Button type="button" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Event'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventCreationWizard;