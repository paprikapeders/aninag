import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Santos",
      role: "Interior Designer",
      location: "Makati",
      quote: "The AR feature saved me so much time. I could show my client exactly how the artwork would look in their space before making the purchase.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Art Collector",
      location: "BGC",
      quote: "Direct connection with galleries means I got expert advice and better pricing. The authentication guarantee gave me complete peace of mind.",
      rating: 5
    },
    {
      name: "Sofia Rodriguez",
      role: "Corporate Buyer",
      location: "Ortigas",
      quote: "We purchased 12 pieces for our office. The process was seamless, and the gallery handled everything professionally. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-surface to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">
            Trusted by Art Lovers
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            See what collectors and designers say about Aninag
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 space-y-4 sm:space-y-6"
            >
              {/* Quote icon */}
              <Quote size={28} className="sm:w-8 sm:h-8 text-[#0A7A7A]/20" />

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0A7A7A] to-[#086060] rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
