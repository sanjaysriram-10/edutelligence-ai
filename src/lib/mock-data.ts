import type {
  Assignment,
  ClassSession,
  Course,
  Examination,
  Grade,
  Student,
  Teacher,
} from "@/types";

/**
 * Local seed data. All reads go through the accessor functions at the bottom so a
 * Supabase/PostgreSQL layer can be swapped in later without touching the UI.
 */

const SUBJECTS = [
  "Machine Learning",
  "DBMS",
  "Data Structures",
  "Networks",
  "Mathematics",
] as const;

function history(base: number[], assign: number[], exam: number[]) {
  const months = ["January", "February", "March", "April", "May"];
  return months.map((month, i) => ({
    month,
    attendance: base[i] ?? 80,
    assignments: assign[i] ?? 70,
    exams: exam[i] ?? 70,
  }));
}

function subjects(scores: number[], attendance: number[]) {
  return SUBJECTS.map((subject, i) => ({
    subject,
    score: scores[i] ?? 60,
    attendance: attendance[i] ?? 80,
  }));
}

export const students: Student[] = [
  {
    id: "STU-001",
    name: "Sanjay Sriram",
    email: "sanjay.sriram@eduintelli.edu.in",
    rollNo: "21CS001",
    department: "Computer Science",
    year: 3,
    attendance: 82,
    assignmentScore: 79,
    examScore: 74,
    averageScore: 76,
    status: "Active",
    courses: ["CSE-501", "CSE-302", "CSE-201"],
    subjects: subjects([86, 78, 72, 64, 48], [91, 84, 86, 76, 68]),
    history: history([88, 85, 84, 82, 82], [84, 82, 80, 77, 74], [80, 78, 76, 73, 70]),
  },
  {
    id: "STU-002",
    name: "Arun Kumar",
    email: "arun.kumar@eduintelli.edu.in",
    rollNo: "21CS014",
    department: "Computer Science",
    year: 3,
    attendance: 61,
    assignmentScore: 46,
    examScore: 41,
    averageScore: 43,
    status: "Active",
    courses: ["CSE-501", "CSE-302"],
    subjects: subjects([52, 44, 41, 38, 34], [66, 58, 60, 55, 48]),
    history: history([72, 68, 66, 63, 61], [58, 54, 50, 47, 44], [55, 52, 48, 44, 40]),
  },
  {
    id: "STU-003",
    name: "Priya Raj",
    email: "priya.raj@eduintelli.edu.in",
    rollNo: "21CS022",
    department: "Computer Science",
    year: 3,
    attendance: 68,
    assignmentScore: 56,
    examScore: 50,
    averageScore: 52,
    status: "Active",
    courses: ["CSE-302", "CSE-401"],
    subjects: subjects([62, 55, 52, 48, 44], [74, 70, 68, 62, 58]),
    history: history([76, 74, 71, 69, 68], [62, 60, 58, 57, 55], [58, 56, 54, 52, 50]),
  },
  {
    id: "STU-004",
    name: "Rahul Subramanian",
    email: "rahul.s@eduintelli.edu.in",
    rollNo: "21IT009",
    department: "Information Technology",
    year: 2,
    attendance: 64,
    assignmentScore: 50,
    examScore: 44,
    averageScore: 47,
    status: "Active",
    courses: ["CSE-201", "CSE-601"],
    subjects: subjects([56, 49, 46, 43, 39], [70, 64, 62, 58, 52]),
    history: history([74, 71, 68, 66, 64], [58, 56, 53, 51, 48], [54, 52, 49, 46, 43]),
  },
  {
    id: "STU-005",
    name: "Divya Meenakshi",
    email: "divya.m@eduintelli.edu.in",
    rollNo: "21AI005",
    department: "Artificial Intelligence",
    year: 3,
    attendance: 72,
    assignmentScore: 62,
    examScore: 55,
    averageScore: 58,
    status: "Active",
    courses: ["CSE-501", "CSE-401"],
    subjects: subjects([68, 61, 58, 54, 47], [80, 74, 72, 68, 62]),
    history: history([78, 76, 75, 73, 72], [66, 65, 64, 63, 62], [62, 60, 58, 56, 55]),
  },
  {
    id: "STU-006",
    name: "Karthik Venkatesan",
    email: "karthik.v@eduintelli.edu.in",
    rollNo: "21CS033",
    department: "Computer Science",
    year: 4,
    attendance: 94,
    assignmentScore: 91,
    examScore: 88,
    averageScore: 90,
    status: "Active",
    courses: ["CSE-501", "CSE-302", "CSE-601"],
    subjects: subjects([94, 90, 88, 86, 82], [96, 94, 95, 92, 90]),
    history: history([90, 91, 92, 93, 94], [84, 86, 88, 90, 91], [82, 84, 85, 87, 88]),
  },
  {
    id: "STU-007",
    name: "Aishwarya Nair",
    email: "aishwarya.nair@eduintelli.edu.in",
    rollNo: "21DS011",
    department: "Data Science",
    year: 3,
    attendance: 89,
    assignmentScore: 84,
    examScore: 80,
    averageScore: 82,
    status: "Active",
    courses: ["CSE-501", "CSE-401"],
    subjects: subjects([88, 84, 82, 79, 74], [92, 90, 88, 86, 84]),
    history: history([86, 87, 88, 88, 89], [78, 80, 81, 83, 84], [74, 76, 78, 79, 80]),
  },
  {
    id: "STU-008",
    name: "Mohammed Irfan",
    email: "mohammed.irfan@eduintelli.edu.in",
    rollNo: "21IT018",
    department: "Information Technology",
    year: 2,
    attendance: 77,
    assignmentScore: 70,
    examScore: 66,
    averageScore: 68,
    status: "Active",
    courses: ["CSE-201", "CSE-601"],
    subjects: subjects([74, 71, 68, 65, 58], [82, 79, 78, 74, 70]),
    history: history([80, 79, 78, 77, 77], [72, 71, 71, 70, 70], [68, 68, 67, 66, 66]),
  },
  {
    id: "STU-009",
    name: "Lakshmi Prasad",
    email: "lakshmi.prasad@eduintelli.edu.in",
    rollNo: "21AI027",
    department: "Artificial Intelligence",
    year: 4,
    attendance: 91,
    assignmentScore: 88,
    examScore: 84,
    averageScore: 86,
    status: "Active",
    courses: ["CSE-501", "CSE-302"],
    subjects: subjects([92, 87, 85, 82, 78], [94, 91, 90, 88, 86]),
    history: history([88, 89, 90, 90, 91], [82, 84, 85, 87, 88], [78, 80, 81, 83, 84]),
  },
  {
    id: "STU-010",
    name: "Nithya Balaji",
    email: "nithya.balaji@eduintelli.edu.in",
    rollNo: "21DS004",
    department: "Data Science",
    year: 3,
    attendance: 58,
    assignmentScore: 48,
    examScore: 40,
    averageScore: 44,
    status: "Active",
    courses: ["CSE-401", "CSE-601"],
    subjects: subjects([50, 46, 43, 40, 32], [64, 60, 58, 54, 46]),
    history: history([70, 66, 63, 60, 58], [58, 55, 52, 50, 48], [52, 49, 46, 43, 40]),
  },
  {
    id: "STU-011",
    name: "Vikram Chandran",
    email: "vikram.c@eduintelli.edu.in",
    rollNo: "21CS041",
    department: "Computer Science",
    year: 4,
    attendance: 85,
    assignmentScore: 77,
    examScore: 72,
    averageScore: 75,
    status: "Active",
    courses: ["CSE-302", "CSE-601"],
    subjects: subjects([82, 78, 75, 70, 62], [88, 86, 84, 80, 76]),
    history: history([84, 84, 85, 85, 85], [74, 75, 76, 77, 77], [70, 70, 71, 72, 72]),
  },
  {
    id: "STU-012",
    name: "Sneha Iyer",
    email: "sneha.iyer@eduintelli.edu.in",
    rollNo: "21IT031",
    department: "Information Technology",
    year: 2,
    attendance: 74,
    assignmentScore: 64,
    examScore: 58,
    averageScore: 61,
    status: "Inactive",
    courses: ["CSE-201", "CSE-401"],
    subjects: subjects([70, 64, 60, 56, 49], [80, 76, 74, 70, 64]),
    history: history([80, 78, 76, 75, 74], [70, 68, 66, 65, 64], [64, 62, 60, 59, 58]),
  },
];

