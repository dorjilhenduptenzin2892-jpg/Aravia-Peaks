"use client"

import { ImageLoader } from "@/components/media/image-loader"
import {
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  X as XIcon,
  Star as StarIcon, // Added StarIcon for rating display
} from "@/components/icons"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PackageGallery } from "@/components/packages/package-gallery"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link" // Added import for Link
import { useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import packages from "@/data/packages"

// Package data (in a real app, this would come from a database)
const packagesData: Record<string, any> = {
  "paro-tshechu": {
    id: "paro-tshechu",
    title: "Paro Tshechu Festival Tour",
    description: "Experience the most famous festival in Bhutan with spectacular masked dances and ceremonies",
    longDescription:
      "The Paro Tshechu is one of the most spectacular and culturally significant festivals in Bhutan. Held annually in the spring, this five-day religious festival features sacred masked dances, traditional music, and the unfurling of the giant thongdrel (sacred scroll). Join us for this once-in-a-lifetime cultural immersion that also includes visits to iconic sites like the Tiger's Nest monastery.",
    duration: "7 Days / 6 Nights",
    price: 2450,
    image: "/images/tshechu.webp",
    gallery: [
      "/images/tshechu.webp",
      "/images/bhutan-festival.jpg",
      "/images/thimphu-tshechu-e2-80-93-the-autumn-splendour.png",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    rating: 4.9,
    reviews: 127,
    category: "Festival Tour",
    difficulty: "Easy to Moderate",
    bestTime: "March-April (Festival Dates Vary)",
    groupSize: "2-12 people",
    highlights: [
      "Witness the spectacular Paro Tshechu festival",
      "Trek to the iconic Tiger's Nest monastery",
      "Explore ancient dzongs and temples",
      "Experience authentic Bhutanese culture",
      "Visit traditional archery competitions",
      "Interact with local monks and communities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Fly into Paro, one of the most scenic flights in the world. Meet your guide and transfer to hotel. Visit Paro Dzong and Ta Dzong (National Museum). Evening orientation about the festival.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro Tshechu Festival - Day 1",
        description:
          "Full day at the Paro Tshechu festival. Witness sacred mask dances performed by monks and laymen. Experience the vibrant colors, traditional costumes, and spiritual atmosphere.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 3,
        title: "Paro Tshechu Festival - Day 2",
        description:
          "Continue experiencing the festival. Early morning witness the unfurling of the giant thongdrel (sacred scroll). Receive blessings and immerse in the spiritual energy.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 4,
        title: "Thimphu Excursion",
        description:
          "Drive to Thimphu (1.5 hours). Visit Buddha Dordenma, Memorial Chorten, and Tashichho Dzong. Explore local markets and craft centers.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 5,
        title: "Thimphu to Punakha",
        description:
          "Journey to Punakha via Dochula Pass (3,100m) with panoramic Himalayan views. Visit the magnificent Punakha Dzong and Chimi Lhakhang (fertility temple).",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 6,
        title: "Tiger's Nest Trek",
        description:
          "Return to Paro. Trek to the iconic Taktsang Monastery (Tiger's Nest), perched on a cliff 900m above the valley. This 4-5 hour hike is the highlight for many visitors.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to Paro airport for your departure flight. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private transportation",
      "All entrance fees and permits",
      "Festival tickets and seating",
      "Bottled water during tours",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Optional activities",
      "Single room supplement ($200)",
    ],
    whatToBring: [
      "Comfortable walking shoes",
      "Warm layers (evenings can be cool)",
      "Rain jacket",
      "Camera and extra batteries",
      "Sunscreen and sunglasses",
      "Personal medications",
      "Respectful clothing for religious sites",
    ],
  },
  "cultural-heritage": {
    id: "cultural-heritage",
    title: "Cultural Heritage Explorer",
    description: "Discover ancient dzongs, monasteries, and the iconic Tiger's Nest",
    longDescription:
      "This carefully crafted itinerary takes you through the heart of Bhutan's cultural treasures. From the dramatic Tiger's Nest monastery to ancient fortress-dzongs and vibrant local markets, experience the essence of Bhutanese heritage in just five days.",
    duration: "5 Days / 4 Nights",
    price: 1850,
    image: "/tigers-nest-monastery-bhutan.jpg",
    gallery: [
      "/tigers-nest-monastery-bhutan.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    rating: 4.9,
    reviews: 215,
    category: "Cultural Tour",
    difficulty: "Moderate",
    bestTime: "March-May, September-November",
    groupSize: "2-15 people",
    highlights: [
      "Trek to the legendary Tiger's Nest monastery",
      "Explore Paro and Thimphu dzongs",
      "Visit the giant Buddha Dordenma statue",
      "Experience traditional Bhutanese crafts",
      "Witness monk ceremonies",
      "Drive through scenic Himalayan valleys",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro - Transfer to Thimphu",
        description:
          "Arrive in Paro and drive to Thimphu (1.5 hours). Visit Tashichho Dzong, the seat of Bhutan's government, and explore the capital city.",
        meals: "Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 2,
        title: "Thimphu Sightseeing",
        description:
          "Full day exploring Thimphu. Visit Buddha Dordenma, Memorial Chorten, National Folk Heritage Museum, traditional paper factory, and weekend market (if Saturday/Sunday).",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 3,
        title: "Thimphu to Paro via Punakha",
        description:
          "Drive to Punakha via Dochula Pass. Visit stunning Punakha Dzong at the confluence of two rivers. Return to Paro in the evening.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 4,
        title: "Tiger's Nest Trek",
        description:
          "Hike to Taktsang Monastery (Tiger's Nest), Bhutan's most iconic landmark. The 4-5 hour round trip offers spectacular views. Afternoon visit to Kyichu Lhakhang, one of Bhutan's oldest temples.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning visit to Paro town and local market. Transfer to airport for departure.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private vehicle with driver",
      "All entrance fees and permits",
      "Bottled water during tours",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Single room supplement ($150)",
    ],
    whatToBring: [
      "Sturdy hiking boots",
      "Layered clothing",
      "Rain gear",
      "Camera",
      "Sunscreen and hat",
      "Personal first aid kit",
      "Modest clothing for temples",
    ],
  },
  "thimphu-tshechu": {
    id: "thimphu-tshechu",
    title: "Thimphu Tshechu Festival",
    description: "Join the grandest festival in Bhutan's capital with thousands of locals",
    longDescription:
      "The Thimphu Tshechu is Bhutan's largest and most vibrant festival, held in the capital city every autumn. Witness elaborate mask dances, receive blessings from the giant thongdrel, and experience Bhutanese culture at its most colorful. This festival offers an authentic glimpse into the spiritual heart of Bhutan.",
    duration: "6 Days / 5 Nights",
    price: 2150,
    image: "/images/thimphu-tshechu-e2-80-93-the-autumn-splendour.png",
    gallery: [
      "/images/thimphu-tshechu-e2-80-93-the-autumn-splendour.png",
      "/images/bhutan-festival.jpg",
      "/images/tshechu.webp",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    rating: 4.8,
    reviews: 98,
    category: "Festival Tour",
    difficulty: "Easy",
    bestTime: "September-October",
    groupSize: "2-15 people",
    highlights: [
      "Thimphu Festival with sacred mask dances",
      "Visit Buddha Dordenma statue",
      "Explore Punakha Dzong",
      "Shop at local handicraft markets",
      "Memorial Chorten circumambulation",
      "Traditional archery demonstrations",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro - Transfer to Thimphu",
        description:
          "Arrive at Paro International Airport and drive to Thimphu (1.5 hours). Visit Tashichho Dzong in the evening. Welcome dinner and festival orientation.",
        meals: "Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 2,
        title: "Thimphu Tshechu Festival - Day 1",
        description:
          "Full day at the Thimphu Tshechu festival grounds. Witness the opening ceremonies, mask dances, and cultural performances. Secure good viewing spots early morning.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 3,
        title: "Thimphu Tshechu Festival - Day 2",
        description:
          "Continue festival attendance. Witness the main dances including the Guru Tshengye (Eight Manifestations of Guru Rinpoche). Afternoon visit to local markets.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 4,
        title: "Thimphu Sightseeing",
        description:
          "Visit Buddha Dordenma, National Folk Heritage Museum, traditional paper factory, and textile museum. Evening at leisure to explore the capital.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 5,
        title: "Thimphu to Paro - Tiger's Nest Prep",
        description:
          "Drive to Paro. Visit Paro Dzong and National Museum. Prepare for next day's trek with gear check and briefing.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 6,
        title: "Departure",
        description: "Morning at leisure for last-minute shopping. Transfer to airport for departure flight.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private vehicle with driver",
      "Festival tickets and good seating",
      "All entrance fees and permits",
      "Bottled water during tours",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Single room supplement ($180)",
    ],
    whatToBring: [
      "Comfortable festival seating cushion",
      "Layered clothing for cool mornings",
      "Sun protection (hat, sunscreen, sunglasses)",
      "Camera with extra batteries",
      "Respectful attire for religious events",
      "Small backpack for festival day",
    ],
  },
  "punakha-drubchen": {
    id: "punakha-drubchen",
    title: "Punakha Drubchen Festival",
    description: "Witness unique warrior dances at Bhutan's ancient winter capital",
    longDescription:
      "The Punakha Drubchen is a distinctive festival that recreates the 17th-century battle scene. Unlike other festivals, it features warrior dances (pazaps) rather than mask dances. Set in the stunning Punakha Dzong at the confluence of two rivers, this festival offers a unique cultural experience.",
    duration: "8 Days / 7 Nights",
    price: 2650,
    image: "/placeholder.svg?height=600&width=900",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    rating: 4.9,
    reviews: 82,
    category: "Festival Tour",
    difficulty: "Easy to Moderate",
    bestTime: "February-March",
    groupSize: "2-12 people",
    highlights: [
      "Punakha Drubchen battle reenactment",
      "Punakha Tshechu mask dances",
      "Stunning Punakha Dzong setting",
      "Chimi Lhakhang fertility temple visit",
      "Scenic valley hikes",
      "Traditional Bhutanese ceremonies",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro. Airport reception and transfer to hotel. Visit Paro Rinpung Dzong and town. Evening welcome dinner.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro to Thimphu",
        description:
          "Drive to Thimphu. Visit Memorial Chorten, Buddha Dordenma, and Tashichho Dzong. Explore local markets.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 3,
        title: "Thimphu to Punakha",
        description:
          "Journey to Punakha via Dochula Pass (3,100m) with panoramic Himalayan views. Arrive in Punakha valley. Visit Chimi Lhakhang.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 4,
        title: "Punakha Drubchen Festival - Day 1",
        description:
          "Attend the Punakha Drubchen festival. Witness the dramatic reenactment of the 17th-century Tibetan invasion repulsion. Spectacular costumes and choreography.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 5,
        title: "Punakha Drubchen - Day 2 & Tshechu Begins",
        description:
          "Morning continues Drubchen. Afternoon marks transition to Punakha Tshechu with sacred mask dances inside Punakha Dzong.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 6,
        title: "Punakha Tshechu Festival",
        description:
          "Full day at Tshechu festival. Witness the unfurling of the giant thongdrel scroll and receive blessings. Various mask dances and religious ceremonies.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 7,
        title: "Punakha to Paro - Tiger's Nest Trek",
        description:
          "Return to Paro. Afternoon trek to Taktsang Monastery (Tiger's Nest), one of Bhutan's most iconic sites. 4-5 hour round trip hike.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Paro airport for departure. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private transportation",
      "Festival tickets and reserved seating",
      "All entrance fees and permits",
      "Bottled water during tours",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Optional activities",
      "Single room supplement ($200)",
    ],
    whatToBring: [
      "Warm layers for early mornings",
      "Hiking boots for Tiger's Nest trek",
      "Rain jacket",
      "Camera equipment",
      "Sunscreen and hat",
      "Modest clothing for temples",
      "Personal medications",
    ],
  },
  "jambay-lhakhang": {
    id: "jambay-lhakhang",
    title: "Jambay Lhakhang Drup Festival",
    description: "Experience the sacred fire dances in Bumthang valley",
    longDescription:
      "The Jambay Lhakhang Drup is one of Bhutan's most ancient and sacred festivals, held in the Bumthang valley. Famous for the Mewang (fire blessing) ceremony where participants dance naked around bonfires, this festival offers a raw and authentic spiritual experience in Bhutan's cultural heartland.",
    duration: "9 Days / 8 Nights",
    price: 2850,
    image: "/placeholder.svg?height=600&width=900",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    rating: 4.7,
    reviews: 64,
    category: "Festival Tour",
    difficulty: "Moderate",
    bestTime: "October-November",
    groupSize: "2-10 people",
    highlights: [
      "Midnight naked dance (Tercham)",
      "Fire ceremony with monks",
      "Ancient temples in Bumthang",
      "Sacred valley exploration",
      "Traditional village visits",
      "Rare cultural experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, meet guide and transfer to hotel. Visit Paro Dzong and National Museum. Evening briefing about the upcoming journey.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro to Thimphu",
        description:
          "Drive to Thimphu. City sightseeing including Buddha Dordenma, Memorial Chorten, and traditional arts school. Evening stroll through local markets.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 3,
        title: "Thimphu to Punakha",
        description:
          "Journey to Punakha via Dochula Pass. Visit Punakha Dzong and Chimi Lhakhang. Enjoy the warmer subtropical climate of the valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 4,
        title: "Punakha to Bumthang",
        description:
          "Long scenic drive to Bumthang (7-8 hours) through winding mountain roads. Cross Pele La pass. Arrive in Bumthang, the spiritual heartland of Bhutan.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Bumthang",
      },
      {
        day: 5,
        title: "Jambay Lhakhang Festival - Day 1",
        description:
          "Morning festival attendance with mask dances and ceremonies. Afternoon visit to Jambay Lhakhang, one of Bhutan's oldest temples built in 7th century.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Bumthang",
      },
      {
        day: 6,
        title: "Fire Ceremony & Naked Dance",
        description:
          "Day festival continues with sacred dances. Late night attend the famous fire ceremony and midnight naked dance (Tercham) performed for fertility blessings.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Bumthang",
      },
      {
        day: 7,
        title: "Bumthang Valley Exploration",
        description:
          "Explore Bumthang's ancient temples including Kurjey Lhakhang and Tamshing Monastery. Visit traditional cheese and honey farms. Scenic valley walks.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Bumthang",
      },
      {
        day: 8,
        title: "Bumthang to Paro",
        description:
          "Long drive back to Paro (8-9 hours). Enjoy mountain scenery and roadside villages. Evening at leisure.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 9,
        title: "Departure",
        description: "Morning free for last-minute shopping. Transfer to airport for departure.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private vehicle for entire journey",
      "Festival tickets and access",
      "All entrance fees and permits",
      "Bottled water and snacks",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Single room supplement ($220)",
    ],
    whatToBring: [
      "Warm clothing for cold nights",
      "Comfortable shoes for walking",
      "Flashlight for midnight ceremony",
      "Camera (no flash during ceremonies)",
      "Personal medications for altitude",
      "Respectful clothing",
      "Snacks for long drives",
    ],
  },
  "spiritual-journey": {
    id: "spiritual-journey",
    title: "Spiritual Journey",
    description: "Meditate in ancient monasteries and connect with Buddhist wisdom",
    longDescription:
      "Embark on a transformative spiritual journey through Bhutan's most sacred sites. This thoughtfully designed itinerary combines monastery visits, meditation sessions with monks, Buddhist teachings, and moments of quiet reflection. Experience the profound peace of Bhutan's spiritual traditions while exploring temples, dzongs, and meditation caves.",
    duration: "7 Days / 6 Nights",
    price: 2350,
    image: "/bhutan-monastery-meditation-monks-spiritual-peace.jpg",
    gallery: [
      "/bhutan-monastery-meditation-monks-spiritual-peace.jpg",
      "/bhutan-buddhist-monks-prayer-ceremony-monastery.jpg",
      "/tigers-nest-monastery-bhutan-cliff-mountain.jpg",
      "/bhutan-prayer-flags-mountain-landscape.jpg",
    ],
    rating: 4.8,
    reviews: 156,
    category: "Cultural Tour",
    difficulty: "Easy",
    bestTime: "March-May, September-November",
    groupSize: "2-8 people",
    highlights: [
      "Meditation sessions with Buddhist monks",
      "Visit sacred meditation caves",
      "Buddhist philosophy teachings",
      "Monastery overnight stays",
      "Prayer flag offerings",
      "Spiritual guidance and consultations",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro - Spiritual Introduction",
        description:
          "Arrive in Paro and meet your spiritual guide. Visit Kyichu Lhakhang, one of Bhutan's oldest temples. Evening introduction to Buddhist meditation practices.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro - Temple Circuit & Meditation",
        description:
          "Morning visit to Paro Dzong. Afternoon guided meditation session. Visit to local monastery for evening prayer ceremony. Introduction to Buddhist philosophy.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 3,
        title: "Tiger's Nest Pilgrimage",
        description:
          "Early morning trek to Taktsang Monastery (Tiger's Nest). Meditation in the sacred caves where Guru Rinpoche meditated. Receive blessings from resident monks.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 4,
        title: "Paro to Thimphu - Spiritual Centers",
        description:
          "Drive to Thimphu. Visit Memorial Chorten where locals perform circumambulation. Afternoon session with Buddhist scholar on philosophy and practice.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 5,
        title: "Thimphu - Monastic Life",
        description:
          "Visit National Memorial Chorten, witness prayer rituals. Meet with monks at Tashichho Dzong. Evening meditation and discussion on mindfulness practices.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 6,
        title: "Thimphu to Punakha - Sacred Sites",
        description:
          "Journey to Punakha via Dochula Pass. Prayers at the 108 stupas. Visit Punakha Dzong and Chimi Lhakhang (fertility temple). Evening reflection session.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 7,
        title: "Departure with Blessings",
        description:
          "Morning blessing ceremony with monks. Final meditation session. Transfer to Paro airport with renewed spiritual energy.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed spiritual guide",
      "Meditation sessions with monks",
      "Buddhist teaching sessions",
      "Private transportation",
      "All entrance fees and permits",
      "Prayer flags and offerings",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Single room supplement ($190)",
    ],
    whatToBring: [
      "Comfortable meditation clothing",
      "Cushion for sitting meditation",
      "Journal for reflections",
      "Modest temple attire",
      "Walking shoes",
      "Open mind and heart",
      "Personal meditation props if preferred",
    ],
  },
  "eastern-bhutan": {
    id: "eastern-bhutan",
    title: "Eastern Bhutan Discovery",
    description: "Explore the remote and less-visited eastern regions of Bhutan",
    longDescription:
      "Venture off the beaten path to explore eastern Bhutan, a region rarely visited by tourists but rich in traditional culture and stunning landscapes. Experience authentic village life, ancient weaving traditions, and interact with communities that maintain centuries-old customs. This journey offers a unique perspective on Bhutan's diverse cultural landscape.",
    duration: "10 Days / 9 Nights",
    price: 3200,
    image: "/eastern-bhutan-remote-villages-mountains.jpg",
    gallery: [
      "/eastern-bhutan-remote-villages-mountains.jpg",
      "/bhutan-eastern-trashigang-traditional-weaving-wome.jpg",
      "/eastern-bhutan-mongar-dzong-mountain-fortress.jpg",
      "/bhutan-eastern-village-authentic-homestay-culture.jpg",
    ],
    rating: 4.7,
    reviews: 73,
    category: "Cultural Tour",
    difficulty: "Moderate",
    bestTime: "October-April",
    groupSize: "2-8 people",
    highlights: [
      "Remote Trashigang and Mongar regions",
      "Traditional weaving demonstrations",
      "Authentic village homestays",
      "Ancient temples and dzongs",
      "Unique eastern Bhutanese culture",
      "Off-the-beaten-path adventure",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, meet guide and transfer to hotel. Visit Paro Rinpung Dzong and town. Evening trip briefing.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro to Thimphu to Punakha",
        description: "Drive to Punakha via Thimphu and Dochula Pass. Visit Punakha Dzong. Prepare for journey east.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 3,
        title: "Punakha to Bumthang",
        description:
          "Long scenic drive to Bumthang through central Bhutan. Cross multiple passes with spectacular views. Arrive in Bumthang valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Bumthang",
      },
      {
        day: 4,
        title: "Bumthang to Mongar",
        description:
          "Continue east to Mongar. Journey through diverse landscapes and climate zones. Visit Ura village en route. Arrive in Mongar.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Mongar",
      },
      {
        day: 5,
        title: "Mongar to Trashigang",
        description:
          "Drive to Trashigang, eastern Bhutan's main town. Visit Mongar Dzong before departure. Arrive in Trashigang and explore the bustling market.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Trashigang",
      },
      {
        day: 6,
        title: "Trashigang Exploration",
        description:
          "Full day exploring Trashigang. Visit the dzong, traditional weaving centers, and interact with local communities. Experience authentic eastern Bhutanese culture.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Trashigang",
      },
      {
        day: 7,
        title: "Trashigang to Samdrup Jongkhar",
        description:
          "Journey to Bhutan's southeastern border town. Experience diverse ecosystems from mountains to subtropical plains. Visit local markets.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Samdrup Jongkhar",
      },
      {
        day: 8,
        title: "Return Journey Begins",
        description:
          "Start return journey westward. Stop at villages and temples en route. Overnight in central Bhutan.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel en route",
      },
      {
        day: 9,
        title: "Return to Paro",
        description:
          "Continue drive back to Paro. Final mountain passes and valley views. Evening at leisure for reflection and souvenir shopping.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to airport for departure. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in available hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private 4WD vehicle for entire journey",
      "All entrance fees and permits",
      "Bottled water and snacks for long drives",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Single room supplement ($280)",
    ],
    whatToBring: [
      "Comfortable clothes for long drives",
      "Layers for varying temperatures",
      "Good walking shoes",
      "Camera and extra batteries",
      "Personal medications",
      "Snacks for journey",
      "Flexible mindset for basic facilities",
    ],
  },
  "western-highlights": {
    id: "western-highlights",
    title: "Western Bhutan Highlights",
    description: "Experience the best of Paro, Thimphu, and Punakha valleys",
    longDescription:
      "Discover the highlights of western Bhutan in this perfectly paced tour covering the three most visited valleys. From the iconic Tiger's Nest to the majestic Punakha Dzong, experience Bhutan's most celebrated attractions combined with cultural immersion, beautiful landscapes, and authentic local interactions.",
    duration: "6 Days / 5 Nights",
    price: 2100,
    image: "/punakha-valley-bhutan-rice-fields-landscape.jpg",
    gallery: [
      "/punakha-valley-bhutan-rice-fields-landscape.jpg",
      "/bhutan-dochula-pass-108-stupas-himalayan-mountains.jpg",
      "/thimphu-bhutan-buddha-dordenma-giant-golden-statue.jpg",
      "/paro-bhutan-town-traditional-houses-valley-view.jpg",
    ],
    rating: 4.8,
    reviews: 189,
    category: "Cultural Tour",
    difficulty: "Easy to Moderate",
    bestTime: "March-May, September-November",
    groupSize: "2-15 people",
    highlights: [
      "Tiger's Nest monastery trek",
      "Dochula Pass with 108 stupas",
      "Punakha Dzong at river confluence",
      "Thimphu city exploration",
      "Memorial Chorten and Buddha Dordenma",
      "Traditional crafts and markets",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, one of the world's most scenic flights. Airport reception and transfer to hotel. Visit Paro Rinpung Dzong and town. Welcome dinner.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Paro to Thimphu",
        description:
          "Drive to Thimphu (1.5 hours). Visit Buddha Dordenma statue, Memorial Chorten, National Folk Heritage Museum. Evening stroll through weekend market (if Sat/Sun).",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 3,
        title: "Thimphu to Punakha",
        description:
          "Journey to Punakha via scenic Dochula Pass (3,100m) with 108 stupas and panoramic Himalayan views. Visit magnificent Punakha Dzong and Chimi Lhakhang fertility temple.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Punakha",
      },
      {
        day: 4,
        title: "Punakha to Paro",
        description:
          "Return to Paro valley. Visit Kyichu Lhakhang, one of Bhutan's oldest temples. Afternoon exploring Paro town and local markets. Evening cultural show or hot stone bath.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 5,
        title: "Tiger's Nest Trek",
        description:
          "Early morning trek to Taktsang Monastery (Tiger's Nest), perched dramatically on a cliff 900m above valley floor. This iconic 4-5 hour hike is Bhutan's must-do experience. Afternoon at leisure.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Morning free for last minute shopping or optional short hike. Transfer to airport for departure. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Licensed English-speaking guide",
      "Private vehicle with driver",
      "All entrance fees and permits",
      "Bottled water during tours",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses and tips",
      "Alcoholic beverages",
      "Optional hot stone bath ($40)",
      "Single room supplement ($160)",
    ],
    whatToBring: [
      "Sturdy hiking boots",
      "Layered clothing",
      "Rain jacket",
      "Camera",
      "Sunscreen and hat",
      "Day backpack",
      "Personal first aid kit",
    ],
  },
  "druk-path-trek": {
    id: "druk-path-trek",
    title: "Druk Path Trek",
    description: "Classic trek from Paro to Thimphu through alpine meadows and lakes",
    longDescription:
      "The Druk Path Trek is Bhutan's most popular short trek, offering stunning mountain views, pristine alpine lakes, and encounters with yak herders. This moderate 5-day trek crosses high mountain passes connecting Paro and Thimphu valleys, with spectacular views of the Himalayan peaks and visits to remote monasteries.",
    duration: "8 Days / 7 Nights",
    price: 2750,
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
    gallery: [
      "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
      "/bhutan-druk-path-trek-jimilang-lake-pristine-alpin.jpg",
      "/bhutan-trek-yak-herders-nomadic-camp-mountains.jpg",
      "/bhutan-phajoding-monastery-cliff-mountain-views.jpg",
    ],
    rating: 4.9,
    reviews: 142,
    category: "Trekking",
    difficulty: "Moderate",
    bestTime: "March-May, September-November",
    groupSize: "2-10 people",
    highlights: [
      "Pristine alpine lakes",
      "Panoramic Himalayan mountain views",
      "Traditional yak herder camps",
      "Remote monasteries",
      "Rhododendron forests in spring",
      "Cultural sites in Paro and Thimphu",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, meet trekking team. Gear check and trek preparation. Visit Paro Dzong. Evening trek briefing and gear distribution.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Trek Begins - Paro to Jele Dzong",
        description:
          "Trek from National Museum (2,840m) to Jele Dzong (3,480m). 4-5 hours through blue pine forests. First night camping with views of Paro valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 3,
        title: "Jele Dzong to Jangchulakha",
        description:
          "Trek to Jangchulakha (3,770m). 4 hours through rhododendron forests. Views of Himalayan peaks including Jumolhari. Yak herder camps en route.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 4,
        title: "Jangchulakha to Jimilang Tsho",
        description:
          "Trek to Jimilang Tsho lake (3,880m). 5 hours through alpine meadows. Beautiful glacial lake camping. Mountain views and yak spotting.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping at lakeside",
      },
      {
        day: 5,
        title: "Jimilang Tsho to Simkota Tsho",
        description:
          "Trek to Simkota Tsho lake (4,110m). 5 hours crossing high passes. Two pristine alpine lakes. Spectacular mountain panoramas including Gangkar Puensum, Bhutan's highest peak.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping at lakeside",
      },
      {
        day: 6,
        title: "Simkota Tsho to Phajoding",
        description:
          "Trek to Phajoding monastery (3,750m). 4 hours descending through forests. Visit monastery complex. Final night camping with views of Thimphu valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping near monastery",
      },
      {
        day: 7,
        title: "Phajoding to Thimphu - Trek Ends",
        description:
          "Final descent to Thimphu (3 hours). Trek celebration lunch. Afternoon sightseeing in capital. Visit Buddha Dordenma and Memorial Chorten. Hot shower!",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Thimphu",
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Paro airport for departure. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation (hotels & camping)",
      "All meals during trek",
      "Licensed trekking guide and assistant",
      "Camping equipment (tents, sleeping bags, mats)",
      "Pack horses and horsemen",
      "Trek cook and kitchen crew",
      "All permits and entrance fees",
      "Private vehicle for transfers",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance with trekking coverage",
      "Personal trekking gear",
      "Alcoholic beverages",
      "Tips for trekking crew",
      "Single tent supplement ($150)",
    ],
    whatToBring: [
      "Good trekking boots (broken in)",
      "Warm sleeping bag",
      "Trekking poles",
      "Layered clothing system",
      "Rain gear",
      "Headlamp with extra batteries",
      "Water bottles/hydration system",
      "Personal first aid kit",
      "Sunscreen, sunglasses, hat",
    ],
  },
  "jomolhari-trek": {
    id: "jomolhari-trek",
    title: "Jomolhari Base Camp Trek",
    description: "Challenging trek to the base of sacred Mt. Jomolhari",
    longDescription:
      "The Jomolhari Trek is one of Bhutan's most spectacular high-altitude treks, taking you to the base of sacred Mt. Jomolhari (7,326m). This challenging trek offers breathtaking mountain scenery, encounters with nomadic herders, natural hot springs, and crossing high passes above 4,000m. Experience the raw beauty of the Bhutanese Himalayas.",
    duration: "11 Days / 10 Nights",
    price: 3600,
    image: "/mt-jomolhari-bhutan-snow-mountain-base-camp.jpg",
    gallery: [
      "/mt-jomolhari-bhutan-snow-mountain-base-camp.jpg",
      "/jomolhari-mountain-peak-7326m-sacred-snow-summit-b.jpg",
      "/bhutan-high-altitude-trekking-camp-tents-mountain-.jpg",
      "/gasa-hot-springs-bhutan-natural-thermal-pools.jpg",
    ],
    rating: 4.8,
    reviews: 97,
    category: "Trekking",
    difficulty: "Challenging",
    bestTime: "April-June, September-October",
    groupSize: "2-8 people",
    highlights: [
      "Mt. Jomolhari (7,326m) close-up views",
      "Natural hot springs at Gasa",
      "Nomadic yak herder camps",
      "High passes above 4,000m",
      "Remote mountain villages",
      "Pristine wilderness and wildlife",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, meet team. Acclimatization walk around Paro valley. Gear check and trek briefing. Evening at hotel.",
        meals: "Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 2,
        title: "Acclimatization - Tiger's Nest Hike",
        description:
          "Acclimatization hike to Taktsang Monastery (3,120m). Important preparation for high altitude. Return to Paro for final preparations.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "3-star hotel in Paro",
      },
      {
        day: 3,
        title: "Drive to Shana - Trek to Soi Thangthangka",
        description:
          "Drive to Drugyal Dzong then Shana (2,820m). Trek 5 hours to Soi Thangthangka (3,610m) through forests along Paro Chhu river.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 4,
        title: "Soi Thangthangka to Jangothang",
        description:
          "Trek 6-7 hours to Jangothang (4,040m), the Jomolhari base camp. Stunning views of Mt. Jomolhari and Jichu Drake. High altitude camping.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping at base camp",
      },
      {
        day: 5,
        title: "Acclimatization Day at Jangothang",
        description:
          "Rest day for acclimatization. Optional day hike to higher viewpoints. Explore base camp area. Photography opportunities. Interact with yak herders.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping at base camp",
      },
      {
        day: 6,
        title: "Jangothang to Lingshi",
        description:
          "Trek 7-8 hours crossing Nyile La pass (4,870m). Descend to Lingshi (4,010m). Views of Lingshi Dzong. Challenging high pass day.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping near Lingshi",
      },
      {
        day: 7,
        title: "Lingshi to Shodu",
        description:
          "Trek 8 hours to Shodu (4,080m). Pass through yak herder settlements. Spectacular mountain scenery continues. Long but rewarding day.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 8,
        title: "Shodu to Barshong",
        description:
          "Trek 7 hours crossing Jare La pass (4,750m). Descend to Barshong (3,600m). Views of Tsheri Gang and Gangchenta peaks.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 9,
        title: "Barshong to Dolam Kencho",
        description:
          "Trek 5-6 hours descending through rhododendron forests to Dolam Kencho (3,300m). Gentler day after high passes.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 10,
        title: "Dolam Kencho to Gasa - Hot Springs",
        description:
          "Trek 4 hours to Gasa (2,770m). Visit Gasa Dzong. Relax in natural hot springs - perfect end to trek! Drive or stay in Gasa.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Lodge in Gasa or camping",
      },
      {
        day: 11,
        title: "Gasa to Thimphu - Departure",
        description:
          "Drive to Thimphu (6-7 hours). Trek celebration lunch. Transfer to Paro airport for evening departure or add extra night.",
        meals: "Breakfast, Lunch",
        accommodation: "N/A or optional hotel",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation (hotels & camping)",
      "All meals during trek",
      "Experienced trekking guide and assistant",
      "Full camping equipment",
      "Pack horses and horsemen",
      "Trek cook and support crew",
      "All permits and entrance fees",
      "Private vehicle transfers",
      "Emergency evacuation insurance",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance with trekking coverage",
      "Personal trekking gear",
      "Alcoholic beverages",
      "Tips for trekking crew",
      "Single tent supplement ($200)",
    ],
    whatToBring: [
      "Good trekking boots (broken in)",
      "Warm sleeping bag",
      "Trekking poles",
      "Layered clothing system",
      "Rain gear",
      "Headlamp with extra batteries",
      "Water bottles/hydration system",
      "Personal first aid kit",
      "Sunscreen, sunglasses, hat",
    ],
  },
  "snowman-trek": {
    id: "snowman-trek",
    title: "Snowman Trek",
    description: "One of the world's most difficult treks through remote Himalayan regions",
    longDescription:
      "The legendary Snowman Trek is considered one of the most challenging treks in the world. This epic 25-day journey traverses remote northern Bhutan, crossing 11 high passes over 4,500m and reaching altitudes above 5,300m. Experience extreme wilderness, encounter nomadic communities, and witness some of the most spectacular Himalayan scenery on earth. This trek is for serious adventurers only.",
    duration: "25 Days / 24 Nights",
    price: 7850,
    image: "/bhutan-snowman-trek-extreme-himalayan-mountains-sn.jpg",
    gallery: [
      "/bhutan-snowman-trek-extreme-himalayan-mountains-sn.jpg",
      "/bhutan-lunana-region-remote-village-yak-herders-ex.jpg",
      "/bhutan-snowman-trek-high-pass-5000m-extreme-condit.jpg",
      "/gangkar-puensum-mountain-bhutan-highest-unclimbed-.jpg",
    ],
    rating: 4.9,
    reviews: 28,
    category: "Trekking",
    difficulty: "Extreme",
    bestTime: "September-October (only)",
    groupSize: "2-6 people",
    highlights: [
      "11 high passes over 4,500m",
      "Remote wilderness areas",
      "Extreme adventure challenge",
      "Nomadic yak herder encounters",
      "Spectacular Himalayan panoramas",
      "Lunana region - Bhutan's most remote area",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Preparation in Paro",
        description:
          "Arrive in Paro. Meet expedition team. Final gear check and preparation. Team briefing. Evening at hotel.",
        meals: "Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 2,
        title: "Acclimatization - Tiger's Nest",
        description: "Acclimatization hike to Tiger's Nest (3,120m). Critical preparation. Final equipment check.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 3,
        title: "Trek Day 1 - Shana to Thangthangka",
        description: "Drive to Shana, begin trek to Thangthangka (3,610m). 5-6 hours. Trek begins through forests.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 4,
        title: "Thangthangka to Jangothang Base Camp",
        description: "Trek to Jomolhari base camp (4,040m). 6-7 hours. First views of Mt. Jomolhari.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 5,
        title: "Acclimatization at Jangothang",
        description: "Rest day. Day hikes for acclimatization. Photography. Prepare for high passes ahead.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 6,
        title: "Jangothang to Laya via Nyile La",
        description: "Cross Nyile La pass (4,870m) to Laya (4,010m). 7-8 hours. First major pass.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 7,
        title: "Laya to Chebisa",
        description: "Trek to Chebisa (3,880m). 6 hours. Visit traditional village and Lingshi Dzong.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 8,
        title: "Chebisa to Shomuthang via Gobu La",
        description: "Cross Gobu La pass (4,440m) to Shomuthang (4,220m). 7-8 hours. Beautiful alpine scenery.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 9,
        title: "Shomuthang to Robluthang via Jhari La",
        description: "Cross Jhari La pass (4,750m) to Robluthang (4,160m). 7 hours. Increasing remoteness.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 10,
        title: "Robluthang to Limithang via Tshorim La",
        description: "Cross Tshorim La pass (4,900m) to Limithang (4,140m). 7-8 hours. High altitude plateau.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 11,
        title: "Limithang to Laya Village",
        description: "Trek to Laya (3,840m). 6-7 hours. Arrive at unique Layap village. Cultural interaction.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 12,
        title: "Rest Day in Laya",
        description:
          "Acclimatization and cultural day. Explore Laya village. Meet Layap people. Prepare for Lunana region.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 13,
        title: "Laya to Koina via Tsemo La",
        description: "Cross Tsemo La pass (4,900m) to Koina (4,100m). 7-8 hours. Enter truly remote territory.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 14,
        title: "Koina to Lunana (Lhedi)",
        description:
          "Trek to Lhedi in Lunana region (4,050m). 7 hours. Arrive in Bhutan's most remote region. Limited resupply possible.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 15,
        title: "Lunana to Thanza",
        description:
          "Trek to Thanza village (4,080m). 7 hours. Remote settlement near glacial lakes. Views of Gangkar Puensum.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 16,
        title: "Rest Day in Thanza",
        description:
          "Acclimatization. Explore Thanza. Visit glacial lakes. Prepare for highest passes ahead. Resupply if needed.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 17,
        title: "Thanza to Danji via Gophu La",
        description:
          "Cross Gophu La pass (5,300m) to Danji (4,400m). 8-9 hours. Highest point of trek. Extreme conditions possible.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 18,
        title: "Danji to Tshochenchen via Rinchen Zoe La",
        description:
          "Cross Rinchen Zoe La (5,280m) to Tshochenchen (4,580m). 8 hours. Another extreme high pass. Spectacular views.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 19,
        title: "Tshochenchen to Jichu Dramo via Kargo La & Tempe La",
        description:
          "Cross two passes: Kargo La (5,140m) and Tempe La (5,180m). Trek to Jichu Dramo (5,050m). 8-9 hours. Challenging day.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 20,
        title: "Jichu Dramo to Chukarpo via Gang La",
        description: "Cross Gang La pass (5,160m) to Chukarpo (4,750m). 7-8 hours. Begin gradual descent.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 21,
        title: "Chukarpo to Thampe Tsho",
        description:
          "Trek to Thampe Tsho (4,300m). 6-7 hours. Beautiful alpine lake. Easier day after extreme section.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 22,
        title: "Thampe Tsho to Maurothang",
        description: "Trek to Maurothang (3,850m). 7 hours. Continue descent. Warmer temperatures. Near trek end.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 23,
        title: "Maurothang to Sephu",
        description: "Trek to Sephu (3,600m). 6 hours. Continue descent. Warmer temperatures. Near trek end.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 24,
        title: "Sephu to Dur - Trek Ends",
        description:
          "Final trek to Dur village (3,150m). 5-6 hours. Meet vehicles. Drive to Thimphu (5-6 hours). Trek completion celebration!",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Thimphu",
      },
      {
        day: 25,
        title: "Departure",
        description:
          "Transfer to Paro airport. Departure. Congratulations on completing one of the world's toughest treks!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation (hotels & camping)",
      "All meals during trek",
      "Experienced trekking guide and assistant",
      "Full expedition camping equipment",
      "Pack horses and horsemen",
      "Trek cook and support crew",
      "High altitude medical kit",
      "All permits and fees",
      "Private vehicle transfers",
      "Emergency evacuation insurance",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance with trekking coverage",
      "Personal high-altitude gear",
      "Alcoholic beverages",
      "Tips for crew",
      "Single tent supplement ($200)",
    ],
    whatToBring: [
      "Good trekking boots (broken in)",
      "Warm sleeping bag (-10°C rated)",
      "Trekking poles",
      "Layered clothing system",
      "Rain gear",
      "Headlamp with extra batteries",
      "Water bottles/hydration system",
      "Personal first aid kit",
      "Sunscreen, sunglasses, hat",
    ],
  },
  "dagala-thousand-lakes": {
    id: "dagala-thousand-lakes",
    title: "Dagala Thousand Lakes Trek",
    description: "Moderate trek through pristine alpine landscape dotted with glacial lakes",
    longDescription:
      "The Dagala Thousand Lakes Trek is a hidden gem offering stunning alpine scenery without the extreme challenges of higher altitude treks. Named after the numerous glacial lakes scattered throughout the region, this trek takes you through pristine landscapes with panoramic views of the eastern Himalayas. Perfect for those seeking a moderate trekking experience with incredible natural beauty.",
    duration: "9 Days / 8 Nights",
    price: 2950,
    image: "/bhutan-alpine-glacial-lakes-mountains-pristine-wil.jpg",
    gallery: [
      "/bhutan-alpine-glacial-lakes-mountains-pristine-wil.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.7,
    reviews: 86,
    category: "Trekking",
    difficulty: "Moderate",
    bestTime: "April-June, September-October",
    groupSize: "2-8 people",
    highlights: [
      "Multiple pristine alpine lakes",
      "Rhododendron forests in bloom",
      "Wildlife spotting opportunities",
      "Panoramic mountain views",
      "Remote camping experience",
      "Traditional yak herder camps",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description:
          "Arrive in Paro, meet guide and crew. Gear check and trek briefing. Visit Paro Dzong. Rest and prepare for trek.",
        meals: "Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 2,
        title: "Drive to Genekha - Trek to Gur",
        description:
          "Drive to Genekha village (2,800m). Begin trekking through blue pine forests to Gur (3,290m). 3-4 hours. First night camping.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 3,
        title: "Gur to Labatama",
        description:
          "Trek to Labatama (4,300m). 5-6 hours ascending through rhododendron forests. Cross ridge with excellent views. Higher altitude camping.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 4,
        title: "Labatama - Lake Exploration Day",
        description:
          "Day hike exploring the Dagala lakes region. Visit multiple glacial lakes including Reli Tso and Hen Tso. Return to camp. Photography day.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 5,
        title: "Labatama to Panka via Labe La",
        description:
          "Trek to Panka (4,000m) crossing Labe La pass (4,500m). 5-6 hours. Panoramic views of Himalayan peaks including Jumolhari and Kanchenjunga.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 6,
        title: "Panka to Tsherigang",
        description:
          "Trek to Tsherigang (3,200m). 5 hours descending through forests. Yak herder camps en route. Easier day after high passes.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping",
      },
      {
        day: 7,
        title: "Tsherigang to Chamgang - Trek Ends",
        description:
          "Final trek day to Chamgang (2,600m). 4 hours through villages and farmland. Meet vehicles. Drive to Thimphu. Trek celebration.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Thimphu",
      },
      {
        day: 8,
        title: "Thimphu to Paro",
        description:
          "Thimphu sightseeing. Visit Buddha Dordenma and Memorial Chorten. Drive to Paro. Final evening at leisure.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 9,
        title: "Departure",
        description: "Transfer to airport for departure. Tashi Delek!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation (hotels & camping)",
      "All meals during trek",
      "Licensed trekking guide",
      "Full camping equipment",
      "Pack horses and horsemen",
      "Cook and support staff",
      "All permits and fees",
      "Private vehicle transfers",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance with trekking coverage",
      "Personal trekking gear",
      "Alcoholic beverages",
      "Tips for crew",
      "Single tent supplement ($150)",
    ],
    whatToBring: [
      "Trekking boots (broken in)",
      "Warm sleeping bag",
      "Trekking poles",
      "Layered clothing",
      "Rain gear",
      "Headlamp",
      "Water bottles",
      "Camera",
      "Sunscreen and sunglasses",
    ],
  },
  "luxury-bhutan": {
    id: "luxury-bhutan",
    title: "Luxury Bhutan Experience",
    description: "Indulge in Bhutan's finest hotels, cuisine, and exclusive experiences",
    longDescription:
      "Experience Bhutan in ultimate luxury with this curated journey through the kingdom's finest 5-star resorts and exclusive experiences. From private cultural tours to gourmet dining featuring Bhutanese and international cuisine, spa treatments, and VIP access to monuments, this package offers unparalleled comfort and service while discovering Bhutan's cultural treasures.",
    duration: "7 Days / 6 Nights",
    price: 4950,
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
    gallery: [
      "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 5.0,
    reviews: 94,
    category: "Luxury",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2-6 people",
    highlights: [
      "5-star luxury resorts",
      "Private guided tours",
      "Gourmet dining experiences",
      "Exclusive spa treatments",
      "VIP monument access",
      "Helicopter transfers optional",
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Arrival in Paro",
        description:
          "VIP airport reception and private transfer to luxury resort. Afternoon spa treatment. Gourmet welcome dinner. Orientation with personal guide.",
        meals: "Dinner",
        accommodation: "5-star resort in Paro",
      },
      {
        day: 2,
        title: "Private Paro Exploration",
        description:
          "Private guided tour of Paro Rinpung Dzong and National Museum. Exclusive visit to traditional farmhouse for lunch. Afternoon at leisure with spa options.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "5-star resort in Paro",
      },
      {
        day: 3,
        title: "Private Tiger's Nest Experience",
        description:
          "Private trek to Taktsang Monastery with personal guide. Gourmet picnic lunch at cafeteria. Optional horse ride. Evening traditional hot stone bath.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "5-star resort in Paro",
      },
      {
        day: 4,
        title: "Luxury Transfer to Punakha",
        description:
          "Scenic drive to Punakha with stops at Dochula Pass. Private lunch at mountain restaurant. Check into exclusive Punakha resort. Spa treatment included.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "5-star resort in Punakha",
      },
      {
        day: 5,
        title: "Punakha Valley VIP Tour",
        description:
          "Private tour of magnificent Punakha Dzong before crowds. Exclusive visit to Chimi Lhakhang. Gourmet picnic by riverside. Sunset cocktails at resort.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "5-star resort in Punakha",
      },
      {
        day: 6,
        title: "Return to Paro Luxury",
        description:
          "Leisurely morning. Drive to Paro with lunch stop. Afternoon exclusive shopping experience with personal shopper. Farewell gourmet dinner.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "5-star resort in Paro",
      },
      {
        day: 7,
        title: "VIP Departure",
        description: "Late checkout. Private transfer to airport. Lounge access. VIP departure assistance.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "5-star luxury resort accommodation",
      "All gourmet meals with wine pairing",
      "Private English-speaking guide",
      "Luxury vehicle with driver",
      "Daily spa treatments",
      "VIP monument access",
      "All entrance fees",
      "Welcome and farewell gifts",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal shopping",
      "Additional alcoholic beverages",
      "Helicopter transfers (available on request)",
      "Tips for guide and driver",
    ],
    whatToBring: [
      "Elegant casual wear",
      "Comfortable walking shoes",
      "Light hiking boots for Tiger's Nest",
      "Camera",
      "Sun protection",
      "Personal toiletries",
      "Formal wear for special dinners",
    ],
  },
  "luxury-wellness": {
    id: "luxury-wellness",
    title: "Wellness & Rejuvenation Retreat",
    description: "Holistic wellness journey with hot stone baths and spa treatments",
    longDescription:
      "Rejuvenate your mind, body, and spirit in Bhutan's pristine environment with this wellness-focused retreat. Combining traditional Bhutanese healing practices with modern spa therapies, daily yoga and meditation, organic cuisine, and the therapeutic benefits of natural hot springs, this retreat offers complete relaxation and renewal in the peaceful Himalayan setting.",
    duration: "6 Days / 5 Nights",
    price: 3850,
    image: "/bhutan-wellness-spa-hot-stone-bath-meditation-retr.jpg",
    gallery: [
      "/bhutan-wellness-spa-hot-stone-bath-meditation-retr.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    reviews: 67,
    category: "Luxury",
    difficulty: "Easy",
    bestTime: "Year-round",
    groupSize: "2-10 people",
    highlights: [
      "Daily yoga and meditation",
      "Traditional hot stone baths",
      "Spa treatments and massages",
      "Organic wellness cuisine",
      "Mindfulness workshops",
      "Natural hot springs",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Wellness Assessment",
        description:
          "Arrive in Paro, transfer to wellness resort. Personal wellness consultation. Gentle evening yoga. Organic dinner. Sleep preparation meditation.",
        meals: "Dinner",
        accommodation: "Wellness resort in Paro",
      },
      {
        day: 2,
        title: "Detox & Mindfulness Day",
        description:
          "Morning yoga and breathing exercises. Detox spa treatment. Meditation workshop. Light organic meals. Evening sound healing session.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Wellness resort in Paro",
      },
      {
        day: 3,
        title: "Nature & Movement",
        description:
          "Gentle nature walk to monastery. Guided meditation in temple. Afternoon spa therapy. Traditional hot stone bath. Organic farm-to-table dinner.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Wellness resort in Paro",
      },
      {
        day: 4,
        title: "Transfer to Punakha Wellness",
        description:
          "Mindful drive to Punakha with meditation stops at scenic points. Check into valley wellness center. Afternoon river meditation. Evening yoga.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Wellness resort in Punakha",
      },
      {
        day: 5,
        title: "Deep Relaxation Day",
        description:
          "Morning yoga. Full body traditional Bhutanese massage. Meditation by riverside. Natural hot spring visit. Evening healing meditation.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Wellness resort in Punakha",
      },
      {
        day: 6,
        title: "Integration & Departure",
        description:
          "Final morning yoga. Wellness consultation review. Light breakfast. Mindful transfer to airport with breathing practice.",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "Wellness resort accommodation",
      "All organic vegetarian/vegan meals",
      "Daily yoga and meditation sessions",
      "Spa treatments and massages",
      "Wellness consultation",
      "Hot stone bath experiences",
      "Mindfulness workshops",
      "Private vehicle transfers",
      "All entrance fees",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal expenses",
      "Additional spa treatments",
      "Tips for staff",
      "Single room supplement ($150)",
    ],
    whatToBring: [
      "Comfortable yoga clothes",
      "Meditation cushion (optional)",
      "Journal for reflection",
      "Light walking shoes",
      "Swimwear for hot springs",
      "Personal toiletries",
      "Open mind and heart",
    ],
  },
  "photography-tour": {
    id: "photography-tour",
    title: "Photography Expedition",
    description: "Capture Bhutan's stunning landscapes and vibrant culture with expert guidance",
    longDescription:
      "Designed for photography enthusiasts, this expedition takes you to Bhutan's most photogenic locations during optimal lighting conditions. Led by experienced photography guides familiar with the best vantage points, you'll capture stunning landscapes, vibrant festivals, ancient architecture, and intimate cultural moments. Includes photography workshops and post-processing sessions.",
    duration: "8 Days / 7 Nights",
    price: 3150,
    image: "/bhutan-photography-landscape-monks-temples-colorfu.jpg",
    gallery: [
      "/bhutan-photography-landscape-monks-temples-colorfu.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.8,
    reviews: 79,
    category: "Special Interest",
    difficulty: "Moderate",
    bestTime: "March-May, September-November",
    groupSize: "4-8 people",
    highlights: [
      "Golden hour photography sessions",
      "Festival and cultural photography",
      "Landscape composition workshops",
      "Night sky photography",
      "Professional photography guidance",
      "Post-processing tutorials",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Photography Briefing",
        description:
          "Arrive in Paro. Group introduction and photography workshop. Equipment check. Evening golden hour session at Paro Dzong.",
        meals: "Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 2,
        title: "Paro Valley Photography",
        description:
          "Sunrise at Paro farmlands. Mid-morning temple photography. Afternoon composition workshop. Sunset at National Museum viewpoint.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 3,
        title: "Tiger's Nest Photo Trek",
        description:
          "Early morning trek to Taktsang for sunrise photography. Different angles and compositions. Afternoon portrait session with monks.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 4,
        title: "Dochula Pass to Punakha",
        description:
          "Sunrise at Dochula with 108 stupas and Himalayan backdrop. Drive to Punakha. Afternoon Punakha Dzong architecture photography.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Punakha",
      },
      {
        day: 5,
        title: "Punakha Cultural Photography",
        description:
          "Early morning market photography. Chimi Lhakhang. Rice field landscapes. Evening river confluence golden hour session.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Punakha",
      },
      {
        day: 6,
        title: "Thimphu Urban Photography",
        description:
          "Drive to Thimphu. Buddha Dordenma sunset. Night photography at Memorial Chorten. Traditional dance performance photography.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Thimphu",
      },
      {
        day: 7,
        title: "Final Paro Sessions",
        description:
          "Return to Paro. Final golden hour sessions. Group photo review and critique. Post-processing workshop. Farewell dinner.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 8,
        title: "Departure",
        description: "Morning at leisure. Transfer to airport with memory cards full of stunning images!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals",
      "Professional photography guide",
      "Photography workshops and critiques",
      "Private vehicle",
      "All entrance fees",
      "Early access permits where possible",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Photography equipment",
      "Personal expenses",
      "Tips for guide",
      "Single room supplement ($170)",
    ],
    whatToBring: [
      "DSLR or mirrorless camera",
      "Wide angle and telephoto lenses",
      "Tripod (essential)",
      "Extra batteries and memory cards",
      "Laptop for image review",
      "Lens cleaning kit",
      "Comfortable camera bag",
      "Weather protection for gear",
    ],
  },
  birdwatching: {
    id: "birdwatching",
    title: "Birdwatching Paradise",
    description: "Spot rare Himalayan birds in pristine forests and valleys",
    longDescription:
      "Bhutan is a birding paradise with over 680 recorded species, including many rare and endemic Himalayan birds. This specialized birding tour takes you to the country's best birding locations across different altitudes and ecosystems, from subtropical forests to alpine meadows. Led by expert ornithologists, you'll have opportunities to spot the endangered Black-necked Crane, Beautiful Nuthatch, Ward's Trogon, and many other prized species.",
    duration: "9 Days / 8 Nights",
    price: 2950,
    image: "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
    gallery: [
      "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.7,
    reviews: 52,
    category: "Special Interest",
    difficulty: "Easy to Moderate",
    bestTime: "March-May, November-February",
    groupSize: "2-10 people",
    highlights: [
      "680+ bird species possible",
      "Black-necked Crane viewing",
      "Endemic Himalayan species",
      "Expert ornithologist guides",
      "Multiple ecosystems",
      "Photography opportunities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival - Paro Valley Birding",
        description:
          "Arrive in Paro. Afternoon birding along Paro Chhu river. Species: Ibisbill, Brown Dipper, White-capped Water Redstart. Evening checklist.",
        meals: "Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 2,
        title: "Paro Mountain Birding",
        description:
          "Early morning birding in blue pine forests. Target species: Ward's Trogon, Fire-tailed Myzornis, Himalayan Monal. Afternoon farmland birding.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 3,
        title: "Thimphu Birding Habitats",
        description:
          "Drive to Thimphu via Dochula Pass. High altitude birding. Species: Blood Pheasant, Himalayan Griffon. Afternoon Memorial Chorten surrounds.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Thimphu",
      },
      {
        day: 4,
        title: "Dochu La Forest Birding",
        description:
          "Full day at Dochula Pass area. Target: Beautiful Nuthatch, Rufous-vented Tit. Mixed species flocks. Rhododendron forest birding.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Thimphu",
      },
      {
        day: 5,
        title: "Punakha Subtropical Birds",
        description:
          "Drive to warmer Punakha valley. Subtropical species: Oriental Honey Buzzard, Slaty-backed Forktail. Rice field birding. River specialists.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Punakha",
      },
      {
        day: 6,
        title: "Phobjikha Valley - Crane Viewing",
        description:
          "Drive to Phobjikha valley, winter home of Black-necked Cranes. Multiple crane viewing sessions. Alpine meadow species. Nature center visit.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Phobjikha",
      },
      {
        day: 7,
        title: "Phobjikha Grassland Birding",
        description:
          "Early morning crane feeding behavior. Grassland species: Eurasian Hoopoe, Common Redstart. Afternoon high altitude forest birding.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Phobjikha",
      },
      {
        day: 8,
        title: "Return to Paro",
        description:
          "Drive to Paro with birding stops. Checklist review. Final birding session at hotel surrounds. Group species list compilation.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel in Paro",
      },
      {
        day: 9,
        title: "Departure",
        description: "Morning at leisure. Transfer to airport. Take home incredible bird sightings and photographs!",
        meals: "Breakfast",
        accommodation: "N/A",
      },
    ],
    included: [
      "Sustainable Development Fee (SDF) - $100 per night",
      "All accommodation in 3-star hotels",
      "All meals",
      "Expert ornithologist guide",
      "Bird field guides and checklists",
      "Spotting scope for group use",
      "Private vehicle",
      "All entrance fees and permits",
    ],
    excluded: [
      "International flights",
      "Bhutan visa fee ($40)",
      "Travel insurance",
      "Personal binoculars (essential)",
      "Camera equipment",
      "Personal expenses",
      "Tips for guide",
      "Single room supplement ($180)",
    ],
    whatToBring: [
      "Binoculars (essential - 8x42 or 10x42)",
      "Bird field guide (provided but own preferred)",
      "Camera with telephoto lens",
      "Notebook for field notes",
      "Layered clothing for varying altitudes",
      "Good walking shoes",
      "Rain gear",
      "Sun protection",
    ],
  },
}

interface PackageDetailsProps {
  params: {
    id: string
  }
}

// Client component that receives the resolved id
export default function PackageDetailClient({ id }: { id: string }) {
  const params = { id } // Create params object for compatibility
  const { t } = useLanguage()
  const packageData = packagesData[params.id]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [params.id])

  if (!packageData) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold">{t("package_not_found") || "Package Not Found"}</h1>
        <p>{t("package_not_found_description") || "The package you are looking for could not be found."}</p>
      </div>
    )
  }

  const {
    title,
    description,
    longDescription,
    duration,
    image,
    gallery,
    rating,
    reviews,
    category,
    difficulty,
    bestTime,
    groupSize,
    highlights,
    itinerary,
    included,
    excluded,
    whatToBring,
  } = packageData

  const mappedPackage = packages.find((item) => item.id === packageData.id)
  const heroImage = mappedPackage?.imagePath || image
  const fallbackGallery = ["/images/package-bg.webp", "/images/tshechu.webp", "/images/bhutan-festival.jpg"]
  const galleryImages = Array.from(
    new Set(
      [
        mappedPackage?.imagePath,
        ...(Array.isArray(gallery) ? gallery : []),
        ...fallbackGallery,
      ].filter(Boolean) as string[],
    ),
  )

  const sanitizeItem = (text: string) => {
    const normalized = text.toLowerCase()

    if (normalized.includes("sustainable development fee") || normalized.includes("sdf")) {
      return "Sustainable Development Contribution (SDF)"
    }

    if (normalized.includes("visa fee")) {
      return "Visa assistance"
    }

    if (normalized.includes("single room supplement")) {
      return "Single room option"
    }

    return text
      .replace(/\$\s*\d[\d,]*/g, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s+-\s+per\s+\w+/gi, "")
      .replace(/entrance fees?/gi, "entry access")
      .replace(/\s{2,}/g, " ")
      .replace(/-\s*$/g, "")
      .trim()
  }

  const safeIncluded = included.map(sanitizeItem).filter(Boolean)
  const safeExcluded = excluded.map(sanitizeItem).filter(Boolean)
  const safeWhatToBring = whatToBring.map(sanitizeItem).filter(Boolean)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden py-8 md:py-0">
          <div className="absolute inset-0">
            <ImageLoader
              src={heroImage || "/placeholder.svg?height=600&width=1200"}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">{title}</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto px-2">{description}</p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-sm sm:text-base">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-medium">Bhutan</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-medium hidden sm:inline">{t("best_time")}:</span>
                <span className="text-white/80">{bestTime}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-medium hidden sm:inline">{t("group_size")}:</span>
                <span className="text-white/80">{groupSize}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-medium hidden sm:inline">{t("duration")}:</span>
                <span className="text-white/80">{duration}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 hidden md:flex">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-medium">{t("difficulty")}:</span>
                <span className="text-white/80">{difficulty}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12 order-2 lg:order-1">
              {/* Gallery Section */}
              <section>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("gallery")}</h2>
                <PackageGallery slug={packageData.id} title={title} />
              </section>

              {/* Itinerary Section */}
              <section>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t("detailed_itinerary")}</h2>
                <div className="relative space-y-6 md:space-y-8 before:absolute before:inset-0 before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-primary/20 sm:before:ml-8 md:before:ml-10 lg:before:ml-12">
                  {itinerary.map((dayInfo, index) => (
                    <div key={index} className="relative flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                      {/* Day Number Badge */}
                      <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
                        <div className="text-center">
                          <div className="text-[10px] sm:text-xs font-semibold text-primary-foreground opacity-80 md:text-sm">
                            {t("day")}
                          </div>
                          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-foreground">{dayInfo.day}</div>
                        </div>
                      </div>

                      {/* Day Content Card */}
                      <div className="flex-1 pb-4 md:pb-8">
                        <Card className="border-2 border-primary/10 bg-background/80 backdrop-blur shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30">
                          <CardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4">
                            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                              {dayInfo.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                            <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground">
                              {dayInfo.description}
                            </CardDescription>

                            {/* Meals and Accommodation Info */}
                            {(dayInfo.meals || dayInfo.accommodation) && (
                              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 pt-3 border-t border-border/50">
                                {dayInfo.meals && (
                                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:px-4">
                                    <span className="text-lg sm:text-2xl">🍽️</span>
                                    <div>
                                      <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        {t("meals")}
                                      </div>
                                      <div className="text-xs sm:text-sm font-medium text-foreground">{dayInfo.meals}</div>
                                    </div>
                                  </div>
                                )}
                                {dayInfo.accommodation && (
                                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:px-4">
                                    <span className="text-lg sm:text-2xl">🏨</span>
                                    <div>
                                      <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        {t("stay")}
                                      </div>
                                      <div className="text-xs sm:text-sm font-medium text-foreground">{dayInfo.accommodation}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Highlights Section */}
              <section>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("highlights")}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 list-disc list-inside text-muted-foreground">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="text-sm md:text-base leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Detailed Description */}
              <section>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("package_overview")}</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{longDescription}</p>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 md:space-y-8 lg:space-y-12 order-1 lg:order-2">
              {/* Price and Booking */}
              <section className="card-premium glass-card bg-gradient-to-br from-primary via-primary/90 to-secondary shadow-xl rounded-xl p-4 sm:p-6 md:p-8 border border-primary/40 text-white">
                <div className="text-center mb-4 md:mb-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">Ready to Book?</h3>
                  <p className="text-white/90 text-xs sm:text-sm">
                    Contact our authorized travel agent partners for tailored trip planning and bookings
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-4 md:mb-6">
                  <h4 className="font-bold mb-3 text-center text-sm sm:text-base">Why Book Through Our Partners?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-300 mt-0.5">✓</span>
                      <span>Licensed & certified Bhutan travel operators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-300 mt-0.5">✓</span>
                      <span>Clear trip planning with transparent guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-300 mt-0.5">✓</span>
                      <span>Customizable itineraries to suit your preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-300 mt-0.5">✓</span>
                      <span>24/7 support throughout your journey</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-300 mt-0.5">✓</span>
                      <span>All permits and visa assistance included</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href={`/inquiry?package=${packageData.id}&name=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&duration=${encodeURIComponent(duration)}`}
                  className="btn-premium hover-glow inline-flex items-center justify-center gap-2 w-full h-12 text-base font-semibold rounded-lg"
                >
                  <span className="relative z-10">{t("request_quote")}</span>
                  <span className="relative z-10 inline-block transition-transform group-hover:translate-x-1 duration-300">
                    →
                  </span>
                </Link>
                <p className="text-xs text-white/70 text-center mt-4">
                  Receive a personalized proposal based on your group size, season, and preferences
                </p>
              </section>

              {/* Rating and Reviews */}
              <section className="bg-background shadow-xl rounded-xl p-4 sm:p-6 border border-border">
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 text-center">{t("ratings_reviews")}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[...Array(Math.floor(rating))].map((_, i) => (
                    <StarIcon key={i} className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                  ))}
                  {rating % 1 !== 0 && <StarIcon className="h-6 w-6 fill-yellow-500 text-yellow-500/50" />}
                </div>
                <p className="text-center text-lg font-bold text-foreground">{rating.toFixed(1)} / 5.0</p>
                <p className="text-center text-muted-foreground">
                  {t("based_on")} {reviews.toLocaleString()} {t("reviews")}
                </p>
              </section>

              {/* Inclusions and Exclusions */}
              <section className="bg-background shadow-xl rounded-xl p-4 sm:p-6 border border-border">
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4">{t("whats_included")}</h3>
                <ul className="list-none text-muted-foreground space-y-2 text-xs sm:text-sm">
                  {safeIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-background shadow-xl rounded-xl p-4 sm:p-6 border border-border">
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4">{t("whats_excluded")}</h3>
                <ul className="list-none text-muted-foreground space-y-2 text-xs sm:text-sm">
                  {safeExcluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What to Bring Section */}
              <section className="bg-background shadow-xl rounded-xl p-4 sm:p-6 border border-border">
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4">{t("what_to_bring")}</h3>
                <ul className="list-none text-muted-foreground space-y-2 text-xs sm:text-sm">
                  {safeWhatToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-base sm:text-lg">🎒</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
