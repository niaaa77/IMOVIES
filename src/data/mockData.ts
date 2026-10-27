import { Epic, Movie, Seat } from '../types';

export const INITIAL_EPICS: Epic[] = [
  {
    id: 'epic-1',
    title: 'PROJECT ARCHITECTURE',
    complexity: 'Medium',
    duration: '3h 30m',
    storiesCount: 3,
    tasks: [
      {
        id: 'task-1-1',
        epicId: 'epic-1',
        title: 'Design Client-Server MERN Architecture & Component Hierarchy',
        description: 'Establish the modular directory structure, React routing, Express controllers, and MongoDB models.',
        complexity: 'Medium',
        estimatedHours: 1.5,
        status: 'completed',
        acceptanceCriteria: [
          'Modular separation of client and server directories',
          'Documented architecture diagram with data flow',
          'Defined REST API contracts and status codes',
        ],
      },
      {
        id: 'task-1-2',
        epicId: 'epic-1',
        title: 'Define RESTful API Contracts for Movies, Theaters & Bookings',
        description: 'Document endpoints for GET /api/movies, POST /api/bookings, and user profile management.',
        complexity: 'Medium',
        estimatedHours: 1.0,
        status: 'completed',
        acceptanceCriteria: [
          'Complete JSON request/response schema',
          'Error handling and standard HTTP codes',
          'Auth token Bearer header specifications',
        ],
      },
      {
        id: 'task-1-3',
        epicId: 'epic-1',
        title: 'Security Architecture & JWT Token Validation Strategy',
        description: 'Design authentication flow using bcrypt password hashing and JSON Web Tokens.',
        complexity: 'High',
        estimatedHours: 1.0,
        status: 'in_progress',
        acceptanceCriteria: [
          'JWT signed with 24h expiration and refresh token strategy',
          'Express auth middleware protecting private endpoints',
          'CORS and helmet security headers configured',
        ],
      },
    ],
  },
  {
    id: 'epic-2',
    title: 'PROJECT SETUP AND CONFIGURATION',
    complexity: 'Easy',
    duration: '2h 15m',
    storiesCount: 3,
    tasks: [
      {
        id: 'task-2-1',
        epicId: 'epic-2',
        title: 'Initialize Node.js & Express Server with Nodemon & Dotenv',
        description: 'Configure package.json with scripts, install dependencies, and configure environment variables.',
        complexity: 'Low',
        estimatedHours: 0.5,
        status: 'completed',
        acceptanceCriteria: [
          'Express app initialized on port 5000',
          'Nodemon dev watcher configured',
          '.env and .env.example with PORT, MONGO_URI, JWT_SECRET',
        ],
      },
      {
        id: 'task-2-2',
        epicId: 'epic-2',
        title: 'Bootstrap React Client with Vite, Tailwind CSS & Router',
        description: 'Scaffold the frontend SPA using Vite, configure Tailwind CSS, and set up React Router routes.',
        complexity: 'Low',
        estimatedHours: 1.0,
        status: 'in_progress',
        acceptanceCriteria: [
          'React 18+ SPA with Vite build tool',
          'Tailwind CSS initialized with custom cinema theme palette',
          'App routes for Home, Movie Details, Seat Selection, and Profile',
        ],
      },
      {
        id: 'task-2-3',
        epicId: 'epic-2',
        title: 'Setup MongoDB Atlas Connection with Mongoose & Reconnection Logic',
        description: 'Connect server to cloud or local MongoDB instance with connection pooling and error handlers.',
        complexity: 'Medium',
        estimatedHours: 0.75,
        status: 'in_progress',
        acceptanceCriteria: [
          'Mongoose connection established with graceful retry logic',
          'MongoDB indexes configured for high-traffic movie queries',
        ],
      },
    ],
  },
  {
    id: 'epic-3',
    title: 'BACKEND DEVELOPMENT',
    complexity: 'Hard',
    duration: '4h 45m',
    storiesCount: 4,
    tasks: [
      {
        id: 'task-3-1',
        epicId: 'epic-3',
        title: 'User Authentication System (Signup, Login, Password Hashing)',
        description: 'Build user registration, bcrypt salted hash, login credential check, and JWT generator.',
        complexity: 'High',
        estimatedHours: 1.5,
        status: 'backlog',
        acceptanceCriteria: [
          'Email and password validation with sanitize middleware',
          'Bcrypt hash with salt rounds >= 10',
          'Payload returns JWT and user profile (excluding password hash)',
        ],
      },
      {
        id: 'task-3-2',
        epicId: 'epic-3',
        title: 'Movie Catalog & Showtime Management REST Endpoints',
        description: 'CRUD endpoints for fetching trending movies, filter by genre/language, and query showtimes.',
        complexity: 'Medium',
        estimatedHours: 1.25,
        status: 'backlog',
        acceptanceCriteria: [
          'GET /api/movies with query params (?genre=Sci-Fi&sort=rating)',
          'GET /api/movies/:id with detailed showtimes and theater halls',
          'Search endpoint with fuzzy title matching',
        ],
      },
      {
        id: 'task-3-3',
        epicId: 'epic-3',
        title: 'Real-time Seat Locking & Reservation Transaction API',
        description: 'Prevent double-booking using MongoDB session transactions and 10-minute seat hold locks.',
        complexity: 'High',
        estimatedHours: 1.5,
        status: 'backlog',
        acceptanceCriteria: [
          'Atomic seat locking to prevent race conditions during checkout',
          'Auto-expire temporary reservation if payment not completed in 10 minutes',
          'POST /api/bookings creates verified booking with unique ticket code',
        ],
      },
      {
        id: 'task-3-4',
        epicId: 'epic-3',
        title: 'Automated Booking Confirmation & QR Code Generator',
        description: 'Generate dynamic cryptographic QR code containing booking verification hash and ticket details.',
        complexity: 'Medium',
        estimatedHours: 0.7,
        status: 'backlog',
        acceptanceCriteria: [
          'Generates SVG/Base64 QR code upon checkout success',
          'Verification endpoint GET /api/tickets/verify/:hash',
        ],
      },
    ],
  },
  {
    id: 'epic-4',
    title: 'DATABASE DEVELOPMENT',
    complexity: 'Medium',
    duration: '2h 0m',
    storiesCount: 3,
    tasks: [
      {
        id: 'task-4-1',
        epicId: 'epic-4',
        title: 'Design Mongoose Schemas (User, Movie, Theater, Show, Booking)',
        description: 'Define relational models in MongoDB using Mongoose schema definitions and validation rules.',
        complexity: 'Medium',
        estimatedHours: 0.75,
        status: 'in_progress',
        acceptanceCriteria: [
          'User Schema with roles (customer, cinema_admin)',
          'Movie Schema with cast, trailers, certification',
          'Show Schema referencing Movie and Theater with seat matrix',
          'Booking Schema referencing User and Show with seats array',
        ],
      },
      {
        id: 'task-4-2',
        epicId: 'epic-4',
        title: 'Database Seeding Script with Realistic Movie & Show Data',
        description: 'Create automated seed runner `npm run seed` with 12 blockbuster films, 4 cinema halls, and showtimes.',
        complexity: 'Low',
        estimatedHours: 0.5,
        status: 'backlog',
        acceptanceCriteria: [
          'Executable seed.js that resets and repopulates database collections',
          'Diverse movie metadata with high-res poster links and seat statuses',
        ],
      },
      {
        id: 'task-4-3',
        epicId: 'epic-4',
        title: 'Compound Indexing for Seat Map Concurrency & Fast Queries',
        description: 'Add compound unique index on `{ showId: 1, seatNumber: 1 }` to guarantee seat integrity.',
        complexity: 'Medium',
        estimatedHours: 0.75,
        status: 'backlog',
        acceptanceCriteria: [
          'Compound indexes created in MongoDB Atlas',
          'Query performance benchmarked under <15ms response time',
        ],
      },
    ],
  },
  {
    id: 'epic-5',
    title: 'FRONTEND DEVELOPMENT',
    complexity: 'Hard',
    duration: '5h 15m',
    storiesCount: 4,
    tasks: [
      {
        id: 'task-5-1',
        epicId: 'epic-5',
        title: 'Cinema Home Page with Featured Carousel & Genre Filter',
        description: 'Design responsive cinema landing page showcasing trending movies, search bar, and language filters.',
        complexity: 'Medium',
        estimatedHours: 1.5,
        status: 'backlog',
        acceptanceCriteria: [
          'Hero banner featuring latest movie releases',
          'Search input with instant filtering',
          'Movie cards showing IMDB rating, runtime, and Book Tickets button',
        ],
      },
      {
        id: 'task-5-2',
        epicId: 'epic-5',
        title: 'Interactive Theater Seating Matrix with Real-Time Selection',
        description: 'SVG/Canvas seat chart with Standard ($12), Premium ($18), VIP Recliner ($25), and screen curve.',
        complexity: 'High',
        estimatedHours: 1.75,
        status: 'backlog',
        acceptanceCriteria: [
          'Visual cinema screen curved display',
          'Color-coded seats (available, selected, occupied)',
          'Dynamic price calculator and maximum 6 seats per transaction rule',
        ],
      },
      {
        id: 'task-5-3',
        epicId: 'epic-5',
        title: 'Checkout Flow with Payment Simulation & Coupon Discounts',
        description: 'Modal/page collecting user info, food & beverage add-ons, coupon code entry, and payment simulated gateway.',
        complexity: 'Medium',
        estimatedHours: 1.0,
        status: 'backlog',
        acceptanceCriteria: [
          'Breakdown of ticket price, convenience fee, and discount',
          'Working coupon codes (e.g. MOVIEBUFF for 20% off)',
          'Simulated payment completion with loading states',
        ],
      },
      {
        id: 'task-5-4',
        epicId: 'epic-5',
        title: 'Digital Ticket Confirmation Pass with Dynamic QR Code',
        description: 'Aesthetic cinema boarding pass with movie poster, hall, seat numbers, booking ID, and download ticket option.',
        complexity: 'Medium',
        estimatedHours: 0.9,
        status: 'backlog',
        acceptanceCriteria: [
          'Live scannable QR code generation',
          'Print / Save PDF ticket layout with barcode styling',
          'Instant review in user dashboard history',
        ],
      },
    ],
  },
  {
    id: 'epic-6',
    title: 'PROJECT EXECUTION',
    complexity: 'Medium',
    duration: '2h 30m',
    storiesCount: 2,
    tasks: [
      {
        id: 'task-6-1',
        epicId: 'epic-6',
        title: 'End-to-End Integration Testing & Concurrency Validation',
        description: 'Test full customer journey from authentication to movie selection, seat locking, and ticket issuance.',
        complexity: 'Medium',
        estimatedHours: 1.25,
        status: 'backlog',
        acceptanceCriteria: [
          'Verify zero double-booking on simultaneous seat clicks',
          'Token expiry handling with graceful redirect to login',
          'Mobile and desktop responsive viewport audits',
        ],
      },
      {
        id: 'task-6-2',
        epicId: 'epic-6',
        title: 'Record & Submit High-Definition Project Demo Video & GitHub Link',
        description: 'Produce complete 3-5 minute demo walkthrough demonstrating all MERN features, code structure, and live reservation.',
        complexity: 'Medium',
        estimatedHours: 1.25,
        status: 'in_progress',
        acceptanceCriteria: [
          'Voiceover explaining architecture and tech stack choices',
          'Full live demo of seat booking, QR generation, and MongoDB updates',
          'Public GitHub repository with README, setup instructions, and screenshots',
        ],
      },
    ],
  },
];

