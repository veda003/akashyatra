import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import FlightList from './components/FlightList';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import MyBookings from './components/MyBookings';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showMyBookings, setShowMyBookings] = useState(false);

  // Indian cities and airports data
  const indianCities = [
    { city: 'Mumbai', code: 'BOM', airport: 'Chhatrapati Shivaji International Airport' },
    { city: 'Delhi', code: 'DEL', airport: 'Indira Gandhi International Airport' },
    { city: 'Bangalore', code: 'BLR', airport: 'Kempegowda International Airport' },
    { city: 'Chennai', code: 'MAA', airport: 'Chennai International Airport' },
    { city: 'Kolkata', code: 'CCU', airport: 'Netaji Subhas Chandra Bose International Airport' },
    { city: 'Hyderabad', code: 'HYD', airport: 'Rajiv Gandhi International Airport' },
    { city: 'Ahmedabad', code: 'AMD', airport: 'Sardar Vallabhbhai Patel International Airport' },
    { city: 'Pune', code: 'PNQ', airport: 'Pune International Airport' },
    { city: 'Goa', code: 'GOI', airport: 'Dabolim Airport' },
    { city: 'Jaipur', code: 'JAI', airport: 'Jaipur International Airport' },
    { city: 'Lucknow', code: 'LKO', airport: 'Chaudhary Charan Singh International Airport' },
    { city: 'Guwahati', code: 'GAU', airport: 'Lokpriya Gopinath Bordoloi International Airport' },
    { city: 'Kochi', code: 'COK', airport: 'Cochin International Airport' },
    { city: 'Bhubaneswar', code: 'BBI', airport: 'Biju Patnaik International Airport' },
    { city: 'Chandigarh', code: 'IXC', airport: 'Chandigarh International Airport' }
  ];

  // Indian airlines data with actual image URLs
  const indianAirlines = [
    { 
      name: 'IndiGo', 
      code: '6E', 
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/IndiGo-logo.png',
      color: '#0a4b7a'
    },
    { 
      name: 'Air India', 
      code: 'AI', 
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/Air-India-logo.png',
      color: '#c41e3a'
    },
    { 
      name: 'SpiceJet', 
      code: 'SG', 
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/SpiceJet-logo.png',
      color: '#ff6b00'
    },
    { 
      name: 'Vistara', 
      code: 'UK', 
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/Vistara-logo.png',
      color: '#954f97'
    },
    { 
      name: 'Go First', 
      code: 'G8', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ&usqp=CAU',
      color: '#00a1ab'
    },
    { 
      name: 'Akasa Air', 
      code: 'QP', 
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrRrR&usqp=CAU',
      color: '#ed1c24'
    }
  ];

  // Generate mock flights based on search criteria
  const generateMockFlights = (from, to, date) => {
    const flights = [];
    const numFlights = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < numFlights; i++) {
      const airline = indianAirlines[Math.floor(Math.random() * indianAirlines.length)];
      const departureHour = Math.floor(Math.random() * 24);
      const departureMinute = Math.random() < 0.5 ? '00' : '30';
      const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute}`;
      
      const duration = Math.floor(Math.random() * 180) + 60;
      const arrivalHour = (departureHour + Math.floor(duration / 60)) % 24;
      const arrivalMinute = departureMinute === '00' ? '30' : '00';
      const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute}`;

      const basePrice = Math.floor(Math.random() * 4000) + 2000;
      
      const fromCode = from.split('(')[1]?.replace(')', '') || 'BOM';
      const toCode = to.split('(')[1]?.replace(')', '') || 'DEL';
      
      flights.push({
        id: i + 1,
        airline: airline.name,
        airlineCode: airline.code,
        flightNumber: `${airline.code} ${Math.floor(Math.random() * 900) + 100}`,
        from: from,
        to: to,
        fromCode: fromCode,
        toCode: toCode,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        duration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
        price: basePrice,
        stops: Math.floor(Math.random() * 3),
        logo: airline.logo,
        color: airline.color,
        date: date,
        seatsAvailable: Math.floor(Math.random() * 50) + 10
      });
    }

    return flights.sort((a, b) => a.price - b.price);
  };

  const handleSearch = (searchData) => {
    setLoading(true);
    setSearched(true);
    
    setTimeout(() => {
      const mockFlights = generateMockFlights(searchData.from, searchData.to, searchData.departureDate);
      setFlights(mockFlights);
      setLoading(false);
      
      setTimeout(() => {
        document.getElementById('flights-section').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setBookings([]);
  };

  const handleBooking = (flight) => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    
    const newBooking = {
      id: Date.now(),
      ...flight,
      bookingDate: new Date().toISOString(),
      passengers: flight.passengers || [{ name: user?.name || 'Passenger', age: 30, gender: 'male' }],
      status: 'Confirmed',
      totalAmount: flight.price * (flight.passengers?.length || 1)
    };
    
    setBookings([...bookings, newBooking]);
    alert(`Flight booked successfully! Booking ID: ${newBooking.id}`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Navbar 
        isAuthenticated={isAuthenticated}
        user={user}
        onLoginClick={() => handleAuthClick('login')}
        onSignupClick={() => handleAuthClick('signup')}
        onLogout={handleLogout}
        onMyBookingsClick={() => setShowMyBookings(!showMyBookings)}
        onNavClick={scrollToSection}
      />
      
      <section id="home">
        <Hero />
      </section>
      
      <section id="search">
        <SearchForm 
          onSearch={handleSearch} 
          indianCities={indianCities}
        />
      </section>
      
      <section id="flights-section" className="flights-section">
        <div className="container">
          {showMyBookings && isAuthenticated && (
            <MyBookings 
              bookings={bookings}
              onClose={() => setShowMyBookings(false)}
            />
          )}
          
          {searched && (
            <>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Searching for flights across India...</p>
                </div>
              ) : (
                <FlightList 
                  flights={flights} 
                  onBookFlight={handleBooking}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              )}
            </>
          )}
        </div>
      </section>
      
      <section id="deals" className="deals-section">
        <div className="container">
          <h2>✨ Exclusive Deals ✨</h2>
          <div className="deals-grid">
            <div className="deal-card">
              <h3>Mumbai → Delhi</h3>
              <p>Starting from ₹2,499</p>
              <button className="btn btn-primary" onClick={() => scrollToSection('search')}>Book Now</button>
            </div>
            <div className="deal-card">
              <h3>Bangalore → Chennai</h3>
              <p>Starting from ₹1,999</p>
              <button className="btn btn-primary" onClick={() => scrollToSection('search')}>Book Now</button>
            </div>
            <div className="deal-card">
              <h3>Delhi → Goa</h3>
              <p>Starting from ₹3,499</p>
              <button className="btn btn-primary" onClick={() => scrollToSection('search')}>Book Now</button>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about" className="about-section">
        <div className="container">
          <h2>About AakashYatri</h2>
          <p>Your trusted companion for seamless domestic flight bookings across India. We blend technology with tradition to make your journey unforgettable.</p>
        </div>
      </section>
      
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-details">
            <p><strong>📞 Phone:</strong> <a href="tel:+916381241431">+91 6381241431</a></p>
            <p><strong>✉️ Email:</strong> <a href="mailto:vedagiri003@gmail.com">vedagiri003@gmail.com</a></p>
            <p><strong>📍 Address:</strong> 123 Aviation Blvd, New Delhi, India 110001</p>
          </div>
        </div>
      </section>

      <section id="help" className="help-section">
        <div className="container">
          <h2>Help Center</h2>
          <p>Need assistance? Our support team is always here to help you 24/7.</p>
          <ul>
            <li>🎫 Booking Assistance</li>
            <li>💸 Cancellation & Refunds</li>
            <li>🔄 Flight Changes</li>
            <li>🧳 Baggage Information</li>
          </ul>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h4>How can I book a flight?</h4>
            <p>Simply use our smart search form above to find and book your flight in minutes.</p>
          </div>
          <div className="faq-item">
            <h4>What is the cancellation policy?</h4>
            <p>Free cancellation within 24 hours of booking. Easy refunds guaranteed!</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer group bookings?</h4>
            <p>Yes! You can add up to 5 passengers in a single booking for group travel.</p>
          </div>
        </div>
      </section>

      <section id="terms" className="terms-section">
        <div className="container">
          <h2>Terms of Service</h2>
          <p>By using AakashYatri, you agree to our terms and conditions. Your journey, our responsibility.</p>
        </div>
      </section>

      <section id="privacy" className="privacy-section">
        <div className="container">
          <h2>Privacy Policy</h2>
          <p>Your privacy is our priority. We protect your data like we protect our own.</p>
        </div>
      </section>

      <section id="cookies" className="cookies-section">
        <div className="container">
          <h2>Cookie Policy</h2>
          <p>We use cookies to enhance your experience and personalize your journey with us.</p>
        </div>
      </section>
      
      <Footer onNavClick={scrollToSection} />
      
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}

export default App;