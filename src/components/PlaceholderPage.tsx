import DashboardLayout from "@/components/DashboardLayout";

const PlaceholderPage: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <DashboardLayout>
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </DashboardLayout>
);

export default PlaceholderPage;
