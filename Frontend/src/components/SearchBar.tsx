import { MapPin, Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationQuery: string;
  setLocationQuery: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
}: SearchBarProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl md:rounded-full shadow-lg dark:shadow-primary/5 flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto w-full transform -translate-y-8 z-10 relative border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 py-2">
        <Search className="text-gray-400 dark:text-slate-500 mr-2" size={20} />
        <input
          type="text"
          placeholder="Job title, keywords, or company..."
          className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 flex items-center px-4 w-full py-2">
        <MapPin className="text-gray-400 dark:text-slate-500 mr-2" size={20} />
        <input
          type="text"
          placeholder="New York, Remote..."
          className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </div>

      <button className="bg-primary text-white px-8 py-4 md:py-3 rounded-xl md:rounded-full hover:bg-primary-dark transition-all font-semibold w-full md:w-auto mt-2 md:mt-0 shadow-md">
        Search
      </button>
    </div>
  );
}
