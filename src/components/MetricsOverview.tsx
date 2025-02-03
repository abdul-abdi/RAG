import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus, Clock, History, AlertCircle, Users, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

const MetricCard = ({ title, value, trend, icon }: MetricCardProps) => {
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
          </div>
          {getTrendIcon()}
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsOverview = () => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <MetricCard
        title="Current Status"
        value="Green"
        trend="up"
        icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Last Week"
        value="Green"
        trend="neutral"
        icon={<History className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Days Since Last Red"
        value="45"
        trend="up"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Consecutive Green"
        value="15"
        trend="up"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Team Members"
        value="8"
        trend="up"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Completion"
        value="75%"
        trend="up"
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};