export const SAMPLE_MOVIES: Movie[] = [
  {
    id: 'm-1',
    title: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: '2h 46m',
    rating: 8.8,
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    releaseDate: 'March 2024',
    theaters: ['PVR IMAX Theater 1', 'Cinepolis 4DX Hall A', 'INOX Luxe Screen 4'],
    price: 18,
  },
  {
    id: 'm-2',
    title: 'Oppenheimer',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    genre: ['Biography', 'Drama', 'History'],
    duration: '3h 00m',
    rating: 8.9,
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    releaseDate: 'July 2023',
    theaters: ['PVR IMAX 70mm', 'Grand Cinema Hall 2'],
    price: 20,
  },
  {
    id: 'm-3',
    title: 'Interstellar: 10th Anniversary Re-Release',
    poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    genre: ['Sci-Fi', 'Drama'],
    duration: '2h 49m',
    rating: 8.7,
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft with researchers.',
    releaseDate: 'Special Screening',
    theaters: ['PVR IMAX Laser', 'Cinepolis MegaPlex'],
    price: 22,
  },
  {
    id: 'm-4',
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    genre: ['Animation', 'Action', 'Adventure'],
    duration: '2h 20m',
    rating: 8.6,
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.',
    releaseDate: 'June 2023',
    theaters: ['PVR 4DX Hall 3', 'INOX Screen 2'],
    price: 15,
  },
];

