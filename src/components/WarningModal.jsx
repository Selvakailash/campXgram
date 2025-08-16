import React from 'react';

const WarningModal = ({ 
  showWarningModal, 
  setShowWarningModal, 
  userWarnings, 
  warningMessage, 
  getRemainingTimeoutTime 
}) => {
  if (!showWarningModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-md mx-4">
        <div className="text-center">
          <div className="text-4xl mb-4">
            {userWarnings >= 3 ? '🚫' : '⚠️'}
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">
            {userWarnings >= 3 ? 'Account Timed Out' : 'Content Warning'}
          </h3>
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            {warningMessage}
          </p>
          {userWarnings >= 3 && (
            <div className="bg-red-900/30 border border-red-500 rounded p-3 mb-4">
              <p className="text-red-300 text-sm">
                Time remaining: {getRemainingTimeoutTime()}
              </p>
            </div>
          )}
          <button
            onClick={() => setShowWarningModal(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;