"use client";

import {
  authCheckAction,
  loginOrRegisterAction,
  logoutAction,
} from "@/actions/auth.action";
import { UserType } from "@/lib/types";
import {
  createContext,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

// Define the shape of the AuthContext
type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  handleLoginSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

// Create the AuthContext with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial user state
const initialUserState: UserType = {
  name: "",
  username: "",
  role: "",
  email: "",
  password: "",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Define state variables
  const [user, setUser] = useState<UserType>(initialUserState);

  // Define loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Define login modal state
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getCurentUser();
  }, []);

  const getCurentUser = async () => {
    setLoading(true);
    const res = await authCheckAction();
    if (!res?.success) {
      setLoading(false);
      return;
    } else {
      setUser(res.user as UserType);
      setLoading(false);
    }

    setLoggedIn(res.success);
  };

  // Handle login form submission
  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginOrRegisterAction(user.email, user.password || "");
    if (!res?.success) {
      toast.error(res?.message || "Something went wrong");
      setLoading(false);
      return;
    }

    toast.success(res?.message || "Login successful");
    setUser(res.user as UserType);
    setLoggedIn(res.success);
    setLoading(false);
    setLoginModalOpen(false);
  };

  const logout = async () => {
    const res = await logoutAction();
    if (!res?.success) {
      toast.error(res?.message || "Something went wrong");
      return;
    }
    setUser(initialUserState);
    setLoggedIn(false);
    toast.success(res?.message || "Logout successful");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        loginModalOpen,
        setLoginModalOpen,
        handleLoginSubmit,
        loggedIn,
        setLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
