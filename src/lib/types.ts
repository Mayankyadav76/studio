export type UserRole = 'user' | 'ngo' | 'hospital';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Report = {
  id: string;
  userId: string;
  userContact: string;
  animalType: string;
  conditionReport: string;
  locationDetails: string;
  imageUrl: string;
  imageHint: string;
  timestamp: string;
  status: 'Reported' | 'Rescued' | 'In Treatment' | 'Resolved';
  needsHumanAttention: boolean;
  reason: string;
};

export type HospitalTreatment = {
  id: string;
  reportId: string;
  animalType: string;
  condition: string;
  status: 'Admitted' | 'Under Treatment' | 'Recovered' | 'Released';
  admissionDate: string;
};
