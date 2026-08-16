export type Role = "student" | "teacher" | "admin";

export type RiskLevel = "Low" | "Moderate" | "High";
export type PerformanceStatus = "Excellent" | "Good" | "Needs Improvement" | "At Risk";
export type Trend = "Improving" | "Stable" | "Declining";

export interface SubjectScore {
  subject: string;
  score: number;
  attendance: number;
}

export interface PerformancePoint {
  month: string;
  attendance: number;
  assignments: number;
  exams: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  department: string;
  year: number;
  attendance: number;
  assignmentScore: number;
  examScore: number;
  averageScore: number;
  status: "Active" | "Inactive";
  courses: string[];
  subjects: SubjectScore[];
  history: PerformancePoint[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  experience: number;
  courses: string[];
  rating: number;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  description: string;
  duration: string;
  rating: number;
  students: number;
  credits: number;
  averageScore: number;
  syllabus: { week: number; topic: string; hours: number }[];
  schedule: { day: string; time: string; room: string }[];
  examInfo: { type: string; date: string; maxMarks: number }[];
}

export interface ClassSession {
  id: string;
  courseId: string;
  course: string;
  section: string;
  room: string;
  day: string;
  time: string;
  strength: number;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  status: "Pending" | "Submitted" | "Evaluated";
  score: number | null;
  submissions: number;
  total: number;
}

export interface Examination {
  id: string;
  subject: string;
  date: string;
  duration: string;
  maxMarks: number;
  status: "Upcoming" | "Completed";
  score: number | null;
}

export interface Grade {
  subject: string;
  assignment: number;
  internal: number;
  exam: number;
  grade: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  present: boolean;
}

export interface AIInsight {
  score: number;
  status: PerformanceStatus;
  risk: RiskLevel;
  trend: Trend;
  weakSubjects: string[];
  analysis: string;
  recommendations: string[];
}