export const teachers: Teacher[] = [
  {
    id: "TCH-001",
    name: "Dr. Ramesh Iyer",
    email: "ramesh.iyer@eduintelli.edu.in",
    department: "Artificial Intelligence",
    designation: "Professor",
    experience: 16,
    courses: ["CSE-501"],
    rating: 4.8,
  },
  {
    id: "TCH-002",
    name: "Dr. Kavitha Narayanan",
    email: "kavitha.n@eduintelli.edu.in",
    department: "Computer Science",
    designation: "Associate Professor",
    experience: 12,
    courses: ["CSE-302"],
    rating: 4.6,
  },
  {
    id: "TCH-003",
    name: "Prof. Suresh Babu",
    email: "suresh.babu@eduintelli.edu.in",
    department: "Computer Science",
    designation: "Assistant Professor",
    experience: 9,
    courses: ["CSE-201"],
    rating: 4.7,
  },
  {
    id: "TCH-004",
    name: "Dr. Anitha Krishnan",
    email: "anitha.k@eduintelli.edu.in",
    department: "Networking",
    designation: "Associate Professor",
    experience: 14,
    courses: ["CSE-401"],
    rating: 4.4,
  },
  {
    id: "TCH-005",
    name: "Prof. Vignesh Raman",
    email: "vignesh.raman@eduintelli.edu.in",
    department: "Web Development",
    designation: "Assistant Professor",
    experience: 7,
    courses: ["CSE-601"],
    rating: 4.9,
  },
  {
    id: "TCH-006",
    name: "Dr. Meera Sundaram",
    email: "meera.s@eduintelli.edu.in",
    department: "Mathematics",
    designation: "Professor",
    experience: 18,
    courses: ["MAT-101"],
    rating: 4.5,
  },
];

