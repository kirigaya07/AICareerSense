"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Target,
  Users,
  Bot,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "AI-Powered Insights",
    description:
      "Get personalized career guidance using advanced AI technology",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Resume Builder",
    description: "Create professional resumes tailored to your industry",
  },
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: "Interview Preparation",
    description: "Practice with AI-driven interview scenarios",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    title: "Career Development",
    description: "Continuous learning and skill development recommendations",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold gradient-title mb-4">
          About AspireAI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered career development platform, designed to help you
          achieve your professional goals through personalized guidance and
          cutting-edge tools.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-16">
        <CardContent className="p-8">
          <div className="space-y-6">
            <Badge className="mb-2">Our Mission</Badge>
            <h2 className="text-3xl font-bold mb-4">
              Empowering Career Growth Through AI
            </h2>
            <p className="text-muted-foreground">
              AspireAI combines artificial intelligence with career development
              expertise to provide accessible, personalized professional
              guidance. We believe everyone deserves access to high-quality
              career development tools and insights.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:border-primary transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="mb-16">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline">1</Badge>
                <div>
                  <h3 className="font-semibold">Create Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up and tell us about your career goals and experience
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">2</Badge>
                <div>
                  <h3 className="font-semibold">Get AI Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized career recommendations and guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline">3</Badge>
                <div>
                  <h3 className="font-semibold">Build Your Materials</h3>
                  <p className="text-sm text-muted-foreground">
                    Create professional resumes and prepare for interviews
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">4</Badge>
                <div>
                  <h3 className="font-semibold">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your career development and achieve your goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Section */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Technology
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground text-center max-w-3xl mx-auto">
              We leverage advanced AI models and machine learning algorithms to
              provide personalized career guidance, resume optimization, and
              interview preparation. Our platform continuously learns and adapts
              to provide the most relevant advice for your career journey.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="secondary">AI Analysis</Badge>
              <Badge variant="secondary">Machine Learning</Badge>
              <Badge variant="secondary">Natural Language Processing</Badge>
              <Badge variant="secondary">Real-time Feedback</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
