"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";
import { Progress } from "@/components/ui/progress";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      {/* Header Section */}
      <Card className="border border-border bg-card rounded-lg shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Review your past quiz performance and learn from mistakes.
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-primary  text-sm font-semibold rounded-md transition-all hover:bg-primary/90"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>

        {/* Quiz Cards */}
        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer border border-border bg-muted/20 rounded-md transition-all duration-300 hover:scale-[1.02] hover:bg-card hover:shadow-lg"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-semibold text-primary">
                      Quiz {i + 1}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(
                        new Date(assessment.createdAt),
                        "MMM dd, yyyy | hh:mm a"
                      )}
                    </p>
                  </div>
                </CardHeader>

                {/* Score Progress Bar */}
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-muted-foreground">Score:</p>
                    <p className="text-primary font-medium">
                      {assessment.quizScore.toFixed(1)}%
                    </p>
                  </div>
                  <Progress
                    value={assessment.quizScore}
                    className="h-2 rounded-full bg-muted-foreground transition-all"
                  />
                </CardContent>

                {/* Improvement Tip */}
                {assessment.improvementTip && (
                  <CardContent className="p-4 border-t border-border text-sm bg-muted/20 rounded-b-md">
                    <p className="text-primary font-medium mb-1">
                      💡 Improvement Tip:
                    </p>
                    <p className="text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Details Modal */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-primary">
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
