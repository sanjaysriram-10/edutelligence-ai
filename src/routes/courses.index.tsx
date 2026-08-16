import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/shared/CourseCard";
import { EmptyState, PageHeader } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories, getCourses } from "@/lib/mock-data";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Course Catalogue — EduIntelli" },
      {
        name: "description",
        content:
          "Browse EduIntelli courses across Computer Science, AI, Data Science, Networking and Web Development with search, category and difficulty filters.",
      },
      { property: "og:title", content: "Course Catalogue — EduIntelli" },
      {
        property: "og:description",
        content: "Search and filter academic programs by category, difficulty and rating.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const all = getCourses();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [sort, setSort] = useState("popular");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = all.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      const matchesCategory = category === "all" || c.category === category;
      const matchesDifficulty = difficulty === "all" || c.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
    const sorted = [...filtered];
    if (sort === "popular") sorted.sort((a, b) => b.students - a.students);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [all, query, category, difficulty, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setDifficulty("all");
    setSort("popular");
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Catalogue"
          title="Explore Courses"
          description={`${all.length} academic programs across five departments.`}
        />

        <div className="surface mt-8 grid gap-3 p-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course, code or instructor…"
              className="pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {courseCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3 md:col-span-4">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most enrolled</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
                <SelectItem value="title">Title (A–Z)</SelectItem>
              </SelectContent>
            </Select>
            <p className="ml-auto text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {results.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="No courses match your filters"
              description="Try a different keyword, or clear the filters to see the full catalogue."
              action={<Button onClick={reset}>Clear filters</Button>}
            />
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
