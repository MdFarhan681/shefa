import React from 'react'
import ResponsiveSlider from '../Shared/Slider/Slider'
import Consultation from '../Shared/Consultation/Consultation'
import FAQSection from '../Shared/FAQSection/FAQSection'
import DoctorSlider from '../Shared/DoctorSlider/DoctorSlider'
import WhyChoose from '../Shared/WhyChoose/WhyChoose'

const Home = () => {
  return (
    <div className=' w-full px-[7%] gap-8 flex flex-col '>
<ResponsiveSlider></ResponsiveSlider>

<DoctorSlider></DoctorSlider>
<Consultation
></Consultation>
<WhyChoose></WhyChoose>

<FAQSection></FAQSection>


        
      
    </div>
  )
}

export default Home
