import React from 'react';

// We'll create this CSS file in the next step
import './Wizard.css'; 

function WizardProgressBar({ currentStep, totalSteps = 3 }) {
  const steps = [];
  for (let i = 1; i <= totalSteps; i++) {
    steps.push({
      number: i,
      title: `Step ${i}`,
      isActive: i === currentStep,
      isCompleted: i < currentStep,
    });
  }

  return (
    <div className="progress-bar-container">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className={`step-indicator ${step.isCompleted ? 'completed' : ''} ${
              step.isActive ? 'active' : ''
            }`}
          >
            {step.isCompleted ? '✔' : step.number}
          </div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default WizardProgressBar;