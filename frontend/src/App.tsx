import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, type ReactNode } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import { homePathForRole } from "@/utils/authPaths";

const LoginPage = lazy(async () => ({
  default: (await import("@/pages/LoginPage")).LoginPage,
}));
const DashboardPage = lazy(async () => ({
  default: (await import("@/pages/DashboardPage")).DashboardPage,
}));
const ProfilePage = lazy(async () => ({
  default: (await import("@/pages/ProfilePage")).ProfilePage,
}));
const SocietePage = lazy(async () => ({
  default: (await import("@/pages/SocietePage")).SocietePage,
}));
const ProjetDetailPage = lazy(async () => ({
  default: (await import("@/pages/ProjetDetailPage")).ProjetDetailPage,
}));
const ProjetEditPage = lazy(async () => ({
  default: (await import("@/pages/ProjetEditPage")).ProjetEditPage,
}));
const ProjetNewPage = lazy(async () => ({
  default: (await import("@/pages/ProjetNewPage")).ProjetNewPage,
}));
const ProjetNewTypePage = lazy(async () => ({
  default: (await import("@/pages/ProjetNewTypePage")).ProjetNewTypePage,
}));
const ProjetsPage = lazy(async () => ({
  default: (await import("@/pages/ProjetsPage")).ProjetsPage,
}));
const UsersPage = lazy(async () => ({
  default: (await import("@/pages/UsersPage")).UsersPage,
}));

function PageLoader() {
  return (
    <div className="flex min-h-[45vh] items-center justify-center p-6">
      <p className="text-slate-600">Chargement…</p>
    </div>
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

function HomeRedirect() {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  if (!token) return <Navigate to="/login" replace />;
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <p className="text-slate-600">Chargement de la session…</p>
      </div>
    );
  }
  return <Navigate to={homePathForRole(user.role)} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={withSuspense(<LoginPage />)} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN", "TECHNICIEN"]}>
              {withSuspense(<DashboardPage />)}
            </ProtectedRoute>
          }
        />
        <Route path="/projets" element={withSuspense(<ProjetsPage />)} />
        <Route
          path="/projets/nouveau"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN", "TECHNICIEN"]}>
              {withSuspense(<ProjetNewTypePage />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/projets/nouveau/:typeKey"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN", "TECHNICIEN"]}>
              {withSuspense(<ProjetNewPage />)}
            </ProtectedRoute>
          }
        />
        <Route path="/projets/:id" element={withSuspense(<ProjetDetailPage />)} />
        <Route
          path="/projets/:id/modifier"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN", "TECHNICIEN"]}>
              {withSuspense(<ProjetEditPage />)}
            </ProtectedRoute>
          }
        />
        <Route
          path="/utilisateurs"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}>
              {withSuspense(<UsersPage />)}
            </ProtectedRoute>
          }
        />
        <Route path="/profil" element={withSuspense(<ProfilePage />)} />
        <Route
          path="/societe"
          element={
            <ProtectedRoute roles={["SUPER_ADMIN", "ADMIN"]}>
              {withSuspense(<SocietePage />)}
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
