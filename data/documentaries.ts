import { DiscCascadeItem } from "@/components/ui/disc-cascade-carousel"

export interface DocumentaryProject extends DiscCascadeItem {
  id: string
  slug: string
  subtitle: string
  synopsis: string
  genre: "Environmental" | "Human Interest" | "Culture & Heritage" | "Investigative" | "Wildlife" | "Docuseries"
  runtime: string
  releaseYear: string
  director: string
  cinematographer: string
  location: string
  awards: string[]
  featuredImage: string
  heroBanner: string
  status: "Released" | "Festival Circuit" | "In Production"
  trailerUrl?: string
}

export const DOCUMENTARIES: DocumentaryProject[] = [
  {
    id: "arctic-silence",
    slug: "arctic-silence",
    title: "Arctic Silence",
    subtitle: "A vanishing symphony of ice and memory",
    synopsis: "Captured over 14 months in the Svalbard archipelago, Arctic Silence documents indigenous hunters and glaciologists confronting irreversible oceanic transformation.",
    genre: "Environmental",
    runtime: "88 min",
    releaseYear: "2024",
    director: "Gouri Jain & Alex Rivera",
    cinematographer: "Marcus Vance",
    location: "Svalbard, Norway & Greenland",
    awards: ["Official Selection Sundance 2024", "Winner Best Cinematography IDFA", "Nominee BAFTA Documentary"],
    featuredImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop",
    status: "Released",
    src: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Alex Rivera" },
      { label: "Category", value: "Environmental Doc" },
      { label: "Year", value: "2024" },
      { label: "Runtime", value: "88 min" },
    ],
    reviews: [
      { source: "Variety", quote: "A breathtaking, haunting visual masterpiece.", stars: 5 },
      { source: "The Guardian", quote: "Captures the fragile pulse of our planet with devastating intimacy.", stars: 5 },
    ],
  },
  {
    id: "voices-of-the-valley",
    slug: "voices-of-the-valley",
    title: "Voices of the Valley",
    subtitle: "Echoes of ancestral craft in high altitude terrain",
    synopsis: "In the remote high-altitude villages of the Himalayas, four generations of weavers and herbalists fight against industrial displacement.",
    genre: "Culture & Heritage",
    runtime: "76 min",
    releaseYear: "2024",
    director: "Elena Rostova",
    cinematographer: "Tashi Dorje",
    location: "Ladakh & Spiti Valley",
    awards: ["Winner Tribeca Audience Award", "Official Selection Hot Docs 2024"],
    featuredImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    status: "Released",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Elena Rostova" },
      { label: "Category", value: "Culture & Heritage" },
      { label: "Year", value: "2024" },
      { label: "Runtime", value: "76 min" },
    ],
    reviews: [
      { source: "IndieWire", quote: "Pure cinema of human resilience.", stars: 5 },
      { source: "Doc Weekly", quote: "A lyrical celebration of sacred heritage.", stars: 5 },
    ],
  },
  {
    id: "urban-monolith",
    slug: "urban-monolith",
    title: "Urban Monolith",
    subtitle: "The nocturnal pulse of concrete and steel",
    synopsis: "An immersive observational study tracking underground subway track-workers, architectural conservationists, and drone surveillance in Tokyo after midnight.",
    genre: "Human Interest",
    runtime: "62 min",
    releaseYear: "2023",
    director: "Kenji Takahashi",
    cinematographer: "Hiroshi Sato",
    location: "Tokyo, Japan",
    awards: ["Best Sound Design Sheffield DocFest", "Official Selection CPH:DOX"],
    featuredImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop",
    status: "Released",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Kenji Takahashi" },
      { label: "Category", value: "Observational Doc" },
      { label: "Year", value: "2023" },
      { label: "Runtime", value: "62 min" },
    ],
    reviews: [
      { source: "Sight & Sound", quote: "Hypnotic soundscapes paired with razor-sharp cinematography.", stars: 5 },
      { source: "Film Comment", quote: "Redefines how we look at nocturnal cities.", stars: 5 },
    ],
  },
  {
    id: "ocean-drifters",
    slug: "ocean-drifters",
    title: "Ocean Drifters",
    subtitle: "Life beneath the forgotten ocean currents",
    synopsis: "Deep-ocean submersibles and underwater macro-cinematography reveal the luminous migratory creatures of the Mariana Trench.",
    genre: "Wildlife",
    runtime: "94 min",
    releaseYear: "2023",
    director: "Dr. Maya Lindholm",
    cinematographer: "Leo Thorne",
    location: "Pacific & Indian Oceans",
    awards: ["Jackson Wild Media Award Winner", "Wildscreen Panda Award Winner"],
    featuredImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1682687220063-4742bd7c8f1b?q=80&w=1600&auto=format&fit=crop",
    status: "Released",
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Maya Lindholm" },
      { label: "Category", value: "Natural History" },
      { label: "Year", value: "2023" },
      { label: "Runtime", value: "94 min" },
    ],
    reviews: [
      { source: "BBC Earth Magazine", quote: "Astonishing footage never before captured on film.", stars: 5 },
      { source: "National Geographic", quote: "An otherworldly expedition of profound wonder.", stars: 5 },
    ],
  },
  {
    id: "solitary-flame",
    slug: "solitary-flame",
    title: "Solitary Flame",
    subtitle: "The last glassblowers of Murano",
    synopsis: "An intimate portrait of the final master craftsmen preserving thousand-year-old fiery traditions amid rising tides and modern tourism.",
    genre: "Culture & Heritage",
    runtime: "54 min",
    releaseYear: "2022",
    director: "Matteo Bellini",
    cinematographer: "Sofia Conti",
    location: "Venice, Italy",
    awards: ["Venice Days Doc Selection", "Silver Ribbon for Best Documentary"],
    featuredImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1514897575457-c4db467cf78e?q=80&w=1600&auto=format&fit=crop",
    status: "Released",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Matteo Bellini" },
      { label: "Category", value: "Human Portrait" },
      { label: "Year", value: "2022" },
      { label: "Runtime", value: "54 min" },
    ],
    reviews: [
      { source: "Cahiers du Cinéma", quote: "Blazing passion caught with incandescent grace.", stars: 5 },
      { source: "La Repubblica", quote: "Poignant, radiant, and utterly unforgettable.", stars: 5 },
    ],
  },
  {
    id: "the-shadow-grid",
    slug: "the-shadow-grid",
    title: "The Shadow Grid",
    subtitle: "Inside the covert global trade of rare minerals",
    synopsis: "A high-stakes investigative documentary filmed undercover across 4 continents, tracing the illicit supply chains powering the green energy revolution.",
    genre: "Investigative",
    runtime: "102 min",
    releaseYear: "2025",
    director: "Gouri Jain",
    cinematographer: "Kariuki Njoroge",
    location: "DR Congo, Chile & Antwerp",
    awards: ["Tribeca All Access Grantee", "Berlinale Co-Production Selection"],
    featuredImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800&auto=format&fit=crop",
    heroBanner: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1600&auto=format&fit=crop",
    status: "Festival Circuit",
    src: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=600&h=600&auto=format&fit=crop",
    credits: [
      { label: "Director", value: "Gouri Jain" },
      { label: "Category", value: "Investigative Feature" },
      { label: "Year", value: "2025" },
      { label: "Runtime", value: "102 min" },
    ],
    reviews: [
      { source: "The Hollywood Reporter", quote: "A white-knuckle journalistic achievement.", stars: 5 },
      { source: "Screen International", quote: "Fearless filmmaking that demands worldwide attention.", stars: 5 },
    ],
  },
]
