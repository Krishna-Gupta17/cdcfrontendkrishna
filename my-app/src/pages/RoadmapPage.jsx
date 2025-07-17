import Roadmap from "../components/Roadmap";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RoadmapPage = () => {
  // get domainTitle from URL parameter
  const { domainTitle } = useParams();
  // decode in case of spaces/special characters in route
  const decodedTitle = decodeURIComponent(domainTitle);
  // Define all roadmap data for each domain but all the roadmap data is not yet updated accordingly.
  const allRoadmaps = {
    "COMPETITIVE PROGRAMMING": {
      mainHeading: "BEGINNER'S ROADMAP TO COMPETITIVE PROGRAMMING",
      subHeading: "Level Up Your Problem-Solving Skills and Master Algorithms with This Step-by-Step Competitive Programming Roadmap, Guiding You from Beginner to Advanced to Excel in Coding Contests and Technical Interviews.",
      steps: [
        {
          title: "Programming Language Fundamentals",
          points: [
            { text: "Master a CP-friendly language (C++, Java recommended)", link: "" },
            { text: "Learn fast input/output techniques", link: "" },
            { text: "Understand functions and recursion", link: "" }
           ],
        },
        {
          title: "Basic Data Structures & Algorithms",
          points: [
            { text: "Arrays, strings, and linked lists", link: "" },
            { text: "Sorting and searching algorithms", link: "" },
            { text: "Basic math concepts (GCD, primes, modulo)", link: "" }
          ]
        },
        {
          title: "Intermediate Data Structures",
          points: [
            { text: "Stacks and queues (including priority queues)", link: "" },
            { text: "HashMaps/HashSets usage", link: "" },
            { text: "Binary trees and basic BSTs", link: "" }
          ]
        },
        {
          title: " Problem-Solving Patterns",
          points: [
            { text: "Sliding window and two-pointers", link: "" },
            { text: "Greedy algorithms", link: "" },
            { text: "Recursion and backtracking", link: "" }
          ]
        },
        {
          title: "Graph Algorithms",
          points: [
            { text: "Graph representation and traversal (BFS/DFS)", link: "" },
            { text: "Shortest path algorithms (Dijkstra, Bellman-Ford)", link: "" },
            { text: "Minimum spanning tree (Kruskal/Prim)", link: "" }
          ]
        },
         {
          title: "Advanced Topics",
          points: [
            { text: "Dynamic programming (1D and 2D basics)", link: "" },
            { text: "Segment trees / Binary Indexed Trees", link: "" },
            { text: "Bit manipulation fundamentals", link: "" }
          ]
        },
      ]

    },
    "WEB DEVELOPMENT": {
      mainHeading: "BEGINNER'S ROADMAP TO WEB DEVELOPMENT",
      subHeading: "Kickstart your journey into the world of coding with this step-by-step guide. From HTML basics to building responsive website.  This roadmap is your ultimate path to become a skilled web developer",
      steps: [
        {
          title: "What is Web Development",
          points: [
            { text: "How Websites Work?", link: "" },
            { text: "Front-End & Back-End", link: "" },
            { text: "Code Editor", link: "" }
          ],
        },
        {
          title: "Basic Front-End",
          points: [
            { text: "HTML", link: "" },
            { text: "CSS", link: "" },
            { text: "JavaScript", link: "" }
          ]
        },
        {
          title: "Tools",
          points: [
            { text: "Package Manager", link: "" },
            { text: "Build Tools", link: "" },
            { text: "Version Control", link: "" }
          ]
        },
        {
          title: "Additional Front-End",
          points: [
            { text: "Saas", link: "" },
            { text: "Responsive Design", link: "" },
            { text: "JavaScript Frameworks", link: "" }
          ]
        },
        {
          title: "Basic Backend",
          points: [
            { text: "Server", link: "" },
            { text: "Programming language", link: "" },
            { text: "Database", link: "" }
          ]
        },
      ]

    },
    "DATA STRUCTURES AND ALGORITHMS": {
      mainHeading: "BEGINNER'S ROADMAP TO Data Structure And Algorithm",
      subHeading: "Build a Strong Foundation in Data Structures and Algorithms with This Comprehensive Step-by-Step Roadmap, Taking You from Fundamentals to Advanced Concepts to Crack Coding Interviews and Solve Real-World Problems Efficiently",
      steps: [
        {
          title: "Programming Language Fundamentals",
          points: [
            { text: "Learn a language with good DSA support", link: "" },
            { text: "Understand arrays, loops, and functions", link: "" },
            { text: "Practice efficient input/output methods", link: "" }
          ],
        },
        {
          title: " Basic Data Structures",
          points: [
            { text: "Arrays and Strings Fundamentals", link: "" },
            { text: "Linked Lists ", link: "" },
            { text: "Stacks and Queues", link: "" }
          ]
        },
        {
          title: "Searching & Sorting",
          points: [
            { text: "Binary Search and Linear Search", link: "" },
            { text: "Sorting Algorithms", link: "" },
          ]
        },
        {
          title: "Trees",
          points: [
            { text: "Binary Trees and Binary Search Trees", link: "" },
            { text: "Tree traversals ", link: "" },
            { text: "Balanced Trees Basics (AVL, Red-Black overview)", link: "" }
          ]
        },
        {
          title: " Graphs",
          points: [
            { text: "Graph Representation", link: "" },
            { text: "DFS and BFS Algorithms", link: "" },
            { text: "Shortest Path (Dijkstra, Bellman-Ford)", link: "" }
          ]
        },
         {
          title: "Hashing & Heaps",
          points: [
            { text: "Hash tables and their collision handling", link: "" },
            { text: "Priority queues and heaps", link: "" },
            { text: "Heap sort and applications", link: "" }
          ]
        },
         {
          title: "Advanced Topics",
          points: [
            { text: "Dynamic programming basics", link: "" },
            { text: "Segment trees / Binary Indexed Trees", link: "" },
            { text: "Trie data structures", link: "" }
          ]
        },
      ]
    },
    "CYBER SECURITY": {
      mainHeading: "BEGINNER'S ROADMAP TO CYBER SECURITY",
      subHeading: "Master the World of Cyber Security with This Comprehensive Roadmap, Guiding You Step by Step from Basic Concepts to Advanced Defensive and Offensive Techniques, So You Can Protect Digital Assets and Build a Career as a Cyber Security Expert.",
      steps: [
        {
          title: "Programming Language Fundamentals",
          points: [
            { text: "Learn Python for scripting and automation", link: "" },
            { text: "Understand basic web development", link: "" },
            { text: "Practice bash/shell scripting for Linux environments", link: "" }
          ],
        },
        {
          title: "Computer Networks & Protocols",
          points: [
            { text: "Study OSI & TCP/IP models", link: "" },
            { text: "Learn how HTTP, DNS, and FTP work", link: "" },
            { text: "Use tools like Wireshark to analyze traffic", link: "" }
          ]
        },
        {
          title: "Operating Systems & Linux",
          points: [
            { text: "Understand file systems and user permissions", link: "" },
            { text: "Practice Linux commands and scripting", link: "" },
            { text: "Explore system processes and resource management", link: "" }
          ]
        },
        {
          title: "Cryptography Basics",
          points: [
            { text: "Learn symmetric vs asymmetric encryption", link: "" },
            { text: "Understand hashing algorithms (SHA, MD5)", link: "" },
            { text: "Explore SSL/TLS and HTTPS protocols", link: "" }
          ]
        },
        {
          title: "Vulnerabilities & Attacks",
          points: [
            { text: "XSS, SQLi, CSRF", link: "" },
            { text: "MITM & buffer overflow", link: "" },
            { text: "OWASP Top 10", link: "" }
          ]
        },
        {
          title: "Tools & Platforms",
          points: [
            { text: "Nmap, Burp Suite", link: "" },
            { text: "TryHackMe, HTB", link: "" },
            { text: "Firewalls & IDS", link: "" }
          ]
        },
        {
          title: "Ethical Hacking & Pen Testing",
          points: [
            { text: "Recon to exploitation", link: "" },
            { text: "Automate with scripts", link: "" },
            { text: "Report vulnerabilities", link: "" }
          ]
        },
      ]
    },
    "AI AND MACHINE LEARNING": {
      mainHeading: "BEGINNER'S ROADMAP TO AI AND MACHINE LEARNING",
      subHeading: "Unlock the Power of Artificial Intelligence and Machine Learning with This Complete Roadmap, Guiding You from Foundational Math and Programming Skills to Advanced Models and Real-World Applications, So You Can Innovate and Build Intelligent Systems.",
      steps: [
        {
          title: "Programming Language Fundamentals",
          points: [
            { text: "Learn Python", link: "" },
            { text: "Use libraries: NumPy, Pandas", link: "" },
            { text: "Basics of Jupyter Notebook", link: "" }
          ],
        },
        {
          title: "Math & Statistics",
          points: [
            { text: "Linear algebra & calculus", link: "" },
            { text: "Probability & statistics", link: "" },
            { text: "Matrix operations", link: "" }
          ]
        },
        {
          title: "Data Handling",
          points: [
            { text: "Data cleaning", link: "" },
            { text: "Data visualization", link: "" },
            { text: "Feature engineering", link: "" }
          ]
        },
        {
          title: "Machine Learning Basics",
          points: [
            { text: "Supervised vs unsupervised", link: "" },
            { text: "Algorithms: LR, DT, KNN", link: "" },
            { text: "Model evaluation (accuracy, F1)", link: "" }
          ]
        },
        {
          title: "Advanced ML Topics",
          points: [
            { text: "Ensemble methods (RF, GBM)", link: "" },
            { text: "Dimensionality reduction (PCA)", link: "" },
            { text: "Time series & clustering", link: "" }
          ]
        },
         {
          title: "Deep Learning",
          points: [
            { text: "Neural networks basics", link: "" },
            { text: "Use TensorFlow / PyTorch", link: "" },
            { text: "CNNs & RNNs intro", link: "" }
          ]
        },
      ]
    },
    "GRAPHIC DESIGNING": {
      mainHeading: "BEGINNER'S ROADMAP TO GRAPHIC DESIGNING",
      subHeading: "Transform Your Creativity into Stunning Visuals with This Complete Graphic Designing Roadmap, Taking You Step by Step from Design Principles and Essential Tools to Advanced Techniques and Professional Portfolio Building for a Successful Design Career.",
      steps: [
        {
          title: "Design Basics",
          points: [
            { text: "Learn color theory", link: "" },
            { text: "Understand typography", link: "" },
            { text: "Study layout & balance", link: "" }
          ],
        },
        {
          title: "Tools & Software",
          points: [
            { text: "Adobe Photoshop", link: "" },
            { text: "Adobe Illustrator", link: "" },
            { text: "Canva or Figma basics", link: "" }
          ]
        },
        {
          title: "Visual Elements",
          points: [
            { text: "Icons & illustrations", link: "" },
            { text: "Shapes and grids", link: "" },
            { text: "Text effects", link: "" }
          ]
        },
        {
          title: "Branding & Identity",
          points: [
            { text: "Logo design basics", link: "" },
            { text: "Brand colors & fonts", link: "" },
            { text: "Moodboards & stylescapes", link: "" }
          ]
        },
        {
          title: "UI/UX Design",
          points: [
            { text: "Wireframes & mockups", link: "" },
            { text: "UI kits and components", link: "" },
            { text: "Mobile & web layouts", link: "" }
          ]
        },
      ]
    },
    "BLOCKCHAIN AND WEB3": {
      mainHeading: "BEGINNER'S ROADMAP TO BLOCKCHAIN AND WEB3",
      subHeading: "Dive into the Future of Decentralized Technology with This Complete Blockchain and Web3 Roadmap, Guiding You from Core Blockchain Fundamentals and Smart Contracts to Advanced dApp Development and Ecosystem Mastery for Building the Next Generation of the Internet",
      steps: [
        {
          title: "Programming Language Fundamentals",
          points: [
            { text: "Learn JavaScript", link: "" },
            { text: "Solidity for smart contracts", link: "" },
            { text: "Use Node.js basics", link: "" }
          ],
        },
        {
          title: "Blockchain Basics",
          points: [
            { text: "Understand decentralization", link: "" },
            { text: "Learn how blockchain works", link: "" },
            { text: "Study consensus algorithms", link: "" }
          ]
        },
        {
          title: "Smart Contracts",
          points: [
            { text: "Write with Solidity", link: "" },
            { text: "Use Remix IDE", link: "" },
            { text: "Test with Ganache", link: "" }
          ]
        },
        {
          title: "Ethereum & Web3.js",
          points: [
            { text: "Learn Ethereum basics", link: "" },
            { text: "Connect with Web3.js", link: "" },
            { text: "Interact with contracts", link: "" }
          ]
        },
        {
          title: " Wallets & Transactions",
          points: [
            { text: "Use MetaMask", link: "" },
            { text: "Understand gas & fees", link: "" },
            { text: "Sign/send transactions", link: "" }
          ]
        },
        {
          title: " dApps Development",
          points: [
            { text: "Frontend with React", link: "" },
            { text: "Connect wallet to UI", link: "" },
            { text: "Use Ethers.js or Web3.js", link: "" }
          ]
        },
        {
          title: "Explore Web3 Ecosystem",
          points: [
            { text: "NFTs & marketplaces", link: "" },
            { text: "DAOs & governance", link: "" },
            { text: "DeFi platforms overview", link: "" }
          ]
        },
      ]
    },
  }

  // get roadmap for decodedTitle
  const roadmap = allRoadmaps[decodedTitle];
  // fallback if no roadmap found
  if (!roadmap) {
    return <h2>Sorry! Roadmap not found</h2>;
  }
  // render the roadmap component
  return (
    <div className="bg-transparent">
    <Roadmap 
      mainHeading={roadmap.mainHeading}
      subHeading={roadmap.subHeading}
      steps={roadmap.steps}
    />
    </div>
);
}

export default RoadmapPage;
