import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';

export default function MagisterPanelPage() {
  const [passcode, setPasscode] = useState("");
  const [access, setAccess] = useState(false);
  const [checklistStatus, setChecklistStatus] = useState<{ opening: boolean; closing: boolean } | null>(null);
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [task1Checked, setTask1Checked] = useState(false);
  const [task2Checked, setTask2Checked] = useState(false);
  const [task3Checked, setTask3Checked] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  const handleAccess = () => {
    if (passcode === "ludi123") {
      setAccess(true);
      fetchStatus();
    } else {
      toast.error("Incorrect password.");
    }
  };

  const fetchStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwduytD9-Eg_UI3xOHvGrWHe-AAb-s4KogzSKqz32zFJBaVLXK94sgOpgQPPEFfyUHS/exec?type=status");
      const data = await res.json();
      setChecklistStatus(data);
    } catch (err) {
      console.error("Error fetching status:", err);
      toast.error("Error fetching checklist status.");
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleTaskSubmit = async () => {
    const currentTimestamp = new Date().toISOString();
    const taskData = {
      type: "tasks",
      task1: task1Checked ? 'Yes' : 'No',
      task2: task2Checked ? 'Yes' : 'No',
      task3: task3Checked ? 'Yes' : 'No',
      timestamp: currentTimestamp,
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbwduytD9-Eg_UI3xOHvGrWHe-AAb-s4KogzSKqz32zFJBaVLXK94sgOpgQPPEFfyUHS/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      });

      setTaskSubmitted(true);
      toast.success("Tasks saved!");
      // Reset checkboxes after submission
      setTask1Checked(false);
      setTask2Checked(false);
      setTask3Checked(false);

      // Hide success message after a few seconds
      setTimeout(() => setTaskSubmitted(false), 5000);

    } catch (error) {
      console.error('Error saving tasks:', error);
      toast.error('An error occurred while saving tasks.');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-white">🔐 Magister Panel</h1>
        </div>

        {/* Main Panel */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          {!access ? (
            /* Password Login Interface */
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">
                Enter the password to access the Magister Panel.
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAccess(); }} className="space-y-6">
                <div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Enter
                </button>
              </form>
            </div>
          ) : (
            /* Unlocked Main Interface */
            <div className="space-y-8">
              {/* Today's Checklist Status */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Checklist Status (Today)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-white font-medium">Opening Checklist</span>
                    <span className={`text-2xl ${checklistStatus?.opening ? 'text-green-400' : 'text-red-400'}`}>
                      {isLoadingStatus ? '⏳' : checklistStatus?.opening ? '✅' : '❌'}
                    </span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-white font-medium">Closing Checklist</span>
                    <span className={`text-2xl ${checklistStatus?.closing ? 'text-green-400' : 'text-red-400'}`}>
                      {isLoadingStatus ? '⏳' : checklistStatus?.closing ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={fetchStatus}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Refresh Status
                </button>
              </div>

              {/* Admin Tasks Checklist */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">📆 Magister Tasks</h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={task1Checked}
                        onChange={(e) => setTask1Checked(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                        task1Checked
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-500 group-hover:border-purple-400'
                      }`}>
                        {task1Checked && (
                          <i className="ri-check-line text-white text-sm"></i>
                        )}
                      </div>
                    </div>
                    <span className="text-white group-hover:text-purple-300 transition-colors">
                      Verified Checklists
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={task2Checked}
                        onChange={(e) => setTask2Checked(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                        task2Checked
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-500 group-hover:border-purple-400'
                      }`}>
                        {task2Checked && (
                          <i className="ri-check-line text-white text-sm"></i>
                        )}
                      </div>
                    </div>
                    <span className="text-white group-hover:text-purple-300 transition-colors">
                      Workspace Ready
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={task3Checked}
                        onChange={(e) => setTask3Checked(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                        task3Checked
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-500 group-hover:border-purple-400'
                      }`}>
                        {task3Checked && (
                          <i className="ri-check-line text-white text-sm"></i>
                        )}
                      </div>
                    </div>
                    <span className="text-white group-hover:text-purple-300 transition-colors">
                      Noted Issues
                    </span>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleTaskSubmit}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-colors whitespace-nowrap"
                >
                  Save Tasks
                </button>
              </div>

              {/* Success Message */}
              {taskSubmitted && (
                <div className="bg-green-600 text-white p-4 rounded-lg flex items-center space-x-2">
                  <i className="ri-check-circle-line text-xl"></i>
                  <span>Tasks saved!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#1f2937',
            },
          },
        }}
      />
    </DashboardLayout>
  );
} 