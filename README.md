# EduSpark AI

# Build a Complete Education Management Portal with Integrated AI

You are an expert full-stack engineer, UI/UX designer, and AI application developer.

Build a polished, responsive, hackathon-ready **Education Management Portal** based on the requirements below.

The project is a **Web Development × Integrated AI** solution.

The primary objective is to deliver a working, visually impressive MVP that can be demonstrated end-to-end. Prioritize functionality, polished UI, realistic data, and a convincing AI-powered academic intelligence system over unnecessary enterprise complexity.

---

# 1. IMPORTANT DEVELOPMENT RULES

Follow these rules strictly:

1. Work with the existing project instead of unnecessarily recreating it.

2. First inspect the existing project structure, package.json, configuration files, and installed dependencies.

3. If the project is already a Next.js project, preserve it.

4. If the project is not configured correctly, repair the configuration rather than creating unnecessary duplicate folders.

5. Do not delete existing useful files.

6. Do not introduce unnecessary dependencies.

7. Make the application run with:

   npm run dev

8. Do not leave placeholder pages such as "Coming Soon".

9. Every navigation item should lead to a functional page.

10. Buttons should perform meaningful actions or navigate to the appropriate page.

11. Use realistic academic data.

12. The application should work even without a production backend.

13. Use mock/seed data where necessary so the entire application can be demonstrated immediately.

14. Keep the architecture ready for future Supabase/PostgreSQL integration.

15. Do not spend time implementing complicated authentication unless it already exists.

16. Implement demo role-based login using Student, Teacher, and Administrator roles.

17. Do not train a large deep-learning model. Use a lightweight academic intelligence engine based on performance analytics, rules, scoring, and explainable recommendations.

18. Ensure there are no TypeScript errors.

19. Ensure there are no broken imports.

20. Ensure the application is responsive on desktop, tablet, and mobile.

---

# 2. TECHNOLOGY STACK

Use:

Frontend:

* Next.js

* TypeScript

* App Router

* Tailwind CSS

UI:

* shadcn/ui if already configured

* Base UI if selected by the installed shadcn version

* Lucide React icons

* Modern cards, badges, dialogs, tabs, tables, dropdowns

Charts:

* Recharts

AI:

* TypeScript/Python-compatible academic intelligence logic

* Explainable rule-based scoring

* Performance trend analysis

* Risk detection

* Personalized recommendation generation

Data:

* Local mock/seed data initially

Future database:

* Structure code so Supabase/PostgreSQL can be connected later

---

# 3. PROJECT CONCEPT

The Education Management Portal manages:

* Students

* Teachers

* Courses

* Classes

* Assignments

* Attendance

* Examinations

* Grades

* Academic records

* Performance analytics

* AI-powered academic recommendations

There are three main roles:

STUDENT

TEACHER

ADMINISTRATOR

The system should provide role-specific dashboards.

---

# 4. VISUAL DESIGN

Create a premium modern education SaaS interface.

Design direction:

* Professional

* Clean

* Modern

* Academic

* Minimal but visually rich

* Dashboard-oriented

* Strong information hierarchy

* Excellent spacing

* Rounded cards

* Subtle shadows

* Professional typography

* Consistent iconography

* Smooth hover transitions

* Good empty states

* Good loading states

Use a modern color system suitable for an education/AI platform.

Support:

* Light mode

* Dark mode

The application should not look like a basic CRUD college project.

It should look like a modern commercial education platform.

---

# 5. PUBLIC WEBSITE

Create the following public pages:

/

/courses

/courses/[id]

/contact

/login

---

# 6. LANDING PAGE

Create a highly polished landing page.

Hero section:

Title:

"Smart Education Management Portal"

Subtitle:

"Manage academics, understand performance, and improve student outcomes with AI-powered academic intelligence."

Primary CTA:

"Explore Courses"

Secondary CTA:

"Get Started"

Hero should visually communicate:

Students → Academic Data → AI Intelligence → Better Outcomes

Add a subtle dashboard/analytics visual on the right side.

---

## Landing Page Sections

### Section 1 — Statistics

Display:

1,248+ Students

64+ Teachers

38+ Courses

95% Engagement

### Section 2 — Core Features

Create feature cards:

1. Academic Management

   Manage courses, classes, assignments, examinations, and academic records.

2. Smart Attendance

   Track attendance and identify attendance-related academic risks.

3. Performance Analytics

   Analyze assignments, examinations, grades, and progress.

