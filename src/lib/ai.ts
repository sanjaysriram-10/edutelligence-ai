import type {
  AIInsight,
  PerformancePoint,
  PerformanceStatus,
  RiskLevel,
  Student,
  SubjectScore,
  Trend,
} from "@/types";

/** Weighted academic performance score: attendance 25%, assignments 30%, exams 45%. */
export function calculatePerformance(input: {
  attendance: number;
  assignmentScore: number;
  examScore: number;
}): number {
  return Math.round(
    input.attendance * 0.25 + input.assignmentScore * 0.3 + input.examScore * 0.45,
  );
}

export function classifyPerformance(score: number): PerformanceStatus {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "At Risk";
}

export function getRiskLevel(
  attendance: number,
  averageScore: number,
  trend: Trend = "Stable",
): RiskLevel {
  if (attendance < 60 || averageScore < 45) return "High";
  if (attendance < 75 || averageScore < 60) return "Moderate";
  if (trend === "Declining" && (attendance < 82 || averageScore < 70)) return "Moderate";
  return "Low";
}

export function detectWeakSubjects(subjects: SubjectScore[], threshold = 50): string[] {
  const sorted = [...subjects].sort((a, b) => a.score - b.score);
  const below = sorted.filter((s) => s.score < threshold);
  if (below.length > 1) return below.slice(0, 2).map((s) => s.subject);
  // No subject below threshold: surface the relatively weakest one.
  return sorted.slice(0, 1).map((s) => s.subject);
}

export function analyzeTrend(history: PerformancePoint[]): Trend {
  if (history.length < 3) return "Stable";
  const value = (p: PerformancePoint) => (p.assignments + p.exams) / 2;
  const recent = history.slice(-2).map(value);
  const previous = history.slice(-4, -2).map(value);
  const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
  const delta = avg(recent) - avg(previous);
  if (delta <= -3) return "Declining";
  if (delta >= 3) return "Improving";
  return "Stable";
}

export function generateRecommendations(student: Student): string[] {
  const trend = analyzeTrend(student.history);
  const weak = detectWeakSubjects(student.subjects);
  const recs: string[] = [];

  if (weak.length) {
    recs.push(`Focus additional study time on ${weak.join(" and ")}.`);
    recs.push(`Complete pending ${weak[0]} practice assignments.`);
  }
  if (student.attendance < 75) {
    recs.push("Improve class attendance — attendance below 75% correlates with lower scores.");
  } else {
    recs.push("Maintain attendance above 80% to stay on track.");
  }
  if (student.assignmentScore < 65) {
    recs.push("Complete additional practice assignments to strengthen internal marks.");
  }
  if (student.examScore < 65) {
    recs.push("Review examination topics and complete practice tests.");
  }
  if (trend === "Declining") {
    recs.push("Increase study frequency and consult the instructor for weak topics.");
  }
  recs.push("Review weak topics before the next examination.");
  if (
    trend !== "Declining" &&
    student.attendance >= 80 &&
    student.averageScore >= 75 &&
    !weak.length
  ) {
    recs.push("Maintain consistent study habits — current performance is strong.");
  }
  recs.push("Take a practice test before the upcoming examination.");
  return Array.from(new Set(recs)).slice(0, 6);
}

export function generateStudyPlan(
  student: Student,
): { day: string; focus: string; minutes: number; reason: string }[] {
  const ranked = [...student.subjects].sort((a, b) => a.score - b.score);
  const w1 = ranked[0]?.subject ?? "Revision";
  const w2 = ranked[1]?.subject ?? "Revision";
  const w3 = ranked[2]?.subject ?? "Revision";
  return [
    { day: "Monday", focus: w1, minutes: 60, reason: `Lowest score (${ranked[0]?.score}%)` },
    { day: "Tuesday", focus: w2, minutes: 45, reason: `Below class average (${ranked[1]?.score}%)` },
    { day: "Wednesday", focus: w3, minutes: 45, reason: `Needs reinforcement (${ranked[2]?.score}%)` },
    { day: "Thursday", focus: w1, minutes: 60, reason: "Second pass on weakest subject" },
    { day: "Friday", focus: "Practice Test", minutes: 45, reason: "Exam readiness check" },
    { day: "Saturday", focus: "Assignment Backlog", minutes: 60, reason: "Assignment score below target" },
    { day: "Sunday", focus: "Light Revision", minutes: 30, reason: "Retention and spaced repetition" },
  ];
}

export function analyzeStudent(student: Student): AIInsight {
  const score = calculatePerformance(student);
  const trend = analyzeTrend(student.history);
  const weakSubjects = detectWeakSubjects(student.subjects);
  const status = classifyPerformance(score);
  const risk = getRiskLevel(student.attendance, student.averageScore, trend);

  const analysis = [
    `Overall academic performance is ${status.toLowerCase()} with a weighted AI score of ${score}.`,
    weakSubjects.length
      ? `${weakSubjects.join(" and ")} ${weakSubjects.length > 1 ? "are" : "is"} currently the weakest ${weakSubjects.length > 1 ? "subjects" : "subject"}.`
      : "No subject is currently below the risk threshold.",
    trend === "Declining"
      ? "Recent assessment scores indicate a downward trend."
      : trend === "Improving"
        ? "Recent assessment scores show consistent improvement."
        : "Recent assessment scores are stable.",
    student.attendance < 75
      ? `Attendance at ${student.attendance}% is below the institutional minimum of 75%.`
      : `Attendance at ${student.attendance}% meets institutional requirements.`,
  ].join(" ");

  return {
    score,
    status,
    risk,
    trend,
    weakSubjects,
    analysis,
    recommendations: generateRecommendations(student),
  };
}

export function analyzeCohort(students: Student[]) {
  const insights = students.map((s) => ({ student: s, insight: analyzeStudent(s) }));
  const high = insights.filter((i) => i.insight.risk === "High");
  const moderate = insights.filter((i) => i.insight.risk === "Moderate");
  const declining = insights.filter((i) => i.insight.trend === "Declining");
  const attendanceRisk = students.filter((s) => s.attendance < 75);

  const subjectTotals = new Map<string, { total: number; count: number }>();
  for (const s of students) {
    for (const sub of s.subjects) {
      const cur = subjectTotals.get(sub.subject) ?? { total: 0, count: 0 };
      subjectTotals.set(sub.subject, { total: cur.total + sub.score, count: cur.count + 1 });
    }
  }
  const subjectAverages = [...subjectTotals.entries()]
    .map(([subject, v]) => ({ subject, average: Math.round(v.total / v.count) }))
    .sort((a, b) => a.average - b.average);

  return {
    insights,
    highRisk: high,
    moderateRisk: moderate,
    declining,
    attendanceRisk,
    subjectAverages,
    weakestSubject: subjectAverages[0]?.subject ?? "—",
    averageAttendance: Math.round(
      students.reduce((a, s) => a + s.attendance, 0) / Math.max(students.length, 1),
    ),
    averageScore: Math.round(
      students.reduce((a, s) => a + s.averageScore, 0) / Math.max(students.length, 1),
    ),
  };
}
