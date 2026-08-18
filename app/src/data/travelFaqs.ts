import { theme } from '../config/theme';
import type { FaqItem } from '../components/FaqAccordion';

const { venue } = theme.wedding;

/** Shared with the Q&A page — see components/FaqAccordion.tsx */
export const travelFaqs: FaqItem[] = [
  {
    q: `Where exactly is ${venue}?`,
    a: `${venue} is located at 561 Township Road 3352, Loudonville, OH 44842 — in the heart of Ohio's scenic Mohican country, about 75 miles northeast of Columbus and 90 miles south of Cleveland. It is about a 3 hour drive from our home in Covington.`,
  },
  {
    q: 'Is there parking at the venue?',
    a: `Yes! There's plenty of parking on site at ${venue}. If you prefer not to drive, we recommend coordinating rides with fellow guests.`,
  },
  {
    q: 'When should I book my hotel?',
    a: "As soon as possible! We've reserved a block of 31 suites at the castle for our wedding night, and rooms may fill up — so the sooner you book, the better. If you're interested in staying on-site, we recommend booking your suite as soon as you receive your invitation. If we run out of suites, there are nearby options available as well!",
  },
  {
    q: 'Can I bring my pet?',
    a: "We kindly ask that guests not bring pets to the castle property. Our dog Mister will be staying with us at the castle, and he is dog-reactive — having other animals on the property could cause him stress. If you need pet-friendly accommodation, the Loudonville area has a number of B&Bs, cabins, and vacation rentals that welcome pets. We appreciate your understanding!",
  },
];
