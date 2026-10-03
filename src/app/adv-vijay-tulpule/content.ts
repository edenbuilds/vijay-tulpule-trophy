// Content for /adv-vijay-tulpule. Edit copy here; layout lives in page.tsx.
// Source for all facts: Full Court Reference, Bombay High Court, 17 November 2017.
// Checked line by line against the PDF text on 03-10-2026. Two edits from the supplied draft: the BBA president's tribute is now
// his exact words (the draft paraphrased it), and Adv. Anil Sakhare's remark follows the Reference's wording.

export const hero = {
  kicker: "In memoriam",
  prefix: "The late",
  name: "Adv. Vijay Tulpule",
  dates: "22 September 1943 to 29 September 2017",
  descriptor:
    "Criminal trial lawyer at the Bombay Bar. Government Pleader and Public Prosecutor for the State of Maharashtra. Patron of Advocates' cricket.",
  image: "/img/tulpule-informal.jpg",
  imageW: 508,
  imageH: 661,
  imageAlt: "Portrait of the late Adv. Vijay Tulpule",
  caption: "The late Adv. Vijay Tulpule",
};

export const glance = [
  { value: "1968", label: "Enrolled as an advocate" },
  { value: "c. 45", label: "Juniors trained in his chamber" },
  { value: "1998 to 2000", label: "Government Pleader and Public Prosecutor" },
  { value: "1994 to 1999", label: "President and Patron, Indian Advocates Cricket Association" },
];

export type Callout = { text: string; by: string };
export type CaseItem = { title: string; body: string };
export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  callout?: Callout;
  cases?: CaseItem[];
  afterCases?: string[];
};