export const INITIAL_SEATS: Seat[] = Array.from({ length: 48 }, (_, i) => {
  const rowLetter = ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(i / 8)];
  const colNumber = (i % 8) + 1;
  const isVip = rowLetter === 'E' || rowLetter === 'F';
  const isPremium = rowLetter === 'C' || rowLetter === 'D';
  const type = isVip ? 'vip_recliner' : isPremium ? 'premium' : 'standard';
  const price = isVip ? 25 : isPremium ? 18 : 12;

  // Pre-occupied sample seats for realism
  const occupiedSet = new Set(['B-3', 'B-4', 'C-5', 'C-6', 'D-2', 'F-4', 'F-5']);
  const seatId = `${rowLetter}-${colNumber}`;

  return {
    id: seatId,
    row: rowLetter,
    number: colNumber,
    type,
    price,
    status: occupiedSet.has(seatId) ? 'occupied' : 'available',
  };
});

export const MOCK_CODE_FILES = [
  {
    path: 'server/controllers/bookingController.js',
    language: 'javascript',
    code: `const Booking = require('../models/Booking');
const Show = require('../models/Show');
const mongoose = require('mongoose');

// Atomic seat reservation with race-condition prevention
exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showId, seats, paymentMethod } = req.body;
    const userId = req.user.id;

    // 1. Fetch show and check seat availability
    const show = await Show.findById(showId).session(session);
    if (!show) {
      throw new Error('Showtime not found');
    }

    const alreadyBooked = show.bookedSeats.some(s => seats.includes(s));
    if (alreadyBooked) {
      return res.status(409).json({
        success: false,
        message: 'One or more chosen seats were just reserved by another user.'
      });
    }

    // 2. Reserve seats atomically
    show.bookedSeats.push(...seats);
    await show.save({ session });

    // 3. Create verified booking record with unique verification code
    const ticketCode = 'IMV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const totalPrice = seats.length * show.ticketPrice;

    const booking = new Booking({
      user: userId,
      show: showId,
      seats,
      totalPrice,
      ticketCode,
      paymentStatus: 'PAID',
      qrHash: Buffer.from(ticketCode + ':' + Date.now()).toString('base64')
    });

    await booking.save({ session });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      booking
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};`,
  },
  {
    path: 'server/models/Movie.js',
    language: 'javascript',
    code: `const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide movie title'],
    trim: true,
    index: true
  },
  genre: [{
    type: String,
    enum: ['Action', 'Sci-Fi', 'Drama', 'Adventure', 'Comedy', 'Animation', 'Biography', 'Horror']
  }],
  duration: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  posterUrl: { type: String, required: true },
  backdropUrl: { type: String },
  description: { type: String, required: true },
  trailerUrl: { type: String },
  releaseDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);`,
  },
  {
    path: 'client/src/components/SeatPicker.jsx',
    language: 'javascript',
    code: `import React, { useState } from 'react';

export default function SeatPicker({ seats, onSelectionChange, maxSeats = 6 }) {
  const [selected, setSelected] = useState([]);

  const toggleSeat = (seat) => {
    if (seat.status === 'occupied') return;

    if (selected.includes(seat.id)) {
      const updated = selected.filter(id => id !== seat.id);
      setSelected(updated);
      onSelectionChange(updated);
    } else {
      if (selected.length >= maxSeats) {
        alert(\`You can select maximum \${maxSeats} seats per booking.\`);
        return;
      }
      const updated = [...selected, seat.id];
      setSelected(updated);
      onSelectionChange(updated);
    }
  };

  return (
    <div className="seat-container p-6 bg-slate-900 rounded-xl text-white">
      <div className="screen-curve mb-8 text-center text-xs text-slate-400">
        <div className="h-2 w-full bg-cyan-500/50 rounded-full blur-[1px] mb-2" />
        CINEMA SCREEN ALL EYES HERE
      </div>

      <div className="grid grid-cols-8 gap-3 max-w-md mx-auto">
        {seats.map((seat) => {
          const isSelected = selected.includes(seat.id);
          const isOccupied = seat.status === 'occupied';

          return (
            <button
              key={seat.id}
              disabled={isOccupied}
              onClick={() => toggleSeat(seat)}
              className={\`h-9 w-9 rounded-md text-xs font-medium transition-all \${
                isOccupied
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : isSelected
                  ? 'bg-cyan-500 text-slate-950 scale-105 ring-2 ring-cyan-300 font-bold'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }\`}
            >
              {seat.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
  },
];
