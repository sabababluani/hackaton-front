import { Utensils, MapPin, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative georgian-gradient text-white py-20 overflow-hidden">
      <style>{`
        .georgian-gradient {
          background: linear-gradient(
            135deg,
            #8b0000 0%,
            #dc143c 25%,
            #ff6b6b 50%,
            #8b0000 75%,
            #4a0000 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }

        .title-animation {
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          100% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(255, 255, 255, 0.4);
          }
        }

        .fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stagger-1 {
          animation-delay: 0.2s;
        }
        .stagger-2 {
          animation-delay: 0.4s;
        }
        .stagger-3 {
          animation-delay: 0.6s;
        }
        .stagger-4 {
          animation-delay: 0.8s;
        }
        .stagger-5 {
          animation-delay: 1s;
        }

        .feature-card {
          transition: all 0.3s ease;
          animation: fadeInUp 1s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-5px) scale(1.05);
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .sparkle-animation {
          animation: sparkle 3s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.8;
            transform: rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: rotate(180deg);
          }
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full float-animation"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full float-animation"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full float-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-8 h-8 bg-white rounded-full float-animation"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 right-10 w-14 h-14 bg-white rounded-full float-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight title-animation fade-in-up">
            S.U.P.R.A.
          </h1>

          <p className="text-xl md:text-2xl mb-4 opacity-90 font-light fade-in-up stagger-1">
            პერსონალიზირებული კერძების ძიებია
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up stagger-3">
            <div className="feature-card flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 stagger-1">
              <Utensils className="w-5 h-5 sparkle-animation" />
              <span>კერძზე დაფუძნებული ძიება</span>
            </div>
            <div className="feature-card flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 stagger-2">
              <MapPin className="w-5 h-5 pulse-animation" />
              <span>ლოკაცია</span>
            </div>
            <div className="feature-card flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 stagger-3">
              <Sparkles className="w-5 h-5 sparkle-animation" />
              <span>AI-ით უზრუნველყოფილი</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 fade-in-up stagger-4 pulse-animation">
            "რამე გემრიელი გინდათ? ს.უ.პ.რ.ა. მოგიძებნით."
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
