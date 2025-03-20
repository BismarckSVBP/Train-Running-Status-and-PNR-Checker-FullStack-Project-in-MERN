
import React from 'react';
import Layout from '@/components/Layout';
import ContactUs from '@/components/ContactUs';

const ContactUsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h1>
        <ContactUs />
      </div>
    </Layout>
  );
};

export default ContactUsPage;