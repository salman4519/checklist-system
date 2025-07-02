import ClosingChecklistForm from './ClosingChecklistForm';
import DashboardLayout from '../../components/DashboardLayout';

export default function ClosingPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:pl-72">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Closing Checklist
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Complete the checklist after closing the facility
            </p>
          </div>

          {/* Form */}
          <ClosingChecklistForm />
        </div>
      </div>
    </DashboardLayout>
  );
} 