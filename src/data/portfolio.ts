export const PROJECTS = [
  {
    id: 'ocr',
    name: 'Prescription OCR System',
    description: 'Deep learning pipeline to extract drug names and dosages from handwritten prescriptions.',
    stack: ['TensorFlow', 'OpenCV', 'Python'],
    result: 'Targeting state-of-art OCR benchmark improvement',
    status: 'Research — Ongoing',
    accent: 'cyan' as const,
  },
  {
    id: 'carbon',
    name: 'AI Carbon Footprint Tracker',
    description: 'Full-stack platform for analysing organisational carbon emission data with AI-driven insights.',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Flask', 'LLaMA'],
    result: 'End-to-end ML + LLM pipeline on real emission data',
    status: 'Completed — 2025',
    accent: 'violet' as const,
  },
  {
    id: 'health',
    name: 'Health Assistant',
    description: 'Prescription analysis, storage system, and appointment booking powered by CNN and BiLSTM.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'CNN', 'BiLSTM'],
    result: 'Handwritten prescription analysis + full booking system',
    status: 'Completed',
    accent: 'cyan' as const,
  },
  {
    id: 'salary',
    name: 'Employee Salary Predictor',
    description: 'ML pipeline trained on census data comparing Logistic Regression, Decision Tree, and HistGradientBoosting.',
    stack: ['scikit-learn', 'Pandas', 'NumPy', 'Python'],
    result: 'Compared accuracy, precision, recall and F1 across 3 models',
    status: 'Completed — 2025',
    accent: 'amber' as const,
  },
];

export const SKILLS = [
  { name: 'Python', projects: 4, detail: '4 projects · ML pipelines, data processing' },
  { name: 'TensorFlow / Keras', projects: 2, detail: '2 projects · CNN, RNN, LSTM' },
  { name: 'OpenCV', projects: 2, detail: '2 projects · Computer Vision, OCR' },
  { name: 'Next.js / React', projects: 2, detail: '2 projects · Full-stack platforms' },
  { name: 'Node.js / Express', projects: 2, detail: '2 projects · RESTful APIs' },
  { name: 'MongoDB', projects: 2, detail: '2 projects · Atlas, scalable storage' },
  { name: 'LLaMA / HuggingFace', projects: 1, detail: '1 project · AI-driven insights' },
  { name: 'Docker', projects: 1, detail: 'Internship · Containerised infrastructure' },
  { name: 'scikit-learn', projects: 1, detail: '1 project · Model comparison, optimisation' },
];

export const SKILL_CONNECTIONS = [
  [0, 1], // Python → TensorFlow
  [0, 2], // Python → OpenCV
  [0, 8], // Python → scikit-learn
  [1, 2], // TensorFlow → OpenCV
  [3, 4], // Next.js → Node.js
  [3, 6], // Next.js → LLaMA
  [4, 5], // Node.js → MongoDB
  [4, 7], // Node.js → Docker
];

export const HERO = {
  name: 'Saurav Panigrahi',
  headline: 'I build ML systems that ship.',
  sub: 'CS undergrad at IIIT Bhubaneswar · ML Engineer · Full-Stack Developer',
  email: 'saurav.edge@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};