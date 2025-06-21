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
import { Edit, Eye, Trash2, Copy, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface TrustData {
  id: string;
  name: string;
  relation: string;
  ageRequirement: string;
  timeRequired: string;
  evidenceRequired: string;
  fundsUsage: string;
  customUsage?: string;
  createdAt: string;
  status: "active" | "pending" | "completed";
}

// Mock data - will be replaced with on-chain data
const mockTrusts: TrustData[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    relation: "child",
    ageRequirement: "over-18",
    timeRequired: "1-year",
    evidenceRequired: "proof-of-death",
    fundsUsage: "educational-tuition",
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    relation: "business-partner",
    ageRequirement: "over-25",
    timeRequired: "6-months",
    evidenceRequired: "proof-of-incapacity",
    fundsUsage: "custom",
    customUsage: "Business continuity and debt repayment",
    createdAt: "2024-02-20",
    status: "pending",
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
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function TrustList() {
  const [trusts, setTrusts] = useState<TrustData[]>(mockTrusts);
  const [copiedTrustId, setCopiedTrustId] = useState<string | null>(null);

  const handleEditTrust = (trust: TrustData) => {
    // This will be replaced with navigation to edit form
    console.log("Edit trust:", trust);
    // For now, just show an alert
    alert(`Edit functionality for trust: ${trust.name}`);
  };

  const handleDeleteTrust = (trustId: string) => {
    if (confirm("Are you sure you want to delete this trust?")) {
      setTrusts(trusts.filter((trust) => trust.id !== trustId));
    }
  };

  const copyTrustLink = async (trustId: string) => {
    const trustUrl = `${window.location.origin}/trust/${trustId}`;
    try {
      await navigator.clipboard.writeText(trustUrl);
      setCopiedTrustId(trustId);
      setTimeout(() => setCopiedTrustId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
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
          <h2 className="text-2xl font-bold tracking-tight">My Trusts</h2>
          <p className="text-muted-foreground">
            Manage your created trusts and their beneficiaries
          </p>
        </div>
        <Button onClick={() => console.log("Create new trust")}>
          Create New Trust
        </Button>
      </div>

      {trusts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                No trusts created yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first trust to get started
              </p>
              <Button>Create Trust</Button>
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
                      <CardTitle className="text-xl">{trust.name}</CardTitle>
                      {getStatusBadge(trust.status)}
                    </div>
                    <CardDescription>
                      Created on {formatDate(trust.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/trust/${trust.id}`}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Trust
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyTrustLink(trust.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedTrustId === trust.id ? "Copied!" : "Copy Link"}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Trust Details - {trust.name}
                          </DialogTitle>
                          <DialogDescription>
                            Complete information about this trust
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Beneficiary Name
                              </label>
                              <p className="text-sm">{trust.name}</p>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTrust(trust)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTrust(trust.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                    <span className="text-muted-foreground">
                      Time Required:
                    </span>
                    <p className="font-medium">
                      {getTimeRequiredLabel(trust.timeRequired)}
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
