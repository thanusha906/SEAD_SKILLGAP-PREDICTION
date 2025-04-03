
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import jobRoles from '@/data/jobRoles';
import courses, { Course } from '@/data/courses';
import { Check, Star, ExternalLink, ArrowLeft, Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Recommendations = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobRoles[0] | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating'>('relevance');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load selected job from localStorage
    const jobId = localStorage.getItem('selected_job');
    if (!jobId) {
      toast({
        title: "No job selected",
        description: "Please select a job role first",
        variant: "destructive"
      });
      navigate('/job-selection');
      return;
    }

    const job = jobRoles.find(j => j.id === jobId);
    if (!job) {
      toast({
        title: "Job not found",
        description: "Please select a valid job role",
        variant: "destructive"
      });
      navigate('/job-selection');
      return;
    }
    
    setSelectedJob(job);

    // Load user skills from localStorage
    const storedUserSkills = localStorage.getItem('user_skills');
    if (!storedUserSkills) {
      toast({
        title: "No skills data",
        description: "Please complete the skills assessment first",
        variant: "destructive"
      });
      navigate(`/skills-assessment/${jobId}`);
      return;
    }

    const parsedUserSkills = JSON.parse(storedUserSkills);
    setUserSkills(parsedUserSkills);

    // Identify missing skills
    const jobSkillIds = job.skills.map(s => s.id);
    const skillsToAcquire = jobSkillIds.filter(skillId => !parsedUserSkills.includes(skillId));
    setMissingSkills(skillsToAcquire);

    // Find courses that teach the missing skills
    findRecommendedCourses(skillsToAcquire);
  }, [navigate, toast]);

  useEffect(() => {
    if (missingSkills.length > 0) {
      findRecommendedCourses(missingSkills);
    }
  }, [sortBy, filterLevel, missingSkills]);

  const findRecommendedCourses = (skillsToAcquire: string[]) => {
    if (!skillsToAcquire.length) return;

    // Find courses that teach the missing skills
    let matched = courses.filter(course => 
      course.skills.some(skillId => skillsToAcquire.includes(skillId))
    );

    // Apply level filter
    if (filterLevel !== 'all') {
      matched = matched.filter(course => course.level.toLowerCase() === filterLevel);
    }

    // Calculate relevance score based on how many missing skills the course teaches
    const coursesWithRelevance = matched.map(course => {
      const relevanceScore = course.skills.filter(skillId => 
        skillsToAcquire.includes(skillId)
      ).length;
      
      // Also consider skill importance when calculating relevance
      let importanceBoost = 0;
      if (selectedJob) {
        course.skills.forEach(skillId => {
          if (skillsToAcquire.includes(skillId)) {
            const skill = selectedJob.skills.find(s => s.id === skillId);
            if (skill) {
              importanceBoost += skill.importance / 10; // Normalize to 0-1 range
            }
          }
        });
      }
      
      const totalRelevance = relevanceScore + importanceBoost;
      
      return { ...course, relevance: totalRelevance };
    });

    // Sort by selected criterion
    let sorted = [];
    if (sortBy === 'relevance') {
      sorted = coursesWithRelevance.sort((a, b) => b.relevance - a.relevance);
    } else {
      sorted = coursesWithRelevance.sort((a, b) => b.rating - a.rating);
    }

    setRecommendedCourses(sorted);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
      );
    }
    
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedTransition animation="fade">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/gap-analysis')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Analysis
            </Button>
            
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Recommended Courses</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Personalized course recommendations to help you acquire missing skills
                {selectedJob && ` for the ${selectedJob.title} role`}.
              </p>
            </div>
          </div>
          
          {missingSkills.length > 0 ? (
            <>
              <div className="bg-secondary/20 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Skills to Acquire</h2>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map(skillId => {
                    const skill = selectedJob?.skills.find(s => s.id === skillId);
                    return skill ? (
                      <div key={skillId} className="bg-secondary rounded-full px-3 py-1 text-sm">
                        {skill.name}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-xs">
                                {skill.importance}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Importance rating: {skill.importance}/10</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">Course Recommendations</h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm mr-2">Level:</span>
                    <RadioGroup 
                      value={filterLevel} 
                      onValueChange={(v) => setFilterLevel(v as any)} 
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="text-sm">All</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner" className="text-sm">Beginner</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="text-sm">Intermediate</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced" className="text-sm">Advanced</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Sort by:</span>
                    <RadioGroup 
                      value={sortBy} 
                      onValueChange={(v) => setSortBy(v as any)} 
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="relevance" id="relevance" />
                        <Label htmlFor="relevance" className="text-sm">Relevance</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="rating" id="rating" />
                        <Label htmlFor="rating" className="text-sm">Rating</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recommendedCourses.map((course, index) => {
                  // Calculate which missing skills this course teaches
                  const taughtSkills = course.skills.filter(skillId => 
                    missingSkills.includes(skillId)
                  );
                  
                  return (
                    <AnimatedTransition
                      key={course.id}
                      animation="scale"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">{course.provider}</p>
                            </div>
                            <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                              {course.level}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 flex-1 flex flex-col">
                          <p className="text-sm mb-4 flex-1">{course.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Teaches these missing skills:</div>
                              <div className="flex flex-wrap gap-1">
                                {taughtSkills.map(skillId => {
                                  const skill = selectedJob?.skills.find(s => s.id === skillId);
                                  return skill && (
                                    <div key={skillId} className="flex items-center bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-400 text-xs rounded-full px-2 py-0.5">
                                      <Check className="h-3 w-3 mr-1" />
                                      {skill.name}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex">{renderStars(course.rating)}</div>
                              <div className="text-sm">{course.duration}</div>
                            </div>
                            
                            <Button asChild variant="outline" className="w-full" size="sm">
                              <a href={course.url} target="_blank" rel="noopener noreferrer">
                                View Course <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </AnimatedTransition>
                  );
                })}
              </div>
              
              {recommendedCourses.length === 0 && (
                <div className="text-center p-12 bg-secondary/20 rounded-lg">
                  <p className="text-foreground/70">
                    No courses found matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-12 bg-secondary/20 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
              <p className="text-foreground/70">
                You already have all the skills needed for this role. No further courses are recommended.
              </p>
              <Button onClick={() => navigate('/job-selection')} className="mt-4">
                Explore Other Job Roles
              </Button>
            </div>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Recommendations;
