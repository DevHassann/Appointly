import {
    BanknotesIcon,
    CalendarDaysIcon,
    IdentificationIcon,
} from "@heroicons/react/20/solid";

// Currencies
const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

// Navigations
const navigation = {
    categories: [
        {
            name: "Services",
            featured: [
                { name: "Sleep", href: "#" },
                { name: "Swimwear", href: "#" },
                { name: "Underwear", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Basic Tees", href: "#" },
                { name: "Artwork Tees", href: "#" },
                { name: "Bottoms", href: "#" },
                { name: "Underwear", href: "#" },
                { name: "Accessories", href: "#" },
            ],
            brands: [
                { name: "Full Nelson", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Significant Other", href: "#" },
            ],
        },
    ],
    pages: [
        { name: "Industries", href: "#" },
        { name: "Become a Provider", href: "#" },
    ],
};

// Features
const features = [
    {
        name: "Find best Professionals.",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
        icon: IdentificationIcon,
    },
    {
        name: "No emails, easy scheduling.",
        description:
            "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
        icon: CalendarDaysIcon,
    },
    {
        name: "All payments handled by us.",
        description:
            "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
        icon: BanknotesIcon,
    },
];

// Posts
const posts = [
    {
        id: 1,
        title: "Education",
        href: "#",
        services: 29,
        imageUrl:
            "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
        id: 2,
        title: "Legal",
        href: "#",
        services: 3,
        imageUrl:
            "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
        id: 3,
        title: "Technology",
        href: "#",
        services: 9,
        imageUrl:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
    },
    {
        id: 4,
        title: "Medical",
        href: "#",
        services: 36,
        imageUrl:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
];

// Peoples
const people = [
    {
        name: "Jane Cooper",
        title: "Business Psychologist",
        role: "Admin",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 32,
        ratings: 3.7,
        amount: 46,
        category: 3,
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
        name: "Brendon Blike",
        title: "System Analyst",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 32,
        ratings: 3.7,
        amount: 76,
        category: 1,
        imageUrl:
            "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    },
    {
        name: "Cristina Sky",
        title: "Mathematics Professor",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 32,
        ratings: 3.7,
        amount: 76,
        category: 0,
        imageUrl:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
        name: "Wasif Haider",
        title: "Geography Teacher",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 32,
        ratings: 3.7,
        amount: 89,
        category: 0,
        imageUrl:
            "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    },
    {
        name: "Dr. Sheikh Ali",
        title: "Pediatric Surgeon",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 11,
        ratings: 4.7,
        amount: 182,
        category: 2,
        imageUrl:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
        name: "Tom Cyle",
        title: "Software Engineer",
        email: "janecooper@example.com",
        telephone: "+1-202-555-0170",
        reviewCount: 14,
        ratings: 4.7,
        amount: 110,
        category: 1,
        imageUrl:
            "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
];

// Tabs
const tabs = [
    { name: "Education", href: "#", current: false },
    { name: "Technology", href: "#", current: true },
    { name: "Medical", href: "#", current: false },
    { name: "Psychology", href: "#", current: false },
];

// Profiles
const profiles = [
    {
        name: "Luis Silva",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        country: "Mexico",
        profileName: "Enterprise Tech Solutions Expert",
        days: [1, 4, 6],
        languages: ["English", "Spanish", "French", "Italian", "Chinese"],
        ratings: 4.9,
        reviewers: 322,
        slotPerWeek: 24,
        price: 78,
        gender: "Male",
        creationDate: new Date("2023-09-30").getTime(),
    },
    {
        name: "Andrew End",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        country: "Mexico",
        profileName: "Enterprise Tech Solutions Expert",
        days: [1, 4, 6],
        languages: ["English", "French", "Chinese"],
        ratings: 3.9,
        reviewers: 22,
        slotPerWeek: 24,
        price: 78,
        gender: "Female",
        creationDate: new Date("2023-09-10").getTime(),
    },
    {
        name: "Luis Silva",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        country: "United Kingdom",
        profileName: "Systems Analyst",
        days: [2, 6, 5],
        languages: ["English", "Spanish", "Italian"],
        ratings: 4.9,
        reviewers: 322,
        slotPerWeek: 24,
        price: 34,
        gender: "Male",
        creationDate: new Date("2023-08-15").getTime(),
    },
    {
        name: "Luis Silva",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        country: "Mexico",
        profileName: "Enterprise Tech Solutions Expert",
        days: [1, 4, 6],
        languages: ["English", "French"],
        ratings: 4.9,
        reviewers: 322,
        slotPerWeek: 24,
        price: 78,
        gender: "Female",
        creationDate: new Date("2023-07-20").getTime(),
    },
];

// User
const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

// NavbarMain Navigation
const NavbarMainNavigation = [
    { name: "Meetings", href: "#", current: true },
    { name: "Start Offering", href: "/seller/profile", current: false },
];

// Category Navigation
const CategoryNavigations = {
    categories: [
        {
            name: "Technology",
            featured: [
                { name: "Sleep", href: "#" },
                { name: "Swimwear", href: "#" },
                { name: "Underwear", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Basic Tees", href: "#" },
                { name: "Artwork Tees", href: "#" },
                { name: "Bottoms", href: "#" },
                { name: "Underwear", href: "#" },
                { name: "Accessories", href: "#" },
            ],
            brands: [
                { name: "Full Nelson", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Significant Other", href: "#" },
            ],
        },
        {
            name: "Business",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Education",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Medical",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Arts",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Engineering",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Corporate",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
        {
            name: "Law and Legal",
            featured: [
                { name: "Casual", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Outdoor", href: "#" },
            ],
            collection: [
                { name: "Everything", href: "#" },
                { name: "Core", href: "#" },
                { name: "New Arrivals", href: "#" },
                { name: "Sale", href: "#" },
            ],
            categories: [
                { name: "Artwork Tees", href: "#" },
                { name: "Pants", href: "#" },
                { name: "Accessories", href: "#" },
                { name: "Boxers", href: "#" },
                { name: "Basic Tees", href: "#" },
            ],
            brands: [
                { name: "Significant Other", href: "#" },
                { name: "My Way", href: "#" },
                { name: "Counterfeit", href: "#" },
                { name: "Re-Arranged", href: "#" },
                { name: "Full Nelson", href: "#" },
            ],
        },
    ],
    pages: [
        { name: "Company", href: "#" },
        { name: "Stores", href: "#" },
    ],
};

// Days
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Available Languages
const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "Italian",
    "Chinese",
    "German",
    "Portuguese",
    "Russian",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Dutch",
    "Swedish",
    "Turkish",
    "Indonesian",
    "Vietnamese",
    "Thai",
    "Greek",
    "Hebrew",
    "Polish",
    "Czech",
    "Hungarian",
    "Finnish",
    "Urdu"
];

// Quarters
const quarters = [
    { id: 'q1', value: '12-6' },
    { id: 'q2', value: '6-12' },
    { id: 'q3', value: '12-6' },
    { id: 'q4', value: '6-12' },
];

// Meeting Table Data
const MeetingTableData = [
    {
        key: "1",
        with: "John Brown",
        profileName: "Marketing Strategist",
        profileImg:
            "https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1624&q=80",
        timeFrom: 1111881736261,
        timeTo: 1111888736261,
        amount: 67,
    },
    {
        key: "2",
        with: "Anna Greece",
        profileName: "Systems Architect",
        profileImg:
            "https://images.unsplash.com/photo-1592621385645-e41659e8aabe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80",
        timeFrom: 1111881736261,
        timeTo: 1111888736261,
        amount: 136,
    },
    {
        key: "3",
        with: "Anastasia Steele",
        profileName: "Creative Designer ",
        profileImg:
            "https://media.vanityfair.com/photos/61853bec0a7eae5a94a4e17c/1:1/w_4911,h_4911,c_limit/1165840976",
        timeFrom: 1111881736261,
        timeTo: 1111888736261,
        amount: 99,
    },
];

// WalletAndPayments Meeting Table Data
const WPMeetingsTabledata = [
    {
        key: "1",
        invoice: 7782712,
        timeFrom: 1675152000000,
        seller: "David Bombal",
        profileName: "Machine Learning Engineer",
        profileImg:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        meetingID: 88212,
        amount: 45,
        status: "Scheduled",
    },
    {
        key: "2",
        invoice: 4552318,
        timeFrom: 1396352000000,
        seller: "Anna Greece",
        profileName: "Systems Architect",
        profileImg:
            "https://images.unsplash.com/photo-1592621385645-e41659e8aabe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80",
        meetingID: 23564,
        amount: 65,
        status: "Complete",
    },
    {
        key: "3",
        invoice: 6548823,
        timeFrom: 1675722000000,
        seller: "Anastasia Steele",
        profileName: "Creative Designer",
        profileImg:
            "https://media.vanityfair.com/photos/61853bec0a7eae5a94a4e17c/1:1/w_4911,h_4911,c_limit/1165840976",
        meetingID: 43521,
        amount: 24,
        status: "Scheduled",
    },
    {
        key: "4",
        invoice: 2287051,
        timeFrom: 1675722000000,
        seller: "Aidan Moyer",
        profileName: "Creative Designer",
        profileImg:
            "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80",
        meetingID: 11766,
        amount: 36,
        status: "Scheduled",
    },
    {
        key: "5",
        invoice: 4158901,
        timeFrom: 1675722000000,
        seller: "Jovanni Huerta",
        profileName: "Creative Designer",
        profileImg:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80",
        meetingID: 54039,
        amount: 68,
        status: "Canceled",
    },
    {
        key: "6",
        invoice: 2491753,
        timeFrom: 1675722000000,
        seller: "Lindsey Bradshaw",
        profileName: "Creative Designer",
        profileImg:
            "https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
        meetingID: 71803,
        amount: 75,
        status: "Scheduled",
    },
    {
        key: "7",
        invoice: 4864374,
        timeFrom: 1675722000000,
        seller: "Lacey Gordon",
        profileName: "Creative Designer",
        profileImg:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        meetingID: 69845,
        amount: 65,
        status: "Scheduled",
    },
    {
        key: "8",
        invoice: 2419273,
        timeFrom: 1675722000000,
        seller: "Remington Leblanc",
        profileName: "Creative Designer",
        profileImg:
            "https://images.unsplash.com/photo-1588410670460-cdab54625253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        meetingID: 62297,
        amount: 96,
        status: "Scheduled",
    },
];

// WalletAndPayments Wallets Table Data
const WalletsTabledata = [
    {
        key: "1",
        transactionID: 6583428,
        timeFrom: 1675152000000,
        paymentChannel: "Credit card",
        instrument: "Ending with 4488",
        amount: 45,
    },
    {
        key: "2",
        transactionID: 3276598,
        timeFrom: 1235162000000,
        paymentChannel: "PayPal",
        instrument: "jasonportila@gmail.com",
        amount: 55,
    },
    {
        key: "3",
        transactionID: 1143652,
        timeFrom: 1875122000000,
        paymentChannel: "Credit card",
        instrument: "Ending with 6654",
        amount: 17,
    },
    {
        key: "4",
        transactionID: 1143652,
        timeFrom: 1659322000000,
        paymentChannel: "Credit card",
        instrument: "Ending with 4532",
        amount: 94,
    },
    {
        key: "5",
        transactionID: 1143652,
        timeFrom: 1874752000000,
        paymentChannel: "PayPal",
        instrument: "jaesenj@yahoo.ca",
        amount: 25,
    },
    {
        key: "6",
        transactionID: 1143652,
        timeFrom: 1874856000000,
        paymentChannel: "Credit card",
        instrument: "Ending with 2231",
        amount: 14,
    },
    {
        key: "7",
        transactionID: 1143652,
        timeFrom: 1403322000000,
        paymentChannel: "PayPal",
        instrument: "gtewari@live.com",
        amount: 35,
    },
    {
        key: "8",
        transactionID: 1143652,
        timeFrom: 1878344000000,
        paymentChannel: "PayPal",
        instrument: "fukuchi@aol.com",
        amount: 85,
    },
    {
        key: "9",
        transactionID: 1143652,
        timeFrom: 1648222000000,
        paymentChannel: "PayPal",
        instrument: "damian@verizon.net",
        amount: 23,
    },
];

// Notifications
const Notifications = [
    {
        key: "1",
        message: "Your meeting with Jhon Doe is about to start!",
        time: "2 days ago",
        sender: "John Doe"
    },
    {
        key: "2",
        message: "Your meeting with Kevin Heart is about to start!",
        time: "2 days ago",
        sender: "John Doe"
    }
]

// Footer Navigations
const FooterNavigation = {
    main: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Jobs", href: "#" },
        { name: "Press", href: "#" },
        { name: "Accessibility", href: "#" },
        { name: "Partners", href: "#" },
    ],
    social: [
        {
            name: "Facebook",
            href: "#",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "#",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "#",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: "GitHub",
            href: "#",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: "YouTube",
            href: "#",
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
};

// Seller Data
const profileDetails = {
    name: "Elizabeth Green",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profileName: "Social Media Marketing Expert",
    qualification: "Masters in Business Administration",
    country: "USA",
    ratings: 4.9,
    level: "Beginner",
    price: 78,
    about:
        "Hello! I'm Bob, a passionate and creative React Developer with a keen eye for designing and developing user-friendly web applications. With a strong foundation in web technologies and a love for solving complex problems, I strive to create elegant and efficient solutions that enhance the user experience.",
};

const educationDetails = [
    {
        universityName: "Example University",
        degreeName: "Bachelor of Science",
        startDate: "2022-09-01",
        endDate: "2023-10-01",
        description:
            "Studied computer science and graduated with honors. Developed strong skills in programming and algorithms. Engaged in various research projects related to machine learning.",
    },
    {
        universityName: "Another University",
        degreeName: "Master of Business Administration",
        startDate: "2023-01-15",
        endDate: "2024-12-01",
        description:
            "Focused on business strategy and leadership. Took courses in organizational behavior, marketing management, and financial analysis. Participated in case competitions and leadership seminars.",
    },
];

const professionalDetails = [
    {
        companyName: "Example Company",
        position: "Software Engineer",
        startDate: "2022-05-01",
        endDate: "2023-08-15",
        description:
            "Developed web applications using React.js. Collaborated with cross-functional teams to deliver high-quality software. Developed web applications using React.js. Collaborated with cross-functional teams to deliver high-quality software.",
    },
    {
        companyName: "Another Company",
        position: "Product Manager",
        startDate: "2020-10-15",
        endDate: "2022-04-30",
        description:
            "Led product development from ideation to launch. Managed a team of designers and developers. Led product development from ideation to launch. Managed a team of designers and developers. Led product development from ideation to launch. Managed a team of designers and developers.",
    },
];

const ratingsAndReviews = [
    {
        name: "Alice",
        avatar: "https://randomuser.me/api/portraits/women/72.jpg",
        stars: 4,
        text: "Great product! It exceeded my expectations. Great product! It exceeded my expectations. Great product! It exceeded my expectations. Great product! It exceeded my expectations.",
    },
    {
        name: "Bob",
        avatar:
            "https://robohash.org/72a80281bfca6728baa9199a994ea939?set=set4&bgset=&size=400x400",
        stars: 5,
        text: "I love it! This product is a game changer. I love it! This product is a game changer. I love it! This product is a game changer.",
    },
    {
        name: "Carol",
        avatar:
            "https://gravatar.com/avatar/72a80281bfca6728baa9199a994ea939?s=400&d=robohash&r=x",
        stars: 3.6,
        text: "Decent product, but there's room for improvement. Decent product, but there's room for improvement. Decent product, but there's room for improvement.",
    },
];

const sellerSlots = [
    [0, 1, 3, 4, 18, 24, 15, 16, 11, 7, 9, 10],
    [],
    [5, 15, 4, 1, 21, 5, 11, 12, 17, 6, 7, 8],
    [],
    [8, 9, 15, 2, 12, 13, 14, 17, 21],
    [],
    [1, 2, 3, 4, 7, 8, 9, 12, 15, 21, 23, 24],
];

const selectedSlots = [
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 57 },
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 120 },
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 78 },
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 21 },
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 59 },
    { timeFrom: 1111881736261, timeTo: 1111888736261, price: 40 },
];

// Qualification
const qualifications = [
    { value: "associates", label: "Associate's Degree" },
    { value: "arts", label: "Arts Degree" },
    { value: "bachelors", label: "Bachelors (BSc)" },
    { value: "certificate", label: "Certificate" },
    { value: "culinary", label: "Culinary Certification" },
    { value: "diploma", label: "Diploma" },
    { value: "doctorate", label: "Doctorate" },
    { value: "doctorOfPhilophy", label: "Doctor of Philosophy (PhD)" },
    { value: "engineering", label: "Engineering Degree" },
    { value: "fitness", label: "Fitness Certification" },
    { value: "highSchool", label: "High School Diploma" },
    { value: "language", label: "Language Proficiency Certification" },
    { value: "marketing", label: "Marketing Certification" },
    { value: "masters", label: "Masters (MSc)" },
    { value: "music", label: "Music Degree" },
    { value: "nursing", label: "Nursing Degree" },
    { value: "postgraduate", label: "Postgraduate Certificate" },
    { value: "postDoctorate", label: "Post Doctorate" },
    { value: "professional", label: "Professional Degree" },
    { value: "projectManagement", label: "Project Management Certification" },
    { value: "teaching", label: "Teaching Certification" },
    { value: "undergraduate", label: "Undergraduate Certificate" },
    { value: "vocational", label: "Vocational/Trade School" },
];

// Degree
const degrees = [
    { value: "agriculture", label: "Agriculture" },
    { value: "art", label: "Art" },
    { value: "biology", label: "Biology" },
    { value: "businessAdministration", label: "Business Administration" },
    { value: "chemistry", label: "Chemistry" },
    { value: "computerScience", label: "Computer Science" },
    { value: "economics", label: "Economics" },
    { value: "education", label: "Education" },
    { value: "electricalEngineering", label: "Electrical Engineering" },
    { value: "engineeringManagement", label: "Engineering Management" },
    { value: "environmentalScience", label: "Environmental Science" },
    { value: "finance", label: "Finance" },
    { value: "geology", label: "Geology" },
    { value: "history", label: "History" },
    { value: "law", label: "Law" },
    { value: "linguistics", label: "Linguistics" },
    { value: "mechanicalEngineering", label: "Mechanical Engineering" },
    { value: "medicine", label: "Medicine" },
    { value: "nursing", label: "Nursing" },
    { value: "physics", label: "Physics" },
    { value: "psychology", label: "Psychology" },
    { value: "publicHealth", label: "Public Health" },
    { value: "sociology", label: "Sociology" },
];

// Days of Week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Quaters Data
const quartersData = [
    {
        startTime: "12:00 AM",
        endTime: "06:00 AM",
    },
    {
        startTime: "06:00 AM",
        endTime: "12:00 PM",
    },
    {
        startTime: "12:00 PM",
        endTime: "06:00 PM",
    },
    {
        startTime: "06:00 PM",
        endTime: "11:59 PM",
    },
];

// Fake Data Slots
const fakeDataSlot = {
    Monday: ["09:00 AM - 10:00 AM", "02:00 PM - 03:00 PM", "05:00 PM - 06:00 PM"],
    Wednesday: ["01:00 PM - 02:00 PM", "04:00 PM - 05:00 PM"],
    Friday: ["10:00 AM - 11:00 AM", "03:00 PM - 04:00 PM"],
    Tuesday: ["11:00 AM - 12:00 PM", "03:00 PM - 04:00 PM"],
    Thursday: ["09:00 AM - 10:00 AM", "01:00 PM - 02:00 PM"],
    Saturday: ["02:00 PM - 03:00 PM", "04:00 PM - 05:00 PM"],
};

// Countries Data
const customData = [
    { value: "AF", label: "Afghanistan" },
    { value: "AL", label: "Albania" },
    { value: "DZ", label: "Algeria" },
    { value: "AS", label: "American Samoa" },
    { value: "AD", label: "Andorra" },
    { value: "AO", label: "Angola" },
    { value: "AI", label: "Anguilla" },
    { value: "AG", label: "Antigua and Barbuda" },
    { value: "AR", label: "Argentina" },
    { value: "AM", label: "Armenia" },
    { value: "AW", label: "Aruba" },
    { value: "AU", label: "Australia" },
    { value: "AT", label: "Austria" },
    { value: "AZ", label: "Azerbaijan" },
    { value: "BS", label: "Bahamas" },
    { value: "BH", label: "Bahrain" },
    { value: "BD", label: "Bangladesh" },
    { value: "BB", label: "Barbados" },
    { value: "BY", label: "Belarus" },
    { value: "BE", label: "Belgium" },
    { value: "BZ", label: "Belize" },
    { value: "BJ", label: "Benin" },
    { value: "BM", label: "Bermuda" },
    { value: "BT", label: "Bhutan" },
    { value: "BO", label: "Bolivia, Plurinational State of" },
    { value: "BA", label: "Bosnia and Herzegovina" },
    { value: "BW", label: "Botswana" },
    { value: "BR", label: "Brazil" },
    { value: "IO", label: "British Indian Ocean Territory" },
    { value: "BG", label: "Bulgaria" },
    { value: "BF", label: "Burkina Faso" },
    { value: "BI", label: "Burundi" },
    { value: "KH", label: "Cambodia" },
    { value: "CM", label: "Cameroon" },
    { value: "CA", label: "Canada" },
    { value: "CV", label: "Cape Verde" },
    { value: "KY", label: "Cayman Islands" },
    { value: "CF", label: "Central African Republic" },
    { value: "TD", label: "Chad" },
    { value: "CL", label: "Chile" },
    { value: "CN", label: "China" },
    { value: "CO", label: "Colombia" },
    { value: "KM", label: "Comoros" },
    { value: "CG", label: "Congo" },
    { value: "CD", label: "Democratic Republic of the Congo" },
    { value: "CK", label: "Cook Islands" },
    { value: "CR", label: "Costa Rica" },
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "HR", label: "Croatia" },
    { value: "CU", label: "Cuba" },
    { value: "CW", label: "Curaçao" },
    { value: "CY", label: "Cyprus" },
    { value: "CZ", label: "Czech Republic" },
    { value: "DK", label: "Denmark" },
    { value: "DJ", label: "Djibouti" },
    { value: "DM", label: "Dominica" },
    { value: "DO", label: "Dominican Republic" },
    { value: "EC", label: "Ecuador" },
    { value: "EG", label: "Egypt" },
    { value: "SV", label: "El Salvador" },
    { value: "GQ", label: "Equatorial Guinea" },
    { value: "ER", label: "Eritrea" },
    { value: "EE", label: "Estonia" },
    { value: "ET", label: "Ethiopia" },
    { value: "FK", label: "Falkland Islands (Malvinas)" },
    { value: "FO", label: "Faroe Islands" },
    { value: "FJ", label: "Fiji" },
    { value: "FI", label: "Finland" },
    { value: "FR", label: "France" },
    { value: "PF", label: "French Polynesia" },
    { value: "GA", label: "Gabon" },
    { value: "GM", label: "Gambia" },
    { value: "GE", label: "Georgia" },
    { value: "DE", label: "Germany" },
    { value: "GH", label: "Ghana" },
    { value: "GI", label: "Gibraltar" },
    { value: "GR", label: "Greece" },
    { value: "GL", label: "Greenland" },
    { value: "GD", label: "Grenada" },
    { value: "GU", label: "Guam" },
    { value: "GT", label: "Guatemala" },
    { value: "GG", label: "Guernsey" },
    { value: "GN", label: "Guinea" },
    { value: "GW", label: "Guinea-Bissau" },
    { value: "HT", label: "Haiti" },
    { value: "HN", label: "Honduras" },
    { value: "HK", label: "Hong Kong" },
    { value: "HU", label: "Hungary" },
    { value: "IS", label: "Iceland" },
    { value: "IN", label: "India" },
    { value: "ID", label: "Indonesia" },
    { value: "IR", label: "Iran, Islamic Republic of" },
    { value: "IQ", label: "Iraq" },
    { value: "IE", label: "Ireland" },
    { value: "IM", label: "Isle of Man" },
    { value: "IL", label: "Israel" },
    { value: "IT", label: "Italy" },
    { value: "JM", label: "Jamaica" },
    { value: "JP", label: "Japan" },
    { value: "JE", label: "Jersey" },
    { value: "JO", label: "Jordan" },
    { value: "KZ", label: "Kazakhstan" },
    { value: "KE", label: "Kenya" },
    { value: "KI", label: "Kiribati" },
    { value: "KP", label: "North Korea" },
    { value: "KR", label: "South Korea" },
    { value: "KW", label: "Kuwait" },
    { value: "KG", label: "Kyrgyzstan" },
    { value: "LA", label: "Lao People's Democratic Republic" },
    { value: "LV", label: "Latvia" },
    { value: "LB", label: "Lebanon" },
    { value: "LS", label: "Lesotho" },
    { value: "LR", label: "Liberia" },
    { value: "LY", label: "Libya" },
    { value: "LI", label: "Liechtenstein" },
    { value: "LT", label: "Lithuania" },
    { value: "LU", label: "Luxembourg" },
    { value: "MO", label: "Macao" },
    { value: "MK", label: "Republic of Macedonia" },
    { value: "MG", label: "Madagascar" },
    { value: "MW", label: "Malawi" },
    { value: "MY", label: "Malaysia" },
    { value: "MV", label: "Maldives" },
    { value: "ML", label: "Mali" },
    { value: "MT", label: "Malta" },
    { value: "MH", label: "Marshall Islands" },
    { value: "MQ", label: "Martinique" },
    { value: "MR", label: "Mauritania" },
    { value: "MU", label: "Mauritius" },
    { value: "MX", label: "Mexico" },
    { value: "FM", label: "Micronesia, Federated States of" },
    { value: "MD", label: "Republic of Moldova" },
    { value: "MC", label: "Monaco" },
    { value: "MN", label: "Mongolia" },
    { value: "ME", label: "Montenegro" },
    { value: "MS", label: "Montserrat" },
    { value: "MA", label: "Morocco" },
    { value: "MZ", label: "Mozambique" },
    { value: "MM", label: "Myanmar" },
    { value: "NA", label: "Namibia" },
    { value: "NR", label: "Nauru" },
    { value: "NP", label: "Nepal" },
    { value: "NL", label: "Netherlands" },
    { value: "NZ", label: "New Zealand" },
    { value: "NI", label: "Nicaragua" },
    { value: "NE", label: "Niger" },
    { value: "NG", label: "Nigeria" },
    { value: "NU", label: "Niue" },
    { value: "NF", label: "Norfolk Island" },
    { value: "MP", label: "Northern Mariana Islands" },
    { value: "NO", label: "Norway" },
    { value: "OM", label: "Oman" },
    { value: "PK", label: "Pakistan" },
    { value: "PW", label: "Palau" },
    { value: "PS", label: "Palestinian Territory" },
    { value: "PA", label: "Panama" },
    { value: "PG", label: "Papua New Guinea" },
    { value: "PY", label: "Paraguay" },
    { value: "PE", label: "Peru" },
    { value: "PH", label: "Philippines" },
    { value: "PN", label: "Pitcairn" },
    { value: "PL", label: "Poland" },
    { value: "PT", label: "Portugal" },
    { value: "PR", label: "Puerto Rico" },
    { value: "QA", label: "Qatar" },
    { value: "RO", label: "Romania" },
    { value: "RU", label: "Russia" },
    { value: "RW", label: "Rwanda" },
    { value: "KN", label: "Saint Kitts and Nevis" },
    { value: "LC", label: "Saint Lucia" },
    { value: "WS", label: "Samoa" },
    { value: "SM", label: "San Marino" },
    { value: "ST", label: "Sao Tome and Principe" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "SN", label: "Senegal" },
    { value: "RS", label: "Serbia" },
    { value: "SC", label: "Seychelles" },
    { value: "SL", label: "Sierra Leone" },
    { value: "SG", label: "Singapore" },
    { value: "SX", label: "Sint Maarten" },
    { value: "SK", label: "Slovakia" },
    { value: "SI", label: "Slovenia" },
    { value: "SB", label: "Solomon Islands" },
    { value: "SO", label: "Somalia" },
    { value: "ZA", label: "South Africa" },
    { value: "SS", label: "South Sudan" },
    { value: "ES", label: "Spain" },
    { value: "LK", label: "Sri Lanka" },
    { value: "SD", label: "Sudan" },
    { value: "SR", label: "Suriname" },
    { value: "SZ", label: "Swaziland" },
    { value: "SE", label: "Sweden" },
    { value: "CH", label: "Switzerland" },
    { value: "SY", label: "Syria" },
    { value: "TW", label: "Taiwan" },
    { value: "TJ", label: "Tajikistan" },
    { value: "TZ", label: "Tanzania" },
    { value: "TH", label: "Thailand" },
    { value: "TG", label: "Togo" },
    { value: "TK", label: "Tokelau" },
    { value: "TO", label: "Tonga" },
    { value: "TT", label: "Trinidad and Tobago" },
    { value: "TN", label: "Tunisia" },
    { value: "TR", label: "Turkey" },
    { value: "TM", label: "Turkmenistan" },
    { value: "TC", label: "Turks and Caicos Islands" },
    { value: "TV", label: "Tuvalu" },
    { value: "UG", label: "Uganda" },
    { value: "UA", label: "Ukraine" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "GB", label: "United Kingdom" },
    { value: "US", label: "United States" },
    { value: "UY", label: "Uruguay" },
    { value: "UZ", label: "Uzbekistan" },
    { value: "VU", label: "Vanuatu" },
    { value: "VE", label: "Venezuela, Bolivarian Republic of" },
    { value: "VN", label: "Viet Nam" },
    { value: "VI", label: "Virgin Islands" },
    { value: "YE", label: "Yemen" },
    { value: "ZM", label: "Zambia" },
    { value: "ZW", label: "Zimbabwe" },
];

// Genders
const genderData = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
];

const LanguagesSpokenData = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "Italian", label: "Italian" },
    { value: "Chinese", label: "Chinese" },
    { value: "German", label: "German" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Russian", label: "Russian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Arabic", label: "Arabic" },
    { value: "Hindi", label: "Hindi" },
    { value: "Dutch", label: "Dutch" },
    { value: "Swedish", label: "Swedish" },
    { value: "Turkish", label: "Turkish" },
    { value: "Indonesian", label: "Indonesian" },
    { value: "Vietnamese", label: "Vietnamese" },
    { value: "Thai", label: "Thai" },
    { value: "Greek", label: "Greek" },
    { value: "Hebrew", label: "Hebrew" },
    { value: "Polish", label: "Polish" },
    { value: "Czech", label: "Czech" },
    { value: "Hungarian", label: "Hungarian" },
    { value: "Finnish", label: "Finnish" },
    { value: "Urdu", label: "Urdu" },
];


export {
    currencies,
    navigation,
    features,
    posts,
    people,
    tabs,
    profiles,
    NavbarMainNavigation,
    user,
    CategoryNavigations,
    days,
    availableLanguages,
    quarters,
    MeetingTableData,
    WPMeetingsTabledata,
    WalletsTabledata,
    Notifications,
    FooterNavigation,
    profileDetails,
    educationDetails,
    professionalDetails,
    ratingsAndReviews,
    sellerSlots,
    selectedSlots,
    degrees,
    qualifications,
    daysOfWeek,
    quartersData,
    fakeDataSlot,
    genderData,
    LanguagesSpokenData,
    customData
}