4. AI Recommendations

   Generate personalized recommendations for improving academic performance.

### Section 3 — AI Academic Intelligence

Create an impressive visual section.

Show:

Analyze

↓

Detect

↓

Recommend

↓

Improve

Explain that the AI system analyzes:

* Attendance

* Assignment performance

* Examination marks

* Subject-wise performance

* Historical trends

and generates:

* Weak subject detection

* Academic risk levels

* Performance trends

* Personalized recommendations

### Section 4 — Featured Courses

Show realistic course cards.

Example courses:

Machine Learning

Database Management Systems

Data Structures & Algorithms

Computer Networks

Web Development

Operating Systems

Each course card should include:

* Course title

* Category

* Instructor

* Duration

* Rating

* Students enrolled

* View Course button

### Section 5 — How It Works

Three or four steps:

1. Manage Academic Data

2. Analyze Performance

3. Identify Academic Risks

4. Improve Student Outcomes

### Section 6 — Call To Action

"Turn Academic Data Into Actionable Insights."

Button:

"Start Learning"

### Footer

Include:

* About

* Courses

* Contact

* Student Portal

* Teacher Portal

* Administrator Portal

* Privacy

* Terms

---

# 7. COURSE PAGE

Create /courses.

Features:

* Search

* Category filter

* Difficulty filter

* Course cards

* Sort option

Search should actually filter the course list.

Course categories:

* Computer Science

* Artificial Intelligence

* Data Science

* Networking

* Web Development

---

# 8. COURSE DETAILS PAGE

Create:

/courses/[id]

Display:

* Course title

* Instructor

* Description

* Duration

* Rating

* Students

* Course category

* Syllabus

* Weekly schedule

* Assignments

* Examination information

* Enrollment button

Enrollment button should show a success confirmation.

---

# 9. LOGIN PAGE

Create /login.

Modern login UI.

Fields:

Email

Password

Role selector:

Student

Teacher

Administrator

Buttons:

Login

Also provide:

"Continue as Demo Student"

"Continue as Demo Teacher"

"Continue as Demo Administrator"

For the hackathon prototype, authentication can be simulated.

After selecting:

Student → /student

Teacher → /teacher

Administrator → /admin

Store selected role in localStorage or a simple client-side state if necessary.

Do not build complicated authentication unless required by the existing project.

---

# 10. STUDENT PORTAL

Create a professional dashboard:

/student

Use a sidebar.

Sidebar:

Dashboard

My Courses

Assignments

Attendance

Examinations

Grades

AI Insights

Profile

Logout

---

# 11. STUDENT DASHBOARD

Top greeting:

"Welcome back, Sanjay"

Subtitle:

"Here's your academic overview."

Create statistic cards:

Attendance

82%

Average Score

76%

Assignments

8 / 10

Overall Grade

A-

---

## Student Performance Chart

Use Recharts.

Show monthly performance:

January

February

March

April

May

Metrics:

Attendance

Assignments

Exams

Use a line chart.

---

# 12. SUBJECT PERFORMANCE

Create a bar chart:

Machine Learning — 86

DBMS — 78

Data Structures — 72

Networks — 64

Mathematics — 48

Automatically identify Mathematics as the weakest subject.

---

# 13. AI ACADEMIC INTELLIGENCE CARD

This should be one of the most visually prominent components.

Title:

"AI Academic Intelligence"

Display:

Performance Status:

"Needs Improvement"

Risk Level:

"Moderate"

Weak Subject:

"Mathematics"

Attendance:

82%

Average Score:

76%

Then provide:

### AI Analysis

Example:

"Your overall academic performance is stable, but Mathematics is currently your weakest subject. Recent assessment scores indicate a downward trend."

### Personalized Recommendations

* Focus additional study time on Mathematics.

* Complete pending Mathematics practice assignments.

* Review weak topics before the next examination.

* Maintain attendance above 80%.

* Take a practice test before the upcoming examination.

The recommendations must be generated dynamically from the student's data.

---

# 14. STUDENT COURSES

Create:

/student/courses

Show enrolled courses.

Each card:

* Course

* Instructor

* Progress

* Next class

* Assignments

* Grade

* Continue button

Progress bars should work.

---

# 15. STUDENT ASSIGNMENTS

Create:

/student/assignments

Display assignment table/cards:

Assignment

Course

Due Date

Status

Score

Action

Statuses:

Pending

Submitted

Evaluated

Allow the student to click "Submit Assignment".

