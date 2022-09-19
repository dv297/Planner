import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import routeMatcher from '../../../utils/routeMatcher';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'dev.daniel.vu@gmail.com', // Change to your recipient
  from: 'dvv297@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('hit');
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });

  const response = {};
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    POST: create,
  });
}

export default withAuthMiddleware(handle);
