import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';

interface ActionItemProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const ActionItem = (props: ActionItemProps) => {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={props.onClick}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={props.image} />
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
  );
};

const Page = () => {
  const router = useRouter();

  return (
    <>
      <h1 className="mt-12 text-slate-800 text-3xl font-bold w-full text-center">
        Welcome to Planner!
      </h1>
      <div className="mt-8 text-md text-center w-full">
        We have set up some resources to help you get started.
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-3 gap-4">
          <ActionItem
            title="Learn why Planner was created"
            description="See the process, experiences, and mindset that led to Planner's creation"
            image="/images/books.jpeg"
            onClick={() => {}}
          />
          <ActionItem
            title="Go through the example project"
            description="Examine the example project we have set up for you to see how Planner can help you plan your next project."
            image="/images/project.jpeg"
            onClick={() => {
              router.push('/app/project/TASK-1');
            }}
          />
          <ActionItem
            title="Get Support"
            description="Send us a message! We'd love feedback and to add new features that can help you with your next project."
            image="/images/support.jpeg"
            onClick={() => {
              router.push('https://twitter.com/TheDanielVu');
            }}
          />
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
