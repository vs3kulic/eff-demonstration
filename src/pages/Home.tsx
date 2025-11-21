import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-yoga.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Perfect Yoga Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              Personalized class recommendations tailored to your experience, goals, and preferences
            </p>
          </div>
        </div>
      </section>

      {/* Version Selection */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare two approaches: baseline functionality vs. ethical enhancement with privacy-first design
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Version 1 Card */}
            <Card className="shadow-card hover:shadow-soft transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Version 1</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Baseline Implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Get personalized yoga class recommendations based on your experience level, goals, and preferences.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Quick questionnaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>AI-generated wellness tips</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/questionnaire/v1')}
                  className="w-full"
                  size="lg"
                >
                  Start Questionnaire
                </Button>
              </CardContent>
            </Card>

            {/* Version 2 Card */}
            <Card className="shadow-card hover:shadow-soft transition-all duration-300 border-2 border-primary/30 hover:border-primary/50 bg-primary-soft/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Version 2</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Ethical Enhancement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Experience privacy-first recommendations with transparent data practices and ethical AI.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Privacy-first data collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Transparent privacy practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Bias-free recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Ethical AI with content moderation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Full data control & deletion rights</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/questionnaire/v2')}
                  className="w-full"
                  size="lg"
                  variant="default"
                >
                  Start Ethical Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Yogi - Comparing Conventional vs. Value-Based Engineering</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
