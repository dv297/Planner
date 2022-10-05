import { ReactNode } from 'react';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import blogImage from '@public/images/books.jpeg';
import projectImage from '@public/images/project.jpeg';
import supportImage from '@public/images/support.jpeg';

interface ActionItemProps {
  title: string;
  description: string;
  image: StaticImageData;
  href: string;
  alt: string;
}

const ActionItem = (props: ActionItemProps) => {
  return (
    <Link href={props.href}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia>
            <div className="h-48 relative">
              <Image
                layout="fill"
                objectFit="cover"
                src={props.image}
                alt={props.alt}
                quality={50}
                placeholder="blur"
                priority
              />
            </div>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="pb-16">
        <h1 className="mt-12 text-slate-800 text-4xl font-bold w-full text-center">
          Welcome to <span className="text-primary">Planner!</span>
        </h1>
        <div className="mt-8 text-md text-center w-full">
          We have set up some resources to help you get started.
        </div>
      </div>
      <div className="flex-1 py-12">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 px-8">
          <div className="flex justify-center">
            <ActionItem
              title="Learn why Planner was created"
              description="See the process, experiences, and mindset that led to Planner's creation"
              image={blogImage}
              alt="Learn why Planner was created"
              href="/blog/make-plans-embrace-change"
            />
          </div>
          <div className="flex justify-center">
            <ActionItem
              title="Go through the example project"
              description="Examine the example project we have set up for you to see how Planner can help you plan your next project."
              image={projectImage}
              alt="Go through the example project"
              href="/app/project/TASK-1"
            />
          </div>
          <div className="flex justify-center">
            <ActionItem
              title="Get Support"
              description="Send us a message! We'd love feedback and to add new features that can help you with your next project."
              image={supportImage}
              alt="Get Support"
              href="https://twitter.com/TheDanielVu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
