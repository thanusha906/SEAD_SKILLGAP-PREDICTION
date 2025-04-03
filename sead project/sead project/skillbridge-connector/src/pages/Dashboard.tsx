
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, CircleSlash2, Laptop, LineChart, BarChart4 } from 'lucide-react';
import jobRoles, { JobRole } from '@/data/jobRoles';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [hasSkills, setHasSkills] = useState(false);
  const [hasGaps, setHasGaps] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if a job role has been selected previously
    const savedJobId = localStorage.getItem('selected_job');
    if (savedJobId) {
      const job = jobRoles.find(job => job.id === savedJobId);
      if (job) {
        setSelectedJob(job);
      }
    }
    
    // Check if skills have been assessed
    const userSkills = localStorage.getItem('user_skills');
    setHasSkills(!!userSkills);
    
    // Check if skill gap analysis has been done
    const skillGaps = localStorage.getItem('skill_gaps');
    setHasGaps(!!skillGaps);
  }, [user, navigate]);

  // Group for display
  const categories = Array.from(new Set(jobRoles.map(job => job.category)));
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="page-container pt-24">
        <AnimatedTransition animation="fade">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user?.name}
              </h1>
              <p className="text-foreground/70 mt-1">
                Track your progress and continue your skill development journey
              </p>
            </div>
            
            {selectedJob && (
              <div className="mt-4 lg:mt-0 flex items-center bg-secondary/50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium mr-2">Current Path:</span>
                <span className="text-sm text-primary font-semibold">{selectedJob.title}</span>
                <Button variant="ghost" size="sm" className="ml-2 h-7 text-xs" asChild>
                  <Link to="/job-selection">Change</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Progress Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className={`border-l-4 ${selectedJob ? 'border-l-green-500' : 'border-l-orange-500'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BriefcaseBusiness className="h-5 w-5 mr-2 text-muted-foreground" />
                  Career Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedJob ? (
                  <p className="font-medium text-foreground">{selectedJob.title}</p>
                ) : (
                  <p className="text-foreground/70">No job role selected yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant={selectedJob ? "outline" : "default"} size="sm" className="w-full" asChild>
                  <Link to="/job-selection">
                    {selectedJob ? "Change Job Role" : "Select Job Role"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={`border-l-4 ${hasSkills ? 'border-l-green-500' : 'border-l-orange-500'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-muted-foreground" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasSkills ? (
                  <p className="font-medium text-foreground">Skills assessed</p>
                ) : (
                  <p className="text-foreground/70">Skills not assessed yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant={hasSkills ? "outline" : "default"} 
                  size="sm" 
                  className="w-full" 
                  asChild
                  disabled={!selectedJob}
                >
                  <Link to="/skills-assessment">
                    {hasSkills ? "Update Skills" : "Assess Skills"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className={`border-l-4 ${hasGaps ? 'border-l-green-500' : 'border-l-orange-500'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-muted-foreground" />
                  Skill Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasGaps ? (
                  <p className="font-medium text-foreground">Analysis complete</p>
                ) : (
                  <p className="text-foreground/70">Not analyzed yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant={hasGaps ? "outline" : "default"} 
                  size="sm" 
                  className="w-full" 
                  asChild
                  disabled={!hasSkills}
                >
                  <Link to="/gap-analysis">
                    {hasGaps ? "View Analysis" : "Start Analysis"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Button 
              variant="outline" 
              className="h-auto py-6 justify-start text-left flex flex-col items-start" 
              asChild
            >
              <Link to="/job-selection">
                <BriefcaseBusiness className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-medium">Select Job Role</span>
                <span className="text-xs text-muted-foreground mt-1">Choose your career path</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-6 justify-start text-left flex flex-col items-start" 
              asChild
              disabled={!selectedJob}
            >
              <Link to="/skills-assessment">
                <CheckCircle2 className="h-6 w-6 mb-2 text-green-600" />
                <span className="font-medium">Assess Skills</span>
                <span className="text-xs text-muted-foreground mt-1">Select your current skills</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-6 justify-start text-left flex flex-col items-start" 
              asChild
              disabled={!hasSkills}
            >
              <Link to="/gap-analysis">
                <BarChart4 className="h-6 w-6 mb-2 text-purple-600" />
                <span className="font-medium">View Skill Gaps</span>
                <span className="text-xs text-muted-foreground mt-1">Analyze your skill gaps</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-6 justify-start text-left flex flex-col items-start" 
              asChild
              disabled={!hasGaps}
            >
              <Link to="/recommendations">
                <BookOpen className="h-6 w-6 mb-2 text-amber-600" />
                <span className="font-medium">Get Courses</span>
                <span className="text-xs text-muted-foreground mt-1">Find courses for upskilling</span>
              </Link>
            </Button>
          </div>
          
          {/* Explore Job Categories */}
          <h2 className="text-xl font-semibold mb-4">Explore Job Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <AnimatedTransition 
                key={category} 
                animation="scale" 
                className="h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate('/job-selection')}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>
                      {jobRoles.filter(job => job.category === category).length} job roles available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-foreground/70">
                    <p>
                      {category === 'Cloud Computing' && 'Roles in cloud architecture, DevOps, and infrastructure.'}
                      {category === 'AI/ML' && 'Careers in machine learning, data science, and AI.'}
                      {category === 'Data Analytics' && 'Positions in data analysis, visualization, and BI.'}
                      {category === 'Aerospace' && 'Jobs in aerospace engineering and design.'}
                      {category === 'Business' && 'Roles in product and project management.'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1" asChild>
                      <Link to="/job-selection">
                        View Roles <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedTransition>
            ))}
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Dashboard;
