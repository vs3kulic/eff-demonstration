import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

const QuestionnaireV2 = () => {
  const navigate = useNavigate();
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [privacyUnderstood, setPrivacyUnderstood] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];

  const handlePrivacyAccept = () => {
    if (privacyUnderstood) {
      setShowPrivacyNotice(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results/v2", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/");
    }
  };

  if (showPrivacyNotice) {
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

          <Card className="shadow-card border-2 border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">Privacy Notice</CardTitle>
              </div>
              <CardDescription>
                Version 2 - Privacy-First Approach
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Transparent Data Practices</AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  <p>Before we begin, here's exactly how we handle your data:</p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span><strong>What we collect:</strong> Only your questionnaire responses (experience level, goals, preferences)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span><strong>How we use it:</strong> Solely to generate personalized yoga class recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span><strong>How long we keep it:</strong> 90 days, unless you renew consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span><strong>Your rights:</strong> Request deletion of all your data at any time (honored within 30 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <span><strong>No sensitive health data:</strong> We avoid collecting medical information</span>
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-primary-soft/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-foreground">Ethical AI Commitment</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>AI-generated tips are clearly labeled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Content moderation prevents harmful advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Bias-free recommendations (no filter bubbles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>No dark patterns or manipulative consent</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-lg border-2 border-primary/30 bg-primary-soft/30">
                <Checkbox
                  id="privacy-understood"
                  checked={privacyUnderstood}
                  onCheckedChange={(checked) => setPrivacyUnderstood(checked as boolean)}
                />
                <Label
                  htmlFor="privacy-understood"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  I understand how my data will be collected, used, and protected. I acknowledge my right to request deletion at any time.
                </Label>
              </div>

              <Button
                onClick={handlePrivacyAccept}
                disabled={!privacyUnderstood}
                className="w-full"
                size="lg"
              >
                Continue to Questionnaire
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

        <Card className="shadow-card border-2 border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Find Your Perfect Class</CardTitle>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="mt-4">
              Version 2 - Ethical Enhancement
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

export default QuestionnaireV2;
