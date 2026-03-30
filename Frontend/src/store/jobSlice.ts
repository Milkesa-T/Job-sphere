import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type Job } from "../data/dummyData";

// Configure axios default base URL (adjust to match backend address)
axios.defaults.baseURL = "http://localhost:5000";

// --- JWT Middleware Setup ---
// Add a request interceptor to include the JWT in headers for all requests
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  savedJobs: string[] | Job[];
  token: string;
}

interface JobState {
  jobs: Job[];
  savedJobs: Job[];
  userApplications: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  admin: {
    users: any[];
    applications: any[];
    stats: any | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  darkMode: boolean;
}

// Initial state loads user from localStorage if available
const savedUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState: JobState = {
  jobs: [],
  savedJobs: [],
  userApplications: [],
  status: "idle",
  error: null,
  auth: {
    user: savedUser,
    isAuthenticated: !!savedUser,
    status: "idle",
    error: null,
  },
  admin: {
    users: [],
    applications: [],
    stats: null,
    status: "idle",
    error: null,
  },
  darkMode: localStorage.getItem("theme") === "dark",
};

// --- Async Thunks for Jobs ---
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (queryParams?: string) => {
  const url = queryParams ? `/api/jobs?${queryParams}` : "/api/jobs";
  const response = await axios.get(url);
  return response.data;
});

// --- Application Thunks ---
export const applyToJobThunk = createAsyncThunk(
  "applications/apply",
  async (applicationData: { jobId: string; resume?: string; coverLetter?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/applications", applicationData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to submit application";
      return rejectWithValue(message);
    }
  }
);

export const fetchUserApplicationsThunk = createAsyncThunk("applications/fetchMine", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/applications/my-applications");
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Failed to fetch your applications";
    return rejectWithValue(message);
  }
});

// --- Admin Thunks ---

// --- Admin Thunks ---
export const fetchUsersThunk = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/admin/users");
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Failed to fetch users";
    return rejectWithValue(message);
  }
});

export const fetchApplicationsThunk = createAsyncThunk("admin/fetchApplications", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/admin/applications");
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || "Failed to fetch applications";
    return rejectWithValue(message);
  }
});

export const updateApplicationStatusThunk = createAsyncThunk(
  "admin/updateStatus",
  async ({ id, status, feedback }: { id: string; status: string; feedback: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/admin/applications/${id}`, { status, feedback });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Failed to update status");
    }
  }
);

export const deleteJobThunk = createAsyncThunk("admin/deleteJob", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/admin/jobs/${id}`);
    return { id, message: response.data.message };
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Failed to delete job");
  }
});

export const createJobThunk = createAsyncThunk("admin/createJob", async (jobData: any, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/jobs", jobData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Failed to create job");
  }
});

export const getDashboardStatsThunk = createAsyncThunk("admin/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/admin/stats");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
  }
});

// --- Async Thunks for Auth ---
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      // Persist user to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      // Persist user to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// Optional: Thunk to refresh user data or verify session
export const getMeThunk = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/auth/me");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }
    const message = error.response?.data?.message || error.message || "Session expired";
    return rejectWithValue(message);
  }
});

export const updateProfileThunk = createAsyncThunk("auth/updateProfile", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await axios.put("/api/auth/profile", userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update profile");
  }
});

export const saveJobThunk = createAsyncThunk("auth/saveJob", async (jobId: string, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/auth/save-job/${jobId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to save job");
  }
});

export const unsaveJobThunk = createAsyncThunk("auth/unsaveJob", async (jobId: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/auth/save-job/${jobId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to unsave job");
  }
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // Note: To properly update savedJobs with actual persistent data across sessions, 
    // we would need an endpoint to sync this, but for now we keep the UI optimistic update.
    toggleSaveJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      const jobIndex = state.jobs.findIndex((j) => (j as any)._id === jobId || j.id === jobId);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].isBookMarked = !state.jobs[jobIndex].isBookMarked;

        if (state.jobs[jobIndex].isBookMarked) {
          state.savedJobs.push(state.jobs[jobIndex]);
        } else {
          state.savedJobs = state.savedJobs.filter((j) => (j as any)._id !== jobId && j.id !== jobId);
        }
      }
    },
    logout: (state) => {
      state.auth.user = null;
      state.auth.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
  },
  extraReducers: (builder) => {
    // Fetch Jobs Cases
    builder.addCase(fetchJobs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch jobs";
    });

    // Register Cases
    builder.addCase(registerUserThunk.pending, (state) => {
      state.auth.status = "loading";
      state.auth.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.auth.status = "succeeded";
      state.auth.user = action.payload;
      state.auth.isAuthenticated = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.auth.status = "failed";
      state.auth.error = action.payload as string;
    });

    // Login Cases
    builder.addCase(loginUserThunk.pending, (state) => {
      state.auth.status = "loading";
      state.auth.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.auth.status = "succeeded";
      state.auth.user = action.payload;
      state.auth.isAuthenticated = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.auth.status = "failed";
      state.auth.error = action.payload as string;
    });

    // Get Me Cases
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      state.auth.user = { ...state.auth.user, ...action.payload };
      state.auth.isAuthenticated = true;
    });
    builder.addCase(getMeThunk.rejected, (state) => {
      state.auth.isAuthenticated = false;
      state.auth.user = null;
    });

    // User Applications Reducers
    builder.addCase(fetchUserApplicationsThunk.fulfilled, (state, action) => {
      state.userApplications = action.payload;
    });
    builder.addCase(applyToJobThunk.fulfilled, (state, action) => {
      state.userApplications.push(action.payload);
    });

    // Admin Reducers
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.admin.status = "loading";
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.admin.status = "succeeded";
      state.admin.users = action.payload;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.admin.status = "failed";
      state.admin.error = action.payload as string;
    });

    builder.addCase(fetchApplicationsThunk.pending, (state) => {
      state.admin.status = "loading";
    });
    builder.addCase(fetchApplicationsThunk.fulfilled, (state, action) => {
      state.admin.status = "succeeded";
      state.admin.applications = action.payload;
    });
    builder.addCase(fetchApplicationsThunk.rejected, (state, action) => {
      state.admin.status = "failed";
      state.admin.error = action.payload as string;
    });

    builder.addCase(updateApplicationStatusThunk.fulfilled, (state, action) => {
      const index = state.admin.applications.findIndex((app) => app._id === action.payload._id);
      if (index !== -1) {
        state.admin.applications[index] = action.payload;
      }
    });

    builder.addCase(deleteJobThunk.fulfilled, (state, action) => {
      state.jobs = state.jobs.filter((job) => (job as any)._id !== action.payload.id);
    });

    builder.addCase(createJobThunk.fulfilled, (state, action) => {
      state.jobs.unshift(action.payload);
    });

    builder.addCase(getDashboardStatsThunk.fulfilled, (state, action) => {
      state.admin.stats = action.payload;
    });

    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.auth.user = action.payload;
    });

    builder.addCase(saveJobThunk.fulfilled, (state, action) => {
      if (state.auth.user) {
        state.auth.user.savedJobs = action.payload;
        localStorage.setItem("user", JSON.stringify(state.auth.user));
      }
    });

    builder.addCase(unsaveJobThunk.fulfilled, (state, action) => {
      if (state.auth.user) {
        state.auth.user.savedJobs = action.payload;
        localStorage.setItem("user", JSON.stringify(state.auth.user));
      }
    });
  },
});

export const { toggleSaveJob, logout, toggleDarkMode } = jobSlice.actions;
export default jobSlice.reducer;
