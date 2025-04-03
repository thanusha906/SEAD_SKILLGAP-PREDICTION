
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import jobRoles, { Skill } from '@/data/jobRoles';
import { ArrowRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SkillsAssessment = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [selectedJob, setSelectedJob] = useState<typeof jobRoles[0] | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [categorizedSkills, setCategorizedSkills] = useState<Record<string, Skill[]>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the selected job based on the URL parameter
    const job = jobRoles.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      
      // Group skills by category
      const grouped = job.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>);
      
      setCategorizedSkills(grouped);
    } else {
      // If job not found, redirect to job selection
      toast({
        title: "Job role not found",
        description: "Please select a valid job role",
        variant: "destructive"
      });
      navigate('/job-selection');
    }
  }, [jobId, navigate, toast]);

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) {
      toast({
        title: "No skills selected",
        description: "Please select at least one skill to continue",
        variant: "destructive"
      });
      return;
    }

    // Save selected skills to localStorage
    localStorage.setItem('user_skills', JSON.stringify(selectedSkills));
    
    // Calculate and save skill gaps for all job skills
    if (selectedJob) {
      const allJobSkillIds = selectedJob.skills.map(skill => skill.id);
      const skillGaps = allJobSkillIds.reduce((acc, skillId) => {
        acc[skillId] = selectedSkills.includes(skillId);
        return acc;
      }, {} as Record<string, boolean>);
      
      localStorage.setItem('skill_gaps', JSON.stringify(skillGaps));
    }
    
    // Navigate to gap analysis
    navigate('/gap-analysis');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedTransition animation="fade">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">
              {selectedJob ? `Skills Assessment for ${selectedJob.title}` : 'Loading...'}
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Select the skills you already possess to identify your skill gaps.
            </p>
          </div>
          
          {selectedJob ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Object.entries(categorizedSkills).map(([category, skills], categoryIndex) => (
                  <AnimatedTransition 
                    key={category} 
                    animation="fade" 
                    style={{ animationDelay: `${categoryIndex * 100}ms` }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {skills.map((skill) => (
                            <div key={skill.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={skill.id} 
                                  checked={selectedSkills.includes(skill.id)}
                                  onCheckedChange={() => handleSkillToggle(skill.id)}
                                />
                                <Label htmlFor={skill.id} className="cursor-pointer">
                                  {skill.name}
                                </Label>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center space-x-1">
                                      <div className="text-xs text-muted-foreground">
                                        Importance: {skill.importance}/10
                                      </div>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>This skill has an importance rating of {skill.importance}/10 for this role</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedTransition>
                ))}
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Skills Selected</span>
                  <span className="text-sm">{selectedSkills.length}/{selectedJob.skills.length}</span>
                </div>
                <Progress value={(selectedSkills.length / selectedJob.skills.length) * 100} className="h-2" />
              </div>
              
              <div className="text-center">
                <Button size="lg" onClick={handleSubmit}>
                  Analyze My Skill Gaps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="animate-pulse w-full max-w-3xl">
                <div className="h-64 bg-secondary/40 rounded-lg mb-4"></div>
                <div className="h-64 bg-secondary/40 rounded-lg"></div>
              </div>
            </div>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default SkillsAssessment;
