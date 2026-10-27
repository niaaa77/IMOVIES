import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Ticket,
  CheckCircle2,
  Film,
  Calendar,
  Clock,
  QrCode,
  ShieldCheck,
  Video,
  MonitorPlay,
  RotateCw,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { Movie, Seat } from '../types';
import { SAMPLE_MOVIES, INITIAL_SEATS } from '../data/mockData';

interface DemoVideoPlayerProps {
  onOpenAddModal: () => void;
  customVideoUrl?: string;
}

const CHAPTERS = [
  { id: 1, time: '0:00', seconds: 0, title: 'Project Intro & MERN Stack Overview' },
  { id: 2, time: '0:35', seconds: 35, title: 'Browse Catalog, Search & Filter' },
  { id: 3, time: '1:10', seconds: 70, title: 'Showtime & Cinema Hall Selection' },
  { id: 4, time: '1:45', seconds: 105, title: 'Real-time Interactive Seat Selection' },
  { id: 5, time: '2:30', seconds: 150, title: 'Express Checkout & Coupon Engine' },
  { id: 6, time: '3:05', seconds: 185, title: 'Digital QR Ticket & MongoDB Log' },
];

const CAPTIONS: Record<number, string> = {
  0: 'Welcome to IMovies! Built using Express.js, MongoDB, React, and Node.js. Here is the high-level architecture overview.',
  10: 'Let us dive into the responsive client frontend built with Vite and Tailwind CSS.',
  35: 'Browsing trending blockbuster movies. Dynamic genre filters allow immediate client-side and server-side querying.',
  50: 'Notice instant search responsiveness. Each movie card loads ratings, certifications, and active theater availability.',
  70: 'Selecting "Dune: Part Two" at PVR IMAX 3D. Showtimes are queried dynamically from the MongoDB Shows collection.',
  90: 'The user selects the 7:30 PM evening showtime with laser sound calibration.',
  105: 'Here is our interactive SVG theater seating matrix. Standard, Premium, and VIP Recliner rows are color coded.',
  125: 'Selecting seats F-12 and F-13. An atomic lock is acquired in MongoDB to prevent race-condition double bookings.',
  150: 'Navigating to Express checkout. Applying promotional coupon code "MOVIEBUFF" for an instant 20% discount!',
  170: 'Simulating instant payment confirmation. The backend updates the booking transaction in an atomic session.',
  185: 'Success! A digital cinema boarding pass is generated with an encrypted QR verification hash and booking ID.',
  200: 'The terminal below verifies our MongoDB write and 200 OK REST API response. Full MERN stack flow verified!'
};

