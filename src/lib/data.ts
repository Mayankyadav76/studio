import type { Report, HospitalTreatment } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const reportCat1 = PlaceHolderImages.find(p => p.id === "report-cat-1");
const reportDog1 = PlaceHolderImages.find(p => p.id === "report-dog-1");
const reportBird1 = PlaceHolderImages.find(p => p.id === "report-bird-1");
const reportDog2 = PlaceHolderImages.find(p => p.id === "report-dog-2");

export const mockReports: Report[] = [
  {
    id: 'REP001',
    userId: 'USR001',
    userContact: 'jane.doe@example.com',
    animalType: 'Dog',
    conditionReport: 'Small puppy, appears to be very weak and is shivering. It has not moved from the spot in the last hour.',
    locationDetails: 'Near the bus stop on Oak Avenue, behind the trash cans.',
    imageUrl: reportDog2?.imageUrl || '',
    imageHint: reportDog2?.imageHint || 'sad puppy',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'Reported',
    needsHumanAttention: true,
    reason: 'The report indicates a young animal in a vulnerable condition (weak, shivering), which suggests a high risk of deterioration. Immediate intervention is required.',
  },
  {
    id: 'REP002',
    userId: 'USR002',
    userContact: 'john.smith@example.com',
    animalType: 'Cat',
    conditionReport: 'A grown cat, seems to have a scratch on its ear but is moving around and seems able to find food.',
    locationDetails: 'Alleyway behind the Grand Theatre.',
    imageUrl: reportCat1?.imageUrl || '',
    imageHint: reportCat1?.imageHint || 'stray cat',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'Reported',
    needsHumanAttention: false,
    reason: 'The animal is mobile and not in immediate visible distress. The injury appears minor. The case can be scheduled for a non-urgent check-up.',
  },
  {
    id: 'REP003',
    userId: 'USR003',
    userContact: 'sara.jones@example.com',
    animalType: 'Bird',
    conditionReport: 'A pigeon with its wing bent at an odd angle. It is trying to fly but cannot get off the ground.',
    locationDetails: 'On the sidewalk outside 123 Main St.',
    imageUrl: reportBird1?.imageUrl || '',
    imageHint: reportBird1?.imageHint || 'injured bird',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'Rescued',
    needsHumanAttention: true,
    reason: 'The inability to fly makes the bird extremely vulnerable to predators and traffic. This requires immediate rescue.',
  },
    {
    id: 'REP004',
    userId: 'USR004',
    userContact: 'mike.williams@example.com',
    animalType: 'Dog',
    conditionReport: 'Large dog, looks like a golden retriever. Has a collar but no tags. Seems lost and is barking at passersby.',
    locationDetails: 'Wandering in Central Park near the fountain.',
    imageUrl: reportDog1?.imageUrl || '',
    imageHint: reportDog1?.imageHint || 'lost dog',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'In Treatment',
    needsHumanAttention: false,
    reason: 'The animal seems healthy but lost. While it needs assistance, it is not an immediate medical emergency.',
  },
];

export const mockTreatments: HospitalTreatment[] = [
    {
        id: 'TRT001',
        reportId: 'REP003',
        animalType: 'Bird',
        condition: 'Broken wing',
        status: 'Under Treatment',
        admissionDate: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'TRT002',
        reportId: 'REP004',
        animalType: 'Dog',
        condition: 'Malnutrition, Dehydration',
        status: 'Admitted',
        admissionDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    }
];
