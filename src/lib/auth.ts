import type { Role } from "@/types";

const KEY = "eduintelli.session";

export interface Session {
  role: Role;
  name: string;
  email: string;
}

export const DEMO_SESSIONS: Record<Role, Session> = {
  student: {
    role: "student",
    name: "Sanjay Sriram",
    email: "sanjay.sriram@eduintelli.edu.in",
  },
  teacher: {
    role: "teacher",
    name: "Dr. Kavitha Narayanan",
    email: "kavitha.n@eduintelli.edu.in",
  },
  admin: {
    role: "admin",
    name: "Registrar Office",
    email: "registrar@eduintelli.edu.in",
  },
};

export const ROLE_HOME: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

export function signIn(session: Session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
