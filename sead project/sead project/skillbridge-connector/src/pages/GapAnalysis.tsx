
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import jobRoles, { Skill } from '@/data/jobRoles';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const GapAnalysis = () => {
  const [selectedJob, setSelectedJob] = useState<typeof jobRoles[0] | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [skillGaps, setSkillGaps] = useState<Record<string, boolean>>({});
  const [skillGapPercentage, setSkillGapPercentage] = useState(0);
  const [skillMatch, setSkillMatch] = useState(0);
  const [skillCategories, setSkillCategories] = useState<{
    category: string;
    totalSkills: number;
    userSkills: number;
    percentage: number;
  }[]>([]);
  
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

    // Load skill gaps from localStorage
    const storedSkillGaps = localStorage.getItem('skill_gaps');
    if (storedSkillGaps) {
      const parsedSkillGaps = JSON.parse(storedSkillGaps);
      setSkillGaps(parsedSkillGaps);
    }

    // Calculate skill match percentage
    const totalJobSkills = job.skills.length;
    const matchedSkills = job.skills.filter(skill => parsedUserSkills.includes(skill.id)).length;
    const matchPercentage = Math.round((matchedSkills / totalJobSkills) * 100);
    
    setSkillMatch(matchPercentage);
    setSkillGapPercentage(100 - matchPercentage);

    // Calculate skill category breakdowns
    const categories = job.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = { total: 0, matched: 0 };
      }
      acc[skill.category].total += 1;
      if (parsedUserSkills.includes(skill.id)) {
        acc[skill.category].matched += 1;
      }
      return acc;
    }, {} as Record<string, { total: number; matched: number }>);

    const categoryBreakdown = Object.entries(categories).map(([category, data]) => ({
      category,
      totalSkills: data.total,
      userSkills: data.matched,
      percentage: Math.round((data.matched / data.total) * 100)
    }));

    setSkillCategories(categoryBreakdown);
  }, [navigate, toast]);

  const handleNavigateToRecommendations = () => {
    navigate('/recommendations');
  };

  // Data for pie chart
  const pieData = [
    { name: 'Matched Skills', value: skillMatch },
    { name: 'Skill Gaps', value: skillGapPercentage },
  ];
  
  const COLORS = ['#4ade80', '#f87171'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatedTransition animation="fade">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Your Skill Gap Analysis</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {selectedJob ? `Analysis of your skills for the ${selectedJob.title} role` : 'Loading...'}
            </p>
          </div>
          
          {selectedJob && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <AnimatedTransition animation="slide">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Skill Match Overview</CardTitle>
                      <CardDescription>
                        Overall match between your skills and job requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-48 h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex-1">
                          <div className="space-y-6">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Overall Skill Match</span>
                                <span className="text-sm font-medium">{skillMatch}%</span>
                              </div>
                              <Progress value={skillMatch} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                                <div className="flex items-center">
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                  <h3 className="font-medium">Skills You Have</h3>
                                </div>
                                <p className="text-3xl font-bold mt-2">{userSkills.length}</p>
                              </div>
                              
                              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg">
                                <div className="flex items-center">
                                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                  <h3 className="font-medium">Skills to Acquire</h3>
                                </div>
                                <p className="text-3xl font-bold mt-2">
                                  {selectedJob.skills.length - userSkills.length}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedTransition>
                
                <AnimatedTransition animation="slide" style={{ animationDelay: '100ms' }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Categories</CardTitle>
                      <CardDescription>
                        Breakdown of skills by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {skillCategories.map((category, index) => (
                          <div key={category.category}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{category.category}</span>
                              <span className="text-sm font-medium">{category.percentage}%</span>
                            </div>
                            <Progress value={category.percentage} className="h-2" />
                            <div className="text-xs text-muted-foreground mt-1">
                              {category.userSkills}/{category.totalSkills} skills
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedTransition>
              </div>
              
              <div className="mb-8">
                <AnimatedTransition animation="slide" style={{ animationDelay: '150ms' }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Skill Analysis</CardTitle>
                      <CardDescription>
                        Individual skills assessment for {selectedJob.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedJob.skills.map((skill) => (
                          <div 
                            key={skill.id}
                            className={`p-4 rounded-lg border flex justify-between items-center ${
                              userSkills.includes(skill.id) 
                                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                                : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                            }`}
                          >
                            <div>
                              <div className="font-medium">{skill.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Importance: {skill.importance}/10
                              </div>
                            </div>
                            {userSkills.includes(skill.id) ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedTransition>
              </div>
              
              <div className="text-center">
                <Button size="lg" onClick={handleNavigateToRecommendations}>
                  Get Course Recommendations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default GapAnalysis;
