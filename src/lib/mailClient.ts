import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getSanitizedSendEmailData = (
  data: MailDataRequired | MailDataRequired[]
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (Array.isArray(data)) {
      data.forEach((entry) => {
        entry.to = process.env.TEST_ENVIRONMENT_EMAIL_TO_ADDRESS;
      });
    } else {
      data.to = process.env.TEST_ENVIRONMENT_EMAIL_TO_ADDRESS;
    }
  }

  return data;
};

export default sgMail;
export { getSanitizedSendEmailData };
