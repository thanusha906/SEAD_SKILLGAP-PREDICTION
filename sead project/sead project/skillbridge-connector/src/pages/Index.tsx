
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { ArrowRight, BarChart3, BookOpen, PieChart, LineChart, Rocket } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <AnimatedTransition animation="fade" className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Bridge Your Skill Gap with
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent ml-2">
                Precision
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Identify your skill gaps and get personalized course recommendations to advance your career in tech, aerospace, data science, and more.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="h-12 px-8" asChild>
                    <Link to="/signup">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                    <Link to="/login">
                      Log In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </AnimatedTransition>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedTransition className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-foreground/70">
              Our platform analyzes your skills against job requirements to help you upskill effectively
            </p>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <AnimatedTransition animation="slide" className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Select Your Career Path</h3>
              <p className="text-foreground/70">
                Choose from a variety of job roles across tech, data, aerospace, and business domains.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition animation="slide" className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PieChart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Assess Your Skills</h3>
              <p className="text-foreground/70">
                Input your current skillset and see how you match against industry requirements.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition animation="slide" className="flex flex-col items-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-foreground/70">
                Receive personalized course recommendations to close your skill gaps effectively.
              </p>
            </AnimatedTransition>
          </div>
        </div>
      </section>
      
      {/* Career Paths Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedTransition className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold">Career Paths We Support</h2>
            <p className="mt-4 text-lg text-foreground/70">
              Explore opportunities across these high-demand fields
            </p>
          </AnimatedTransition>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedTransition animation="scale" className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-blue-500" />
                Cloud Computing
              </h3>
              <p className="text-sm text-foreground/70 mb-3">
                Cloud architecture, DevOps, infrastructure management, and cloud security.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">AWS</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Azure</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">GCP</span>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="scale" className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-purple-500" />
                AI & Machine Learning
              </h3>
              <p className="text-sm text-foreground/70 mb-3">
                Machine learning engineering, data science, NLP, and computer vision.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">TensorFlow</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">PyTorch</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Python</span>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="scale" className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                Data Analytics
              </h3>
              <p className="text-sm text-foreground/70 mb-3">
                Data analysis, business intelligence, data visualization, and statistical modeling.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">SQL</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Tableau</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Power BI</span>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="scale" className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-red-500" />
                Business & Management
              </h3>
              <p className="text-sm text-foreground/70 mb-3">
                Product management, project management, agile methodologies, and strategic planning.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Agile</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Scrum</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Strategy</span>
              </div>
            </AnimatedTransition>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to={user ? "/job-selection" : "/signup"}>
                Explore All Careers <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary/70 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4">
              SkillBridge
            </h3>
            <p className="text-sm text-foreground/70 max-w-md mx-auto">
              Empowering professionals to identify skill gaps and advance their careers through targeted upskilling.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to={user ? "/dashboard" : "/login"} className="text-foreground/70 hover:text-primary transition-colors">
                {user ? "Dashboard" : "Login"}
              </Link>
              <Link to={user ? "/job-selection" : "/signup"} className="text-foreground/70 hover:text-primary transition-colors">
                {user ? "Jobs" : "Sign Up"}
              </Link>
            </div>
            <div className="mt-8 text-sm text-foreground/60">
              &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
