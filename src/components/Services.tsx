
import { ZapIcon, HeadphonesIcon, RefreshCwIcon, ShieldIcon, ArrowRight } from 'lucide-react';

const ServicesCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      <div className="p-3 bg-morocco-red/10 rounded-lg w-fit mb-4">
        <Icon className="h-6 w-6 text-morocco-red" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <a 
        href="#" 
        className="inline-flex items-center text-morocco-red font-medium text-sm group"
      >
        Learn More 
        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: ZapIcon,
      title: "Quick Delivery",
      description: "Receive your tickets within 24 hours of purchase directly to your email or mobile device."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist with any queries or concerns."
    },
    {
      icon: RefreshCwIcon,
      title: "Easy Refunds",
      description: "Hassle-free cancellations with 100% refund guarantee if the event gets cancelled."
    },
    {
      icon: ShieldIcon,
      title: "Secure Payments",
      description: "All transactions are protected with advanced encryption technology for your peace of mind."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-morocco-red/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-morocco-green/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center relative z-10">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-morocco-darkblue">Amazing</span>{" "}
              <span className="bg-morocco-purple text-white px-3 py-1 rounded-md">Services</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making your ticket buying experience as smooth and enjoyable as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-fade-in" 
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <ServicesCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
