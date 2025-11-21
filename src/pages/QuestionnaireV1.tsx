import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Answer = string;

const questions = [
  {
    id: "experience",
    question: "What is your yoga experience level?",
    options: [
      { value: "beginner", label: "Beginner - New to yoga" },
      { value: "intermediate", label: "Intermediate - 6 months to 2 years" },
      { value: "advanced", label: "Advanced - 2+ years of practice" },
    ],
  },
  {
    id: "goals",
    question: "What are your primary goals?",
    options: [
      { value: "flexibility", label: "Improve flexibility" },
      { value: "strength", label: "Build strength" },
      { value: "stress", label: "Reduce stress & anxiety" },
      { value: "balance", label: "Better balance & coordination" },
    ],
  },
  {
    id: "intensity",
    question: "What intensity level do you prefer?",
    options: [
      { value: "gentle", label: "Gentle & restorative" },
      { value: "moderate", label: "Moderate" },
      { value: "vigorous", label: "Vigorous & challenging" },
    ],
  },
  {
    id: "style",
    question: "Which yoga style interests you most?",
    options: [
      { value: "hatha", label: "Hatha - Traditional & balanced" },
      { value: "vinyasa", label: "Vinyasa - Flow-based" },
      { value: "yin", label: "Yin - Deep stretching" },
      { value: "power", label: "Power - Fitness-focused" },
    ],
  },
];

const QuestionnaireV1 = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results with answers
      navigate("/results/v1", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl">Find Your Perfect Class</CardTitle>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="mt-4">
              Version 1 - Baseline Implementation
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                {currentQ.question}
              </h3>

              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) =>
                  setAnswers({ ...answers, [currentQ.id]: value })
                }
              >
                {currentQ.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex-1"
              >
                {currentQuestion === questions.length - 1 ? (
                  "See Results"
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionnaireV1;
