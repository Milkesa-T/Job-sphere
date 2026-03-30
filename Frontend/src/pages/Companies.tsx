import { Star, MapPin, Users, ExternalLink } from "lucide-react";
import GoogleLogo from "../assets/google.png";
import FigmaLogo from "../assets/Figma.png";
import NetflixLogo from "../assets/netflix.png";
import AmazonLogo from "../assets/amazon.png";

export default function Companies() {
  const companies = [
    {
      name: "Google",
      logo: GoogleLogo,
      location: "Mountain View, CA",
      employees: "100,000+",
      rating: 4.8,
      jobs: 124,
      description: "Organizing the world's information and making it universally accessible and useful.",
      websiteUrl: "https://google.com"
    },
    {
      name: "Figma",
      logo: FigmaLogo,
      location: "San Francisco, CA",
      employees: "1,000+",
      rating: 4.9,
      jobs: 42,
      description: "The collaborative interface design tool.",
      websiteUrl: "https://figma.com"
    },
    {
      name: "Netflix",
      logo: NetflixLogo,
      location: "Los Gatos, CA",
      employees: "10,000+",
      rating: 4.5,
      jobs: 86,
      description: "Leading the global entertainment industry.",
      websiteUrl: "https://netflix.com"
    },
    {
      name: "Amazon",
      logo: AmazonLogo,
      location: "Seattle, WA",
      employees: "1,000,000+",
      rating: 4.2,
      jobs: 215,
      description: "Earth's most customer-centric company.",
      websiteUrl: "https://amazon.com"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">Top Companies</h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">Discover top employers and find your next career move.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {companies.map((company, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-primary/5 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 flex items-center justify-center flex-shrink-0">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain dark:brightness-90" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{company.name}</h2>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded text-[10px] font-bold">
                      <Star size={10} fill="currentColor" /> {company.rating}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gray-400 dark:text-slate-500" /> {company.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} className="text-gray-400 dark:text-slate-500" /> {company.employees}
                    </div>
                  </div>
                </div>
              </div>
              <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-2 flex text-gray-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors bg-gray-50 dark:bg-slate-800 rounded-xl">
                <ExternalLink size={20} />
              </a>
            </div>
            
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-8">
              {company.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-slate-800">
              <span className="text-sm font-bold text-primary dark:text-blue-400">{company.jobs} Open Positions</span>
              <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-6 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all text-sm cursor-pointer whitespace-nowrap">
                View Company
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