For the demo, clicking submit can change status to Submitted and display a success notification.

---

# 16. STUDENT ATTENDANCE

Create:

/student/attendance

Show:

Overall attendance

82%

Subject-wise attendance:

Machine Learning — 91%

DBMS — 84%

Data Structures — 86%

Networks — 76%

Mathematics — 68%

Highlight attendance below 75%.

Add attendance trend chart.

---

# 17. STUDENT EXAMINATIONS

Create:

/student/examinations

Show:

Upcoming examinations

Previous examinations

Columns:

Subject

Date

Duration

Status

Score

---

# 18. STUDENT GRADES

Create:

/student/grades

Show:

Subject

Assignment

Internal

Exam

Final Grade

Also show:

GPA

Average

Highest subject

Weakest subject

---

# 19. STUDENT AI INSIGHTS

Create:

/student/ai-insights

Make this an impressive AI page.

Sections:

Overall AI Performance Score

Academic Risk

Weak Subjects

Performance Trends

Attendance Analysis

Personalized Recommendations

Study Plan

Create an AI-generated weekly study plan.

Example:

Monday:

Mathematics — 60 minutes

Tuesday:

Networks — 45 minutes

Wednesday:

DBMS — 45 minutes

Thursday:

Mathematics — 60 minutes

Friday:

Practice Test — 45 minutes

---

# 20. TEACHER PORTAL

Create:

/teacher

Sidebar:

Dashboard

My Courses

Classes

Attendance

Assignments

Examinations

Students

Performance

AI Insights

Profile

Logout

---

# 21. TEACHER DASHBOARD

Display:

Total Students

142

Average Attendance

84%

Pending Assignments

23

At-Risk Students

8

---

## Teacher Performance Analytics

Charts:

* Average class performance

* Attendance trend

* Grade distribution

* Course performance

---

# 22. TEACHER STUDENT MONITORING

Create:

/teacher/students

Table:

Student

Course

Attendance

Average

Risk

Action

Example:

Arun Kumar

61%

43%

High

Priya Raj

68%

52%

Medium

Rahul S

64%

47%

High

Divya M

72%

58%

Medium

Provide filtering by:

* Course

* Risk

* Attendance

* Performance

---

# 23. TEACHER ATTENDANCE

Create:

/teacher/attendance

Allow teacher to select:

Course

Class

Date

Then show students with:

Present

Absent

Include:

Mark All Present

Save Attendance

For the prototype, save to local state/mock data.

---

# 24. TEACHER ASSIGNMENTS

Create:

/teacher/assignments

Allow:

Create Assignment

Fields:

Title

Course

Description

Due Date

Maximum Marks

Display assignment list.

Include:

Edit

Delete

View Submissions

---

# 25. TEACHER EXAMINATIONS

Create:

/teacher/examinations

Features:

Create examination

View examinations

Enter marks

View results

Fields:

Subject

Date

Duration

Maximum Marks

---

# 26. TEACHER AI INSIGHTS

Create:

/teacher/ai-insights

Show:

"AI-Powered Class Intelligence"

Example insight:

"8 students currently show elevated academic risk."

"Mathematics has the lowest average performance."

"Students with attendance below 70% show significantly lower assessment scores."

Show:

High Risk Students

Medium Risk Students

Weak Subjects

Attendance Concerns

Performance Declines

Add recommendation:

"Consider organizing an additional Mathematics support session."

---

# 27. ADMIN PORTAL

Create:

/admin

Sidebar:

Dashboard

Students

Teachers

Courses

Classes

Assignments

Examinations

Academic Records

Reports

AI Insights

Settings

Logout

---

# 28. ADMIN DASHBOARD

Statistics:

Students

1,248

Teachers

64

Courses

38

Classes

72

---

## Admin Analytics

Create charts:

* Student enrollment

* Attendance trend

* Grade distribution

* Course performance

* Academic risk distribution

---

# 29. ADMIN STUDENT MANAGEMENT

Create:

/admin/students

Features:

Search

Filter

Add Student

Edit Student

View Student

Delete Student

Table:

Name

Email

Department

Year

Attendance

Performance

Status

Use dialogs for Add/Edit.

---

# 30. ADMIN TEACHER MANAGEMENT

Create:

/admin/teachers

Features:

Search

Add Teacher

Edit

Delete

View Courses

---

# 31. ADMIN COURSE MANAGEMENT

Create:

/admin/courses

Features:

Add Course

