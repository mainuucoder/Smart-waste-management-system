import { Link } from 'react-router-dom';
import { Recycle, MapPin, Calendar, TrendingUp, Sparkles, Trash2, Mail, Phone, MapPin as MapPinIcon, Star, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const Home = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 md:h-12 md:w-12 text-green-600" />,
      title: 'Report Issues',
      description: 'Easily report waste collection problems in your area with photos and location',
    },
    {
      icon: <Calendar className="h-8 w-8 md:h-12 md:w-12 text-green-600" />,
      title: 'Collection Schedule',
      description: 'View waste collection schedules for your area and get timely reminders',
    },
    {
      icon: <Recycle className="h-8 w-8 md:h-12 md:w-12 text-green-600" />,
      title: 'Recycling Info',
      description: 'Learn about proper waste segregation and recycling practices',
    },
    {
      icon: <TrendingUp className="h-8 w-8 md:h-12 md:w-12 text-green-600" />,
      title: 'Track Progress',
      description: 'Monitor the status of your reports and see community impact',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Grace Wanjiku',
      role: 'Environmental Officer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Collection routes are much faster and more organized now. The schedule reminders have significantly reduced missed collections in our area.',
      improvement: 'Collection efficiency up by 60%',
      website: 'kisumucounty.go.ke'
    },
    {
      id: 2,
      name: 'Michael Otieno',
      role: 'Tech Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'It would be great if the system could categorize waste automatically in the future. The current features are already making a huge difference in our community.',
      improvement: 'Waste sorting accuracy improved',
      website: 'tech4good.dev'
    },
    {
      id: 3,
      name: 'Amina Hassan',
      role: 'Community Leader',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'The educational resources on recycling have transformed how residents handle waste. We\'ve seen a dramatic reduction in contamination of recyclable materials.',
      improvement: 'Recycling contamination down by 80%',
      website: 'communityleaders.org'
    },
    {
      id: 4,
      name: 'Robert Kimani',
      role: 'Waste Collection Driver',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'The real-time reporting helps us prioritize areas that need immediate attention. It has made our work more efficient and impactful.',
      improvement: 'Response time improved by 50%',
      website: 'cleanpathservices.com'
    },
    {
      id: 5,
      name: 'James Mwangi',
      role: 'Resident Association Chair',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'There\'s noticeably less litter around our estate since we started using this system. The reporting feature makes community cleanup efforts so much easier.',
      improvement: 'Community cleanliness improved by 75%',
      website: 'milimaniresidents.org'
    },
    {
      id: 6,
      name: 'Linda Akinyi',
      role: 'Sustainability Coordinator',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'This platform is helping us achieve our sustainability targets. The data insights are invaluable for our environmental reports.',
      improvement: 'Recycling participation up by 55%',
      website: 'ecocitiesinitiative.com'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonial]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Green Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-emerald-900/70"></div>
        
        {/* Animated Sparkles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkles className="absolute top-10 left-4 text-white/30 w-4 h-4 animate-pulse" />
          <Sparkles className="absolute top-20 right-6 text-white/20 w-5 h-5 animate-pulse animation-delay-200" />
          <Sparkles className="absolute bottom-20 left-1/4 text-white/25 w-4 h-4 animate-pulse animation-delay-400" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 md:py-20">
          <div className="text-center">
            {/* Animated Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 animate-fade-in-down drop-shadow-2xl leading-tight">
              Smart Waste Management
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium mb-6 md:mb-10 max-w-4xl mx-auto animate-fade-in-up animation-delay-200 drop-shadow-lg leading-relaxed px-2">
              Join us in building sustainable cities and communities.
              <span className="block mt-2 text-green-200 text-base sm:text-lg md:text-xl">
                Report waste issues, track collection schedules, and contribute to a cleaner environment.
              </span>
            </p>
            
            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 animate-fade-in animation-delay-400">
              <Link 
                to="/register" 
                className="w-full sm:w-auto bg-white text-green-700 hover:bg-green-50 px-6 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/50 text-center"
              >
                🌱 Get Started
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto bg-green-600/90 backdrop-blur-sm text-white hover:bg-green-700 px-6 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 text-center"
              >
                ♻️ Sign In
              </Link>
            </div>

            {/* Cleaning Person Illustration */}
            <div className="mt-8 md:mt-16 animate-fade-in animation-delay-600">
              <div className="relative inline-block">
                {/* Using emoji/SVG representation */}
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-2xl animate-bounce-slow">
                  🧹🌍
                </div>
                <p className="text-white text-sm sm:text-base md:text-lg mt-2 md:mt-4 font-semibold drop-shadow-lg">
                  Together, we clean our planet
                </p>
              </div>
            </div>
          </div>

          {/* Animated SDG Badge */}
          <div className="mt-8 md:mt-16 text-center animate-fade-in animation-delay-800 px-2">
            <div className="inline-block bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 transform hover:scale-105 transition-transform duration-300 border-4 border-green-500 max-w-xs sm:max-w-none">
              <p className="text-xs sm:text-sm text-green-600 mb-2 font-bold uppercase tracking-wider">Supporting</p>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SDG 11: Sustainable Cities
              </h3>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-2xl md:text-4xl">↓</div>
          <p className="text-white text-xs md:text-sm mt-1 md:mt-2">Scroll to explore</p>
        </div>
      </section>

      {/* Features Section with Clean Background */}
      <section className="relative py-12 md:py-24 px-4 sm:px-6"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/95"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 animate-fade-in">
            How It Works
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-16 max-w-2xl mx-auto px-2">
            Four simple steps to make your community cleaner
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 text-center hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-300 animate-slide-up border-2 border-green-100 hover:border-green-400"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 md:mb-6 transform hover:rotate-12 hover:scale-110 transition-transform duration-300 bg-green-50 rounded-full p-2 md:p-4 mx-auto w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Single Card Display */}
      <section className="relative py-12 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              What Our Community Says
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-2">
              Real stories from residents and professionals making a difference
            </p>
          </div>

          {/* Single Testimonial Display */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div 
                key={testimonials[currentTestimonial].id}
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transform transition-all duration-500 animate-fade-in border-2 border-green-200"
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-center text-lg md:text-xl leading-relaxed italic mb-8">
                  "{testimonials[currentTestimonial].comment}"
                </p>

                {/* Improvement Metric */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 mb-8 text-center border border-green-200">
                  <p className="text-base md:text-lg font-semibold text-green-700">
                    📈 {testimonials[currentTestimonial].improvement}
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-center space-x-6">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-green-200 shadow-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900 text-xl md:text-2xl">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-green-600 text-base md:text-lg">{testimonials[currentTestimonial].role}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{testimonials[currentTestimonial].website}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white hover:bg-green-50 text-green-600 rounded-full p-3 md:p-4 shadow-2xl border border-green-200 hover:scale-110 transition-all duration-300 z-10"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              
              <button
                onClick={nextTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white hover:bg-green-50 text-green-600 rounded-full p-3 md:p-4 shadow-2xl border border-green-200 hover:scale-110 transition-all duration-300 z-10"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-green-600 scale-125' 
                      : 'bg-green-300 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-300"
              >
                {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'} Auto-play
              </button>
            </div>
          </div>

          {/* Stats below testimonials */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4.8/5</div>
              <p className="text-gray-600">Average User Rating</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">2K+</div>
              <p className="text-gray-600">Happy Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Nature Background */}
      <section 
        className="relative py-12 md:py-24 px-4 sm:px-6"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/90 to-green-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-8 md:mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 text-center">
            <div className="animate-count-up bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-white/30">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 text-white drop-shadow-lg">500+</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 font-semibold">Active Users</p>
            </div>
            <div className="animate-count-up animation-delay-200 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-white/30">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 text-white drop-shadow-lg">1,200+</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 font-semibold">Reports Submitted</p>
            </div>
            <div className="animate-count-up animation-delay-400 bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 border-2 border-white/30">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 text-white drop-shadow-lg">85%</h3>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 font-semibold">Issues Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-12 md:py-24 text-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 animate-fade-in">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 animate-fade-in animation-delay-200 max-w-3xl mx-auto px-2">
            Join our community and help create cleaner, more sustainable cities for future generations.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-8 py-4 md:px-12 md:py-6 text-lg md:text-2xl font-bold rounded-full shadow-xl md:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow w-full sm:w-auto"
          >
            🌟 Join Now...
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

// Footer Component (unchanged)
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Trash2 className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              <span className="text-lg md:text-xl font-bold text-white">
                Smart Waste Management
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md text-sm md:text-base">
              Making cities cleaner and more sustainable through technology and 
              community participation. Supporting SDG 11: Sustainable Cities and Communities.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span className="text-xs md:text-sm">info@smartwaste.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span className="text-xs md:text-sm">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span className="text-xs md:text-sm">Kisumu, Kenya</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link to="/schedules" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Schedules</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-base md:text-lg">Resources</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Smart Waste Management System. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs md:text-sm text-gray-400">Built with</span>
              <div className="text-red-500 animate-pulse">❤️</div>
              <span className="text-xs md:text-sm text-gray-400">for SDG 11</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home;