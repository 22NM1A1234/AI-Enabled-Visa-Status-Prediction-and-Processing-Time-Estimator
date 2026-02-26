/**
 * Static visa data for comparison, info, and historical visualizations.
 * Based on reference dataset patterns.
 */

export interface CountryData {
  code: string;
  flag: string;
  name: string;
  avgProcessingDays: number;
  range: string;
  embassyLink: string;
  region: string;
}

export const countries: CountryData[] = [
  { code: "US", flag: "🇺🇸", name: "USA", avgProcessingDays: 6.8, range: "5-9", embassyLink: "https://www.indiainnewyork.gov.in/", region: "Americas" },
  { code: "GB", flag: "🇬🇧", name: "UK", avgProcessingDays: 7.2, range: "5-9", embassyLink: "https://www.hcilondon.gov.in/", region: "Europe" },
  { code: "CA", flag: "🇨🇦", name: "Canada", avgProcessingDays: 7.5, range: "6-9", embassyLink: "https://www.hciottawa.gov.in/", region: "Americas" },
  { code: "AU", flag: "🇦🇺", name: "Australia", avgProcessingDays: 8.5, range: "6-11", embassyLink: "https://www.hcindia-au.org/", region: "Oceania" },
  { code: "DE", flag: "🇩🇪", name: "Germany", avgProcessingDays: 9.1, range: "7-11", embassyLink: "https://www.indianembassyberlin.gov.in/", region: "Europe" },
  { code: "FR", flag: "🇫🇷", name: "France", avgProcessingDays: 7.8, range: "6-10", embassyLink: "https://www.ambinde.fr/", region: "Europe" },
  { code: "JP", flag: "🇯🇵", name: "Japan", avgProcessingDays: 6.5, range: "5-8", embassyLink: "https://www.indembassy-tokyo.gov.in/", region: "Asia" },
  { code: "CN", flag: "🇨🇳", name: "China", avgProcessingDays: 10.2, range: "8-13", embassyLink: "https://www.indianembassybeijing.gov.in/", region: "Asia" },
  { code: "AE", flag: "🇦🇪", name: "UAE", avgProcessingDays: 5.2, range: "4-7", embassyLink: "https://www.indembassyuae.gov.in/", region: "Asia" },
  { code: "SG", flag: "🇸🇬", name: "Singapore", avgProcessingDays: 5.0, range: "4-6", embassyLink: "https://www.hcisingapore.gov.in/", region: "Asia" },
  { code: "BR", flag: "🇧🇷", name: "Brazil", avgProcessingDays: 9.8, range: "8-12", embassyLink: "https://www.indiabrasilia.gov.in/", region: "Americas" },
  { code: "ZA", flag: "🇿🇦", name: "South Africa", avgProcessingDays: 8.5, range: "7-10", embassyLink: "https://www.hcipretoria.gov.in/", region: "Africa" },
  { code: "RU", flag: "🇷🇺", name: "Russia", avgProcessingDays: 12.0, range: "10-14", embassyLink: "https://www.indianembassymoscow.gov.in/", region: "Europe" },
  { code: "KR", flag: "🇰🇷", name: "South Korea", avgProcessingDays: 5.8, range: "5-7", embassyLink: "https://www.indembassyseoul.gov.in/", region: "Asia" },
  { code: "IT", flag: "🇮🇹", name: "Italy", avgProcessingDays: 8.0, range: "7-9", embassyLink: "https://www.indianembassyrome.gov.in/", region: "Europe" },
  { code: "ES", flag: "🇪🇸", name: "Spain", avgProcessingDays: 8.0, range: "7-9", embassyLink: "https://www.embassyofindiamadrid.gov.in/", region: "Europe" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands", avgProcessingDays: 7.2, range: "6-8", embassyLink: "https://www.indianembassythehague.gov.in/", region: "Europe" },
  { code: "CH", flag: "🇨🇭", name: "Switzerland", avgProcessingDays: 6.0, range: "5-7", embassyLink: "https://www.indembassybern.gov.in/", region: "Europe" },
  { code: "SA", flag: "🇸🇦", name: "Saudi Arabia", avgProcessingDays: 6.5, range: "5-8", embassyLink: "https://www.indianembassy.org.sa/", region: "Asia" },
  { code: "NG", flag: "🇳🇬", name: "Nigeria", avgProcessingDays: 10.0, range: "8-12", embassyLink: "https://www.hcilagos.gov.in/", region: "Africa" },
  { code: "NP", flag: "🇳🇵", name: "Nepal", avgProcessingDays: 4.0, range: "3-5", embassyLink: "https://www.indianembassy.org.np/", region: "Asia" },
  { code: "LK", flag: "🇱🇰", name: "Sri Lanka", avgProcessingDays: 5.0, range: "4-6", embassyLink: "https://www.hcicolombo.gov.in/", region: "Asia" },
  { code: "PK", flag: "🇵🇰", name: "Pakistan", avgProcessingDays: 22.0, range: "15-30", embassyLink: "https://www.indianhighcommission.com.pk/", region: "Asia" },
];

export interface VisaCategory {
  name: string;
  duration: string;
  description: string;
  avgProcessing: string;
  avgDays: number;
}

export const visaCategories: VisaCategory[] = [
  { name: "Tourist Visa", duration: "Up to 180 days", description: "For tourism, sightseeing, and casual visits", avgProcessing: "5-7 days", avgDays: 6.2 },
  { name: "Business Visa", duration: "Up to 1 year", description: "For business meetings, conferences, and trade", avgProcessing: "7-10 days", avgDays: 8.5 },
  { name: "Student Visa", duration: "Duration of study", description: "For academic study at recognized institutions", avgProcessing: "10-15 days", avgDays: 12.3 },
  { name: "Employment Visa", duration: "Up to 5 years", description: "For skilled workers and professionals", avgProcessing: "10-12 days", avgDays: 10.1 },
  { name: "Medical Visa", duration: "Up to 60 days", description: "For medical treatment in India", avgProcessing: "3-5 days", avgDays: 5.8 },
  { name: "Conference Visa", duration: "Duration of event", description: "For attending conferences and seminars", avgProcessing: "5-7 days", avgDays: 6.5 },
];

export const monthlyTrends = [
  { month: "Jan", days: 7.8 },
  { month: "Feb", days: 7.5 },
  { month: "Mar", days: 7.2 },
  { month: "Apr", days: 7.0 },
  { month: "May", days: 6.8 },
  { month: "Jun", days: 6.5 },
  { month: "Jul", days: 6.5 },
  { month: "Aug", days: 7.0 },
  { month: "Sep", days: 8.2 },
  { month: "Oct", days: 9.8 },
  { month: "Nov", days: 10.1 },
  { month: "Dec", days: 9.5 },
];

export const featureImportance = [
  { feature: "Education Level", importance: 85 },
  { feature: "Job Experience", importance: 78 },
  { feature: "Prevailing Wage", importance: 72 },
  { feature: "Continent", importance: 65 },
  { feature: "Full-time Position", importance: 58 },
  { feature: "Job Training", importance: 52 },
  { feature: "Region", importance: 45 },
  { feature: "No. of Employees", importance: 38 },
  { feature: "Year of Estab.", importance: 32 },
  { feature: "Wage Unit", importance: 25 },
];
