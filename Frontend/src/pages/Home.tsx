import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "lucide-react";
import FilterPanel from "../components/FilterPanel";
import JobCard from "../components/JobCard";
import SavedJobCard from "../components/SavedJobCard";
import SearchBar from "../components/SearchBar";
import { type RootState, type AppDispatch } from "../store/store";
import { fetchJobs } from "../store/jobSlice";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, savedJobs } = useSelector((state: RootState) => state.job);
  
  // Search and Location state
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Additional Filter state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");

  // Debounce the search values
  const debouncedSearch = useDebounce(searchQuery, 300);
  const debouncedLocation = useDebounce(locationQuery, 300);
  const debouncedFilterLocation = useDebounce(filterLocation, 300);

  // Fetch Jobs from backend on mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const resetFilters = () => {
    setSelectedTypes([]);
    setExperienceLevel("All");
    setFilterLocation("");
    setSearchQuery("");
    setLocationQuery("");
  };

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    if (!jobs || jobs.length === 0) return [];
    return jobs.filter((job) => {
      const title = job.title || "";
      const company = job.company || "";
      const tags = job.tags || [];
      const location = job.location || "";
      const type = job.type || "";
      const empExp = job.experienceLevel || "All";

      const matchesSearch = 
        title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

      const matchesLocation = 
        location.toLowerCase().includes(debouncedLocation.toLowerCase());
      
      const matchesFilterLocation = 
        location.toLowerCase().includes(debouncedFilterLocation.toLowerCase());

      const matchesType = 
        selectedTypes.length === 0 || selectedTypes.includes(type);

      const matchesExperience = 
        experienceLevel === "All" || empExp === experienceLevel;

      // Basic salary match for demonstration
      // We assume the range slider is for yearly salary / 100 for visual simplicity
      return matchesSearch && matchesLocation && matchesFilterLocation && matchesType && matchesExperience;
    });
  }, [jobs, debouncedSearch, debouncedLocation, debouncedFilterLocation, selectedTypes, experienceLevel]);

  return (
    <div className="pb-20">
      {/* Hero Banner Section */}
      <div className="bg-primary dark:bg-slate-900 text-white py-24 relative overflow-hidden transition-colors duration-300">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 dark:opacity-[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-10 dark:opacity-[0.05] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Find Your <span className="opacity-80 dark:text-primary">Dream Job</span> With Ease
          </h1>
          <p className="text-xl text-blue-100 dark:text-slate-400 max-w-2xl mx-auto font-medium mb-4">
            Search, Apply, and Track Job Applications All in One Place. Connect
            with top employers globally.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
        />

        {/* The 3-Column Layout Base */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left Sidebar: Filters (3 cols) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <FilterPanel 
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                experienceLevel={experienceLevel}
                setExperienceLevel={setExperienceLevel}
                location={filterLocation}
                setLocation={setFilterLocation}
                resetFilters={resetFilters}
              />
            </div>
          </div>

          {/* Center Column: Job Listings (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Job Listings</h2>
              <span className="text-sm text-gray-500 dark:text-slate-500 font-medium">
                {filteredJobs.length} jobs found
              </span>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={(job as any)._id || job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 px-6">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-300 dark:text-slate-600" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">No jobs matched</h3>
                  <p className="text-gray-500 dark:text-slate-400 mb-6">We couldn't find any jobs matching your current search criteria. Try adjusting your filters.</p>
                  <button 
                    onClick={resetFilters}
                    className="text-primary font-bold hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Saved Jobs (3 cols) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Saved Jobs
                </h2>
                <div className="flex flex-col gap-4">
                  {savedJobs.length > 0 ? (
                    savedJobs.map((job) => (
                      <SavedJobCard key={(job as any)._id || job.id} job={job} />
                    ))
                  ) : (
                    <div className="text-center py-10 px-4 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-xl">
                      <p className="text-sm text-gray-400 dark:text-slate-500">
                        No saved jobs yet. Click the bookmark icon to save a
                        job.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