Edit Course

Delete Course

Assign Teacher

View Students

---

# 32. ADMIN REPORTS

Create:

/admin/reports

Generate report sections:

Overall Academic Performance

Attendance Analysis

Weak Subject Analysis

Risk Analysis

Course Comparison

Student Progress

Provide buttons:

Export Report

Download PDF

If PDF implementation would take too long, provide a print-friendly report page and use browser print functionality.

---

# 33. ADMIN AI INSIGHTS

Create:

/admin/ai-insights

This should be the main administrative intelligence dashboard.

Display:

Academic Risk:

24 students

Attendance Risk:

31 students

Performance Decline:

17 students

Weakest Course:

Mathematics

---

## AI Recommendations

Example:

"Students with attendance below 70% should receive targeted intervention."

"Mathematics requires additional academic support based on course-level performance."

"17 students show declining performance over recent assessments."

---

# 34. AI ENGINE

Create a reusable AI intelligence module.

Example file:

lib/ai.ts

Implement:

calculatePerformance()

getRiskLevel()

detectWeakSubjects()

analyzeTrend()

generateRecommendations()

generateStudyPlan()

---

# 35. PERFORMANCE SCORE

Calculate:

Performance Score =

Attendance × 0.25

+

Assignment Score × 0.30

+

Examination Score × 0.45

Round to integer.

Classify:

80–100:

Excellent

65–79:

Good

50–64:

Needs Improvement

0–49:

At Risk

---

# 36. RISK DETECTION

Use explainable logic.

High Risk:

attendance < 60 OR averageScore < 45

Medium Risk:

attendance < 75 OR averageScore < 60

Low Risk:

otherwise

Also consider declining performance trends.

---

# 37. WEAK SUBJECT DETECTION

For each student:

If subject score < 50:

mark as weak subject.

If multiple subjects are below 50:

return the two weakest subjects.

---

# 38. TREND ANALYSIS

Compare recent performance against previous performance.

If performance decreases consistently:

return:

"Declining"

If stable:

return:

"Stable"

If increasing:

return:

"Improving"

Display this visually.

---

# 39. RECOMMENDATION ENGINE

Recommendations should depend on detected conditions.

Low attendance:

"Improve class attendance."

Low assignment performance:

"Complete additional practice assignments."

Low examination score:

"Review examination topics and complete practice tests."

Weak subject:

"Focus additional study time on the identified weak subject."

Declining trend:

"Increase study frequency and consult the instructor."

Good performance:

"Maintain consistent study habits."

---

# 40. DATA MODEL

Create realistic TypeScript interfaces/types for:

Student

Teacher

Course

Class

Assignment

Submission

Attendance

Examination

Grade

PerformanceRecord

AIInsight

Keep them organized in:

types/

or an appropriate existing location.

---

# 41. MOCK DATA

Create realistic mock data for:

At least 10 students

At least 5 teachers

At least 6 courses

Assignments

Attendance records

Exam results

Grades

Performance history

Do not use meaningless lorem ipsum.

Use realistic Indian college-style names and academic information.

---

# 42. NAVIGATION

Ensure all navigation works.

Public:

Home

Courses

Contact

Login

Student:

Dashboard

Courses

Assignments

Attendance

Examinations

Grades

AI Insights

Profile

Teacher:

Dashboard

Courses

Classes

Attendance

Assignments

Examinations

Students

Performance

AI Insights

Admin:

Dashboard

Students

Teachers

Courses

Classes

Assignments

Examinations

Academic Records

Reports

AI Insights

Settings

---

# 43. RESPONSIVE DESIGN

Desktop:

Sidebar + content.

Tablet:

Collapsible sidebar.

Mobile:

Bottom navigation or hamburger menu.

Ensure:

* No horizontal scrolling

* Cards stack correctly

* Tables become responsive

* Charts resize correctly

* Buttons remain accessible

---

# 44. UX DETAILS

Add:

* Toast notifications

* Loading states

* Empty states

* Confirmation dialogs

* Hover effects

* Active navigation states

* Status badges

* Progress bars

* Tooltips where useful

Examples:

Success:

"Assignment submitted successfully."

Success:

"Attendance saved successfully."

Success:

"Student added successfully."

---

# 45. ERROR HANDLING

Make sure:

* No broken links

* No undefined data errors

* No hydration errors

* No TypeScript errors

* No console errors

* No missing imports

* No invalid React keys

Run:

npm run build

and fix all errors.

