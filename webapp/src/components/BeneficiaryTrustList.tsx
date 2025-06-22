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
import { Badge } from "@/components/ui/badge";
import { Eye, Gift, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BeneficiaryTrustData {
  id: string;
  funderName: string;
  beneficiaryName: string;
  relation: string;
  ageRequirement: string;
  timeRequired: string;
  evidenceRequired: string;
  fundsUsage: string;
  customUsage?: string;
  createdAt: string;
  status: "active" | "pending" | "completed" | "claimable";
  amount: string;
  claimableDate?: string;
}

// Mock data for beneficiary trusts - will be replaced with on-chain data
const mockBeneficiaryTrusts: BeneficiaryTrustData[] = [
  {
    id: "1",
    funderName: "John Smith",
    beneficiaryName: "Sarah Johnson",
    relation: "child",
    ageRequirement: "over-18",
    timeRequired: "1-year",
    evidenceRequired: "proof-of-death",
    fundsUsage: "educational-tuition",
    createdAt: "2024-01-15",
    status: "claimable",
    amount: "50,000 USDC",
    claimableDate: "2024-01-15",
  },
  {
    id: "2",
    funderName: "Maria Garcia",
    beneficiaryName: "Sarah Johnson",
    relation: "sibling",
    ageRequirement: "over-25",
    timeRequired: "6-months",
    evidenceRequired: "proof-of-incapacity",
    fundsUsage: "custom",
    customUsage: "Business continuity and debt repayment",
    createdAt: "2024-02-20",
    status: "active",
    amount: "25,000 USDC",
  },
  {
    id: "3",
    funderName: "David Wilson",
    beneficiaryName: "Sarah Johnson",
    relation: "business-partner",
    ageRequirement: "none",
    timeRequired: "2-years",
    evidenceRequired: "proof-of-death",
    fundsUsage: "living-expenses",
    createdAt: "2024-03-10",
    status: "pending",
    amount: "100,000 USDC",
  },
];

const getRelationLabel = (relation: string) => {
  const relations: Record<string, string> = {
    "life-partner": "Life Partner",
    child: "Child",
    sibling: "Sibling",
    parent: "Parent",
    "business-partner": "Business Partner",
  };
  return relations[relation] || relation;
};

const getAgeRequirementLabel = (ageReq: string) => {
  const requirements: Record<string, string> = {
    "over-18": "Over 18",
    "over-25": "Over 25",
    none: "None",
  };
  return requirements[ageReq] || ageReq;
};

const getTimeRequiredLabel = (timeReq: string) => {
  const times: Record<string, string> = {
    "6-months": "6 Months",
    "1-year": "1 Year",
    "2-years": "2 Years",
  };
  return times[timeReq] || timeReq;
};

const getEvidenceRequiredLabel = (evidence: string) => {
  const evidences: Record<string, string> = {
    "proof-of-death": "Proof of Death",
    "proof-of-incapacity": "Proof of Incapacity",
    none: "None",
  };
  return evidences[evidence] || evidence;
};

const getFundsUsageLabel = (usage: string) => {
  const usages: Record<string, string> = {
    "educational-tuition": "Educational Tuition",
    "living-expenses": "Living Expenses",
    custom: "Custom",
  };
  return usages[usage] || usage;
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { label: "Active", variant: "default" as const },
    pending: { label: "Pending", variant: "secondary" as const },
    completed: { label: "Completed", variant: "outline" as const },
    claimable: { label: "Claimable", variant: "default" as const },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function BeneficiaryTrustList() {
  const [trusts, setTrusts] = useState<BeneficiaryTrustData[]>(
    mockBeneficiaryTrusts
  );

  const handleClaimTrust = (trust: BeneficiaryTrustData) => {
    // This will be replaced with actual claim functionality
    console.log("Claiming trust:", trust);

    // Update the trust status to completed
    setTrusts(
      trusts.map((t) =>
        t.id === trust.id ? { ...t, status: "completed" as const } : t
      )
    );

    alert(
      `Successfully claimed trust from ${trust.funderName} for ${trust.amount}`
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            My Beneficiary Trusts
          </h2>
          <p className="text-muted-foreground">
            Trusts where you are the beneficiary
          </p>
        </div>
      </div>

      {trusts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <Gift className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No beneficiary trusts found
              </h3>
              <p className="text-muted-foreground mb-4">
                You don't have any trusts where you are the beneficiary yet
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {trusts.map((trust) => (
            <Card key={trust.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">
                        Trust from {trust.funderName}
                      </CardTitle>
                      {getStatusBadge(trust.status)}
                    </div>
                    <CardDescription>
                      Created on {formatDate(trust.createdAt)}
                      {trust.claimableDate && (
                        <span className="block text-green-600">
                          Claimable since {formatDate(trust.claimableDate)}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Trust Details - {trust.funderName}
                          </DialogTitle>
                          <DialogDescription>
                            Complete information about this trust
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Funder Name
                              </label>
                              <p className="text-sm font-medium">
                                {trust.funderName}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Beneficiary Name
                              </label>
                              <p className="text-sm font-medium">
                                {trust.beneficiaryName}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Trust Amount
                              </label>
                              <p className="text-sm font-medium text-green-600">
                                {trust.amount}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Relation
                              </label>
                              <p className="text-sm">
                                {getRelationLabel(trust.relation)}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Age Requirement
                              </label>
                              <p className="text-sm">
                                {getAgeRequirementLabel(trust.ageRequirement)}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Time Required
                              </label>
                              <p className="text-sm">
                                {getTimeRequiredLabel(trust.timeRequired)}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Evidence Required
                              </label>
                              <p className="text-sm">
                                {getEvidenceRequiredLabel(
                                  trust.evidenceRequired
                                )}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Funds Usage
                              </label>
                              <p className="text-sm">
                                {getFundsUsageLabel(trust.fundsUsage)}
                                {trust.customUsage && ` - ${trust.customUsage}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {trust.status === "claimable" && (
                      <Button
                        onClick={() => handleClaimTrust(trust)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Claim Trust
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-medium text-green-600">{trust.amount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Relation:</span>
                    <p className="font-medium">
                      {getRelationLabel(trust.relation)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Age Requirement:
                    </span>
                    <p className="font-medium">
                      {getAgeRequirementLabel(trust.ageRequirement)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Funds Usage:</span>
                    <p className="font-medium">
                      {getFundsUsageLabel(trust.fundsUsage)}
                      {trust.customUsage && (
                        <span className="block text-xs text-muted-foreground">
                          {trust.customUsage}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
