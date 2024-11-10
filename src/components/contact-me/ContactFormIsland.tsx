
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import ContactForm from './ContactForm'
import { Toaster } from "@/components/ui/toaster"
const ContactFormIsland = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.PUBLIC_REACT_APP_RECAPTCHA_KEY}>
        <ContactForm />
        <div className='absolute left-0 bottom-0'>
          <Toaster />
        </div>
    </GoogleReCaptchaProvider>
  )
}

export default ContactFormIsland