export const sections: Section[] = [
  {
    id: "in-brief",
    title: "In brief",
    paragraphs: [
      "The late Adv. Vijay Traymbak Tulpule practised at the Bombay Bar for almost fifty years, principally as a criminal trial lawyer. From 1998 to 2000 he served as Government Pleader and Public Prosecutor for the State of Maharashtra in the High Court. He trained about 45 juniors and was a patron of Advocates' cricket.",
      "Before he enrolled as an advocate, he was a Bombay Ranji Trophy probable. The Bombay High Court held a Full Court Reference in his memory on 17 November 2017, at which the Chief Justice, the Advocate General, the Additional Solicitor General and the heads of the Bar bodies paid tribute.",
    ],
  },
  {
    id: "early-life",
    title: "Early life and education",
    paragraphs: [
      "Adv. Vijay Tulpule was born in Mumbai on 22 September 1943, the son of the cardiologist Traymbak Hari Tulpule. His elder brother, the late Dr. Ashok Tulpule, was also a well known cardiologist. The family home in Dadar was a meeting place for freedom-movement activists, and during the Emergency many took shelter there. Classical musicians, among them Pandit Bhimsen Joshi and Hirabai Badodekar, were friends of the family.",
      "He completed school at King George High School, Dadar, in 1959, studied at Elphinstone College and then St. Xavier's College, and graduated in 1964. He took his law degree at Government Law College, Mumbai, in 1967. Colleagues recalled that he grew up with liberal socialist convictions.",
      "He was enrolled as an advocate with the Bar Council of Maharashtra and Goa on 27 March 1968.",
    ],
  },
  {
    id: "the-bar",
    title: "Practice at the Bar",
    paragraphs: [
      "Adv. Tulpule began in the chamber of the late Adv. Ramrao Adik, where he remained for about five years, and then practised independently in the trial courts at Dadar. He appeared in the Sessions Court in Mumbai, the High Court and the Supreme Court. The Reference records that he handled matters in civil, industrial and constitutional law as well, but criminal trial work was the core of his practice.",
      "The tributes describe a lawyer of method. He visited the scene of the incident in nearly every appeal. He was an acknowledged cross-examiner and was well versed in medical evidence. For the Srikrishna Commission in 1993, he worked in his office until three or four in the morning for months and read every word of a voluminous charge-sheet. He did not conceal facts that were adverse to his own clients.",
      "Adv. Chaitanya Pendse, his junior, recalled that he watched the clock at the start and end of his submissions, was brief and exact, and could read the mind of the Judge within the first five minutes.",
    ],
    cases: [
      {
        title: "Malegaon blast case",
        body: "Appeared for an accused. Colleagues credit his efforts for the dropping of MCOCA charges.",
      },
      {
        title: "Bandu Shingre trial",
        body: "Secured a clear acquittal for his client in a trial in which the odds were against the accused.",
      },
      {
        title: "Lentin and Srikrishna Commissions",
        body: "Appeared for the State before the Lentin Commission and for a client before the Srikrishna Commission.",
      },
      {
        title: "Prakash Pralhad Patil v. State of Maharashtra (2008)",
        body: "Appeared for the petitioner. The Division Bench revisited the norms for appointing Special Public Prosecutors under Section 24 of the CrPC.",
      },
      {
        title: "Brahmadev Dubey v. State of Maharashtra (2013)",
        body: "Held that a notary cannot be prosecuted for acts done while notarising, except on a complaint by an officer authorised by the Central or State Government.",
      },
      {
        title: "Special Counsel for the State",
        body: "Appointed in several matters, including a writ petition by the 7/11 accused alleging custodial violence, and to oppose anticipatory bail.",
      },
    ],
  },
  {
    id: "public-prosecutor",
    title: "Government Pleader and Public Prosecutor, 1998 to 2000",
    paragraphs: [
      "As Government Pleader and Public Prosecutor, Adv. Tulpule conducted State appeals, confirmation cases and detention matters. Speakers at the Reference described him as a model officer of the Court who never identified himself with the case, and whose commitment, once he accepted a brief, was complete.",
      "In a murder appeal that reached the High Court after 13 years, he persuaded the Division Bench of Justice N. U. Arumugham and Justice R. P. Desai that the acquittal was wrong, and the accused was convicted under Section 302 of the Indian Penal Code. Asked why he was not pressing for the death sentence, he answered that as an officer of the Court and the State's representative he sought only life imprisonment, and explained why. When the Bench asked whether his statement should be recorded, he said that he insisted on it. The Supreme Court later endorsed his stand.",
      "In the shoes scam case, a police officer instructing him asked that the Court be told facts that were not correct, describing them as orders of the Home Department. Adv. Tulpule refused. The Court issued a non-bailable warrant against the officer, and Adv. Tulpule argued the matter on the true facts and the law and obtained orders in favour of the State. The principle he established was that a Public Prosecutor is an officer of the Court and not the mouthpiece of the police.",
    ],
    callout: {
      text: "I am standing between My Lord and the accused. As long as I am standing here, I will not allow any arbitrariness.",
      by: "Words attributed to the late Adv. Vijay Tulpule by Adv. Rajiv Chavan, before a Judge who had said the accused would be sent to prison regardless of argument. The accused was acquitted.",
    },
  },
  {
    id: "teacher",
    title: "Teacher and chamber",
    paragraphs: [
      "About 45 juniors trained in the chamber of the late Adv. Vijay Tulpule. Adv. Uma Wagle recalled that a junior was expected to be a sportsman or an artist. He taught English to his Marathi-speaking juniors by buying English novels and having them read aloud in the office each evening. In a contempt matter against the Marathi daily Navakal, he translated its reports into English that impressed the Court.",
      "Adv. Pendse described his method of teaching as unconventional and aimed at making juniors stand independently: a senior who told them he could not feed them forever and that they would have to learn to hunt. He also protected their standing. The Reference records that he insisted on respect for a junior of his chamber even from a powerful client.",
    ],
  },
  {
    id: "sport",
    title: "Cricket and sport",
    paragraphs: [
      "Adv. Vijay Tulpule was a Bombay Ranji Trophy probable before he entered the legal profession. The Reference records that Sunil Gavaskar and Dilip Vengsarkar played with him, and that Dilip Vengsarkar recognised his cricketing ability. Senior Advocate Anil Sakhare recalled that he would have represented the Indian cricket team but for his straightforward, defiant nature and no-nonsense attitude in life.",
      "Adv. Deepak Thakre recalled an all India advocates' final at the Chinnaswamy Stadium, Bangalore, in which he scored 90 and received a standing ovation that included the then Chief Justice of India, Justice M. N. Venkatachaliah, and the spinner Erapalli Prasanna. He led the Advocates' team in the Indian High Courts Cricket Tournament and sponsored young players at Dadar Union Club and Matunga Gymkhana.",
      "From 1994 to 1999 he was President and Patron of the Indian Advocates Cricket Association, where he was known as Guruji. He also headed volleyball, carrom and badminton associations and promoted table tennis. He attended State and national volleyball championships in small towns, met the cost of lodging and meals for players, and intervened when a leading player was denied a place in the Maharashtra State team.",
    ],
  },
  {
    id: "character",
    title: "Character and public service",
    paragraphs: [
      "Speaker after speaker at the Reference returned to the same qualities: candour, fairness and generosity that he never publicised. Adv. Rajiv Chavan recalled that he gave to the Advocates' Association of Western India without hesitation when it marked 150 years in 2014, and that when the hotel bills of an all India cricket tournament fell due, he asked his juniors to sell his own shares to settle them.",
      "Between 1992 and 1994 he undertook a hunger strike, which lasted six days, to press for the City Civil Court to be given the jurisdiction of a district court. On the sixth day the then Law Minister, the late Adv. Ramrao Adik, met him, asked him to end the fast and assured him of prompt action. The State Government acceded to the demand.",
      "The Chief Justice remarked that he was an advocate who adhered to procedure and the law of evidence, was not influenced by media trial, and promoted human rights.",
    ],
  },
];

