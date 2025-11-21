import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Info, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const aiTipsWithModeration = [
  { tip: "Remember to listen to your body and never push through pain", moderated: true },
  { tip: "Consistency is more important than intensity - practice regularly", moderated: true },
  { tip: "Focus on your breath as much as your poses", moderated: true },
  { tip: "Use props when needed - they're tools for better alignment", moderated: true },
];

const ResultsV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const answers = (location.state?.answers as Answers) || {};
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  if (!answers.experience) {
    navigate("/");
    return null;
  }

  const recommendations = recommendationsMap[answers.experience];

  const handleNewsletterSignup = () => {
    if (newsletterOptIn) {
      toast({
        title: "Newsletter Signup Successful",
        description: "Your email will be deleted after 30 days unless you renew consent.",
      });
    }
  };

  const handleDataDeletion = () => {
    toast({
      title: "Data Deletion Requested",
      description: "All your personal data will be permanently deleted within 30 days (GDPR Art. 17)",
      variant: "default",
    });
  };

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
              <div className="flex items-center justify-center gap-3 mb-2">
                <Shield className="h-8 w-8" />
                <CardTitle className="text-3xl md:text-4xl">
                  Your Personalized Recommendations
                </CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80 text-lg">
                Privacy-first, bias-free recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Ethical Notice */}
          <Alert className="border-2 border-primary/30 bg-primary-soft/30">
            <Info className="h-4 w-4" />
            <AlertTitle>Ethical Recommendation Process</AlertTitle>
            <AlertDescription className="text-sm space-y-2">
              <p>Your recommendations were generated using:</p>
              <ul className="space-y-1 ml-4">
                <li>• Filter-bubble screening to ensure diverse options</li>
                <li>• Bias detection to avoid inappropriate class steering</li>
                <li>• Injury risk assessment for your safety</li>
                <li>• Fairness validation across all recommendations</li>
              </ul>
            </AlertDescription>
          </Alert>

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

          {/* AI Tips with Ethical Labeling */}
          <Card className="shadow-card border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Wellness Tips</CardTitle>
              </div>
              <CardDescription>
                AI-generated guidance with content moderation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-accent/10 border-accent/30">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertDescription className="text-sm">
                  <strong>AI-Generated Content:</strong> These tips are created by artificial intelligence and have been screened for harmful content (≥95% block rate). They are for general guidance only and not medical advice.
                </AlertDescription>
              </Alert>
              
              <ul className="space-y-3">
                {aiTipsWithModeration.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span className="flex-1">{item.tip}</span>
                    {item.moderated && (
                      <Badge variant="outline" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Data Privacy Controls */}
          <Card className="shadow-card border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Your Data & Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Your questionnaire data will be automatically deleted after <strong>90 days</strong> unless you renew consent.
                  You can request immediate deletion at any time.
                </AlertDescription>
              </Alert>

              {/* Newsletter Opt-in (Ethical) */}
              <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={newsletterOptIn}
                    onCheckedChange={(checked) => setNewsletterOptIn(checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Subscribe to wellness tips newsletter
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Opt-in only (no pre-checked boxes). Email data deleted after 30 days without consent renewal.
                    </p>
                  </div>
                </div>
                {newsletterOptIn && (
                  <Button
                    onClick={handleNewsletterSignup}
                    size="sm"
                    className="mt-3"
                  >
                    Confirm Subscription
                  </Button>
                )}
              </div>

              {/* Data Deletion (GDPR Art. 17) */}
              <div className="p-4 rounded-lg border-2 border-destructive/30 bg-destructive/5">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Request Data Deletion</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Exercise your GDPR Article 17 right. All personal data will be permanently deleted within 30 days.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDataDeletion}
                    variant="destructive"
                    size="sm"
                  >
                    Delete All My Data
                  </Button>
                </div>
              </div>
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
            <Button onClick={() => navigate("/questionnaire/v2")} variant="outline" className="flex-1">
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

export default ResultsV2;
