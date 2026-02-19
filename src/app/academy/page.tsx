import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import Link from "next/link";
import { Play, Clock, Users, Award } from "lucide-react";

export default function AcademyPage() {
  const courses = [
    {
      title: "E-commerce Fundamentals",
      description: "Learn the basics of running an online store",
      duration: "4 hours",
      students: "12K",
      level: "Beginner",
      lessons: 12
    },
    {
      title: "AI-Powered Store Management",
      description: "Master the AI agent and automation features",
      duration: "6 hours",
      students: "8K",
      level: "Intermediate",
      lessons: 18
    },
    {
      title: "Advanced Marketing Strategies",
      description: "Grow your business with proven marketing tactics",
      duration: "5 hours",
      students: "15K",
      level: "Advanced",
      lessons: 15
    },
    {
      title: "Store Design & Customization",
      description: "Create beautiful, conversion-optimized stores",
      duration: "3 hours",
      students: "10K",
      level: "Beginner",
      lessons: 10
    },
    {
      title: "API Development",
      description: "Build custom integrations with Ecommerco API",
      duration: "8 hours",
      students: "5K",
      level: "Advanced",
      lessons: 24
    },
    {
      title: "Business Growth & Scaling",
      description: "Scale your business from startup to enterprise",
      duration: "7 hours",
      students: "9K",
      level: "Intermediate",
      lessons: 20
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Ecommerco <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Academy</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Free courses to help you build and grow your online business.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                  course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-primary/20 text-primary'
                }`}>
                  {course.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students} students
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{course.lessons} lessons</span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors">
                  <Play className="w-4 h-4" />
                  Start Course
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Get Certified</h3>
            <p className="text-gray-400 mb-6">
              Complete courses and earn certificates to showcase your skills.
            </p>
            <button className="px-6 py-3 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors">
              View Certificates
            </button>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