export const courses: Course[] = [
  {
    id: "CSE-501",
    title: "Machine Learning",
    code: "CSE-501",
    category: "Artificial Intelligence",
    difficulty: "Advanced",
    instructor: "Dr. Ramesh Iyer",
    description:
      "A rigorous introduction to supervised and unsupervised learning, model evaluation, regularization, ensemble methods and applied model deployment using real academic datasets.",
    duration: "14 weeks",
    rating: 4.8,
    students: 186,
    credits: 4,
    averageScore: 78,
    syllabus: [
      { week: 1, topic: "Learning problem formulation & data pipelines", hours: 6 },
      { week: 2, topic: "Linear & logistic regression", hours: 6 },
      { week: 3, topic: "Regularization and bias-variance trade-off", hours: 5 },
      { week: 4, topic: "Decision trees & ensemble methods", hours: 6 },
      { week: 5, topic: "Support vector machines & kernels", hours: 5 },
      { week: 6, topic: "Clustering and dimensionality reduction", hours: 6 },
      { week: 7, topic: "Neural network fundamentals", hours: 7 },
      { week: 8, topic: "Model evaluation & deployment", hours: 6 },
    ],
    schedule: [
      { day: "Monday", time: "09:00 – 10:30", room: "AI Lab 2" },
      { day: "Wednesday", time: "11:00 – 12:30", room: "Block C – 204" },
      { day: "Friday", time: "14:00 – 16:00", room: "AI Lab 2" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-12", maxMarks: 50 },
      { type: "Internal Assessment II", date: "2026-10-24", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-28", maxMarks: 100 },
    ],
  },
  {
    id: "CSE-302",
    title: "Database Management Systems",
    code: "CSE-302",
    category: "Computer Science",
    difficulty: "Intermediate",
    instructor: "Dr. Kavitha Narayanan",
    description:
      "Relational modelling, normalization, SQL, transaction management, indexing and query optimization with hands-on PostgreSQL laboratory work.",
    duration: "12 weeks",
    rating: 4.6,
    students: 204,
    credits: 4,
    averageScore: 74,
    syllabus: [
      { week: 1, topic: "Data models & ER modelling", hours: 5 },
      { week: 2, topic: "Relational algebra", hours: 5 },
      { week: 3, topic: "SQL: DDL, DML, joins", hours: 6 },
      { week: 4, topic: "Normalization (1NF – BCNF)", hours: 6 },
      { week: 5, topic: "Indexing & query optimization", hours: 5 },
      { week: 6, topic: "Transactions, ACID & concurrency", hours: 6 },
    ],
    schedule: [
      { day: "Tuesday", time: "09:00 – 10:30", room: "Block A – 112" },
      { day: "Thursday", time: "10:45 – 12:15", room: "DB Lab 1" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-08", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-21", maxMarks: 100 },
    ],
  },
  {
    id: "CSE-201",
    title: "Data Structures & Algorithms",
    code: "CSE-201",
    category: "Computer Science",
    difficulty: "Intermediate",
    instructor: "Prof. Suresh Babu",
    description:
      "Core data structures, algorithm design paradigms and complexity analysis with weekly competitive-programming style problem sets.",
    duration: "16 weeks",
    rating: 4.7,
    students: 248,
    credits: 4,
    averageScore: 71,
    syllabus: [
      { week: 1, topic: "Complexity analysis & recursion", hours: 6 },
      { week: 2, topic: "Arrays, stacks, queues", hours: 5 },
      { week: 3, topic: "Linked lists & hashing", hours: 6 },
      { week: 4, topic: "Trees, heaps, balanced BSTs", hours: 7 },
      { week: 5, topic: "Graph traversal & shortest paths", hours: 7 },
      { week: 6, topic: "Greedy & dynamic programming", hours: 8 },
    ],
    schedule: [
      { day: "Monday", time: "11:00 – 12:30", room: "Block B – 008" },
      { day: "Wednesday", time: "09:00 – 10:30", room: "Block B – 008" },
      { day: "Saturday", time: "10:00 – 12:00", room: "Coding Lab" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-05", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-18", maxMarks: 100 },
    ],
  },
  {
    id: "CSE-401",
    title: "Computer Networks",
    code: "CSE-401",
    category: "Networking",
    difficulty: "Intermediate",
    instructor: "Dr. Anitha Krishnan",
    description:
      "Layered network architecture, TCP/IP internals, routing algorithms, congestion control and network security fundamentals with packet-level labs.",
    duration: "12 weeks",
    rating: 4.4,
    students: 162,
    credits: 3,
    averageScore: 66,
    syllabus: [
      { week: 1, topic: "Network models & physical layer", hours: 5 },
      { week: 2, topic: "Data link layer & error control", hours: 5 },
      { week: 3, topic: "IP addressing & subnetting", hours: 6 },
      { week: 4, topic: "Routing algorithms", hours: 6 },
      { week: 5, topic: "TCP, UDP & congestion control", hours: 6 },
      { week: 6, topic: "Application protocols & security", hours: 5 },
    ],
    schedule: [
      { day: "Tuesday", time: "14:00 – 15:30", room: "Network Lab" },
      { day: "Friday", time: "09:00 – 10:30", room: "Block C – 110" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-15", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-25", maxMarks: 100 },
    ],
  },
  {
    id: "CSE-601",
    title: "Full Stack Web Development",
    code: "CSE-601",
    category: "Web Development",
    difficulty: "Beginner",
    instructor: "Prof. Vignesh Raman",
    description:
      "Modern web engineering with TypeScript, React, REST APIs, relational data access, authentication and deployment — delivered as a project-based course.",
    duration: "10 weeks",
    rating: 4.9,
    students: 221,
    credits: 3,
    averageScore: 81,
    syllabus: [
      { week: 1, topic: "HTML, CSS & responsive layout", hours: 5 },
      { week: 2, topic: "TypeScript fundamentals", hours: 5 },
      { week: 3, topic: "React components & state", hours: 6 },
      { week: 4, topic: "Routing & data fetching", hours: 6 },
      { week: 5, topic: "APIs, auth & databases", hours: 6 },
      { week: 6, topic: "Testing & deployment", hours: 5 },
    ],
    schedule: [
      { day: "Monday", time: "14:00 – 16:00", room: "Web Lab" },
      { day: "Thursday", time: "14:00 – 16:00", room: "Web Lab" },
    ],
    examInfo: [
      { type: "Project Review I", date: "2026-09-19", maxMarks: 50 },
      { type: "Final Project Evaluation", date: "2026-11-14", maxMarks: 100 },
    ],
  },
  {
    id: "CSE-702",
    title: "Operating Systems",
    code: "CSE-702",
    category: "Computer Science",
    difficulty: "Advanced",
    instructor: "Prof. Suresh Babu",
    description:
      "Process management, CPU scheduling, memory management, virtualization, file systems and concurrency with xv6-based laboratory exercises.",
    duration: "14 weeks",
    rating: 4.5,
    students: 158,
    credits: 4,
    averageScore: 69,
    syllabus: [
      { week: 1, topic: "OS structure & system calls", hours: 5 },
      { week: 2, topic: "Processes & threads", hours: 6 },
      { week: 3, topic: "CPU scheduling algorithms", hours: 6 },
      { week: 4, topic: "Synchronization & deadlocks", hours: 7 },
      { week: 5, topic: "Memory management & paging", hours: 6 },
      { week: 6, topic: "File systems & I/O", hours: 5 },
    ],
    schedule: [
      { day: "Wednesday", time: "14:00 – 15:30", room: "Block A – 205" },
      { day: "Friday", time: "11:00 – 12:30", room: "Systems Lab" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-10", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-30", maxMarks: 100 },
    ],
  },
  {
    id: "DSC-310",
    title: "Applied Data Science",
    code: "DSC-310",
    category: "Data Science",
    difficulty: "Intermediate",
    instructor: "Dr. Ramesh Iyer",
    description:
      "End-to-end analytics workflow: data wrangling, statistical inference, visualization and dashboard storytelling with academic datasets.",
    duration: "10 weeks",
    rating: 4.6,
    students: 134,
    credits: 3,
    averageScore: 76,
    syllabus: [
      { week: 1, topic: "Data wrangling & cleaning", hours: 5 },
      { week: 2, topic: "Exploratory data analysis", hours: 5 },
      { week: 3, topic: "Statistical inference", hours: 6 },
      { week: 4, topic: "Visualization & dashboards", hours: 5 },
      { week: 5, topic: "Predictive modelling basics", hours: 6 },
    ],
    schedule: [
      { day: "Tuesday", time: "11:00 – 12:30", room: "Data Lab" },
      { day: "Thursday", time: "09:00 – 10:30", room: "Block C – 301" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-17", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-26", maxMarks: 100 },
    ],
  },
  {
    id: "MAT-101",
    title: "Discrete Mathematics",
    code: "MAT-101",
    category: "Computer Science",
    difficulty: "Intermediate",
    instructor: "Dr. Meera Sundaram",
    description:
      "Logic, proof techniques, combinatorics, graph theory and algebraic structures forming the mathematical foundation for computing.",
    duration: "12 weeks",
    rating: 4.2,
    students: 276,
    credits: 4,
    averageScore: 58,
    syllabus: [
      { week: 1, topic: "Propositional & predicate logic", hours: 6 },
      { week: 2, topic: "Proof techniques & induction", hours: 6 },
      { week: 3, topic: "Set theory & relations", hours: 5 },
      { week: 4, topic: "Combinatorics & recurrences", hours: 6 },
      { week: 5, topic: "Graph theory", hours: 6 },
      { week: 6, topic: "Groups, rings & lattices", hours: 5 },
    ],
    schedule: [
      { day: "Monday", time: "08:00 – 09:30", room: "Block A – 101" },
      { day: "Wednesday", time: "08:00 – 09:30", room: "Block A – 101" },
    ],
    examInfo: [
      { type: "Internal Assessment I", date: "2026-09-06", maxMarks: 50 },
      { type: "End Semester Examination", date: "2026-11-19", maxMarks: 100 },
    ],
  },
];

export const classSessions: ClassSession[] = [
  { id: "CLS-01", courseId: "CSE-501", course: "Machine Learning", section: "CSE-A", room: "AI Lab 2", day: "Monday", time: "09:00 – 10:30", strength: 48 },
  { id: "CLS-02", courseId: "CSE-501", course: "Machine Learning", section: "CSE-B", room: "Block C – 204", day: "Wednesday", time: "11:00 – 12:30", strength: 46 },
  { id: "CLS-03", courseId: "CSE-302", course: "Database Management Systems", section: "CSE-A", room: "DB Lab 1", day: "Thursday", time: "10:45 – 12:15", strength: 52 },
  { id: "CLS-04", courseId: "CSE-201", course: "Data Structures & Algorithms", section: "IT-A", room: "Block B – 008", day: "Monday", time: "11:00 – 12:30", strength: 58 },
  { id: "CLS-05", courseId: "CSE-401", course: "Computer Networks", section: "CSE-C", room: "Network Lab", day: "Tuesday", time: "14:00 – 15:30", strength: 44 },
  { id: "CLS-06", courseId: "CSE-601", course: "Full Stack Web Development", section: "IT-B", room: "Web Lab", day: "Thursday", time: "14:00 – 16:00", strength: 50 },
];

export const studentAssignments: Assignment[] = [
  { id: "ASG-01", title: "Linear Regression Case Study", course: "Machine Learning", description: "Train and evaluate a regression model on the campus placement dataset.", dueDate: "2026-08-22", maxMarks: 20, status: "Evaluated", score: 18, submissions: 44, total: 48 },
  { id: "ASG-02", title: "Normalization Worksheet (BCNF)", course: "DBMS", description: "Normalize the given university schema up to BCNF with justification.", dueDate: "2026-08-24", maxMarks: 20, status: "Evaluated", score: 15, submissions: 47, total: 52 },
  { id: "ASG-03", title: "Graph Algorithms Problem Set", course: "Data Structures", description: "Implement Dijkstra and Kruskal with complexity analysis.", dueDate: "2026-08-27", maxMarks: 25, status: "Submitted", score: null, submissions: 39, total: 58 },
  { id: "ASG-04", title: "Subnetting Lab Report", course: "Networks", description: "Design an addressing plan for a four-department campus network.", dueDate: "2026-08-29", maxMarks: 15, status: "Pending", score: null, submissions: 21, total: 44 },
  { id: "ASG-05", title: "Probability Practice Set 3", course: "Mathematics", description: "Solve the assigned probability and combinatorics problems.", dueDate: "2026-08-30", maxMarks: 20, status: "Pending", score: null, submissions: 18, total: 56 },
  { id: "ASG-06", title: "Clustering Mini Project", course: "Machine Learning", description: "Cluster student performance records and interpret the segments.", dueDate: "2026-09-03", maxMarks: 30, status: "Pending", score: null, submissions: 12, total: 48 },
  { id: "ASG-07", title: "SQL Query Optimization Task", course: "DBMS", description: "Optimize five slow queries and document the execution plans.", dueDate: "2026-09-05", maxMarks: 20, status: "Evaluated", score: 16, submissions: 50, total: 52 },
  { id: "ASG-08", title: "TCP Congestion Control Report", course: "Networks", description: "Compare Reno, Cubic and BBR using captured traces.", dueDate: "2026-09-08", maxMarks: 20, status: "Submitted", score: null, submissions: 30, total: 44 },
  { id: "ASG-09", title: "Dynamic Programming Set", course: "Data Structures", description: "Solve eight DP problems with memoized and tabulated solutions.", dueDate: "2026-09-11", maxMarks: 25, status: "Evaluated", score: 19, submissions: 45, total: 58 },
  { id: "ASG-10", title: "Graph Theory Proof Assignment", course: "Mathematics", description: "Prove the given graph-theoretic statements using induction.", dueDate: "2026-09-14", maxMarks: 20, status: "Pending", score: null, submissions: 9, total: 56 },
];

export const examinations: Examination[] = [
  { id: "EXM-01", subject: "Machine Learning", date: "2026-09-12", duration: "3 hours", maxMarks: 100, status: "Upcoming", score: null },
  { id: "EXM-02", subject: "Mathematics", date: "2026-09-15", duration: "3 hours", maxMarks: 100, status: "Upcoming", score: null },
  { id: "EXM-03", subject: "Computer Networks", date: "2026-09-18", duration: "2 hours", maxMarks: 75, status: "Upcoming", score: null },
  { id: "EXM-04", subject: "DBMS", date: "2026-07-22", duration: "3 hours", maxMarks: 100, status: "Completed", score: 78 },
  { id: "EXM-05", subject: "Data Structures", date: "2026-07-18", duration: "3 hours", maxMarks: 100, status: "Completed", score: 72 },
  { id: "EXM-06", subject: "Machine Learning", date: "2026-07-14", duration: "3 hours", maxMarks: 100, status: "Completed", score: 84 },
  { id: "EXM-07", subject: "Mathematics", date: "2026-07-10", duration: "3 hours", maxMarks: 100, status: "Completed", score: 46 },
  { id: "EXM-08", subject: "Computer Networks", date: "2026-07-08", duration: "2 hours", maxMarks: 75, status: "Completed", score: 48 },
];

export const grades: Grade[] = [
  { subject: "Machine Learning", assignment: 18, internal: 44, exam: 84, grade: "A" },
  { subject: "DBMS", assignment: 16, internal: 39, exam: 78, grade: "B+" },
  { subject: "Data Structures", assignment: 19, internal: 36, exam: 72, grade: "B" },
  { subject: "Networks", assignment: 13, internal: 31, exam: 64, grade: "C+" },
  { subject: "Mathematics", assignment: 10, internal: 24, exam: 48, grade: "D" },
];

export const enrollmentTrend = [
  { month: "January", students: 1042, newAdmissions: 62 },
  { month: "February", students: 1088, newAdmissions: 46 },
  { month: "March", students: 1134, newAdmissions: 46 },
  { month: "April", students: 1186, newAdmissions: 52 },
  { month: "May", students: 1224, newAdmissions: 38 },
  { month: "June", students: 1248, newAdmissions: 24 },
];

export const gradeDistribution = [
  { grade: "A+", students: 96 },
  { grade: "A", students: 214 },
  { grade: "B+", students: 288 },
  { grade: "B", students: 262 },
  { grade: "C", students: 208 },
  { grade: "D", students: 124 },
  { grade: "F", students: 56 },
];

export const attendanceTrend = [
  { month: "January", attendance: 88 },
  { month: "February", attendance: 86 },
  { month: "March", attendance: 85 },
  { month: "April", attendance: 83 },
  { month: "May", attendance: 82 },
  { month: "June", attendance: 84 },
];

/* ---------------------------------------------------------------------------
 * Accessors — the single read surface for the UI. Swap the bodies for Supabase
 * queries later; component code stays unchanged.
 * ------------------------------------------------------------------------- */

export const DEMO_STUDENT_ID = "STU-001";

export function getStudents(): Student[] {
  return students;
}

export function getStudent(id: string = DEMO_STUDENT_ID): Student {
  return students.find((s) => s.id === id) ?? (students[0] as Student);
}

export function getDemoStudent(): Student {
  return getStudent(DEMO_STUDENT_ID);
}

export function getTeachers(): Teacher[] {
  return teachers;
}

export function getCourses(): Course[] {
  return courses;
}

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getFeaturedCourses(): Course[] {
  return courses.slice(0, 6);
}

export const courseCategories = [
  "Computer Science",
  "Artificial Intelligence",
  "Data Science",
  "Networking",
  "Web Development",
];
