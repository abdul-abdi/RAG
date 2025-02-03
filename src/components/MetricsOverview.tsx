import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, AlertCircle, Circle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const MetricCard = ({ title, value, trend, icon, children }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="text-rag-green h-4 w-4" />;
      case "down":
        return <TrendingDown className="text-rag-red h-4 w-4" />;
      default:
        return <Minus className="text-rag-amber h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {icon}
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <h3 className="text-2xl font-bold">{value}</h3>
            {children}
          </div>
          {getTrendIcon()}
        </div>
      </CardContent>
    </Card>
  );
};

const RagColorHistory = () => {
  const colors = [
    { color: "bg-rag-green", title: "Current" },
    { color: "bg-rag-amber", title: "Previous" },
    { color: "bg-rag-red", title: "Last Week" },
  ];

  return (
    <div className="flex gap-3 mt-2">
      {colors.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <div className={`w-4 h-4 rounded-full ${item.color}`} />
          <span className="text-xs text-muted-foreground">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export const MetricsOverview = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <MetricCard
        title="RAG Status Required"
        value="No"
        trend="neutral"
        icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="RAG Status History"
        value="Improving"
        trend="up"
        icon={<Circle className="h-4 w-4 text-muted-foreground" />}
      >
        <RagColorHistory />
      </MetricCard>
    </div>
  );
};