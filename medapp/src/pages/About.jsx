import React from 'react';
import { Heart, Shield, Clock, Award, Users, Target } from 'lucide-react';

function About(){
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centric Care',
      description: 'We prioritize patient comfort and convenience in every aspect of our service.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your health information is protected with industry-leading security measures.'
    },
    {
      icon: Clock,
      title: 'Accessibility',
      description: 'Access quality healthcare 24/7 with our easy-to-use platform.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in healthcare service delivery.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Verified Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '10K+', label: 'Happy Patients' },
    { number: '25+', label: 'Cities Covered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">BookEase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing healthcare access by connecting patients with qualified 
              healthcare professionals through our innovative digital platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex p-3 bg-blue-100 rounded-full mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                BookEase was founded with a simple yet powerful mission: to make quality healthcare 
                accessible to everyone, everywhere. We believe that finding the right healthcare 
                professional shouldn't be complicated or time-consuming.
              </p>
              <p className="text-lg text-gray-600">
                Our platform bridges the gap between patients and healthcare providers, making it 
                easier than ever to book appointments, access medical expertise, and manage your 
                health journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">Doctors</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">Patients</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Specialties</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-8 border-blue-400 text-center ">
                <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600">How BookEase came to be</p>
          </div>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600">
              BookEase was born from a personal experience of our founders struggling to find 
              and book appointments with healthcare specialists. After facing long wait times, 
              confusing appointment systems, and limited access to doctor information, we knew 
              there had to be a better way.
            </p>
            
            <p className="text-gray-600">
              In 2025, we assembled a team of healthcare professionals, technology experts, 
              and patient advocates to create a platform that would solve these problems once 
              and for all. Our goal was simple: make healthcare more accessible, transparent, 
              and convenient for everyone.
            </p>
            
            <p className="text-gray-600">
              Today, BookEase serves thousands of patients across multiple cities, connecting 
              them with qualified healthcare providers through our easy-to-use platform. We're 
              proud to be part of the digital health revolution, making healthcare more human 
              and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-200">Making a difference in healthcare accessibility</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;