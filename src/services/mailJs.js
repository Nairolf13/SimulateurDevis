import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

export async function sendEstimationMail(form, estimatedPrice) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      ...form,
      estimatedPrice,
    },
    USER_ID
  );
}
