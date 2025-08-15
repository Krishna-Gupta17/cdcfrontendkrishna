// events.jsx
export const events = [
  {
    id: 'syntax-siege',
    title: 'Syntax Siege',
    description: 'A week-long immersive coding experience designed to transform your programming skills',
    // poster: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'March 1-8, 2025',
    duration: '7 days',
    type: 'Hybrid Competition',
    difficulty: 'Intermediate to Advanced',
    prizes: ['₹50,000', '₹30,000', '₹20,000'],
    about: {
      title: 'About Syntax Siege',
      description: 'Syntax Siege is our flagship week-long coding marathon that challenges participants through multiple phases of competitive programming. From intensive learning sessions to final algorithmic battles, this event is designed to push your coding limits.',
      features: [
        { icon: 'Code2', title: 'Hands-On Learning', description: 'Five days of intensive offline coding classes with expert mentors' },
        { icon: 'Monitor', title: 'Online Contest', description: 'Test your skills in a competitive online environment' },
        { icon: 'GraduationCap', title: 'Skill Development', description: 'Master essential programming concepts and problem-solving' },
        { icon: 'Trophy', title: 'Final Challenge', description: 'Showcase your talent in the offline finale' }
      ]
    },
    schedule: [
      { phase: 'Online Round', date: 'March 1, 2025', description: 'Qualifying round with algorithmic problems' },
      { phase: 'Offline Round', date: 'March 2, 2025', description: 'On-campus final competition' }
    ],
    venue: {
      online: {
        platform: 'CodeForces Platform',
        details: 'Custom contest environment with real-time leaderboard'
      },
      offline: {
        location: 'ITRC Lab, MMMUT Gorakhpur',
        address: 'Computer Science Department, Main Campus'
      }
    },
    registration: {
      teamSize: '3 members',
      fee: 'Free Registration',
      deadline: 'February 25, 2025',
      requirements: ['Active college student', 'Basic programming knowledge', 'Team formation required']
    }
  },
  {
    id: 'algorithmic-arena',
    title: 'AlgoOlympics',
    description: 'Battle of minds in data structures and algorithms',
    // poster: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'February 15, 2025',
    duration: '4 hours',
    type: 'Offline Competition',
    difficulty: 'Beginner to Intermediate',
    prizes: ['₹25,000', '₹15,000', '₹10,000'],
    about: {
      title: 'About Algorithmic Arena',
      description: 'A focused competitive programming contest emphasizing algorithmic thinking and efficient problem-solving techniques.',
      features: [
        { icon: 'Brain', title: 'Algorithm Focus', description: 'Problems centered around core algorithmic concepts' },
        { icon: 'Clock', title: 'Time Challenge', description: '4-hour intensive problem-solving session' },
        { icon: 'Users', title: 'Individual Contest', description: 'Solo competition to test personal skills' },
        { icon: 'Award', title: 'Recognition', description: 'Certificates and prizes for top performers' }
      ]
    },
    schedule: [
      { phase: 'Registration', date: 'February 10, 2025', description: 'Final registration deadline' },
      { phase: 'Contest', date: 'February 15, 2025', description: '4-hour online programming contest' }
    ],
    venue: {
      online: {
        platform: 'HackerRank Platform',
        details: 'Secure online environment with plagiarism detection'
      }
    },
    registration: {
      teamSize: 'Individual',
      fee: '₹100 per participant',
      deadline: 'February 10, 2025',
      requirements: ['College ID verification', 'Basic programming knowledge']
    }
  },
  {
    id: 'code-sprint',
    title: 'Game Of Codes',
    description: 'Fast-paced coding challenge for quick problem solvers',
    // poster: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'January 20, 2025',
    duration: '2 hours',
    type: 'Online Competition',
    difficulty: 'All Levels',
    prizes: ['₹15,000', '₹10,000', '₹5,000'],
    about: {
      title: 'About Code Sprint',
      description: 'A high-energy, fast-paced programming contest where speed and accuracy determine the winners. Perfect for beginners and experts alike.',
      features: [
        { icon: 'Zap', title: 'Speed Coding', description: 'Quick problem-solving under time pressure' },
        { icon: 'Target', title: 'Accuracy Focus', description: 'Balance between speed and correctness' },
        { icon: 'Layers', title: 'Multiple Rounds', description: 'Progressive difficulty with elimination rounds' },
        { icon: 'Medal', title: 'Instant Results', description: 'Real-time scoring and immediate feedback' }
      ]
    },
    schedule: [
      { phase: 'Round 1', date: 'January 20, 2025 - 2:00 PM', description: 'Basic programming problems (45 minutes)' },
      { phase: 'Round 2', date: 'January 20, 2025 - 3:00 PM', description: 'Advanced problems for qualified participants (75 minutes)' }
    ],
    venue: {
      online: {
        platform: 'Custom Platform',
        details: 'Real-time leaderboard with instant problem updates'
      }
    },
    registration: {
      teamSize: 'Individual',
      fee: 'Free Registration',
      deadline: 'January 18, 2025',
      requirements: ['Any programming language', 'Stable internet connection']
    }
  },
  {
    id: 'hackcode-championship',
    title: 'code-cascade',
    description: 'Ultimate coding championship with real-world problem solving',
    // poster: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'April 10-11, 2025',
    duration: '24 hours',
    type: 'Hackathon Style',
    difficulty: 'Advanced',
    prizes: ['₹75,000', '₹50,000', '₹25,000'],
    about: {
      title: 'About HackCode Championship',
      description: 'Our most prestigious event combining competitive programming with real-world application development. Teams tackle complex challenges over 24 hours.',
      features: [
        { icon: 'Laptop', title: 'Full Stack Challenge', description: 'Complete application development with algorithms' },
        { icon: 'Users2', title: 'Team Collaboration', description: 'Work together to solve complex problems' },
        { icon: 'Globe', title: 'Real World Problems', description: 'Industry-relevant challenges and use cases' },
        { icon: 'Crown', title: 'Championship Title', description: 'Winner becomes the annual coding champion' }
      ]
    },
    schedule: [
      { phase: 'Opening Ceremony', date: 'April 10, 2025 - 10:00 AM', description: 'Event kickoff and problem statement release' },
      { phase: 'Development Phase', date: 'April 10-11, 2025', description: '24-hour continuous development period' },
      { phase: 'Final Presentations', date: 'April 11, 2025 - 2:00 PM', description: 'Team presentations and judging' }
    ],
    venue: {
      online: {
        platform: 'GitHub + Discord',
        details: 'Code submission via GitHub, communication through Discord'
      },
      offline: {
        location: 'Main Auditorium, MMMUT',
        address: 'Central Campus, Presentation Hall'
      }
    },
    registration: {
      teamSize: '2-4 members',
      fee: '₹500 per team',
      deadline: 'April 5, 2025',
      requirements: ['Mixed skill team preferred', 'Laptop required', '24-hour availability']
    }
  }
];


