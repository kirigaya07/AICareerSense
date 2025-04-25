"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import useFetch from "@/hooks/use-fetch";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import QuizResult from "./quiz-result";

// Custom themed loader component
const ThemedLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 w-full">
      <div className="relative w-16 h-16 mb-4">
        <div
          className="absolute inset-0 border-4 border-t-primary border-r-primary/70 border-b-primary/50 border-l-primary/30 rounded-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
        <div
          className="absolute inset-3 bg-gradient-to-tr from-primary to-primary/50 rounded-full opacity-75 animate-pulse"
          style={{ animationDuration: "2s" }}
        ></div>
        <div className="absolute inset-[38%] bg-background rounded-full shadow-md"></div>
      </div>
      <div className="flex space-x-1 items-center text-lg font-medium">
        <span className="text-foreground">Loading</span>
        <span
          className="animate-bounce text-primary"
          style={{ animationDelay: "0s" }}
        >
          .
        </span>
        <span
          className="animate-bounce text-primary"
          style={{ animationDelay: "0.2s" }}
        >
          .
        </span>
        <span
          className="animate-bounce text-primary"
          style={{ animationDelay: "0.4s" }}
        >
          .
        </span>
      </div>
    </div>
  );
};

// Welcome card component - extracted for clarity
const WelcomeCard = ({ onStart }) => (
  <Card className="mx-2">
    <CardHeader>
      <CardTitle>Ready to test your knowledge?</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        This quiz contains 10 questions specific to your industry and skills.
        Take your time and choose the best answer for each question.
      </p>
    </CardContent>
    <CardFooter>
      <Button onClick={onStart} className="w-full">
        Start Quiz
      </Button>
    </CardFooter>
  </Card>
);

// Question option component - extracted for cleaner rendering
const QuestionOption = ({ option, index, isSelected, onSelect }) => (
  <div key={index} className="flex items-center space-x-2">
    <RadioGroupItem
      value={option}
      id={`option-${index}`}
      checked={isSelected}
      onClick={() => onSelect(option)}
    />
    <Label htmlFor={`option-${index}`} className="cursor-pointer">
      {option}
    </Label>
  </div>
);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
      setIsGenerating(false);
    }
  }, [quizData]);

  // Memoized current question data
  const currentQuestionData = useMemo(
    () => quizData && quizData[currentQuestion],
    [quizData, currentQuestion]
  );

  // Memoized handlers
  const handleAnswer = useCallback(
    (answer) => {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = answer;
        return newAnswers;
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (quizData && currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  }, [currentQuestion, quizData]);

  const calculateScore = useCallback(() => {
    if (!quizData) return 0;

    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  }, [answers, quizData]);

  const finishQuiz = useCallback(async () => {
    if (!quizData) return;

    const score = calculateScore();
    setIsFinishing(true);
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    } finally {
      setIsFinishing(false);
    }
  }, [quizData, answers, calculateScore, saveQuizResultFn]);

  const startNewQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setIsGenerating(true);
    setResultData(null);
    generateQuizFn();
  }, [generateQuizFn, setResultData]);

  // Conditional rendering with early returns for cleaner code
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (isGenerating || generatingQuiz) {
    return <ThemedLoader />;
  }

  if (!quizData) {
    return <WelcomeCard onStart={startNewQuiz} />;
  }

  // Main quiz interface
  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{currentQuestionData.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion] || ""}
          className="space-y-2"
        >
          {currentQuestionData.options.map((option, index) => (
            <QuestionOption
              key={index}
              option={option}
              index={index}
              isSelected={answers[currentQuestion] === option}
              onSelect={handleAnswer}
            />
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">
              {currentQuestionData.explanation}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setShowExplanation(true)}
          variant="outline"
          disabled={!answers[currentQuestion] || showExplanation}
        >
          Show Explanation
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="ml-auto"
        >
          {currentQuestion < quizData.length - 1 ? "Next" : "Finish Quiz"}
          {isFinishing ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
