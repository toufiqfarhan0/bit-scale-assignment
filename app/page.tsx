"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Dot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  // State to toggle between monthly and annual pricing plans.
  // Default value: Monthly (isAnnual = false)
  const [isAnnual, setIsAnnual] = useState(false);

  // Pricing plan data structure for different subscription levels.
  // Each plan contains the following:
  // - Title, Monthly Price, and Annual Price
  // - Description of the plan and its key features
  // - Highlights: Additional benefits or unique selling points
  // - Button text: Action button for the plan
  // - Optional Badge: Shown only for the "Booster" plan to indicate its popularity
  const pricingPlans = [
    {
      title: "Trial",
      monthlyPrice: "Free",
      annualPrice: "Free",
      description: "Get personalized template",
      features: [
        "25+ data sources",
        "GPT4, LinkedIn and others",
        "Access to slack community",
        "10+ templates to scale your outbound",
      ],
      button: "Try Now",
      highlights: ["Explore product capabilities"],
    },
    {
      title: "Growth",
      monthlyPrice: "$229",
      annualPrice: "$2290",
      description: "Scale your outbound efforts",
      features: [
        "8,000 Credits",
        "Webhook, HTTP API",
        "Credit rollover (upto 2x plan credits)",
        "Outbound email integrations like Instantly, Smartlead.",
        "Dedicated 3 hours from Bitscale expert",
      ],
      button: "Continue with Growth",
      highlights: [
        "Unlimited leads search",
        "Fully enriched 5000 leads",
        "Personalized outreach at scale",
      ],
    },
    {
      title: "Booster",
      monthlyPrice: "$449",
      annualPrice: "$4490",
      description: "Advanced features for power users",
      features: [
        "25,000 Credits",
        "Webhook, HTTP API",
        "Credit rollover (upto 2x plan credits)",
        "Outbound email integrations like Instantly, Smartlead.",
        "Dedicated 3 hours from Bitscale expert",
        "Advanced models like Claude Sonnet",
        "Dedicated 8 hours from Bitscale expert",
        "2 way Hubspot integration",
      ],
      button: "Continue with Booster",
      highlights: [
        "Unlimited leads search",
        "Fully enriched 15000 leads",
        "Personalized outreach at scale",
      ],
      badge: "Popular",
    },
    {
      title: "Enterprise",
      monthlyPrice: "Contact Us",
      annualPrice: "Contact Us",
      description: "For individual pricing",
      features: [
        "Data privacy certification",
        "Priority Support",
        "Dedicated Bitscale expert",
        "Collaborative workspace and templates",
      ],
      button: "Try Now",
      highlights: [
        "Perfect for High-Volume End-to-End CRM Data Enrichment",
        "Unlimited list of leads with unlimited data points",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-[family-name:var(--font-geist-sans)]">
      <Tabs defaultValue="monthly" className="w-full max-w-6xl">
        {/* Tabs List to toggle between Monthly and Annual pricing views.
          - `TabsTrigger` components update the `isAnnual` state when clicked.
          - The active tab determines which pricing content to display. */}
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 bg-blue-100 text-black">
            <TabsTrigger value="monthly" onClick={() => setIsAnnual(false)}>
              Monthly Toufiq
            </TabsTrigger>
            <TabsTrigger value="annual" onClick={() => setIsAnnual(true)}>
              Annual Farhan
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Renders card content for Monthly and Annual tabs.
           - Maps over the `pricingPlans` array to generate individual cards dynamically.
           - Uses `PricingCard` component to render each plan's details based on the `isAnnual` state. */}
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} isAnnual={false} />
            ))}
          </div>
        </TabsContent>

        {/* Card Content for Annual */}
        <TabsContent value="annual">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} isAnnual={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// `PricingCard` Component: Displays individual pricing plan details.
//  - Props:
//       - `plan`: Object containing plan data (title, description, price, features, highlights, etc.).
//       - `isAnnual`: Boolean to determine if annual pricing should be displayed.
//       - Handles dynamic rendering of features, highlights, and conditional styles based on the plan.

function PricingCard({
  plan,
  isAnnual,
}: {
  plan: {
    title: string;
    monthlyPrice: string;
    annualPrice: string;
    description: string;
    features: string[];
    button: string;
    highlights: string[];
    badge?: string;
  };
  isAnnual: boolean;
}) {
  return (
    <Card
      className={`flex flex-col h-full ${
        plan.title === "Booster"
          ? "bg-gradient-to-br from-[#1E429F] to-[#0B1839] text-white"
          : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          {/* Card Title */}
          <CardTitle className="text-2xl">{plan.title}</CardTitle>

          {/* Conditionally renders a Badge only for the "Booster" plan */}
          {plan.badge && (
            <Badge
              variant="secondary"
              className="rounded-xl text-blue-100 bg-blue-400"
            >
              {plan.badge}
            </Badge>
          )}
        </div>

        {/* Card Description */}
        <CardDescription
          className={plan.title === "Booster" ? "text-gray-300" : ""}
        >
          {plan.description}
        </CardDescription>
      </CardHeader>

      {/* Card Price */}
      <CardContent className="flex-grow border-b-2 pb-4">
      {/* Displays the price dynamically based on the `isAnnual` state.
           - Applies a "50% Off" badge and strikethrough for original price if the plan isn't "Trial" or "Enterprise".
           - For the "Booster" plan, the original price is displayed differently to emphasize discount */}
        <div className="mb-4">
          <p className="text-4xl font-extrabold">
            {isAnnual ? plan.annualPrice : plan.monthlyPrice}
          </p>
          {plan.title !== "Trial" && plan.title !== "Enterprise" && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-normal">
                /{isAnnual ? "year" : "month"}
              </span>
              <Badge
                variant="secondary"
                className="rounded-xl text-green-900 bg-green-200"
              >
                50% Off
              </Badge>
              <span
                className={`text-lg font-bold text-black/50 ${
                  plan.title === "Booster" ? "text-white/50" : ""
                } line-through`}
              >
                {plan.title === "Booster"
                  ? isAnnual
                    ? "$9990"
                    : "$999"
                  : isAnnual
                  ? "$4590"
                  : "$459"}
              </span>
            </div>
          )}
        </div>

        {/*Card Features */}
        <ul className="space-y-2 text-sm">
        {/* Maps over the `features` array to render individual feature items.
            - Uses `Check` icon for each feature.
            - The icon's color and style change based on the plan (Booster vs. others) */}
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <Check
                className={`${
                  plan.title === "Booster"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                } rounded-full mr-2 mt-1 flex-shrink-0`}
                size={10}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Card Highlights */}
      <CardFooter className="flex flex-col items-stretch pt-4">
      {/* Maps over the `highlights` array to display key benefits of the plan.
           - Uses `Dot` icon for visual separation of each highlight. */}
        <ul className="mb-4 space-y-2 text-sm">
          {plan.highlights.map((highlight: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <Dot className="mr-2 flex-shrink-0" size={24} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Button changes style dynamically based on the plan.
            - "Booster" plan has unique styles (white background and blue text).
            - Other plans use a standard blue theme. */}
        <Button
          className={`w-full ${
            plan.title === "Booster"
              ? "bg-white text-[#1E429F] hover:bg-gray-200"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {plan.button}
        </Button>
      </CardFooter>
    </Card>
  );
}
