import { Link } from "@tanstack/react-router";
import { Clock, Star, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Course } from "@/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="gradient-brand relative h-24">
        <div className="grid-backdrop absolute inset-0 opacity-25" aria-hidden />
        <span className="absolute bottom-3 left-4 rounded-lg bg-background/90 px-2 py-1 text-xs font-semibold text-foreground">
          {course.code}
        </span>
      </div>
      <CardContent className="flex-1 space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.difficulty}</Badge>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground">{course.instructor}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> {course.students} enrolled
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link to="/courses/$id" params={{ id: course.id }}>
            View Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
