
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    provider: string;
    description: string;
    skills: string[];
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    url: string;
    rating: number;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Define colors based on course level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <AnimatedTransition animation="scale" className="h-full">
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{course.provider}</span>
            <span className="mx-2">•</span>
            <span>{course.duration}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{course.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {course.skills.length > 3 && (
              <Badge variant="outline" className="font-normal">
                +{course.skills.length - 3} more
              </Badge>
            )}
          </div>
          <Badge className={`font-normal ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
        </CardContent>
        <CardFooter className="pt-1">
          <Button className="w-full" asChild>
            <a href={course.url} target="_blank" rel="noopener noreferrer">
              View Course <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default CourseCard;
