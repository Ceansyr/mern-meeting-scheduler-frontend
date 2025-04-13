import React from 'react';

const PasswordStrengthIndicator = ({ strength }) => {
  return (
    <p className={`password-strength ${strength.toLowerCase()}`}>
      Password Strength: {strength}
    </p>
  );
};

export default PasswordStrengthIndicator;