import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Upload,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

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
  walletAddress?: string;
}

// Mock data - will be replaced with API call
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
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
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
    walletAddress: "0x8ba1f109551bD432803012645Hac136c772c3c3",
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

export function TrustDetail() {
  const { trustId } = useParams<{ trustId: string }>();
  const [copied, setCopied] = useState(false);
  const [evidenceSubmitted, setEvidenceSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [fundsClaimed, setFundsClaimed] = useState(false);

  // Find the trust by ID - in real app, this would be an API call
  const trust = mockTrusts.find((t) => t.id === trustId);

  const copyTrustLink = async () => {
    const trustUrl = `${window.location.origin}/trust/${trustId}`;
    try {
      await navigator.clipboard.writeText(trustUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleEvidenceSubmission = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setEvidenceSubmitted(true);
    setIsSubmitting(false);
  };

  const handleClaimFunds = async () => {
    setIsClaiming(true);
    // Simulate API call for claiming funds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setFundsClaimed(true);
    setIsClaiming(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isEvidenceRequired =
    trust?.evidenceRequired && trust.evidenceRequired !== "none";

  if (!trust) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Trust Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The trust you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/fundertrusts">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trusts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/fundertrusts">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trusts
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{trust.name}</h1>
              <p className="text-muted-foreground">
                Trust created on {formatDate(trust.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(trust.status)}
              <Button onClick={copyTrustLink} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Trust Details */}
          <Card>
            <CardHeader>
              <CardTitle>Trust Details</CardTitle>
              <CardDescription>
                Information about the beneficiary and trust terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Beneficiary Name
                  </label>
                  <p className="text-sm font-medium">{trust.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Relation
                  </label>
                  <p className="text-sm font-medium">
                    {getRelationLabel(trust.relation)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Age Requirement
                  </label>
                  <p className="text-sm font-medium">
                    {getAgeRequirementLabel(trust.ageRequirement)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Time Required
                  </label>
                  <p className="text-sm font-medium">
                    {getTimeRequiredLabel(trust.timeRequired)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Evidence Required
                  </label>
                  <p className="text-sm font-medium">
                    {getEvidenceRequiredLabel(trust.evidenceRequired)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Funds Usage
                  </label>
                  <p className="text-sm font-medium">
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

          {/* Claiming Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements to Claim Funds</CardTitle>
              <CardDescription>
                What needs to be provided to access the trust funds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Age Requirement</p>
                    <p className="text-sm text-muted-foreground">
                      Beneficiary must be{" "}
                      {getAgeRequirementLabel(
                        trust.ageRequirement
                      ).toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Waiting Period</p>
                    <p className="text-sm text-muted-foreground">
                      {getTimeRequiredLabel(trust.timeRequired)} must pass
                      before funds can be claimed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Required Evidence</p>
                    <p className="text-sm text-muted-foreground">
                      Must provide{" "}
                      {getEvidenceRequiredLabel(
                        trust.evidenceRequired
                      ).toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Fund Usage Restriction</p>
                    <p className="text-sm text-muted-foreground">
                      Funds must be used for{" "}
                      {getFundsUsageLabel(trust.fundsUsage).toLowerCase()}
                      {trust.customUsage && `: ${trust.customUsage}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Submission */}
          {isEvidenceRequired && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Evidence Submission</CardTitle>
                <CardDescription>
                  Submit required evidence to proceed with fund claiming
                </CardDescription>
              </CardHeader>
              <CardContent>
                {evidenceSubmitted ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">
                          Evidence Approved
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Your{" "}
                          {getEvidenceRequiredLabel(
                            trust.evidenceRequired
                          ).toLowerCase()}{" "}
                          has been submitted and approved.
                        </p>
                      </div>
                    </div>

                    {!fundsClaimed && (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Ready to Claim:</strong> Your evidence has
                            been approved and you can now claim the trust funds.
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Click the button below to initiate the fund transfer
                            to your wallet.
                          </p>
                        </div>
                        <Button
                          onClick={handleClaimFunds}
                          disabled={isClaiming}
                          className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          {isClaiming
                            ? "Processing Claim..."
                            : "Claim Available Funds"}
                        </Button>
                      </div>
                    )}

                    {fundsClaimed && (
                      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-200">
                            Funds Successfully Claimed
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            The trust funds have been transferred to your
                            wallet. Check your wallet for the transaction.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Required:</strong>{" "}
                        {getEvidenceRequiredLabel(trust.evidenceRequired)}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Please upload the necessary documentation to proceed
                        with your claim.
                      </p>
                    </div>
                    <Button
                      onClick={handleEvidenceSubmission}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Evidence"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Wallet Information */}
          {trust.walletAddress && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trust Wallet</CardTitle>
                <CardDescription>
                  The wallet address where trust funds are held
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <code className="flex-1 p-3 bg-muted rounded-md text-sm font-mono">
                    {trust.walletAddress}
                  </code>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrustDetail;
