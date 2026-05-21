import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Tutor from '../models/Tutor.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

const tutors = [
  {
    tutorName: 'John Doe',
    tutorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'Mathematics',
    availableDays: ['Saturday', 'Sunday'],
    availableTime: '10:00 AM - 12:00 PM',
    hourlyFee: 50,
    totalSlot: 10,
    sessionStartDate: new Date('2026-06-01'),
    institution: 'Harvard University',
    experience: '5 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'student@example.com'
  },
  {
    tutorName: 'Jane Smith',
    tutorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'Advanced React & Web Dev',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: '6:00 PM - 8:00 PM',
    hourlyFee: 85,
    totalSlot: 5,
    sessionStartDate: new Date('2026-06-15'),
    institution: 'MIT',
    experience: '8 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'student@example.com'
  },
  {
    tutorName: 'Michael Chen',
    tutorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'Physics & Astronomy',
    availableDays: ['Tuesday', 'Thursday'],
    availableTime: '4:00 PM - 6:00 PM',
    hourlyFee: 60,
    totalSlot: 15,
    sessionStartDate: new Date('2026-07-01'),
    institution: 'Stanford University',
    experience: '4 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'tutor3@example.com'
  },
  {
    tutorName: 'Sarah Jenkins',
    tutorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'English Literature',
    availableDays: ['Saturday', 'Sunday'],
    availableTime: '2:00 PM - 5:00 PM',
    hourlyFee: 40,
    totalSlot: 20,
    sessionStartDate: new Date('2026-06-10'),
    institution: 'Oxford University',
    experience: '10 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'tutor4@example.com'
  },
  {
    tutorName: 'David Kim',
    tutorImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'Data Structures & Algorithms',
    availableDays: ['Monday', 'Tuesday', 'Wednesday'],
    availableTime: '7:00 PM - 9:00 PM',
    hourlyFee: 100,
    totalSlot: 8,
    sessionStartDate: new Date('2026-06-05'),
    institution: 'UC Berkeley',
    experience: '6 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'tutor5@example.com'
  },
  {
    tutorName: 'Elena Rodriguez',
    tutorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    subject: 'Conversational Spanish',
    availableDays: ['Friday', 'Saturday'],
    availableTime: '11:00 AM - 1:00 PM',
    hourlyFee: 35,
    totalSlot: 25,
    sessionStartDate: new Date('2026-06-20'),
    institution: 'University of Barcelona',
    experience: '3 years',
    location: 'Online',
    teachingMode: 'Live',
    creatorEmail: 'tutor6@example.com'
  }
];

const seedData = async () => {
  try {
    dotenv.config(); // ensure it loads from cwd
    await connectDB();
    
    await Tutor.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();
    
    const password = 'Password123';
    await User.create({
      name: 'Demo Student',
      email: 'student@example.com',
      password: password,
      role: 'student'
    });

    await Tutor.insertMany(tutors);
    
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
