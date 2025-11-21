import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";

type Answers = Record<string, string>;

const recommendationsMap: Record<string, any> = {
  beginner: {
    classes: ["Beginner Hatha Flow", "Gentle Introduction to Yoga", "Yoga Basics"],
    description: "Perfect for building foundational poses and understanding yoga principles",
  },
  intermediate: {
    classes: ["Vinyasa Flow", "Power Yoga", "Ashtanga Primary Series"],
    description: "Challenge yourself while refining technique and building strength",
  },
  advanced: {
    classes: ["Advanced Vinyasa", "Arm Balance Workshop", "Inversions & Backbends"],
    description: "Push your limits with complex poses and advanced sequences",
  },
};

const aiTips = [
  "Remember to listen to your body and never push through pain",
  "Consistency is more important than intensity - practice regularly",
  "Focus on your breath as much as your poses",
  "Use props when needed - they're tools for better alignment",
];

const ResultsV1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = (location.state?.answers as Answers) || {};

  if (!answers.experience) {
    navigate("/");
    return null;
  }

  const recommendations = recommendationsMap[answers.experience];

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card className="shadow-card border-2 border-primary/30 bg-gradient-hero text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl">
                Your Personalized Recommendations
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Based on your questionnaire responses
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Recommended Classes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Recommended Classes</CardTitle>
              <CardDescription>{recommendations.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendations.classes.map((className: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {className}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {answers.intensity === "gentle" && "Gentle pace, focus on relaxation"}
                          {answers.intensity === "moderate" && "Moderate intensity, balanced approach"}
                          {answers.intensity === "vigorous" && "High energy, challenging flows"}
                        </p>
                      </div>
                      <Badge variant="secondary">{answers.style}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Wellness Tips</CardTitle>
              </div>
              <CardDescription>AI-generated guidance for your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {aiTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Your Preferences Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Experience Level</span>
                  <p className="font-medium text-foreground capitalize">{answers.experience}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Primary Goals</span>
                  <p className="font-medium text-foreground capitalize">{answers.goals}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Intensity</span>
                  <p className="font-medium text-foreground capitalize">{answers.intensity}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Style Preference</span>
                  <p className="font-medium text-foreground capitalize">{answers.style}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={() => navigate("/questionnaire/v1")} variant="outline" className="flex-1">
              Retake Questionnaire
            </Button>
            <Button onClick={() => navigate("/")} className="flex-1">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsV1;
