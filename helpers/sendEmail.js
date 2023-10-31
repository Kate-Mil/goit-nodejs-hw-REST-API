import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: SENDGRID_EMAIL };
    await sgMail.send(email);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail;
