import { Search, Camera, MessageCircle, Truck, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse New Arrivals",
      description: "Explore fresh artworks from Art Circle Gallery with transparent pricing",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Camera,
      title: "Preview with AR",
      description: "See how the artwork looks on your wall using your phone camera",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      title: "Connect with Gallery",
      description: "Express interest and speak directly with gallery representatives",
      color: "from-[#0A7A7A] to-[#086060]"
    },
    {
      icon: Truck,
      title: "Gallery Handles Rest",
      description: "Payment, authentication, shipping—coordinated by trusted galleries",
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">
            How Aninag Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            From discovery to purchase, we make buying gallery art simple and transparent
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line - hidden on mobile, shown on larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative bg-gradient-to-br from-surface to-white rounded-2xl p-6 sm:p-8 text-center space-y-3 sm:space-y-4 border border-border hover:shadow-xl transition-all duration-300 group">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-[#0A7A7A] text-white rounded-full flex items-center justify-center font-medium shadow-lg text-sm sm:text-base">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon size={24} className="sm:w-7 sm:h-7" />
                </div>

                <h3 className="text-lg sm:text-xl font-medium">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#086060] transition-all shadow-lg hover:shadow-xl font-medium text-sm sm:text-base lg:text-lg"
          >
            Start Browsing Collection
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}


