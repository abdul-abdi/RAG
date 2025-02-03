import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
}

const MetricCard = ({ title, value, trend }: MetricCardProps) => {
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
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          {getTrendIcon()}
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <MetricCard
        title="Current Status"
        value="Green"
        trend="up"
      />
      <MetricCard
        title="Last Week"
        value="Green"
        trend="neutral"
      />
      <MetricCard
        title="Issues Reported"
        value="0"
        trend="neutral"
      />
    </div>
  );
};