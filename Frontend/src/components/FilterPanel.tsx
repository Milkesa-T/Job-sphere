import { ChevronDown, MapPin, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  resetFilters: () => void;
}

export default function FilterPanel({
  selectedTypes,
  setSelectedTypes,
  experienceLevel,
  setExperienceLevel,
  location,
  setLocation,
  resetFilters,
}: FilterPanelProps) {
  const jobTypes = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
    "Volunteer",
    "Remote",
    "Hybrid",
    "On-site",
  ];

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col gap-8 transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filter</h2>
        <button 
          onClick={resetFilters}
          className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
        >
          <RotateCcw size={14} />
          Reset All
        </button>
      </div>

      {/* Date Posted (Static for now but visual) */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
          Date Posted
        </label>
        <div className="relative">
          <select className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 appearance-none text-sm text-gray-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Any time</option>
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Job Type */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
          Job Type
        </label>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-5 h-5 rounded border-gray-200 dark:border-slate-700 text-primary focus:ring-primary transition-all cursor-pointer bg-white dark:bg-slate-800"
              />
              <span className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
          Location
        </label>
        <div className="relative">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
          Experience Level
        </label>
        <div className="relative">
          <select 
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 appearance-none text-sm text-gray-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="All">All Levels</option>
            <option value="Junior">Junior</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Salary Range (Visual for now) */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
          Salary Range
        </label>
        <input
          type="range"
          min="20"
          max="2000"
          className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
        />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold">
              From
            </span>
            <input
              type="text"
              placeholder="$20"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-slate-300 outline-none"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold">
              To
            </span>
            <input
              type="text"
              placeholder="$2000"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-slate-300 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