---

# 46. PERFORMANCE

Do not unnecessarily fetch data.

Use local mock data.

Avoid excessive client components.

Use server components where appropriate.

Only use "use client" where interactivity requires it.

---

# 47. COMPONENT ARCHITECTURE

Create reusable components such as:

Navbar

Footer

Sidebar

StatCard

CourseCard

PerformanceChart

AttendanceChart

RiskBadge

AIInsightCard

RecommendationCard

ProgressCard

DataTable

EmptyState

LoadingState

PageHeader

SearchBar

FilterDropdown

Avoid duplicating UI code.

---

# 48. AI UI DESIGN

The AI system must be clearly visible.

Use a consistent AI visual language.

Examples:

AI Academic Intelligence

AI Risk Detection

AI Recommendation

AI Performance Analysis

AI Study Plan

Do not make fake claims about using ChatGPT or external LLMs.

Describe it as:

"AI-powered academic intelligence"

implemented using academic performance analytics and explainable recommendation logic.

---

# 49. OPTIONAL SUPABASE PREPARATION

Do not make Supabase mandatory for the demo.

However, structure the code so Supabase can be integrated later.

If Supabase environment variables already exist, use them.

Otherwise, gracefully fall back to mock data.

Never make the application crash because Supabase credentials are missing.

---

# 50. DEMO MODE

Create a demo-friendly experience.

Login page should provide:

Demo Student

Demo Teacher

Demo Administrator

Clicking a demo role should immediately enter the corresponding dashboard.

This is extremely important for the hackathon presentation.

---

# 51. DEMO STUDENT

Use:

Name:

Sanjay Sriram

Attendance:

82%

Average:

76%

Grade:

A-

Weak Subject:

Mathematics

Risk:

Moderate

---

# 52. DEMO STORY

The complete demonstration should work like this:

1. Open landing page.

2. Show Education Management Portal.

3. Navigate to Courses.

4. Open a course.

5. Return to Login.

6. Choose Student.

7. Open Student Dashboard.

8. Show academic statistics.

9. Show performance chart.

10. Show Mathematics as weak subject.

11. Open AI Insights.

12. Show personalized recommendations.

13. Logout.

14. Login as Teacher.

15. Show at-risk students.

16. Show teacher AI insights.

17. Logout.

18. Login as Administrator.

19. Show institutional analytics.

20. Show AI-generated academic insights.

21. Show reports.

This complete flow should work without requiring a backend server.

---

# 53. FINAL QUALITY CHECK

Before considering the project complete, run:

npm run lint

npm run build

npm run dev

Fix all errors.

Check every route manually.

Check desktop and mobile layouts.

Check:

Home

Courses

Course Details

Login

Student Dashboard

Student Courses

Assignments

Attendance

Examinations

Grades

Student AI Insights

Teacher Dashboard

Teacher Students

Teacher Attendance

Teacher Assignments

Teacher Examinations

Teacher AI Insights

Admin Dashboard

Admin Students

Admin Teachers

Admin Courses

Admin Reports

Admin AI Insights

---

# 54. IMPORTANT PRIORITY ORDER

If time is limited, prioritize in exactly this order:

Priority 1:

Landing page

Priority 2:

Login + role selection

Priority 3:

Student dashboard

Priority 4:

AI insights

Priority 5:

Teacher dashboard

Priority 6:

Admin dashboard

Priority 7:

Courses

Priority 8:

Assignments

Priority 9:

Attendance

Priority 10:

Examinations and grades

Priority 11:

Reports

Priority 12:

Additional CRUD functionality

Do not sacrifice the main demo flow to implement low-priority features.

---

# 55. FINAL EXPECTATION

The finished application should feel like a real product called:

"EduIntelli"

or

"EduSmart AI"

Use a professional product identity throughout the UI.

The final application should demonstrate:

Education Management

+

Role-Based Portals

+

Academic Analytics

+

AI Performance Intelligence

+

Personalized Recommendations

+

Academic Risk Detection

+

Reporting

The result must be polished enough for a hackathon demonstration and should prioritize a complete working user journey over unnecessary backend complexity.

Start by inspecting the existing project.

Then implement the project incrementally.

After each major stage, verify that the application still runs.

Do not stop at creating files.

Actually implement the functionality.

Do not leave TODO comments for core features.

At the end, run the application and verify the complete demo flow.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://edutelligence-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b18e1da-43f6-48d6-8148-5d3b07a8f062).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
