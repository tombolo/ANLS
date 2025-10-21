export interface Task {
    id: string;
    title: string;
    reward: number;
    timeEstimate: string;
    category: string;
    description: string;
    steps: number;
    duration: number;
    activities: string[];
}

// Function to generate random alphanumeric IDs
const generateRandomId = (length: number = 12): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const availableTasks: Task[] = [
    {
        id: generateRandomId(),
        title: "Demographics Survey",
        reward: 2.50,
        timeEstimate: "10-15 min",
        category: "Survey",
        description: "Share basic demographic information for research purposes",
        steps: 5,
        duration: 60,
        activities: [
            "Collecting demographic data",
            "Analyzing age distribution",
            "Processing location information",
            "Compiling education levels",
            "Generating summary report"
        ]
    },
    {
        id: generateRandomId(),
        title: "Product Feedback Study",
        reward: 3.00,
        timeEstimate: "20-25 min",
        category: "User Testing",
        description: "Provide feedback on a new product interface",
        steps: 8,
        duration: 120,
        activities: [
            "Testing product navigation",
            "Evaluating user interface",
            "Providing feature feedback",
            "Rating user experience",
            "Suggesting improvements",
            "Comparing with competitors",
            "Completing satisfaction survey",
            "Submitting final review"
        ]
    },
    {
        id: generateRandomId(),
        title: "Image Annotation Task",
        reward: 1.00,
        timeEstimate: "30-35 min",
        category: "Data Labeling",
        description: "Label objects in images for machine learning training",
        steps: 12,
        duration: 180,
        activities: [
            "Loading image dataset",
            "Identifying objects in images",
            "Drawing bounding boxes",
            "Labeling object categories",
            "Verifying annotation accuracy",
            "Correcting mislabeled items",
            "Exporting annotation data",
            "Quality checking results",
            "Generating metadata",
            "Compressing final dataset",
            "Creating summary report",
            "Uploading completed task"
        ]
    },
    {
        id: generateRandomId(),
        title: "Audio Transcription",
        reward: 3.00,
        timeEstimate: "40-45 min",
        category: "Transcription",
        description: "Transcribe short audio clips to text",
        steps: 15,
        duration: 240,
        activities: [
            "Loading audio files",
            "Listening to audio clips",
            "Transcribing speech to text",
            "Time-stamping transcriptions",
            "Identifying speakers",
            "Noting background sounds",
            "Correcting transcription errors",
            "Formatting text output",
            "Adding punctuation",
            "Proofreading transcript",
            "Quality assurance check",
            "Exporting final transcript",
            "Generating word count",
            "Creating accuracy report",
            "Submitting completed work"
        ]
    },
    {
        id: generateRandomId(),
        title: "Sentiment Analysis",
        reward: 3.50,
        timeEstimate: "15-20 min",
        category: "Text Analysis",
        description: "Classify text excerpts by emotional sentiment",
        steps: 10,
        duration: 90,
        activities: [
            "Loading text samples",
            "Reading and understanding content",
            "Identifying emotional cues",
            "Classifying sentiment polarity",
            "Rating sentiment intensity",
            "Noting contextual factors",
            "Cross-verifying classifications",
            "Compiling results",
            "Generating sentiment report",
            "Exporting final analysis"
        ]
    },
    {
        id: generateRandomId(),
        title: "Social Media Content Moderation",
        reward: 2.25,
        timeEstimate: "25-30 min",
        category: "Content Review",
        description: "Review and moderate social media content according to guidelines",
        steps: 9,
        duration: 150,
        activities: [
            "Reviewing content submissions",
            "Applying moderation guidelines",
            "Flagging inappropriate content",
            "Categorizing content types",
            "Documenting moderation decisions",
            "Escalating complex cases",
            "Providing feedback on guidelines",
            "Generating moderation reports",
            "Updating moderation database"
        ]
    },
    {
        id: generateRandomId(),
        title: "Market Research Survey",
        reward: 2.00,
        timeEstimate: "35-40 min",
        category: "Research",
        description: "Participate in market research about consumer preferences",
        steps: 11,
        duration: 210,
        activities: [
            "Answering demographic questions",
            "Rating product preferences",
            "Comparing brand perceptions",
            "Providing purchase intent feedback",
            "Sharing shopping habits",
            "Evaluating advertising effectiveness",
            "Suggesting product improvements",
            "Rating customer service experiences",
            "Completing brand association exercises",
            "Providing pricing feedback",
            "Submitting final survey"
        ]
    },
    {
        id: generateRandomId(),
        title: "Video Captioning Task",
        reward: 4.50,
        timeEstimate: "45-50 min",
        category: "Accessibility",
        description: "Create accurate captions for short video clips",
        steps: 14,
        duration: 270,
        activities: [
            "Loading video files",
            "Transcribing spoken content",
            "Time-syncing captions",
            "Adding sound descriptions",
            "Formatting caption styles",
            "Proofreading transcriptions",
            "Adjusting timing accuracy",
            "Adding speaker identifiers",
            "Reviewing for accessibility",
            "Exporting caption files",
            "Quality checking output",
            "Generating compliance report",
            "Creating style guide notes",
            "Submitting completed work"
        ]
    },
    {
        id: generateRandomId(),
        title: "Demographics Survey",
        reward: 2.50,
        timeEstimate: "10-15 min",
        category: "Survey",
        description: "Share basic demographic information for research purposes",
        steps: 5,
        duration: 60,
        activities: [
            "Collecting demographic data",
            "Analyzing age distribution",
            "Processing location information",
            "Compiling education levels",
            "Generating summary report"
        ]
    },
    {
        id: generateRandomId(),
        title: "Product Feedback Study",
        reward: 3.00,
        timeEstimate: "20-25 min",
        category: "User Testing",
        description: "Provide feedback on a new product interface",
        steps: 8,
        duration: 120,
        activities: [
            "Testing product navigation",
            "Evaluating user interface",
            "Providing feature feedback",
            "Rating user experience",
            "Suggesting improvements",
            "Comparing with competitors",
            "Completing satisfaction survey",
            "Submitting final review"
        ]
    },
    {
        id: generateRandomId(),
        title: "Image Annotation Task",
        reward: 1.00,
        timeEstimate: "30-35 min",
        category: "Data Labeling",
        description: "Label objects in images for machine learning training",
        steps: 12,
        duration: 180,
        activities: [
            "Loading image dataset",
            "Identifying objects in images",
            "Drawing bounding boxes",
            "Labeling object categories",
            "Verifying annotation accuracy",
            "Correcting mislabeled items",
            "Exporting annotation data",
            "Quality checking results",
            "Generating metadata",
            "Compressing final dataset",
            "Creating summary report",
            "Uploading completed task"
        ]
    },
    {
        id: generateRandomId(),
        title: "Audio Transcription",
        reward: 3.00,
        timeEstimate: "40-45 min",
        category: "Transcription",
        description: "Transcribe short audio clips to text",
        steps: 15,
        duration: 240,
        activities: [
            "Loading audio files",
            "Listening to audio clips",
            "Transcribing speech to text",
            "Time-stamping transcriptions",
            "Identifying speakers",
            "Noting background sounds",
            "Correcting transcription errors",
            "Formatting text output",
            "Adding punctuation",
            "Proofreading transcript",
            "Quality assurance check",
            "Exporting final transcript",
            "Generating word count",
            "Creating accuracy report",
            "Submitting completed work"
        ]
    },
    {
        id: generateRandomId(),
        title: "Sentiment Analysis",
        reward: 3.50,
        timeEstimate: "15-20 min",
        category: "Text Analysis",
        description: "Classify text excerpts by emotional sentiment",
        steps: 10,
        duration: 90,
        activities: [
            "Loading text samples",
            "Reading and understanding content",
            "Identifying emotional cues",
            "Classifying sentiment polarity",
            "Rating sentiment intensity",
            "Noting contextual factors",
            "Cross-verifying classifications",
            "Compiling results",
            "Generating sentiment report",
            "Exporting final analysis"
        ]
    },
    {
        id: generateRandomId(),
        title: "Social Media Content Moderation",
        reward: 2.25,
        timeEstimate: "25-30 min",
        category: "Content Review",
        description: "Review and moderate social media content according to guidelines",
        steps: 9,
        duration: 150,
        activities: [
            "Reviewing content submissions",
            "Applying moderation guidelines",
            "Flagging inappropriate content",
            "Categorizing content types",
            "Documenting moderation decisions",
            "Escalating complex cases",
            "Providing feedback on guidelines",
            "Generating moderation reports",
            "Updating moderation database"
        ]
    },
    {
        id: generateRandomId(),
        title: "Market Research Survey",
        reward: 2.00,
        timeEstimate: "35-40 min",
        category: "Research",
        description: "Participate in market research about consumer preferences",
        steps: 11,
        duration: 210,
        activities: [
            "Answering demographic questions",
            "Rating product preferences",
            "Comparing brand perceptions",
            "Providing purchase intent feedback",
            "Sharing shopping habits",
            "Evaluating advertising effectiveness",
            "Suggesting product improvements",
            "Rating customer service experiences",
            "Completing brand association exercises",
            "Providing pricing feedback",
            "Submitting final survey"
        ]
    },
    {
        id: generateRandomId(),
        title: "Video Captioning Task",
        reward: 4.50,
        timeEstimate: "45-50 min",
        category: "Accessibility",
        description: "Create accurate captions for short video clips",
        steps: 14,
        duration: 270,
        activities: [
            "Loading video files",
            "Transcribing spoken content",
            "Time-syncing captions",
            "Adding sound descriptions",
            "Formatting caption styles",
            "Proofreading transcriptions",
            "Adjusting timing accuracy",
            "Adding speaker identifiers",
            "Reviewing for accessibility",
            "Exporting caption files",
            "Quality checking output",
            "Generating compliance report",
            "Creating style guide notes",
            "Submitting completed work"
        ]
    }
];