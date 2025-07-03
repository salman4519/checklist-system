import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface OpeningChecklistData {
  cctvWorking: boolean;
  doorLockProperlyPlaced: boolean;
  emptyWasteBaskets: boolean;
  floorCablesSafe: boolean;
  drinkingWaterAvailable: boolean;
  bagsKeptProperly: boolean;
  freeTraysAvailable: boolean;
  remarks: string;
  submittedBy: string;
  timestamp: string;
}

type OpeningChecklistDummyKey = Exclude<keyof OpeningChecklistData, 'remarks' | 'submittedBy' | 'timestamp'>;

export default function OpeningChecklistForm() {
  const [checklist, setChecklist] = useState<OpeningChecklistData>({
    cctvWorking: false,
    doorLockProperlyPlaced: false,
    emptyWasteBaskets: false,
    floorCablesSafe: false,
    drinkingWaterAvailable: false,
    bagsKeptProperly: false,
    freeTraysAvailable: false,
    remarks: '',
    submittedBy: '',
    timestamp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setChecklist(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setChecklist(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checklist.submittedBy.trim()) {
      alert('Please enter who is submitting this checklist');
      return;
    }

    setIsSubmitting(true);
    const currentTimestamp = new Date().toISOString();

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwduytD9-Eg_UI3xOHvGrWHe-AAb-s4KogzSKqz32zFJBaVLXK94sgOpgQPPEFfyUHS/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: "no-cors",
          body: JSON.stringify({
            type: 'opening',
            cctvWorking: checklist.cctvWorking ? 'Yes' : 'No',
            doorLockProperlyPlaced: checklist.doorLockProperlyPlaced ? 'Yes' : 'No',
            emptyWasteBaskets: checklist.emptyWasteBaskets ? 'Yes' : 'No',
            floorCablesSafe: checklist.floorCablesSafe ? 'Yes' : 'No',
            drinkingWaterAvailable: checklist.drinkingWaterAvailable ? 'Yes' : 'No',
            bagsKeptProperly: checklist.bagsKeptProperly ? 'Yes' : 'No',
            freeTraysAvailable: checklist.freeTraysAvailable ? 'Yes' : 'No',
            submittedBy: checklist.submittedBy,
            remarks: checklist.remarks,
            timestamp: currentTimestamp,
          }),
        }
      );

      toast.success('Opening checklist submitted successfully!');
      // Reset form
      setChecklist({
        cctvWorking: false,
        doorLockProperlyPlaced: false,
        emptyWasteBaskets: false,
        floorCablesSafe: false,
        drinkingWaterAvailable: false,
        bagsKeptProperly: false,
        freeTraysAvailable: false,
        remarks: '',
        submittedBy: '',
        timestamp: ''
      });
    } catch (error) {
      console.error('Error submitting opening checklist:', error);
      toast.error('An error occurred while submitting the checklist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openingChecklistOptions: { key: OpeningChecklistDummyKey; label: string }[] = [
    { key: 'cctvWorking', label: 'CCTV Working' },
    { key: 'doorLockProperlyPlaced', label: 'Door Lock Properly Placed in the Lab' },
    { key: 'emptyWasteBaskets', label: 'Empty waste baskets, put back in the lab' },
    { key: 'floorCablesSafe', label: 'Floor cables safe?' },
    { key: 'drinkingWaterAvailable', label: 'Drinking Water Available / Refilled?' },
    { key: 'bagsKeptProperly', label: 'Bags kept at dedicated place properly?' },
    { key: 'freeTraysAvailable', label: 'Free trays available?' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
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

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        {/* Checklist Items */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Checklist Items</h3>
          {openingChecklistOptions.map((option) => (
            <label
              key={option.key}
              className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  name={option.key}
                  checked={checklist[option.key]}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  checklist[option.key]
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-500 bg-gray-600'
                }`}>
                  {checklist[option.key] && (
                    <div className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                  )}
                </div>
              </div>
              <span className="ml-3 text-white text-sm">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Text Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-300 mb-2">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={checklist.remarks}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Any additional notes or observations..."
            />
          </div>

          <div>
            <label htmlFor="submittedBy" className="block text-sm font-medium text-gray-300 mb-2">
              Submitted By <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="submittedBy"
              name="submittedBy"
              value={checklist.submittedBy}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-loader-4-line animate-spin"></i>
              </div>
              Submitting...
            </div>
          ) : (
            'Submit Checklist'
          )}
        </button>
      </form>
    </div>
  );
} 