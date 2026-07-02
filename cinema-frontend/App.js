import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <div className="logo">Cine<span>Track</span></div>
        <nav className="nav-links">
          <a href="#" className="nav-item active">Home</a>
          <a href="#" className="nav-item">K-Drama</a>
          <a href="#" className="nav-item">Hollywood</a>
          <a href="#" className="nav-item">Anime</a>
          <a href="#" className="nav-item">Indian</a>
        </nav>
      </header>

      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="trending-badge">Spotlight</span>
          <h1>Alice in Borderland</h1>
          <p className="meta-info">Sci-Fi Thriller • 96% Match</p>
          <p className="synopsis">
            An aimless gamer and his friends find themselves in a parallel Tokyo, where they are forced to compete in a series of sadistic games to survive.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Watch Trailer</button>
            <button className="btn btn-secondary">+ Watchlist</button>
          </div>
        </div>
      </section>

      <main className="dashboard-container">
        
        <section className="control-panel">
          <div className="search-box">
            <input type="text" placeholder="Search across global cinema..." aria-label="Search media" />
            <button type="button" className="search-btn">Search</button>
          </div>
        </section>

        <section className="grid-section">
          <div className="section-title">
            Trending K-Dramas
            <a href="#" className="view-all-link">See All →</a>
          </div>
          <div className="media-grid">
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80" alt="K-Drama Poster" />
                <span className="rating-badge">★ 9.1</span>
              </div>
              <div className="card-details">
                <h3>Crash Landing on You</h3>
                <p className="card-sub">Romance • 1 Season</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=500&q=80" alt="K-Drama Poster" />
                <span className="rating-badge">★ 8.8</span>
              </div>
              <div className="card-details">
                <h3>Vincenzo</h3>
                <p className="card-sub">Crime Comedy • 1 Season</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=80" alt="K-Drama Poster" />
                <span className="rating-badge">★ 9.3</span>
              </div>
              <div className="card-details">
                <h3>Reply 1988</h3>
                <p className="card-sub">Slice of Life • 1 Season</p>
              </div>
            </article>
          </div>
        </section>

        <section className="grid-section">
          <div className="section-title">
            Hollywood Blockbusters
            <a href="#" className="view-all-link">See All →</a>
          </div>
          <div className="media-grid">
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80" alt="Hollywood Poster" />
                <span className="rating-badge">★ 8.9</span>
              </div>
              <div className="card-details">
                <h3>Interstellar</h3>
                <p className="card-sub">Sci-Fi / Adventure • 2h 49m</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=500&q=80" alt="Hollywood Poster" />
                <span className="rating-badge">★ 9.0</span>
              </div>
              <div className="card-details">
                <h3>The Dark Knight</h3>
                <p className="card-sub">Action / Crime • 2h 32m</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=500&q=80" alt="Hollywood Poster" />
                <span className="rating-badge">★ 8.7</span>
              </div>
              <div className="card-details">
                <h3>Inception</h3>
                <p className="card-sub">Sci-Fi / Action • 2h 28m</p>
              </div>
            </article>
          </div>
        </section>

        <section className="grid-section">
          <div className="section-title">
            Top Rated Anime
            <a href="#" className="view-all-link">See All →</a>
          </div>
          <div className="media-grid">
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80" alt="Anime Poster" />
                <span className="rating-badge">★ 9.1</span>
              </div>
              <div className="card-details">
                <h3>Attack on Titan</h3>
                <p className="card-sub">Action / Dark Fantasy</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80" alt="Anime Poster" />
                <span className="rating-badge">★ 9.0</span>
              </div>
              <div className="card-details">
                <h3>Demon Slayer</h3>
                <p className="card-sub">Shonen / Supernatural</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=500&q=80" alt="Anime Poster" />
                <span className="rating-badge">★ 8.9</span>
              </div>
              <div className="card-details">
                <h3>Jujutsu Kaisen</h3>
                <p className="card-sub">Action / Fantasy</p>
              </div>
            </article>
          </div>
        </section>

        <section className="grid-section">
          <div className="section-title">
            Trending Indian Cinema
            <a href="#" className="view-all-link">See All →</a>
          </div>
          <div className="media-grid">
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=500&q=80" alt="Indian Movie Poster" />
                <span className="rating-badge">★ 8.4</span>
              </div>
              <div className="card-details">
                <h3>RRR</h3>
                <p className="card-sub">Action / Historical Epic</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=500&q=80" alt="Indian Movie Poster" />
                <span className="rating-badge">★ 8.8</span>
              </div>
              <div className="card-details">
                <h3>3 Idiots</h3>
                <p className="card-sub">Drama / Comedy</p>
              </div>
            </article>
            <article className="media-card">
              <div className="card-thumbnail">
                <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=500&q=80" alt="Indian Movie Poster" />
                <span className="rating-badge">★ 8.2</span>
              </div>
              <div className="card-details">
                <h3>K.G.F: Chapter 2</h3>
                <p className="card-sub">Action / Crime Thriller</p>
              </div>
            </article>
          </div>
        </section>

      </main>

      <footer className="main-footer">
        <p>&copy; 2026 CineTrack. Keep your thrillers organized.</p>
      </footer >
    </div>
  );
}

export default App;

