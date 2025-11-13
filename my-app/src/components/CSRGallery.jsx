const csrImages = [
  {
    src: "./src/assets/img1_newsSection.jpg",
    alt: "Community education program with children and teachers"
  },
  {
    src: "./src/assets/img2_newsSection.jpg", 
    alt: "Healthcare outreach program in rural community"
  },
  {
    src: "./src/assets/img3_newsSection.jpg",
    alt: "Environmental sustainability tree planting initiative"
  },
  {
    src: "./src/assets/img4_newsSection.jpg",
    alt: "Skills development and vocational training programs"
  },
  {
    src: "./src/assets/img5_newsSection.jpg",
    alt: "Community infrastructure development project"
  }
];

export default function CSRGallery() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <a href="/corporate-social-responsibility" className="hover:text-blue-600 transition-colors">
              Empowering Society, Enriching Lives
            </a>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to corporate social responsibility drives meaningful impact in communities through education, healthcare, and sustainable development initiatives
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {csrImages.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}