import React, { useState } from 'react';
import Vapi from '@vapi-ai/web';
import axios from 'axios';

interface Difficulty {
  id: string;
  label: string;
  description: string;
}

    interface User {
      debatetype: string;
      username: string;
      fromside: string;
      job:string;
    }

const YOUR_WORKFLOW_ID: string = "8aa19bd2-e497-4737-93d7-068500db7f41";
const YOUR_PUBLIC_API_KEY: string = "0fd7f2e6-79e5-4447-b165-2211fd2054a1";


const VideoCallForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [userData, setUserData] = useState<User[] | null>(null);


  const difficulties: Difficulty[] = [
    { id: 'easy', label: 'Easy', description: 'Basic level questions' },
    { id: 'medium', label: 'Medium', description: 'Intermediate level questions' },
    { id: 'hard', label: 'Hard', description: 'Advanced level questions' },
    { id: 'expert', label: 'Expert', description: 'Professional level questions' }
  ];

  const handleDifficultySelect = (difficulty: string): void => {
    setSelectedDifficulty(difficulty);
  };

  const handleNext = (): void => {
    if (selectedDifficulty) {
      setCurrentStep(2);
    }
  };

  const handleBack = (): void => {
    setCurrentStep(1);
  };

const handleStartVideoCall = async (): Promise<void> => {
  const vapi = new Vapi(YOUR_PUBLIC_API_KEY);
  vapi.start(undefined, undefined, undefined, YOUR_WORKFLOW_ID);

    vapi.on('call-start', () => {
      console.log('E-commerce customer service call started');
  });


vapi.on('call-end', () => {
  console.log('Customer service call ended');

  setTimeout(() => {
    async function getUser() {
      try {
        const res = await axios.get<User[]>('https://debatefinal.onrender.com/api/details');
        console.log(`Users: ${JSON.stringify(res.data)}`);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, 2000); // Delay in milliseconds (1000 ms = 1 second)
});
  // try {
  //   const response = await fetch('https://api.vapi.ai/call/workflow', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer 0fd7f2e6-79e5-4447-b165-2211fd2054a1`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       workflowId: '8aa19bd2-e497-4737-93d7-068500db7f41',
  //     })
  //   });
    
  //   if (!response.ok) {
  //     throw new Error('Failed to start workflow');
  //   }
    
  //   const result = await response.json();
  //   console.log('Workflow started:', result);
  // } catch (error) {
  //   console.error('Error starting workflow:', error);
  // }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        {/* Step 1: Difficulty Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose Difficulty</h1>
              <p className="text-gray-600">Select your preferred difficulty level</p>
            </div>
            
            <div className="space-y-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => handleDifficultySelect(difficulty.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedDifficulty === difficulty.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{difficulty.label}</h3>
                      <p className="text-sm text-gray-600">{difficulty.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedDifficulty === difficulty.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedDifficulty === difficulty.id && (
                        <div className="w-full h-full bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!selectedDifficulty}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                selectedDifficulty
                  ? 'bg-sky-950 hover:bg-blue-700 text-black shadow-lg hover:shadow-xl'
                  : 'bg-sky-950 text-black-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Start Video Call */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Ready to Start</h1>
              <p className="text-gray-600">You've selected <span className="font-semibold text-blue-600">{selectedDifficulty}</span> difficulty</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Before we start:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Make sure your camera and microphone are working</li>
                <li>• Find a quiet, well-lit space</li>
                <li>• Have a stable internet connection</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleStartVideoCall}
                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-black font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
               Start Video Call
              </button>
              
              <button
                onClick={handleBack}
                className="w-full py-3 px-6 bg-blue-200 hover:bg-blue-300 text-gray-700 font-semibold rounded-lg transition-all duration-200"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {userData && (
  <div className="mt-6 p-4 bg-white rounded-xl shadow-lg">
    <h2 className="text-xl font-bold mb-2 text-gray-800">Fetched Users:</h2>
    <ul className="space-y-2">
      {userData.map((user, index) => (
        <li key={index} className="text-gray-700 border-b pb-2">
          <p><strong>Debate Type:</strong> {user.debatetype}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>From Side:</strong> {user.fromside}</p>
          <p><strong>Job:</strong> {user.job}</p>
        </li>
      ))}
    </ul>
  </div>
)}

      </div>
    </div>
  );
};

export default VideoCallForm;


// import React, { useState, useEffect } from 'react';
// import Vapi from '@vapi-ai/web';

// interface VapiCallProps {
//   apiKey: string;
//   workflowId: string;
// }

// const VapiCallWidget: React.FC<VapiCallProps> = ({ 
//   apiKey, 
//   workflowId 
// }) => {
//   const [vapi, setVapi] = useState<Vapi | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Initialize Vapi instance
//     const vapiInstance = new Vapi(apiKey);
//     setVapi(vapiInstance);

//     // Set up event listeners
//     vapiInstance.on('call-start', () => {
//       console.log('Call started');
//       setIsConnected(true);
//     });

//     vapiInstance.on('call-end', () => {
//       console.log('Call ended');
//       setIsConnected(false);
//     });

//     return () => {
//       vapiInstance?.stop();
//     };
//   }, [apiKey]);

//   const startCall = () => {
//     if (vapi) {
//       vapi.start(null,null,null,workflowId);
//     }
//   };

//   const endCall = () => {
//     if (vapi) {
//       vapi.stop();
//     }
//   };

//   return (
//     <div>
//       {!isConnected ? (
//         <button onClick={startCall}>
//           Start Call
//         </button>
//       ) : (
//         <button onClick={endCall}>
//           End Call
//         </button>
//       )}
//     </div>
//   );
// };

// export default VapiCallWidget;