export const timeline = [
  { year: "1943", text: "Born in Mumbai on 22 September." },
  { year: "1959 to 1964", text: "King George High School, Elphinstone College, then St. Xavier's College." },
  { year: "1967", text: "Law degree, Government Law College, Mumbai." },
  { year: "1968", text: "Enrolled as an advocate on 27 March. Joined the chamber of the late Adv. Ramrao Adik, then practised at the Dadar Court." },
  { year: "1992 to 1994", text: "Six-day hunger strike for the jurisdiction of the City Civil Court." },
  { year: "1994 to 1999", text: "President and Patron, Indian Advocates Cricket Association." },
  { year: "1998 to 2000", text: "Government Pleader and Public Prosecutor, Bombay High Court." },
  { year: "2017", text: "Passed away in Mumbai on 29 September, aged 74. Full Court Reference held on 17 November." },
];

export const tributes = [
  {
    quote: "A great legal personality and human being passed away.",
    by: "Hon'ble Dr. Justice Manjula Chellur",
    role: "Chief Justice, Bombay High Court",
  },
  {
    quote: "He was a stalwart of the criminal bar.",
    by: "Adv. Anil Singh",
    role: "Additional Solicitor General of India",
  },
  {
    quote: "Truly an all-rounder in life, both in legal practice as well as his other pursuits.",
    by: "Dr. Milind Sathe",
    role: "President, Bombay Bar Association",
  },
  {
    quote: "A man whose generosity was unparalleled.",
    by: "Adv. Rajiv Chavan",
    role: "President, Advocates' Association of Western India",
  },
];

export const legacy = {
  id: "legacy",
  title: "Legacy: The Vijay Tulpule Trophy",
  paragraphs: [
    "At the time of the Full Court Reference in 2017, the Advocates' Association of Western India was holding a Vijay Tulpule Cricket Championship Trophy, and the Mumbai Cricket Association held one for under-13 teams.",
    "In October 2026, the winners of the 38th All India Advocates' Cricket Tournament will receive The Vijay Tulpule Trophy in the name of the late Adv. Vijay Tulpule.",
  ],
  closing: "Be sure to put your feet in the right place, then stand firm.",
  closingBy: "The words of Abraham Lincoln that the late Adv. Tulpule taught his juniors to live by, as recalled by Adv. Rajiv Chavan.",
};

export const cta = {
  title: "The Vijay Tulpule Trophy",
  body: "Presented on 24 October, straight after the final.",
  href: "/trophy",
  label: "See the trophy",
};

export const sourceNote =
  "Source: Full Court Reference to the late Mr. Vijay Traymbak Tulpule, Bombay High Court, 17 November 2017.";

export const nav = [
  ...sections.map((s) => ({ id: s.id, title: s.title.split(",")[0] })),
  { id: "timeline", title: "Timeline" },
  { id: "tributes", title: "Tributes" },
  { id: "legacy", title: "Legacy" },
];
