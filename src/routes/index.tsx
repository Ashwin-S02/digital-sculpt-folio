import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jack -- 3D Creator" },
      { name: "description", content: "Jack is a 3D creator crafting striking visual identities, motion, digital experiences, and unforgettable projects." },
      { property: "og:title", content: "Jack -- 3D Creator" },
      { property: "og:description", content: "Explore Jack's selected 3D, motion, branding, and digital design projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});