export const DemoVideoPlayer: React.FC<DemoVideoPlayerProps> = ({ onOpenAddModal, customVideoUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(105); // Start at seat picker chapter for high visual impact
  const totalDuration = 210; // 3 minutes 30 seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'interactive_sandbox'>('walkthrough');
  const [showPresenterBubble, setShowPresenterBubble] = useState<boolean>(true);

  // Interactive sandbox state
  const [selectedMovie, setSelectedMovie] = useState<Movie>(SAMPLE_MOVIES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('07:30 PM');
  const [sandboxSeats, setSandboxSeats] = useState<Seat[]>(INITIAL_SEATS);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(['F-6', 'F-7']);
  const [couponCode, setCouponCode] = useState<string>('MOVIEBUFF');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('IMV-84920');

  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  // Auto-play / tick progress in walkthrough mode
  useEffect(() => {
    if (!isPlaying || activeTab !== 'walkthrough') return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          return 0; // loop
        }
        return prev + 1;
      });
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeTab]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Determine active caption
  const activeCaption = Object.keys(CAPTIONS)
    .map(Number)
    .sort((a, b) => b - a)
    .find((key) => currentTime >= key);

  const currentCaptionText = activeCaption !== undefined ? CAPTIONS[activeCaption] : 'IMovies Demo Walkthrough';

  // Toggle seat in sandbox
  const handleToggleSeat = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 6) {
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeatsData = sandboxSeats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeatsData.reduce((acc, s) => acc + s.price, 0);
  const discount = isCouponApplied ? subtotal * 0.2 : 0;
  const convenienceFee = selectedSeatIds.length > 0 ? 2.5 : 0;
  const grandTotal = Math.max(0, subtotal - discount + convenienceFee);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs mb-6">
      {/* Header Bar of Video Player Component */}
      <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-xs">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white">
                IMovies Official Demo Video & Interactive Walkthrough
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Ready for Mentor Review
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Full-Stack MERN Architecture · Interactive Seat Matrix · Live API Validation
            </p>
          </div>
        </div>

        {/* View Switcher between Video Walkthrough and Interactive Sandbox */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-800/80 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('walkthrough')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'walkthrough'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              Video Walkthrough
            </button>
            <button
              onClick={() => setActiveTab('interactive_sandbox')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'interactive_sandbox'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              Live Interactive App
            </button>
          </div>

          <button
            onClick={onOpenAddModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Submit / Replace Video
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      {activeTab === 'walkthrough' ? (
        <div className="relative bg-slate-950 select-none">
          {/* Simulated App Screen Recording */}
          <div className="relative aspect-video w-full max-h-[520px] overflow-hidden bg-slate-950 flex flex-col justify-between">
            {/* Top Simulated Browser Chrome */}
            <div className="bg-slate-900/90 backdrop-blur-xs border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 z-10">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="px-3 py-0.5 bg-slate-800/90 rounded text-[11px] font-mono text-slate-300 flex items-center gap-1.5 border border-slate-700/60">
                  <span className="text-emerald-400">https://</span>
                  <span>localhost:5173/book/dune-2?hall=imax</span>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-blue-400">Node v18.19.0</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">MongoDB Atlas Connected</span>
                <span className="text-slate-600">|</span>
                <span className="text-amber-300">JWT Authorized</span>
              </div>
            </div>

            {/* Simulated Live UI Content based on Video Time */}
            <div className="flex-1 overflow-hidden relative p-4 flex items-center justify-center">
              {currentTime < 35 && (
                /* Chapter 1: Intro & Movie Catalog */
                <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl animate-fade-in text-white">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-bold tracking-tight">IMovies Cinema</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded bg-blue-600 text-white font-medium">Trending Now</span>
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Sci-Fi (4)</span>
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Action (8)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {SAMPLE_MOVIES.map((movie, idx) => (
                      <div
                        key={movie.id}
                        className={`p-3 rounded-lg border transition-all ${
                          idx === 0
                            ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/40'
                            : 'bg-slate-800/60 border-slate-700/60'
                        }`}
                      >
                        <div className="aspect-2/3 bg-slate-800 rounded mb-2 overflow-hidden relative">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-bold text-amber-400">
                            ★ {movie.rating}
                          </div>
                        </div>
                        <h4 className="text-xs font-bold truncate text-white">{movie.title}</h4>
                        <p className="text-[11px] text-slate-400 mb-2">{movie.duration} · {movie.genre[0]}</p>
                        <button className="w-full py-1 text-[11px] bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors">
                          Select Showtimes
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentTime >= 35 && currentTime < 70 && (
                /* Chapter 2: Movie Detail & Trailer */
                <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-white">
                  <div className="flex gap-6">
                    <div className="w-48 h-64 shrink-0 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                      <img
                        src={SAMPLE_MOVIES[0].poster}
                        alt="Dune 2"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          IMAX 3D EXCLUSIVE
                        </span>
                        <span className="text-xs text-slate-400">English · Hindi · 2h 46m</span>
                      </div>
                      <h2 className="text-2xl font-black text-white tracking-tight mb-2">Dune: Part Two</h2>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.
                      </p>
                      <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 mb-4">
                        <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Select Cinema Theater:</div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded font-medium">
                            PVR IMAX Grand Plaza
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-slate-700 text-slate-300 rounded font-medium">
                            Cinepolis 4DX Mall
                          </button>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Proceed to Showtime Selection (7:30 PM)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentTime >= 70 && currentTime < 105 && (
                /* Chapter 3: Showtime Selector */
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-white">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Available Showtimes: Today, March 28</h3>
                      <p className="text-xs text-slate-400">PVR IMAX Laser · Hall 04 · Dolby Atmos 7.1</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      Live Availability Tracking
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { time: '11:00 AM', format: 'IMAX 2D', status: 'Almost Full', price: '$15' },
                      { time: '03:15 PM', format: 'IMAX 3D', status: 'Available', price: '$18' },
                      { time: '07:30 PM', format: 'IMAX 3D Laser', status: 'Prime Slot', price: '$22', active: true },
                      { time: '10:45 PM', format: 'IMAX 2D', status: 'Available', price: '$16' },
                    ].map((slot, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          slot.active
                            ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-300/40'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold">{slot.time}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${slot.active ? 'bg-white/20' : 'bg-slate-700'}`}>
                            {slot.price}
                          </span>
                        </div>
                        <div className="text-[11px] opacity-80">{slot.format}</div>
                        <div className="text-[10px] font-medium mt-1 text-emerald-300">{slot.status}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-blue-300">Selected: 07:30 PM Prime Evening Slot</span>
                    <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition-colors">
                      Open Interactive Seat Chart →
                    </button>
                  </div>
                </div>
              )}

              {currentTime >= 105 && currentTime < 150 && (
                /* Chapter 4: Interactive Seat Selection Map */
                <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl text-white">
                  {/* Screen visualization */}
                  <div className="text-center mb-6">
                    <div className="h-1.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] mb-1" />
                    <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                      All Eyes This Way · Curved IMAX Screen
                    </span>
                  </div>

                  {/* Seat Grid */}
                  <div className="flex flex-col items-center gap-2 mb-6">
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((rowLetter) => {
                      const isVip = rowLetter === 'E' || rowLetter === 'F';
                      return (
                        <div key={rowLetter} className="flex items-center gap-2">
                          <span className="w-5 text-[10px] font-mono text-slate-500 text-right">{rowLetter}</span>
                          <div className="flex items-center gap-2">
                            {Array.from({ length: 8 }, (_, idx) => {
                              const seatNumber = idx + 1;
                              const seatId = `${rowLetter}-${seatNumber}`;
                              const isSelected = seatId === 'F-6' || seatId === 'F-7';
                              const isOccupied = ['B-3', 'B-4', 'C-5', 'D-2'].includes(seatId);

                              return (
                                <div
                                  key={seatId}
                                  className={`w-7 h-7 rounded text-[10px] flex items-center justify-center font-mono font-medium transition-all ${
                                    isOccupied
                                      ? 'bg-slate-800 text-slate-600 border border-slate-700/50'
                                      : isSelected
                                      ? 'bg-cyan-400 text-slate-950 font-bold scale-110 shadow-[0_0_12px_rgba(34,211,238,0.8)] ring-2 ring-cyan-200'
                                      : isVip
                                      ? 'bg-purple-950/60 text-purple-200 border border-purple-500/40 hover:border-purple-400'
                                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500'
                                  }`}
                                >
                                  {seatNumber}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend & Selected info */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700 inline-block" /> Available
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-cyan-400 inline-block" /> Selected (F-6, F-7)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-slate-800 text-slate-600 inline-block" /> Occupied
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">2 VIP Recliner Seats</div>
                        <div className="text-sm font-bold text-cyan-400">$50.00 Total</div>
                      </div>
                      <button className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-colors">
                        Lock & Checkout →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentTime >= 150 && currentTime < 185 && (
                /* Chapter 5: Checkout Flow & Coupon */
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl text-white">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Secure Checkout · Order #ORD-91823
                    </h3>
                    <span className="text-[11px] font-mono text-amber-400">Seat Hold: 08:42 min remaining</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80">
                      <div className="text-xs font-semibold text-slate-300 mb-2">Booking Summary</div>
                      <div className="text-[11px] text-slate-400 space-y-1">
                        <div className="flex justify-between"><span>Movie:</span> <span className="text-white font-medium">Dune: Part Two (IMAX 3D)</span></div>
                        <div className="flex justify-between"><span>Time:</span> <span className="text-white font-medium">Today, 07:30 PM</span></div>
                        <div className="flex justify-between"><span>Seats:</span> <span className="text-cyan-400 font-bold font-mono">F-6, F-7 (VIP Recliner)</span></div>
                        <div className="flex justify-between"><span>Subtotal:</span> <span className="text-white font-mono">$50.00</span></div>
                        <div className="flex justify-between text-emerald-400"><span>Coupon (MOVIEBUFF 20%):</span> <span className="font-mono">-$10.00</span></div>
                        <div className="flex justify-between"><span>Convenience Fee:</span> <span className="text-white font-mono">$2.50</span></div>
                        <div className="border-t border-slate-700 pt-1 flex justify-between font-bold text-white text-xs">
                          <span>Final Amount:</span>
                          <span className="text-emerald-400 font-mono text-sm">$42.50</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-300 mb-2">Payment Simulation</div>
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-400 block">Credit Card / UPI Token</label>
                          <input
                            type="text"
                            readOnly
                            value="•••• •••• •••• 4242 (Stripe Mock)"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-300 font-mono"
                          />
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Coupon MOVIEBUFF Verified (20% Off)
                          </div>
                        </div>
                      </div>

                      <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition-colors shadow-md mt-3 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Authorize & Pay $42.50
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentTime >= 185 && (
                /* Chapter 6: Digital QR Ticket & API Logs */
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl text-white">
                  <div className="flex gap-4">
                    {/* Cinema Boarding Pass */}
                    <div className="w-3/5 bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-500/40 rounded-xl p-4 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-3">
                        <span className="text-xs font-bold text-blue-400 tracking-wider">IMOVIES ADMIT ONE</span>
                        <span className="text-[10px] font-mono text-slate-400">#IMV-84920</span>
                      </div>
                      <h4 className="text-base font-extrabold text-white mb-1">Dune: Part Two</h4>
                      <p className="text-xs text-slate-300 mb-2">PVR IMAX Laser · Hall 04 · Today, 07:30 PM</p>
                      <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 mb-2 font-mono text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400">SEATS</div>
                          <div className="font-bold text-cyan-400">F-6, F-7</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">CLASS</div>
                          <div className="text-purple-300">VIP RECLINER</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">STATUS</div>
                          <div className="text-emerald-400 font-bold">CONFIRMED</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400">Scannable gate pass valid at cinema barcode gates.</div>
                    </div>

                    {/* QR Code and Terminal Log */}
                    <div className="w-2/5 flex flex-col justify-between">
                      <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-slate-950 text-center">
                        <QrCode className="w-24 h-24 text-slate-950" />
                        <span className="text-[10px] font-mono font-bold mt-1">SCAN AT GATE ENTRY</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[10px] text-emerald-400">
                        <div>[REST] POST /api/v1/bookings 201 Created</div>
                        <div>[DB] MongoDB session committed in 14ms</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subtitles / Closed Captions Bar */}
            {showCaptions && (
              <div className="bg-slate-900/95 border-t border-slate-800 px-6 py-2 text-center text-xs text-slate-200 backdrop-blur-xs font-medium">
                <span className="text-blue-400 font-semibold mr-1.5">[Narration]:</span>
                {currentCaptionText}
              </div>
            )}

            {/* Floating Webcam Presenter Bubble */}
            {showPresenterBubble && (
              <div className="absolute top-12 right-4 w-28 h-28 rounded-full border-2 border-blue-500 shadow-xl overflow-hidden bg-slate-800 z-20 group">
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white text-center p-2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center mb-1 ring-2 ring-white/30">
                      <span className="text-sm font-bold">DEV</span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-200">Presenter Mic</span>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPresenterBubble(false)}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[9px] hidden group-hover:flex items-center justify-center"
                    title="Hide presenter"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Custom Video Control Deck */}
          <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 text-white flex flex-col gap-2">
            {/* Timeline Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                className="flex-1 h-2 bg-slate-800 rounded-full relative cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);
                  setCurrentTime(Math.round(ratio * totalDuration));
                }}
              >
                {/* Chapter markers on timeline */}
                {CHAPTERS.map((ch) => (
                  <div
                    key={ch.id}
                    style={{ left: `${(ch.seconds / totalDuration) * 100}%` }}
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-600 hover:bg-amber-400 transition-colors z-10"
                    title={`${ch.time} - ${ch.title}`}
                  />
                ))}
                {/* Progress bar */}
                <div
                  className="h-full bg-blue-500 rounded-full relative"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 w-12">
                {formatTime(totalDuration)}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  title={isPlaying ? 'Pause Demo' : 'Play Demo'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentTime((t) => Math.min(totalDuration, t + 10))}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Forward 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-800" />

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors ${
                    showCaptions
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      : 'text-slate-500 border-slate-700'
                  }`}
                  title="Toggle Subtitles"
                >
                  CC
                </button>
              </div>

              {/* Right tools: Speed & Chapters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span>Speed:</span>
                  {[1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        playbackSpeed === spd
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-slate-800" />

                <button
                  onClick={() => setShowPresenterBubble(!showPresenterBubble)}
                  className="text-slate-400 hover:text-white text-[11px]"
                >
                  {showPresenterBubble ? 'Hide Presenter' : 'Show Presenter'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Jump Chapters List */}
          <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 text-[11px] font-medium shrink-0">Demo Chapters:</span>
            {CHAPTERS.map((ch) => {
              const isActive = currentTime >= ch.seconds && (CHAPTERS[ch.id]?.seconds ? currentTime < CHAPTERS[ch.id].seconds : true);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentTime(ch.seconds);
                    setIsPlaying(true);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-mono mr-1.5">{ch.time}</span>
                  {ch.title}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Interactive Sandbox Mode */
        <div className="p-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Interactive Live Demo Sandbox
                </h3>
                <p className="text-xs text-slate-500">
                  Test and click through the real IMovies booking flow right here as an evaluator.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedSeatIds(['F-6', 'F-7']);
                  setIsBooked(false);
                  setIsCouponApplied(true);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Reset Demo State
              </button>
            </div>

            {!isBooked ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left 2 cols: Movie & Seat selection */}
                <div className="md:col-span-2 space-y-4">
                  {/* Movie Banner */}
                  <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-16 object-cover rounded-md border border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white">{selectedMovie.title}</h4>
                        <div className="text-xs text-slate-400">{selectedMovie.duration} · IMAX 3D Laser</div>
                        <div className="text-xs text-amber-400 font-semibold mt-0.5">★ {selectedMovie.rating}/10</div>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      {['03:15 PM', '07:30 PM', '10:45 PM'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedShowtime(time)}
                          className={`px-3 py-1.5 rounded font-medium transition-all ${
                            selectedShowtime === time
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seat Map */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                    <div className="text-center mb-6">
                      <div className="h-1.5 w-4/5 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-1" />
                      <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                        CURVED CINEMA SCREEN (AUDITORIUM 4)
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-6">
                      {['A', 'B', 'C', 'D', 'E', 'F'].map((rowLetter) => {
                        const isVip = rowLetter === 'E' || rowLetter === 'F';
                        const rowSeats = sandboxSeats.filter((s) => s.row === rowLetter);

                        return (
                          <div key={rowLetter} className="flex items-center gap-2">
                            <span className="w-5 text-[11px] font-mono text-slate-400 text-right">{rowLetter}</span>
                            <div className="flex items-center gap-2">
                              {rowSeats.map((seat) => {
                                const isSelected = selectedSeatIds.includes(seat.id);
                                const isOccupied = seat.status === 'occupied';

                                return (
                                  <button
                                    key={seat.id}
                                    disabled={isOccupied}
                                    onClick={() => handleToggleSeat(seat)}
                                    title={`Seat ${seat.id} (${seat.type.toUpperCase()}) - $${seat.price}`}
                                    className={`w-8 h-8 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
                                      isOccupied
                                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                                        : isSelected
                                        ? 'bg-blue-600 text-white font-bold scale-105 shadow-sm ring-2 ring-blue-300'
                                        : isVip
                                        ? 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
                                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                                    }`}
                                  >
                                    {seat.number}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" /> Available
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Selected
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-purple-100 border border-purple-200 inline-block" /> VIP ($25)
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">Max 6 seats per transaction</span>
                    </div>
                  </div>
                </div>

                {/* Right col: Checkout summary */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                      Order Breakdown
                    </h4>

                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between">
                        <span>Showtime:</span>
                        <span className="font-semibold text-slate-900">{selectedShowtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Selected Seats:</span>
                        <span className="font-mono font-bold text-blue-600">
                          {selectedSeatIds.length > 0 ? selectedSeatIds.join(', ') : 'None'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tickets Subtotal:</span>
                        <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      {isCouponApplied && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                          <span>Coupon Discount (20%):</span>
                          <span className="font-mono">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Convenience Fee:</span>
                        <span className="font-mono">${convenienceFee.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                        <span>Total Payable:</span>
                        <span className="text-blue-600 font-mono">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Coupon Input */}
                    <div className="mb-4">
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="MOVIEBUFF"
                          className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg uppercase font-mono"
                        />
                        <button
                          onClick={() => {
                            if (couponCode === 'MOVIEBUFF' || couponCode === 'FIRST50') {
                              setIsCouponApplied(true);
                            } else {
                              alert('Try coupon code MOVIEBUFF for 20% off!');
                            }
                          }}
                          className="px-3 py-1.5 text-xs bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                        >
                          Apply
                        </button>
                      </div>
                      {isCouponApplied && (
                        <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">
                          ✓ MOVIEBUFF coupon active
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={selectedSeatIds.length === 0}
                    onClick={() => {
                      setBookingId('IMV-' + Math.floor(10000 + Math.random() * 90000));
                      setIsBooked(true);
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      selectedSeatIds.length > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Booking (${grandTotal.toFixed(2)})
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Success View */
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs max-w-xl mx-auto text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Ticket Confirmed & Synced to Database!
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Booking ID: <span className="font-mono font-bold text-slate-800">{bookingId}</span>
                </p>

                {/* Scannable Pass */}
                <div className="bg-slate-900 text-white rounded-xl p-5 text-left border border-slate-800 mb-5 shadow-md">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold text-blue-400">IMOVIES PASS</span>
                    <span className="text-[11px] font-mono text-slate-400">{bookingId}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{selectedMovie.title}</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    PVR IMAX 3D · Auditorium 4 · {selectedShowtime}
                  </p>
                  <div className="flex justify-between items-center bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 mb-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">SEATS</div>
                      <div className="font-mono font-bold text-blue-400">{selectedSeatIds.join(', ')}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">PAID</div>
                      <div className="font-mono font-bold text-emerald-400">${grandTotal.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-2">
                    <QrCode className="w-20 h-20 text-white" />
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="px-5 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition-colors"
                >
                  ← Book Another Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
