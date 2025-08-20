import React from 'react';
import './Button.css'; // We'll create this CSS file for styling

/**
 * A reusable button component.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {() => void} [props.onClick] - The function to call when the button is clicked.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type of the button.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 */
function Button({ children, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`common-button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;