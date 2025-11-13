import { ArrowRight, Newspaper } from "lucide-react";

const newsItems = [
  {
    date: "07 Jun 2025",
    title: "EIL Leads Project Management for Landmark Dabhol Breakwater Completion",
    description: "Engineers India Limited successfully managed the completion of the landmark Dabhol Breakwater project, showcasing excellence in marine engineering and project delivery.",
    link: "/media/news/dabhol-breakwater-completion"
  },
  {
    date: "07 Jun 2025", 
    title: "EIL & CEIL Celebrate Role in the World's Highest Railway Bridge – Chenab Bridge",
    description: "Celebrating engineering excellence with the successful completion of the world's highest railway bridge, demonstrating cutting-edge infrastructure capabilities.",
    link: "/media/news/chenab-bridge-completion"
  },
  {
    date: "31 Mar 2025",
    title: "EIL secures Consultancy Projects in Maharashtra & West Bengal", 
    description: "Strategic expansion with new consultancy projects secured in key Indian states, strengthening our domestic market presence and capabilities.",
    link: "/media/news/maharashtra-west-bengal-projects"
  },
  {
    date: "17 Mar 2025",
    title: "EIL celebrates 61st Foundation Day",
    description: "Commemorating 61 years of engineering excellence and innovation, celebrating our legacy and commitment to future growth and development.",
    link: "/media/news/61st-foundation-day"
  }
];

export default function NewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">In The News</h2>
          <p className="text-xl text-gray-600">Latest updates and achievements from Engineers India Limited</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.date}
                  </span>
                  <Newspaper className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <a 
                  href={item.link}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}