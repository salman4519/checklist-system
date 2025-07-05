import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import InsightsSection from '../components/InsightsSection';
import NavigationGrid from '../components/NavigationGrid';

export default function DashboardPage() {
  const [checklistStatus, setChecklistStatus] = useState({
    opening: false,
    closing: false,
  });
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoadingStatus(true);
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbwduytD9-Eg_UI3xOHvGrWHe-AAb-s4KogzSKqz32zFJBaVLXK94sgOpgQPPEFfyUHS/exec?type=status'
        );
        if (response.ok) {
          const data = await response.json();
          setChecklistStatus(data);
        } else {
          console.error('Failed to fetch checklist status:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching checklist status:', error);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <DashboardLayout>
      {/* Header - Show on all screen sizes */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm lg:text-base">View checklist insights and quick actions</p>
      </div>

      <div className="space-y-6 lg:space-y-8">
        {/* Today's Checklist Status */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Today's Checklist Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <span className="text-white font-medium">Opening Checklist</span>
              <span className={`text-2xl ${checklistStatus.opening ? 'text-green-400' : 'text-red-400'}`}>
                {isLoadingStatus ? '⏳' : checklistStatus.opening ? '✅' : '❌'}
              </span>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <span className="text-white font-medium">Closing Checklist</span>
              <span className={`text-2xl ${checklistStatus.closing ? 'text-green-400' : 'text-red-400'}`}>
                {isLoadingStatus ? '⏳' : checklistStatus.closing ? '✅' : '❌'}
              </span>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <InsightsSection />

        {/* Navigation Grid */}
        <div className="mt-6 lg:mt-8">
          <NavigationGrid />
        </div>
      </div>
    </DashboardLayout>
  );
} 