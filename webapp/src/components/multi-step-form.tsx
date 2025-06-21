"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormData {
  name: string;
  relation: string;
  ageRequirement: string;
  timeRequired: string;
  evidenceRequired: string;
  fundsUsage: string;
  customUsage: string;
  secretPassword: string;
}

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    relation: "",
    ageRequirement: "",
    timeRequired: "",
    evidenceRequired: "",
    fundsUsage: "",
    customUsage: "",
    secretPassword: "",
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Form submitted successfully!");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.relation && formData.ageRequirement;
      case 2:
        return formData.timeRequired && formData.evidenceRequired;
      case 3:
        return (
          formData.fundsUsage &&
          (formData.fundsUsage !== "custom" || formData.customUsage) &&
          formData.secretPassword
        );
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter beneficiary name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relation">Relation</Label>
              <Select
                value={formData.relation}
                onValueChange={(value) => updateFormData("relation", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life-partner">Life Partner</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="business-partner">
                    Business Partner
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age-requirement">
                Age Requirement to Claim Funds
              </Label>
              <Select
                value={formData.ageRequirement}
                onValueChange={(value) =>
                  updateFormData("ageRequirement", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="over-18">Over 18</SelectItem>
                  <SelectItem value="over-25">Over 25</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="time-required">
                Time Required to Pass Before Pay-out
              </Label>
              <Select
                value={formData.timeRequired}
                onValueChange={(value) => updateFormData("timeRequired", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="2-years">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidence-required">Evidence Required</Label>
              <Select
                value={formData.evidenceRequired}
                onValueChange={(value) =>
                  updateFormData("evidenceRequired", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select evidence requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proof-of-death">Proof of Death</SelectItem>
                  <SelectItem value="proof-of-incapacity">
                    Proof of Incapacity
                  </SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="funds-usage">How Funds Should Be Spent</Label>
              <Select
                value={formData.fundsUsage}
                onValueChange={(value) => updateFormData("fundsUsage", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funds usage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational-tuition">
                    Educational Tuition
                  </SelectItem>
                  <SelectItem value="living-expenses">
                    Living Expenses
                  </SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.fundsUsage === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-usage">Custom Usage</Label>
                <Input
                  id="custom-usage"
                  placeholder="Specify custom usage"
                  value={formData.customUsage}
                  onChange={(e) =>
                    updateFormData("customUsage", e.target.value)
                  }
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="secret-password">Retrieval Password</Label>
              <Input
                id="secret-password"
                type="password"
                placeholder="Enter a secret password"
                value={formData.secretPassword}
                onChange={(e) =>
                  updateFormData("secretPassword", e.target.value)
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Beneficiary Details";
      case 2:
        return "Terms of Release";
      case 3:
        return "Fund Usage";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Enter the beneficiary information and requirements";
      case 2:
        return "Define the terms and conditions for fund release";
      case 3:
        return "Specify how the funds should be utilized";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>{getStepTitle()}</CardTitle>
              <CardDescription>{getStepDescription()}</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
