import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { MapPin, Clock, Briefcase } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build the next generation of e-commerce tools"
    },
    {
      title: "AI/ML Engineer",
      department: "AI",
      location: "Remote",
      type: "Full-time",
      description: "Develop and optimize AI models for commerce"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful and intuitive user experiences"
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive growth and brand awareness"
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description: "Help merchants succeed with Ecommerco"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Scale infrastructure and ensure reliability"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Team</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Help us build the future of e-commerce. We're looking for talented people to join our mission.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                  <p className="text-gray-400">{job.description}</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors">
                  Apply
                </button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.department}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Why Work at Ecommerco?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Work on cutting-edge AI technology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Remote-first culture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Competitive salary and equity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Flexible working hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Learning and development budget</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
