import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logoRect from '../assets/logos/logorect.webp'; 
import bgImage from '../assets/homePageBG.png'; 
import LeaderboardToggle from './LeaderboardToggle';
import clickSound from '../assets/audio/click.mp3';

const GAME_MODES = [
  {
    id: 'easy',
    name: 'Guppy',
    icon: '🐟',
    color: '#4caf50',
    desc: 'Beginner friendly',
    detail: 'Get hints when you guess wrong',
    path: '/play?mode=easy',
  },
  {
    id: 'normal',
    name: 'Monkey',
    icon: '🐒',
    color: '#2196f3',
    desc: 'Classic mode',
    detail: '4 rounds, no assistance',
    path: '/play',
  },
  {
    id: 'beast',
    name: 'Beast',
    icon: '👹',
    color: '#f44336',
    desc: 'For experts',
    detail: 'Timed rounds, 3 lives, streaks',
    path: '/play?mode=beast',
  },
];

function HomePage() {
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.4;
    audio.play();
  }

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = logoRect;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = logoRect;
      document.head.appendChild(newLink);
    }
  }, []);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <div className="home-modern">
          <div className="hero-section">
            <h1 className="hero-title">
              <img src={logoRect} alt="BioGuessr" height="200" width="400"/>
            </h1>
            <p className="hero-subtitle">Test your wildlife knowledge across the globe</p>
          </div>

          <div className="modes-row">
            {GAME_MODES.map((mode) => (
              <button
                key={mode.id}
                className="mode-tile"
                onClick={() => {
                  // call sound effect on click
                  playSound();
                  navigate(mode.path);
                }}
              >
                <div className="mode-tile-icon" style={{ background: `linear-gradient(135deg, ${mode.color}22, ${mode.color}44)` }}>
                  <span>{mode.icon}</span>
                </div>
                <div className="mode-tile-info">
                  <span className="mode-tile-name" style={{ color: mode.color }}>{mode.name}</span>
                  <span className="mode-tile-desc">{mode.desc}</span>
                </div>
                <span className="mode-tile-detail">{mode.detail}</span>
              </button>
            ))}
          </div>

          <div className="actions-row">
            <button className="featured-action" onClick={() => {
              // call sound effect on click
              playSound();
              navigate('/daily');
            }}>
              <div className="featured-action-left">
                <span className="featured-icon">📅</span>
                <div>
                  <span className="featured-title">Daily Challenge</span>
                  <span className="featured-desc">New puzzle every day • Compete globally</span>
                </div>
              </div>
              <span className="featured-arrow">→</span>
            </button>
          </div>

          <div className="home-footer">
            <LeaderboardToggle />
            <button className="link-btn" onClick={() => {
              // call sound effect on click
              playSound();
              setShowRules(true);
            }}>
              How to Play
            </button>
          </div>
        </div>

        {showRules && (
          <div className="modal-overlay" onClick={() => {
            // call sound effect on click
            playSound();
            setShowRules(false);
          }}>
            <div className="modal-content rules-modal" onClick={(e) => {
              // call sound effect on click
              playSound();
              e.stopPropagation();
            }}>
              <h2>How To Play</h2>
              <div className="rules-list">
                <div className="rule-item">
                  <span className="rule-number">1</span>
                  <p>You'll see a picture of an animal and its scientific name.</p>
                </div>
                <div className="rule-item">
                  <span className="rule-number">2</span>
                  <p>Guess which country or region the animal can be found in.</p>
                </div>
                <div className="rule-item">
                  <span className="rule-number">3</span>
                  <p>Correct guesses earn points. Build streaks for bonus multipliers!</p>
                </div>
              </div>
              <button className="btn primary-btn" onClick={() => {
                // call sound effect on click
                playSound();
                setShowRules(false);
              }}>
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
