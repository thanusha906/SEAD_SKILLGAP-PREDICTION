import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import jobRoles from '@/data/jobRoles';
import { Search, ArrowRight, Briefcase, Cloud, BarChart2, Brain, Plane, Code, Computer, Wrench, Database } from 'lucide-react';

// Create a mapping of icon names to actual icon components
const iconMap = {
  'cloud': Cloud,
  'bar-chart-2': BarChart2,
  'brain': Brain,
  'plane': Plane,
  'briefcase': Briefcase,
  'code': Code,
  'computer': Computer,
  'wrench': Wrench,
  'database': Database,
  'design': Briefcase, // Using Briefcase as fallback for design icon
};

const JobSelection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter jobs based on search term
  const filteredJobs = jobRoles.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    // Save selected job to localStorage
    localStorage.setItem('selected_job', jobId);
  };

  const handleContinue = () => {
    if (!selectedJob) {
      toast({
        title: "No job selected",
        description: "Please select a job role to continue",
        variant: "destructive"
      });
      return;
    }
    navigate(`/skills-assessment/${selectedJob}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedTransition animation="fade">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Select Your Target Job Role</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Choose the job role you're interested in to assess your skill gaps and get personalized recommendations.
            </p>
          </div>
          
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search job roles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredJobs.map((job, index) => {
              // Get the appropriate icon component from our map, fallback to Briefcase
              const IconComponent = iconMap[job.icon as keyof typeof iconMap] || Briefcase;
              
              return (
                <AnimatedTransition
                  key={job.id}
                  animation="scale"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedJob === job.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleJobSelect(job.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {job.category}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {job.description}
                      </CardDescription>
                      <div className="mt-4">
                        <div className="text-xs text-muted-foreground mb-1">
                          Top skills required:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map(skill => (
                            <span key={skill.id} className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {skill.name}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedTransition>
              );
            })}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center p-8 bg-secondary/30 rounded-lg">
              <p className="text-foreground/70">No job roles match your search criteria</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              disabled={!selectedJob}
              onClick={handleContinue}
            >
              Continue to Skills Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default JobSelection;
