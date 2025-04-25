"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  Bell,
  Cookie,
  Scale,
} from "lucide-react";

export default function PrivacyPage() {
  const formatDate = () => {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold gradient-title mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Last updated: {formatDate()}
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            At AspireAI, we take your privacy seriously. This privacy policy
            explains how we collect, use, and protect your personal information
            when you use our AI-powered career development platform.
          </p>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Information Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal-info">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Name and contact information</li>
                    <li>Professional experience and education history</li>
                    <li>Career preferences and goals</li>
                    <li>Resume and cover letter content</li>
                    <li>Account credentials</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage-data">
                <AccordionTrigger>Usage Data</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Platform interaction data</li>
                    <li>Feature usage statistics</li>
                    <li>AI interaction history</li>
                    <li>Device and browser information</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Data Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              How We Use Your Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Lock className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>
                  To provide personalized career guidance and recommendations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Share2 className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>To improve our AI models and service quality</span>
              </li>
              <li className="flex items-start gap-2">
                <Bell className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>To send relevant notifications and updates</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We implement industry-standard security measures to protect your
              personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and updates</li>
              <li>Secure data storage and transmission</li>
              <li>Access controls and authentication</li>
            </ul>
          </CardContent>
        </Card>

        {/* Cookie Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Cookie Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience
              on our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for platform functionality</li>
              <li>Analytics cookies to improve our services</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="access-rights">
                <AccordionTrigger>Access and Control</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccurate information</li>
                    <li>Right to delete your data</li>
                    <li>Right to export your data</li>
                    <li>Right to restrict processing</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exercise-rights">
                <AccordionTrigger>How to Exercise Your Rights</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    You can exercise your rights by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                    <li>Using the privacy settings in your account</li>
                    <li>Contacting our privacy team at privacy@aspireai.com</li>
                    <li>Submitting a request through our support portal</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              If you have any questions about our privacy policy or how we
              handle your data, please contact us at:
            </p>
            <div className="mt-4">
              <p>Email: privacy@aspireai.com</p>
              <p>Address: [Your Company Address]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
