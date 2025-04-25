import { useMemo } from "react";
import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  // Memoized functions to improve performance
  const averageScore = useMemo(() => {
    if (!assessments?.length) return "0.0";
    const total = assessments.reduce((sum, a) => sum + (a.quizScore || 0), 0);
    return (total / assessments.length).toFixed(1);
  }, [assessments]);

  const latestAssessment = useMemo(() => {
    return assessments?.length ? assessments[assessments.length - 1] : null;
  }, [assessments]);

  const totalQuestions = useMemo(() => {
    if (!assessments?.length) return 0;
    return assessments.reduce((sum, a) => sum + (a.questions?.length || 0), 0);
  }, [assessments]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score Card */}
      <Card className="border border-border bg-card shadow-sm rounded-lg transition-transform transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Average Score
          </CardTitle>
          <Trophy className="h-5 w-5 text-yellow-500 animate-bounce" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{averageScore}%</div>
          <p className="text-xs text-muted-foreground">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Total Questions Card */}
      <Card className="border border-border bg-card shadow-sm rounded-lg transition-transform transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Questions Practiced
          </CardTitle>
          <Brain className="h-5 w-5 text-blue-500 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {totalQuestions}
          </div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      {/* Latest Score Card */}
      <Card className="border border-border bg-card shadow-sm rounded-lg transition-transform transform hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">
            Latest Score
          </CardTitle>
          <Target className="h-5 w-5 text-green-500 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {latestAssessment?.quizScore !== undefined
              ? latestAssessment.quizScore.toFixed(1)
              : "0"}
            %
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
