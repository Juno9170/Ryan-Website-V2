
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactForm from './ContactForm'
const ContactFormIsland = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_REACT_APP_RECAPTCHA_KEY}>
        <ContactForm />
    </GoogleReCaptchaProvider>
  )
}

export default ContactFormIsland