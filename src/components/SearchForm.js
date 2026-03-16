import React, { useState } from 'react';
import { FaPlane } from 'react-icons/fa';
import '../styles/SearchForm.css';

const SearchForm = ({ onSearch, indianCities }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'roundtrip',
    class: 'economy'
  });

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCitySelect = (field, city) => {
    setFormData({
      ...formData,
      [field]: `${city.city} (${city.code})`
    });
    setShowFromDropdown(false);
    setShowToDropdown(false);
  };

  const swapCities = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const filteredFromCities = indianCities.filter(city => 
    city.city.toLowerCase().includes(formData.from.toLowerCase()) ||
    city.code.toLowerCase().includes(formData.from.toLowerCase())
  );

  const filteredToCities = indianCities.filter(city => 
    city.city.toLowerCase().includes(formData.to.toLowerCase()) ||
    city.code.toLowerCase().includes(formData.to.toLowerCase())
  );

  return (
    <div className="search-form-container">
      <div className="container">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="trip-type">
            <label className={formData.tripType === 'roundtrip' ? 'active' : ''}>
              <input
                type="radio"
                name="tripType"
                value="roundtrip"
                checked={formData.tripType === 'roundtrip'}
                onChange={handleChange}
              />
              Round Trip
            </label>
            <label className={formData.tripType === 'oneway' ? 'active' : ''}>
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={formData.tripType === 'oneway'}
                onChange={handleChange}
              />
              One Way
            </label>
          </div>

          <div className="form-row locations">
            <div className="form-group location-group">
              <input
                type="text"
                name="from"
                placeholder="From (City or Airport)"
                value={formData.from}
                onChange={handleChange}
                onFocus={() => setShowFromDropdown(true)}
                onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                required
              />
              {showFromDropdown && filteredFromCities.length > 0 && (
                <div className="dropdown">
                  {filteredFromCities.map((city, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleCitySelect('from', city)}
                    >
                      <strong>{city.city}</strong> ({city.code})
                      <br />
                      <small>{city.airport}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="button" className="swap-btn" onClick={swapCities}>
              ⇄
            </button>

            <div className="form-group location-group">
              <input
                type="text"
                name="to"
                placeholder="To (City or Airport)"
                value={formData.to}
                onChange={handleChange}
                onFocus={() => setShowToDropdown(true)}
                onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                required
              />
              {showToDropdown && filteredToCities.length > 0 && (
                <div className="dropdown">
                  {filteredToCities.map((city, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleCitySelect('to', city)}
                    >
                      <strong>{city.city}</strong> ({city.code})
                      <br />
                      <small>{city.airport}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {formData.tripType === 'roundtrip' && (
              <div className="form-group">
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.departureDate}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <select name="passengers" value={formData.passengers} onChange={handleChange}>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select name="class" value={formData.class} onChange={handleChange}>
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary search-btn">
            <FaPlane /> Search Domestic Flights
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;