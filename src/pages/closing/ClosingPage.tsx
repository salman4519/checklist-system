import ClosingChecklistForm from './ClosingChecklistForm';
import DashboardLayout from '../../components/DashboardLayout';

export default function ClosingPage() {
  return (
    <DashboardLayout>
      {/* Header - Show on all screen sizes */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Closing Checklist</h1>
        <p className="text-gray-400 text-sm lg:text-base">Complete the checklist after closing the facility</p>
      </div>

      <ClosingChecklistForm />
    </DashboardLayout>
  );
} 