import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { VersionBadge, FlowAnnotation } from "@/components/FlowAnnotation";

type Answer = string;

const questions = [
  {
    id: "q1",
    question: "Wie fühlt sich dein Körper aktuell an?",
    options: [
      { value: "A", label: "Basically der Typ flexible Brezel – super elastisch in allen Positionen." },
      { value: "B", label: "Solide, aber manchmal knarre ich beim Aufstehen wie ein Holzstuhl." },
      { value: "C", label: "Mein Körper ist ein work in progress – ich bin da realistisch." },
      { value: "D", label: "Bewegung gibt's nur dann, wenn es unbedingt sein muss." },
    ],
  },
  {
    id: "q2",
    question: "Wie läuft's bei dir mit Verletzungen oder Einschränkungen?",
    options: [
      { value: "A", label: "Momentan hab ich keine akuten oder chronischen Verletzungen." },
      { value: "B", label: "Uff – meine Schulter erzählt noch vom Festival '18." },
      { value: "C", label: "Mein Körper kommt mir derzeit wie eine chronische Baustelle vor." },
      { value: "D", label: "Ich bin aktuell völlig out of order — aber ich will zurück ins Game." },
    ],
  },
  {
    id: "q3",
    question: "Dein Commitment-Level zu Yoga?",
    options: [
      { value: "A", label: "Situationship-Yogi. Ich und Yoga waren immer schon on-off." },
      { value: "B", label: "Yoga war Liebe auf den ersten Blick. Ich bin vollkommen committed!" },
      { value: "C", label: "YouTube-Yoga und ich haben eine intensive Fernbeziehung." },
      { value: "D", label: "Ich schau mal. Ich hab gehört es gibt Snacks und Tee nach der Klasse." },
    ],
  },
  {
    id: "q4",
    question: "Welche Vibes spürst du, wenn du an Yoga denkst?",
    options: [
      { value: "A", label: "Faszien-Liebe: Entkrampfen, durchatmen, alles loslassen!" },
      { value: "B", label: "Power-Mover: Schwitzen, stretchen, strong AF werden." },
      { value: "C", label: "Slow-Flow: Ich will flowen und chillen." },
      { value: "D", label: "Zen-Seeker: Ich brauche mehr im Leben — vielleicht ist es Yoga." },
    ],
  },
  {
    id: "q5",
    question: "Wie willst du dein Yoga erleben?",
    options: [
      { value: "A", label: "Kollektiver Vibe like a Sunday Brunch – nur mit Asanas." },
      { value: "B", label: "Mat Queen: Ich bleibe auf meiner Matte, alles andere blende ich aus." },
      { value: "C", label: "Zen-Master: Hauptsache gemütlich, langsamer und tiefer." },
      { value: "D", label: "Ich brauch klare Ansagen – step by step, sonst verlauf ich mich." },
    ],
  },
];

const QuestionnaireV1 = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  // ETHICAL VIOLATION: Pre-checked consent boxes (dark pattern)
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [dataShareConsent, setDataShareConsent] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ETHICAL VIOLATION: Collect all data without clear disclosure
      navigate("/results/v1", { 
        state: { 
          answers,
          marketingConsent,
          dataShareConsent,
          // ETHICAL VIOLATION: Collecting unnecessary data
          timestamp: new Date().toISOString(),
          sessionDuration: Math.floor(Math.random() * 300) + 60,
        } 
      });
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
          <VersionBadge version="V1" label="Baseline" />
        </div>

        <FlowAnnotation
          step={1}
          title="Datenerfassung"
          description="Standard-Fragebogen ohne expliziten Datenschutzhinweis oder Einwilligungsvalidierung"
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-heading">
                  Benutzer-Fragebogen
                </CardTitle>
              </div>
              <CardDescription>
                Frage {currentQuestion + 1} von {questions.length}
              </CardDescription>
              <Progress value={progress} className="h-1.5 mt-3" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-medium text-foreground">
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
                      className="flex items-center space-x-3 p-3 rounded border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`${currentQ.id}-${option.value}`} />
                      <Label
                        htmlFor={`${currentQ.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* ETHICAL VIOLATION: Pre-checked consent boxes on last question (dark pattern) */}
              {isLastQuestion && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Bitte bestätige die folgenden Optionen:
                  </p>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="marketing" 
                      checked={marketingConsent}
                      onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      {/* ETHICAL VIOLATION: Vague, confusing consent language */}
                      Ja, ich möchte personalisierte Angebote, Neuigkeiten und Partnerinhalte per E-Mail erhalten und stimme der Verarbeitung meiner Daten zu Marketingzwecken zu.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="datashare" 
                      checked={dataShareConsent}
                      onCheckedChange={(checked) => setDataShareConsent(checked as boolean)}
                    />
                    <Label htmlFor="datashare" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      {/* ETHICAL VIOLATION: Bundled consent for data sharing */}
                      Ich stimme zu, dass meine Daten mit ausgewählten Partnern geteilt werden können, um mein Erlebnis zu verbessern.
                    </Label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="sm"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
                {/* ETHICAL VIOLATION: No skip option, forced progression */}
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  size="sm"
                  className="flex-1"
                >
                  {isLastQuestion ? (
                    "Ergebnisse anzeigen"
                  ) : (
                    <>
                      Weiter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </FlowAnnotation>

        {/* Annotation note */}
        <div className="mt-6 p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">V1 Hinweis:</strong> Diese Baseline-Implementierung 
            erfasst Benutzerdaten sofort ohne explizite Datenschutzoffenlegung, verwendet 
            vorab angekreuzte Einwilligungsboxen (Dark Pattern) und bietet keine Möglichkeit, 
            Fragen zu überspringen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireV1;
