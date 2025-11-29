import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
interface Features {
  title: string;
  description: string;
  icon: string;
}
const features: Features[] = [
  {
    title: "Interactive Video Courses",
    description:
      "Seamless video playback with in-video quizzes, notes, bookmarks, speed control, and picture-in-picture mode for the best learning experience.",
    icon: "🎥",
  },
  {
    title: "Smart Progress Tracking & Certificates",
    description:
      "Students see real-time progress, completion percentages, and automatically earn beautiful, verifiable PDF certificates upon course completion.",
    icon: "🏆",
  },
  {
    title: "Drip Content & Scheduled Release",
    description:
      "Release lessons day-by-day or on specific dates to keep students engaged and prevent overwhelming them with all content at once.",
    icon: "📅",
  },
  {
    title: "Powerful Quiz & Assessment Builder",
    description:
      "Create multiple-choice, true/false, open-ended, timed quizzes with automatic grading, explanations, and detailed performance analytics.",
    icon: "✅",
  },
];
export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center space-y-8  text-center">
          <Badge variant={"outline"} className="self-center">
            The Future Of Online Education
          </Badge>
          <h1 className="capitalize  text-4xl md:text-6xl font-bold tracking-tight">
            elevate your learning experience
          </h1>
          <p className="text-muted-foreground capitalize max-w-[700px]">
            discover new way to learn with our modern learning managment
            system,access high quality courses any time ,any where with MO-LMS
          </p>
          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild>
              <Link href={"/"}>Explore Courses</Link>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link href={"/login"}>Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* CARDS SEC */}
      <section className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div>{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
